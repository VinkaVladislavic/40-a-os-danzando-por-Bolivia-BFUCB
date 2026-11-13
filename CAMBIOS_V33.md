# V33 — Corrección del logo LA CASCADA

Se añadió una regla al final de `src/style.css` para impedir que los logotipos de auspiciadores excedan su contenedor, incluso en pantallas pequeñas. Se conservan las proporciones originales con `object-fit: contain` y se aplica `box-sizing: border-box` y `overflow: hidden` a la tarjeta.
