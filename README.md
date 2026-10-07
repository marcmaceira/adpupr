# ADPUPR

Sitio de la Asociación de Administración Pública de Puerto Rico con **Next.js 16, React 19 y Payload CMS 3**. El contenido se administra en `/admin`: páginas compuestas por 24 tipos de secciones, menús, comités, imágenes y documentos.

- [Guía para el equipo editorial](docs/cms-editor.md)
- [Despliegue en Vercel + Neon + Blob](docs/deployment.md)
- [Verificaciones y límites del trabajo local](docs/cms-verification.md)

## Desarrollo local

Requisitos: Node.js 22.9 o posterior, pnpm y Docker. No hacen falta credenciales de producción.

```bash
pnpm install
cp .env.example .env
# Genera una contraseña local con: openssl rand -hex 16
# Ponla en LOCAL_POSTGRES_PASSWORD y DATABASE_URL (usuario adpupr).
# Genera PAYLOAD_SECRET con: openssl rand -hex 32
pnpm db:up
pnpm seed
pnpm import:resources
pnpm dev --hostname 192.168.9.4 --port 3002
```

Sitio: **http://192.168.9.4:3002** · Panel: **http://192.168.9.4:3002/admin**.

La dirección es la IP privada del equipo de desarrollo; cámbiala en el comando y en `NEXT_PUBLIC_SITE_URL` si trabajas en otra máquina. La base de datos Docker solo escucha en `127.0.0.1:54329`.

La primera cuenta creada en `/admin` recibe el rol **Administrador**. No hay una contraseña predeterminada ni una cuenta creada por el seed. En **Cuenta → Idioma**, selecciona Español si el navegador abre el panel en inglés.

Sin `BLOB_READ_WRITE_TOKEN`, los archivos se guardan en `uploads/`, fuera de Git. No uses almacenamiento local en Vercel.

### Contenido inicial e importación

`pnpm seed` crea las ocho páginas originales, sus menús y ajustes, tres comités, cuatro categorías y los retratos. `pnpm import:resources` descarga los 17 documentos del inventario público original y los registra como archivos administrados por Payload. Los originales no se eliminan.

Los dos comandos son **idempotentes**: no reemplazan páginas, menús o archivos que el equipo ya haya editado. Las fotografías y los documentos se identifican por su URL de origen; los campos de importación no se pueden editar en el panel.

```bash
pnpm import:resources --dry-run             # Inventario sin escribir archivos ni registros
pnpm import:resources --from-blob --dry-run # Inventario actual del prefijo recursos/; requiere acceso al Blob original
```

Los scripts se ejecutan directamente con `tsx` y cargan `.env` mediante Node; así conservan los argumentos `--dry-run` y `--from-blob` (el comando `payload run` los consume si no se separan con `--`). El inventario guardado en `src/seed/resources.json` permite trabajar sin tokens de producción. Antes del cambio definitivo, usa `--from-blob` para incluir publicaciones posteriores al inventario. Los comandos que escriben en una base de datos remota o en Blob requieren `CMS_ALLOW_REMOTE_WRITES=true`; revisa el destino antes de autorizarlo.

## Comandos

| Comando                           | Uso                                                                                             |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `pnpm dev`                        | Servidor de desarrollo; especifica la IP privada y el puerto como arriba                        |
| `pnpm build`                      | Compilación de producción; necesita una base de datos con esquema y contenido                   |
| `pnpm vercel-build`               | Ejecuta migraciones y después compila; nunca apunta un preview a la base de datos de producción |
| `pnpm lint` / `pnpm format:check` | Lint, comprobación de tipos y formato                                                           |
| `pnpm test`                       | Pruebas unitarias con `node:test` y `tsx`                                                       |
| `pnpm generate:types`             | Regenera `src/payload-types.ts` después de cambiar el esquema                                   |
| `pnpm generate:importmap`         | Regenera el mapa de componentes del panel                                                       |
| `pnpm migrate:create`             | Genera una migración a partir del esquema de Payload                                            |
| `pnpm migrate`                    | Aplica migraciones a `DATABASE_URL`                                                             |
| `pnpm payload migrate:status`     | Consulta las migraciones aplicadas                                                              |

Para comprobar las migraciones contra una base de datos vacía, establece `PAYLOAD_DB_PUSH=false`. El desarrollo local usa schema push por defecto; los despliegues deben usar migraciones versionadas, no schema push.

## Organización

```text
src/app/(frontend)/     Sitio público y entrada/salida de vista previa
src/app/(payload)/      Panel /admin y API /api
src/app/robots.ts       Exclusiones de indexación
src/app/sitemap.ts      Rutas publicadas, incluidas páginas creadas desde el panel
src/collections/        Usuarios, páginas, comités, categorías y archivos
src/globals/            Menú principal, pie de página y ajustes del sitio
src/blocks/             Esquemas de secciones y sus componentes visuales
src/seed/               Copia inicial del sitio; no es una fuente de contenido activa
src/scripts/            Seed e importación de recursos
src/migrations/         Migración inicial y futuras migraciones de producción
src/tests/              Pruebas unitarias e integración local aislada
```

La ruta `inicio` representa `/`; las demás rutas admiten segmentos, por ejemplo `nosotros/quienes-somos`. Una página publicada aparece sin crear un archivo Next.js ni recompilar. Agregarla al menú es una operación editorial independiente.

El formulario de contacto sigue abriendo la aplicación de correo del visitante; no almacena mensajes. La entrega de correos de recuperación de contraseña requiere configurar un adaptador de email de Payload. Consulta los límites y pendientes de producción en las guías.
