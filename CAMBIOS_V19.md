# V19 — Ajustes provisionales

- Facebook e Instagram se muestran juntos en la página final. Enlaces en `src/data/social.js`.
- Logo ampliado en portada interior y agradecimientos: reglas al final de `src/style.css`.
- D y Aspirantes tienen el mismo tamaño de foto y de nombres que los otros cuerpos de baile, con ajustes móviles.
- Modo oscuro fijo temporalmente. Para recuperar el selector, restaura el botón `theme-toggle` de la versión V18 y la función `toggleTheme()` en `src/App.vue`.
- Oficial y A siguen juntos provisionalmente. Para separarlos, cambia `COMBINAR_OFICIAL_Y_A = true` a `false` en `src/App.vue`.
