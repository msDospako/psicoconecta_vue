# PsicoConecta · Catálogo con PostgreSQL

Aplicación académica en Vue 3 y Vite. La API se ejecuta en Netlify Functions y guarda los servicios en PostgreSQL. La primera consulta inicializa la base con los 20 servicios originales.

## Actualizar el sitio desde GitHub

1. En Netlify, abre el proyecto de PsicoConecta y revisa qué repositorio y rama se despliegan en producción. Si el sitio se publicó manualmente, vincula el repositorio desde la configuración del proyecto.
2. Prepara una base PostgreSQL con una cadena de conexión accesible desde Netlify. Puedes usar un PostgreSQL administrado o Netlify Database si está disponible en tu cuenta. La cuenta de la base debe poder crear tablas en su esquema.
3. En el panel de Netlify, en **Project configuration → Environment variables**, configura las variables para el contexto de producción y el ámbito **Functions**, cuando esté disponible.

   | Variable | Valor |
   | --- | --- |
   | `DATABASE_URL` | Cadena de conexión de PostgreSQL. Con un proveedor administrado, usa el valor y la configuración TLS recomendados por el proveedor. Si Netlify Database ya proporciona `NETLIFY_DB_URL`, el código usa esa variable automáticamente. |
   | `ADVISOR_PASSWORD` | Contraseña que tú elijas para `asesor@psicoconecta.mx`. |
   | `ADMIN_PASSWORD` | Contraseña que tú elijas para `francisco@psicoconecta.mx`. |

   Las cuentas sin contraseña configurada quedan deshabilitadas. Configura los valores en Netlify y comparte el acceso de asesoría por separado si se requiere evaluar el formulario.
4. Copia **el contenido** de la carpeta del ZIP a la raíz del repositorio, incluyendo `netlify.toml`, `netlify/`, `package-lock.json` y los archivos ocultos. Reemplaza también `public/_redirects` con el archivo del ZIP, que define primero el acceso a la API y luego las rutas de Vue.
5. Haz commit y push a la rama de producción. En **Deploys**, espera a que se publique. Si actualizaste las variables después del deploy, vuelve a desplegar.
6. Abre el dominio habitual y verifica las operaciones de abajo antes de entregar el PDF. Puedes consultar `/api/servicios` para comprobar que Netlify responde con JSON.

## Comprobar la actividad

| Operación | Interfaz |
| --- | --- |
| Consultar todos | **Servicios**, en `/servicios` |
| Consultar uno | **Ver detalles** en una tarjeta o **Ver ficha** en Administración |
| Agregar | **Administración → Agregar servicio** |
| Editar | **Administración → Editar** |
| Eliminar | **Administración → Eliminar** y confirmar |

Crea un registro de prueba, abre su ficha, cambia el precio y verifica que el cambio siga visible al recargar. Elimina ese registro y comprueba que su ficha indique que el servicio no se encontró.

## Compilar y probar localmente

Con Node.js 22, ejecuta `npm ci` y `npm run build`. Para ejecutar también las funciones, configura una base de pruebas en `.env` a partir de `.env.example` y ejecuta `npx netlify-cli dev`. Usa la URL local indicada por la CLI.

[Netlify Functions](https://docs.netlify.com/build/functions/get-started/) · [Variables de entorno](https://docs.netlify.com/build/environment-variables/overview/) · [Netlify Database](https://docs.netlify.com/build/data-and-storage/netlify-database/)
