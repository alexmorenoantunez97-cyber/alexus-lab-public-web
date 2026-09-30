# AlexusLab — Funnel

Sitio estático (HTML + CSS + JS, sin compilación). Alojado en Vercel.

## Páginas
| Archivo | URL corta | Función |
|---|---|---|
| `index.html` | `/` | Hub (enlace de la bio de Instagram): comunidad, clase gratis, redes, acceso a la plataforma |
| `Comunidad.html` | `/comunidad` | Landing de venta. Checkout directo en Whop |
| `Mentoria.html` | `/clase`, `/mentoria` | Clase gratis: formulario (Formspree) → 2 vídeos → filtro → Calendly o comunidad |
| `gracias.html` | `/gracias` | Tras el pago: mide la compra y explica cómo acceder |
| `aviso-legal.html`, `privacidad.html`, `cookies.html`, `terminos.html`, `condiciones.html` | — | Legal |

Compartido: `funnel.css`, `funnel.js`, `favicon.svg`, `vercel.json` y la carpeta `assets/` (súbela entera).

## Filtro de la clase gratis (`Mentoria.html`, bloque CONFIGURACIÓN del script final)
- `CALL_BUDGET = [3]` → "1.000 € o más" ve el Calendly (email: 🔥 Lead cualificado).
- `CALL_EXPERIENCE = [0]` → "Todavía no he empezado" ve el Calendly con cualquier presupuesto (email: 🟡 Principiante → llamada).
- El resto ve la comunidad + dudas por Instagram o email (email: Lead clase gratis).
- `FORM_ENDPOINT` (Formspree) y `CALENDLY_URL`.
- `CLASE`: IDs de YouTube y títulos de los 2 vídeos. **Cuando grabes los vídeos cambia los IDs.**
  Si cambias los títulos, cámbialos también en el bloque "Qué vas a ver" de la misma página.
- Para volver a ver el formulario tras rellenarlo: `/Mentoria.html?nuevo`.

## Otros ajustes
- **Testimonios** (`Comunidad.html`): sección `id="testimonios"` oculta con `hidden`. Añade las tarjetas y quita `hidden` cuando tengas material autorizado.
- **Píxel de Meta**: `funnel.js` → `META_PIXEL_ID`. Solo se carga si el usuario acepta cookies en la página de Cookies (no hay aviso automático).
- **Whop**: si tu plan lo permite, redirección tras el pago a `/gracias.html?plan=mensual` y `/gracias.html?plan=6meses`.
- **GA4** `G-5V6SQC3VV2`, sin cookies por defecto. Marca como eventos clave: `generate_lead`, `calendly_booked`, `checkout_click`, `purchase`.

## Eventos
`hub_comunidad`, `hub_llamada`, `hub_youtube`, `hub_login`, `video_play`, `cta_precios`, `view_precios`,
`checkout_click`, `quiz_step`, `generate_lead`, `lead_error`, `calendly_click`, `calendly_booked`, `ig_dm_click`, `purchase`.

## Desplegar en Vercel
**Opción A — Arrastrar la carpeta (más rápido)**
1. Descomprime el zip.
2. Entra en vercel.com → tu proyecto de alexus-lab.com.
3. Si el proyecto está conectado a GitHub, usa la opción B. Si no, instala la CLI (`npm i -g vercel`), abre una terminal en la carpeta descomprimida y ejecuta `vercel --prod`. Elige el proyecto existente cuando te lo pregunte.

**Opción B — GitHub (recomendada si ya lo usas)**
1. Abre tu repositorio en github.com.
2. "Add file" → "Upload files" y arrastra **todo el contenido** de la carpeta descomprimida, incluida la carpeta `assets/` completa (arrástrala como carpeta, no archivo a archivo).
3. "Commit changes". Vercel publica solo en 1–2 minutos.

**Comprobar después de publicar**
- `alexus-lab.com`, `/comunidad` y `/clase` cargan.
- Se ven los logos de empresas y las fotos del hero (si no, falta la carpeta `assets/`).
- Rellena el formulario de la clase marcando "1.000 € o más" y comprueba que te llega el email y aparece el Calendly.
- Pulsa un botón de Whop y verifica que abre el checkout correcto.
