import { existsSync } from "node:fs";
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { type ListBlobResultBlob, list } from "@vercel/blob";
import type {
  ContactSectionBlock,
  MembershipEnrollmentBlock,
  ResourceLibraryBlock,
} from "../../payload-types";
import {
  type BlockInput,
  type GroupSeed,
  ROOT,
  type SeedContext,
  inSequence,
  writeOpts,
} from "../context";
import { bold, richText } from "../lexical";

/* ───────────── Document library (read-only import from the live Blob store) ───────────── */

/** The four categories of the old site, in filter order (old `src/lib/resource-categories.ts`). */
const CATEGORIES = [
  { slug: "boletines", label: "Boletines" },
  { slug: "articulos-de-opinion-edicion-especial", label: "Artículos de opinión especial" },
  { slug: "comunicados", label: "Comunicados" },
  { slug: "convocatorias", label: "Convocatorias" },
] as const;

const BLOB_PREFIX = "recursos/";
const DOCUMENT_STAGING = path.join(ROOT, ".seed-cache", "documents");

function decodeSegment(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    // Keep the raw segment when an uploaded name contains an invalid escape.
    return segment;
  }
}

/** Title exactly as the old site derived it (old `src/lib/resources.ts` `getFileTitle`). */
function getFileTitle(pathname: string): string | null {
  const encodedFileName = pathname.split("/").at(-1);
  if (!encodedFileName) return null;

  const fileName = decodeSegment(encodedFileName);
  if (fileName.toLocaleLowerCase("en").endsWith(".ds_store")) return null;

  const title = fileName
    .replace(/\.[^./]+$/, "")
    .replace(/-[a-z0-9]{30}$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .normalize("NFC");

  return title ? title.charAt(0).toLocaleUpperCase("es") + title.slice(1) : null;
}

/** Blob listing is cursor-paginated: each page is requested after the previous one. */
async function listAllBlobs(cursor?: string): Promise<ListBlobResultBlob[]> {
  const result = await list({ prefix: BLOB_PREFIX, limit: 1000, cursor });
  if (!result.hasMore || !result.cursor) return result.blobs;
  return [...result.blobs, ...(await listAllBlobs(result.cursor))];
}

interface DocumentSpec {
  readonly filename: string;
  readonly url: string;
  readonly title: string;
  readonly categorySlug: string;
  readonly publishedAt: string;
  readonly sortOrder: number;
}

/**
 * The library as the old site rendered it: newest upload first. Blob timestamps tie at
 * second precision; the old stable sort then kept Blob's listing order, which `sortOrder`
 * now records so the rendered order stays exactly the same.
 */
async function listDocumentSpecs(ctx: SeedContext): Promise<DocumentSpec[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Missing BLOB_READ_WRITE_TOKEN in .env (read-only Blob listing)");
  }
  const known = new Set<string>(CATEGORIES.map((c) => c.slug));
  const blobs = (await listAllBlobs()).toSorted(
    (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime(),
  );

  const specs: DocumentSpec[] = [];
  for (const blob of blobs) {
    const [, categorySlug = ""] = blob.pathname.split("/");
    const title = getFileTitle(blob.pathname);
    if (!known.has(categorySlug) || !title) {
      if (blob.pathname !== BLOB_PREFIX) ctx.log(`documents: skipping ${blob.pathname}`);
      continue;
    }
    const filename = decodeSegment(blob.pathname.split("/").at(-1) ?? "").normalize("NFC");
    specs.push({
      filename,
      url: blob.url,
      title,
      categorySlug,
      publishedAt: blob.uploadedAt.toISOString(),
      sortOrder: specs.length + 1,
    });
  }
  return specs;
}

/** Downloads once, then stages the file under its real name (Payload stores the basename). */
async function stageFile(ctx: SeedContext, spec: DocumentSpec): Promise<string> {
  const cached = await ctx.cacheRemote(spec.url, spec.filename);
  await mkdir(DOCUMENT_STAGING, { recursive: true });
  const staged = path.join(DOCUMENT_STAGING, spec.filename);
  if (!existsSync(staged)) await copyFile(cached, staged);
  return staged;
}

async function seedDocumentLibrary(ctx: SeedContext) {
  const categoryIds = new Map<string, number>();
  await inSequence(
    CATEGORIES.map((category, index) => ({ ...category, order: index + 1 })),
    async (category) => {
      const id = await ctx.upsert(
        "document-categories",
        { slug: { equals: category.slug } },
        category,
      );
      categoryIds.set(category.slug, id);
    },
  );

  const specs = await listDocumentSpecs(ctx);
  await inSequence(specs, async (spec) => {
    const category = categoryIds.get(spec.categorySlug);
    if (!category) throw new Error(`No category ${spec.categorySlug}`);
    const where = { filename: { equals: spec.filename } };
    const existing = await ctx.payload.find({
      collection: "documents",
      where,
      limit: 1,
      depth: 0,
      pagination: false,
      ...writeOpts,
    });
    // Re-uploading an existing file would make Payload pick a new "-1" name; only new
    // documents get a file, existing ones are updated in place.
    const filePath = existing.docs[0] ? undefined : await stageFile(ctx, spec);
    const id = await ctx.upsert(
      "documents",
      where,
      {
        title: spec.title,
        category,
        publishedAt: spec.publishedAt,
        sortOrder: spec.sortOrder,
      },
      filePath ? { filePath } : {},
    );
    const saved = await ctx.payload.findByID({
      collection: "documents",
      id,
      depth: 0,
      ...writeOpts,
    });
    if (saved.filename !== spec.filename) {
      throw new Error(`Document stored as ${saved.filename ?? "?"}, expected ${spec.filename}`);
    }
  });
  ctx.log(`${specs.length} documents in ${CATEGORIES.length} categories ready`);
}

/* ───────────── Fixtures ───────────── */

const membership = (): BlockInput<"membershipEnrollment"> => ({
  blockType: "membershipEnrollment",
  benefits: {
    eyebrow: "Beneficios de la membresía",
    heading: "Lo que incluye tu membresía.",
    items: [
      {
        text: "Acceder y participar en foros, talleres, conferencias y conversatorios a costos exclusivos, con pre-reservaciones.",
      },
      { text: "Unirte a los equipos de los comités de trabajo de tu interés." },
      {
        text: "Formar parte de una red profesional con académicos, investigadores, estudiantes y profesionales del servicio público.",
      },
      {
        text: "Contribuir al análisis, la investigación y el debate público informado en Puerto Rico.",
      },
      { text: "Tener voz y voto en las Asambleas de ADPUPR." },
      {
        text: "Fortalecer tu desarrollo profesional y ampliar tus oportunidades de aprendizaje y colaboración.",
      },
    ],
  },
  form: {
    eyebrow: "Paso 1 · Pre-registro",
    heading: "Completa el formulario de membresía.",
    text: "Si solicitas ingreso por primera vez, completa el formulario para quedar prerregistrado como integrante de la ADPUPR. El formulario y el pago son procesos separados.",
    link: {
      label: "Completar formulario de membresía",
      type: "custom",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSed-nAU7aA8_D4DQ7HjD0byLe3B8b_0zY0WEL-Riy1nKgbVbg/viewform",
      newTab: true,
    },
    callout: {
      title: "Confirmación de membresía",
      text: "La membresía se activa una vez que la ADPUPR verifica y aprueba el pago.",
    },
  },
  payment: {
    eyebrow: "Paso 2 · Pago",
    heading: "Selecciona un método de pago.",
    athMovil: {
      title: "ATH Móvil",
      text: richText<NonNullable<MembershipEnrollmentBlock["payment"]["athMovil"]["text"]>>([
        "Paga por negocio a ",
        bold("ADPUPR"),
        ".",
      ]),
      buttonLabel: "Pagar con ATH Móvil",
    },
    paypal: {
      title: "PayPal",
      plans: [
        {
          name: "Membresía regular",
          price: "$50",
          url: "https://www.paypal.com/ncp/payment/K3YBF8EGL7CDA",
        },
        {
          name: "Membresía de estudiante",
          price: "$25",
          url: "https://www.paypal.com/ncp/payment/MESA9TVUCWGL6",
        },
      ],
    },
    check: {
      title: "Cheque o giro",
      text: "Emite el cheque o giro a nombre de la “Asociación de Administración Pública de Puerto Rico” y envíalo por correo postal a:",
    },
  },
  settings: { anchorId: "membresia" },
});

const contact = (): BlockInput<"contactSection"> => ({
  blockType: "contactSection",
  eyebrow: "Conversemos",
  heading: "Tu interés también impulsa el servicio público.",
  body: richText<NonNullable<ContactSectionBlock["body"]>>(
    "En la ADPUPR valoramos cada conversación, cada idea y cada persona interesada en aportar al desarrollo de una administración pública más efectiva, ética e innovadora.",
    "Ya sea que quieras unirte a nuestras iniciativas, establecer una alianza, participar en nuestros eventos o simplemente conocer más sobre nuestro trabajo, estamos disponibles para todo aquel que quiera sumar a la administración pública desde cualquier sector. Escríbenos o síguenos en nuestras redes sociales para mantenernos en contacto.",
  ),
  form: {
    eyebrow: "Escríbenos",
    heading: "Inicia una conversación.",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    contactLabel: "Información de contacto",
    contactPlaceholder: "Correo o teléfono (opcional)",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntanos cómo podemos colaborar.",
    privacyNote: "El formulario no almacena tus datos.",
    submitLabel: "Enviar correo",
    email: {
      recipient: null,
      subjectTemplate: "Mensaje desde adpupr.com - {nombre}",
      nameLine: "Nombre:",
      contactLine: "Información de contacto:",
      messageLine: "Mensaje:",
    },
  },
  channels: {
    eyebrow: "Canales directos",
    ariaLabel: "Canales de contacto",
    emailHeading: "Correo electrónico",
    postalHeading: "Dirección postal",
    socialHeading: "Síguenos",
    networks: [
      { network: "instagram" },
      { network: "facebook" },
      { network: "linkedin" },
      { network: "youtube" },
    ],
  },
  settings: { anchorId: null },
});

const publications = (): BlockInput<"resourceLibrary"> => ({
  blockType: "resourceLibrary",
  eyebrow: "Boletines informativos",
  heading: "Una memoria activa de la profesión.",
  body: richText<NonNullable<ResourceLibraryBlock["body"]>>(
    "Los boletines informativos de ADPUPR son publicaciones institucionales que documentan, difunden y analizan iniciativas, entrevistas, artículos de opinión y actividades relevantes para la administración pública en Puerto Rico.",
    "A través de estos boletines, la Asociación promueve la educación pública profesional, el intercambio de ideas y la reflexión crítica sobre los principales retos de la gobernanza, la gestión pública y el servicio público.",
  ),
  library: {
    filterLegend: "Filtrar recursos por categoría",
    allLabel: "Todos",
    searchLabel: "Buscar en los recursos",
    searchPlaceholder: "Buscar por título",
    downloadLabel: "Descargar",
    emptyArchive: {
      title: "El archivo está en preparación.",
      text: "Los documentos se publicarán aquí tan pronto formen parte del archivo digital de la ADPUPR.",
    },
    noResults: {
      title: "No encontramos recursos.",
      text: "Intenta otra categoría o un término de búsqueda diferente.",
    },
  },
  settings: { anchorId: "publicaciones" },
});

/** Seed data owned by the "engage" group: membership, contact and the document library. */
export const engageSeed: GroupSeed = {
  collections: seedDocumentLibrary,
  fixtures: {
    "membershipEnrollment.membership": membership,
    "contactSection.contact": contact,
    "resourceLibrary.publications": publications,
  },
  guide: async () => [membership(), contact(), { ...publications(), settings: { anchorId: null } }],
};
