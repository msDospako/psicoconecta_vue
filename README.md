# PsicoConecta 2.0 — Vue + Vite

Migración y rediseño del proyecto original PsicoConecta a Vue 3.

## Qué conserva del proyecto original

- Catálogo de 20 servicios psicológicos.
- Secciones de inicio, servicios, psicólogos, quiénes somos, FAQ, contacto y login.
- Agenda y confirmación simulada.
- Chat de orientación simulado.
- Persistencia de citas en LocalStorage.

## Qué mejora esta versión

- Vue 3 con componentes reutilizables.
- Vue Router para navegación real entre vistas.
- Diseño visual renovado y responsivo.
- Buscador, filtros y ordenamiento de servicios.
- Perfiles dinámicos de profesionales.
- Agenda visual con selección de servicio, profesional, modalidad, fecha y hora.
- Mejoras de accesibilidad y mensajes claros sobre el carácter académico del prototipo.

## Estructura

```text
src/
├── assets/main.css
├── components/
│   ├── AppNavbar.vue
│   ├── AppFooter.vue
│   ├── ServiceCard.vue
│   ├── PsychologistCard.vue
│   └── ChatWidget.vue
├── data/
│   ├── services.js
│   └── psychologists.js
├── router/index.js
├── views/
└── App.vue
```

## Ejecutar localmente

Requiere Node.js instalado.

```bash
npm install
npm run dev
```

Abre la dirección que indique Vite, normalmente `http://localhost:5173`.

## Compilar para producción

```bash
npm run build
```

Vite genera la carpeta `dist`.

## Netlify

Configuración recomendada:

- Build command: `npm run build`
- Publish directory: `dist`

Para Vue Router con historial HTML5 se incluye un archivo `_redirects` en `public` que redirige las rutas a `index.html`.

## Importante

Este proyecto es una demostración académica. Los perfiles, citas, login, contacto, chat y pagos no representan servicios clínicos reales ni procesan información en un servidor real.
