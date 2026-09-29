# AlexusLab — Funnel v3

Sitio estático. No hay que compilar nada: se sube tal cual (Vercel o GitHub Pages).

## Páginas
- `index.html` — hub (link in bio): comunidad, clase gratis, YouTube (reproduce siempre el último vídeo del canal), Instagram, plataforma y email.
- `Comunidad.html` — landing de la comunidad, checkout directo en Whop. También en `/comunidad`.
- `Mentoria.html` — clase gratis: 5 preguntas (Formspree) → se desbloquean los 2 vídeos → si invertiría 1.000 € o más: Calendly integrado; si no: acceso directo a la comunidad + dudas por Instagram o email. También en `/clase`, `/mentoria`.
- `gracias.html` — página tras el pago (mide la compra y explica cómo acceder).
- `aviso-legal.html`, `privacidad.html`, `cookies.html`, `terminos.html`, `condiciones.html` — legal.

## ANTES DE PUBLICAR
1. Rellena `[RAZÓN SOCIAL]`, `[NIF]`, `[DIRECCIÓN COMPLETA]` y `[EMAIL DE CONTACTO]` en:
   `aviso-legal.html`, `privacidad.html`, `terminos.html`, `condiciones.html`, `cookies.html`.

## Configuración (todo en un sitio)
- **Píxel de Meta**: `funnel.js` → `META_PIXEL_ID`. Solo se carga si el usuario acepta cookies.
- **Formulario / Calendly / clase**: en el `<script>` final de `Mentoria.html`:
  `FORM_ENDPOINT`, `CALENDLY_URL`, `CALL_BUDGET` (qué respuestas de presupuesto dan acceso a la llamada) y `CLASE` (IDs de YouTube y títulos de los 2 vídeos de la clase: CÁMBIALOS cuando los grabes).
- **Whop**: si tu plan lo permite, configura la redirección tras el pago:
  mensual → `https://www.alexus-lab.com/gracias.html?plan=mensual`,
  6 meses → `https://www.alexus-lab.com/gracias.html?plan=6meses`.
- Para volver a ver el formulario tras rellenarlo: `Mentoria.html?nuevo`.

## Eventos que se envían a GA4 (y a Meta si hay píxel y consentimiento)
`hub_comunidad`, `hub_llamada`, `hub_youtube`, `hub_login`, `video_play`, `cta_precios`, `view_precios`,
`checkout_click` (InitiateCheckout), `quiz_step` (step 1–5), `generate_lead` (Lead), `lead_error`,
`calendly_click`, `calendly_booked` (Schedule), `ig_dm_click`, `purchase` (Purchase).

Marca como eventos clave en GA4: `generate_lead`, `calendly_booked`, `checkout_click`, `purchase`.

## Cookies
Banner propio con Google Consent Mode v2: GA4 y Meta no ponen cookies hasta que el usuario pulsa «Aceptar».
