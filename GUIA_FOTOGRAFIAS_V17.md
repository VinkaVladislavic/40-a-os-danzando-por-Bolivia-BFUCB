# Guía de fotografías — V17

Las fotografías grupales ahora usan `object-fit: contain`: se muestran **completas**, sin cortar bailarines de los extremos. Si la foto no coincide con la proporción del espacio, quedarán franjas discretas a los lados o arriba y abajo. Esto es intencional.

## Tamaños recomendados para exportar

- **Fotos grupales Oficial, A, B y C:** lienzo horizontal **1600 × 700 px** (relación aproximada 2.3:1). Centra el grupo y deja un margen de seguridad del **5–8 %** a cada lado. No cortes cabezas ni pies. Si la foto original es menos panorámica, **añade fondo a los lados**, en vez de recortar personas.
- **Fotos grupales D y Aspirantes:** **1400 × 800 px** (relación 1.75:1), también con margen de seguridad del 5–8 %. La página les da un espacio algo más alto.
- **Fotos de mujeres/varones en el visor:** **1200 × 900 px** (4:3) o **1200 × 800 px** (3:2); el visor utiliza `object-fit: contain` para mostrarlas enteras.
- **Foto de la maestra:** **600 × 800 px** (3:4), en formato vertical, rostro centrado.

Estas medidas son sugerencias de exportación, **no requisitos**: el navegador escala las fotos automáticamente. Para optimizar la carga, usa JPG de calidad 80–85 %; procura que cada foto pese menos de 400–600 KB si es posible.

## Nombres de los archivos grupales

- `CuerpoOficialGrupal.jpg`
- `CuerpoAGrupal.jpg`
- `CuerpoBGrupal.jpg`
- `CuerpoCGrupal.jpg`
- `CuerpoDGrupal.jpg`
- `CuerpoAspirantesGrupal.jpg`

Guárdalos en `public/images/`, conservando exactamente las mayúsculas y los nombres. En Netlify las rutas distinguen mayúsculas de minúsculas.

## Cómo preparar una foto que actualmente se ve cortada

1. Abre la foto en Canva o en otro editor.
2. Crea un lienzo del tamaño recomendado.
3. Inserta la foto **sin recortar** y ajústala hasta que se vea todo el grupo.
4. Rellena el espacio sobrante con un fondo neutro (crema, beige o borgoña oscuro).
5. Exporta como JPG y reemplaza el archivo correspondiente en `public/images/`.

El código V17 ya evita el recorte, así que también puedes usar directamente las fotos originales.
