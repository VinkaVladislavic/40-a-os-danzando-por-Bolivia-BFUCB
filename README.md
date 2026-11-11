# Programa digital · Ballet Folclórico UCB

Programa conmemorativo de los 40 años del Ballet Folclórico de la Universidad Católica Boliviana. Construido con Vue 3, Vite y `page-flip`.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Ejecutar en desarrollo

```bash
npm install
npm run dev
```

Para generar la versión de publicación:

```bash
npm run build
npm run preview
```

## Estructura principal

- `src/components/pages/`: páginas individuales del libro.
- `src/components/common/DanceModal.vue`: ventana emergente con reseña de cada danza.
- `src/data/program.js`: repertorio, agrupaciones y descripciones editables.
- `public/images/`: identidad gráfica y fotografías.

## Editar el programa artístico

Modificar `src/data/program.js`:

- `firstPart`: agrupaciones y danzas de la primera parte.
- `secondPart`: repertorio tentativo para la segunda parte.

Cada danza contiene `name`, `region` y `description`. El modal muestra además la agrupación/intérprete y el campo de música, que permanece como "Interpretación musical por confirmar" hasta contar con los nombres definitivos.

La segunda parte está marcada visualmente como **tentativa**. El orden y el contenido deben confirmarse antes de publicar el programa final.

## Fotografías pendientes

- Retrato de Norah Valverde Tapia: reemplazar el bloque provisional en `src/components/pages/HistoryPage.vue`.
- Fotografía grupal: reemplazar el bloque provisional en `src/components/pages/TeamPage.vue`.
- Fotografías de cada danza: incorporar en `public/images/danzas/`. El modal tiene un espacio visual de reemplazo hasta que se incorporen fotografías autorizadas del Ballet.

La biografía de Norah Valverde Tapia es deliberadamente general y está identificada como provisional; debe revisarse con la información oficial antes de publicar.

## Navegación

- Tap/clic en los bordes del libro para avanzar o retroceder.
- Arrastrar o deslizar para pasar páginas.
- Botones de navegación y flechas del teclado en computadora.
- Tocar una danza abre su modal descriptivo. `Esc` cierra el modal.

En escritorio el libro puede mostrar páginas enfrentadas; en pantallas pequeñas se adapta a una página visible.


## Actualizaciones de diseño y contenido

- La portada y la portada interior muestran las fechas: sábado 14 y domingo 15 de noviembre de 2026.
- La bandera de la portada permanece estática.
- El programa ofrece modo oscuro y modo claro desde el control de tema.
- Las danzas muestran canción y compositor (por ahora pendientes de confirmación). En `src/data/program.js` puedes completar `song`, `composer` e `image` para cada danza. Las imágenes deben guardarse dentro de `public/images/` y referenciarse como `/images/nombre-archivo.jpg`.
- Al seleccionar una danza se abre un modal con reseña, agrupación, canción, compositor y espacio fotográfico.
- La sección del elenco incluye una página de presentación y una página para cada cuerpo: O, A, B, C, D y Aspirantes. Edita `src/data/team.js` para completar `members` con nombres completos y `photos` con las rutas de las fotografías mixta, de chicos y de chicas.

La paginación está configurada para 15 páginas, contando portada, páginas institucionales, programa, seis cuerpos de baile y cierre.


## Actualización mobile-first

- Los modales de danzas se muestran como panel inferior en celulares, con desplazamiento interno, cierre por botón, toque fuera del panel y gesto de deslizar hacia abajo.
- Cada cuerpo de baile utiliza una fotografía grupal mixta y dos columnas de integrantes (hombres y mujeres). Los botones abren las fotografías individuales de cada grupo.
- La página «La música que nos acompaña» presenta a las tres agrupaciones invitadas.
- La página final conserva los agradecimientos e incluye los enlaces sociales cuando se configuren.
- El modo claro es el predeterminado; el botón permite cambiar a modo oscuro.

### Completar integrantes y fotografías
Edita `src/data/team.js`. Para cada cuerpo completa `members.men`, `members.women` y las rutas `photos.mixed`, `photos.boys`, `photos.girls`. Guarda las imágenes en `public/images/equipo/` y usa rutas como `/images/equipo/cuerpo-o-mixta.jpg`.

### Configurar Facebook e Instagram
Edita `src/data/social.js` y pega las direcciones oficiales en `facebook` e `instagram`. Los enlaces se mostrarán automáticamente en la página de agradecimientos.


## Ajustes de responsividad y créditos

- El visor del libro ajusta sus dimensiones según el alto y ancho disponibles, con reglas específicas para teléfonos compactos, teléfonos grandes, tablets y escritorio.
- Los botones de cada danza aíslan los eventos táctiles del gesto de pasar página. El modal se monta en `body`, por encima del libro, y su contenido se desplaza de forma independiente.
- El visor de fotografías de hombres y mujeres también se adapta al alto de pantalla, permite cerrar con Escape, toque fuera y botón de cierre.
- En `src/components/pages/TeamPage.vue` puedes completar los nombres de Vestuario, Tesorería, Coordinación de teatro y Apoyo/producción. La dirección artística figura como Norah Valverde Tapia.
- El agradecimiento especial a **LA CASCADA** está ubicado en la página final de agradecimientos, separado del agradecimiento general para darle visibilidad sin competir con el programa artístico.

Antes de publicar, completa los nombres de las personas de apoyo y confirma con el auspiciador la forma exacta en que desea aparecer (nombre comercial y, si corresponde, logotipo).
