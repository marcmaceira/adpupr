import type { Block } from "payload";
import { headline, link, sectionSettings, text } from "../../payload/fields";

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/**
 * Video feature: a short introduction with a channel button next to an embedded YouTube
 * video (privacy-enhanced youtube-nocookie.com player).
 */
export const VideoFeatureBlock: Block = {
  slug: "videoFeature",
  interfaceName: "VideoFeatureBlock",
  labels: { singular: "Video destacado", plural: "Videos destacados" },
  admin: { group: "Contenido" },
  fields: [
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título"),
    text("intro", "Texto", { textarea: true }),
    link({
      name: "channelLink",
      label: "Botón del canal",
      description: "Se muestra con un ícono de enlace externo.",
    }),
    {
      type: "row",
      fields: [
        {
          name: "youtubeId",
          type: "text",
          label: "Código del video de YouTube",
          required: true,
          admin: {
            width: "40%",
            description:
              "Los 11 caracteres después de «v=» o de «youtu.be/» en el enlace del video. Por ejemplo: jhXQO0PB0PY",
          },
          validate: (value: unknown) =>
            typeof value === "string" && YOUTUBE_ID_PATTERN.test(value)
              ? true
              : "Escribe el código de 11 caracteres del video (letras, números, - o _).",
        },
        {
          name: "videoTitle",
          type: "text",
          label: "Título accesible del video",
          required: true,
          admin: {
            width: "60%",
            description: "Lo anuncian los lectores de pantalla. Describe el video brevemente.",
          },
        },
      ],
    },
    sectionSettings(),
  ],
};
