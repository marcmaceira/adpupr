# Guía editorial de ADPUPR

## Entrar al panel

Abre `/admin` en la misma dirección del sitio e inicia sesión con tu cuenta. En desarrollo local: **http://192.168.9.4:3002/admin**.

La primera cuenta es administradora. Una persona administradora puede crear cuentas en **Usuarios**, asignar el rol **Editor** y cambiar contraseñas. Cada integrante debe tener su propia cuenta. Los editores pueden modificar contenido, pero no crear usuarios, cambiar roles ni editar otras cuentas.

Si los controles aparecen en inglés, abre **Cuenta → Idioma → Español**. Los nombres de colecciones y campos están en español.

## Editar una página

1. Abre **Páginas** y selecciona la página.
2. El **Título** de arriba identifica la página en el panel y sirve como título por defecto en buscadores. El texto visible en la portada se cambia dentro de su sección de encabezado.
3. En **Contenido → Secciones**, expande la sección que quieres modificar.
4. Cambia textos, enlaces, imágenes o listas. Los cambios se guardan automáticamente como borrador.
5. Abre **Previsualizar** para revisar el resultado junto al formulario; puedes elegir móvil, tableta o escritorio. **Vista previa** abre la página en otra pestaña.
6. Selecciona **Publicar cambios** cuando esté lista. El sitio público se actualiza después de publicar; guardar un borrador no lo modifica.

La franja amarilla «Vista previa de borrador — no publicada» indica que estás viendo contenido privado. Solo funciona con una sesión iniciada. **Salir de vista previa** vuelve a mostrar el sitio publicado. No compartas una vista previa como si fuera una página pública.

**Versiones** permite consultar estados anteriores. Si quieres descartar un borrador, usa **Revertir a la versión publicada**. Revisa el contenido restaurado antes de publicarlo.

## Agregar, mover o quitar secciones

- **Añadir Sección** abre el selector. Hay 24 tipos agrupados en Encabezados, Contenido, Llamadas a la acción, Organización y Eventos.
- Arrastra el asa a la izquierda de una sección para cambiar su posición. También puedes usar sus opciones de movimiento.
- Usa el menú de opciones de la sección para duplicarla o eliminarla.
- Las listas internas —personas, cifras, tarjetas, actividades, botones— también se pueden agregar, ordenar y quitar.

Empieza normalmente con un **Encabezado de página**. Usa un solo encabezado principal por página. Para texto general, elige **Texto libre** o **Texto en dos columnas**; para botones destacados, una **Franja de llamada a la acción**; para documentos descargables, **Biblioteca de documentos**.

Algunas secciones ofrecen un color de fondo o una presentación. Los estilos disponibles mantienen la identidad visual del sitio; no es necesario escribir CSS.

### Enlaces y anclas

- Dentro del sitio: `/membresia`, `/recursos` o `/nosotros/quienes-somos`.
- A una sección: `/recursos#biblioteca` o `#inscripcion` dentro de la misma página.
- Fuera del sitio: dirección completa que empiece con `https://`.
- Correo: `mailto:info@adpupr.com`.

Los enlaces web externos abren en una pestaña nueva. En **ID de ancla**, escribe un identificador breve, sin espacios ni acentos, por ejemplo `biblioteca`. Usa identificadores distintos dentro de la página. Deja el campo vacío si no necesitas un enlace directo.

Algunos campos de texto indican que puedes escribir `**palabras**` para destacarlas en negritas. El editor de texto enriquecido tiene controles propios para títulos secundarios, enlaces, listas y citas.

## Crear una página

1. En **Páginas**, selecciona crear una página.
2. Escribe un título y una **Ruta** única, sin barra inicial: `proyectos` o `proyectos/educacion`.
3. Añade el encabezado y las secciones necesarias.
4. Completa la pestaña **SEO** si necesitas un título, descripción o imagen específicos para compartir.
5. Revisa la vista previa y publica.
6. Si debe aparecer en la navegación, agrega su enlace en **Menú principal** o **Pie de página**.

La ruta `inicio` está reservada para la portada `/`. Las rutas `admin`, `api` y `next` pertenecen al sistema. No cambies una ruta publicada sin revisar los enlaces que la usan: los menús no se corrigen automáticamente y no hay redirecciones automáticas desde rutas anteriores.

Eliminar una página la envía a la papelera. Revisa los menús y enlaces antes de quitarla. Puedes restaurarla desde la papelera.

## Menús y datos de contacto

En **Navegación**:

- **Menú principal:** agrega o reordena enlaces. Un elemento con subenlaces se convierte en desplegable. El botón destacado es independiente.
- **Pie de página:** modifica la descripción, columnas y enlaces, derechos de autor y ubicación.
- **Ajustes del sitio:** cambia los datos de la organización, descripción por defecto, imagen para compartir, correos, dirección postal y redes sociales. El primer correo recibe el mensaje preparado por el formulario de contacto.

Estos cambios se guardan directamente y se reflejan en el sitio; no tienen el mismo flujo de borrador/publicación de las páginas. Revisa cada cambio antes de guardar.

El enlace heredado **Colaboradores → /nosotros#colaboradores** no tiene una página o sección correspondiente. Puedes quitarlo o corregirlo cuando exista contenido aprobado para ese destino.

## Fotos, personas y comités

- Sube fotos en **Imágenes** o desde el campo de foto de una sección.
- Completa siempre el **Texto alternativo** con una descripción útil, por ejemplo «Retrato de Jonnathan García Rosado».
- Se admiten JPEG, PNG, WebP, GIF y AVIF. No se admiten SVG por seguridad.
- En una sección **Personas**, edita los nombres, cargos, biografías y fotos. La misma imagen se puede reutilizar.
- En **Comités**, edita las funciones, coordinación y, cuando corresponda, la junta del comité. Arrastra los comités para cambiar su orden.
- Una sección **Comités de trabajo** puede mostrar todos los comités o una selección.

Antes de borrar una foto, comprueba si la usan varias páginas.

## Publicar documentos

1. Crea o selecciona una categoría en **Categorías de documentos**.
2. En **Documentos**, sube el archivo y completa título, categoría y fecha de publicación.
3. Guarda. El documento aparece en las secciones **Biblioteca de documentos**.

Las categorías son los filtros de la biblioteca y también se pueden ordenar. La fecha determina el orden de los documentos: los más recientes aparecen primero. Se admiten PDF, Word, PowerPoint y los formatos de imagen indicados arriba.

Los documentos no tienen borradores: guardar un documento lo hace visible en la biblioteca. Cambia el título desde el panel en vez de renombrar archivos en Vercel. No borres un documento hasta comprobar sus enlaces y descargar una copia si debes conservarlo.

## Alcance actual

- La publicación es manual; no hay publicación programada.
- El formulario de contacto abre un correo en el dispositivo del visitante; no envía ni archiva mensajes automáticamente.
- Los pagos y formularios de inscripción siguen en PayPal, ATH Móvil y Google Forms; aquí se editan sus enlaces.
- La recuperación de contraseña por email necesita un servicio de correo configurado. Mientras tanto, una persona administradora debe gestionar el cambio de contraseña.
