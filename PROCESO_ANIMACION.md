# Evidencia del proceso de animación (SPRINT)

Software utilizado: editor de código Visual Studio Code o equivalente para editar SVG/XML, Vue y CSS; el navegador renderiza la vista previa. El archivo original editable es `public/animacion-bienestar.svg`.

1. Boceto conceptual: persona sentada, círculos de respiración y hojas en una composición tranquila.
2. Construcción vectorial: se definió `viewBox="0 0 640 430"`, formas con `<path>`, `<ellipse>` y `<circle>`, y degradados.
3. Agrupación: capas SVG con identificadores `circulos-respiracion`, `persona` y `hojas`.
4. Animación: se integró SVG a `WellnessAnimation.vue` y se definió la secuencia `@keyframes wellness-breathe` en `src/assets/main.css` (ciclo de 5 segundos).
5. Accesibilidad: botón de pausar y reanudar, alternativa textual y `prefers-reduced-motion`.
6. Capturas que debe realizar el alumno en su entorno: editor mostrando el SVG y sus grupos; editor mostrando @keyframes; navegador en Inicio con animación; Tienda con artículos; carrito con productos; confirmación de pedido simulado.

Nota: las capturas del editor deben mostrar el editor que efectivamente se utilice; no se incluyen capturas fabricadas.
