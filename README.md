# AlexusLab — Funnel

Sitio estático. No hay que compilar nada: se sube tal cual.

## Páginas
- `index.html` — hub (link in bio). Página de inicio.
- `Comunidad.html` — landing de la comunidad, checkout directo en Whop.
- `Mentoria.html` — clase gratis: formulario → 2 vídeos → llamada 1 a 1.
- `privacidad.html`, `terminos.html`, `condiciones.html` — legal.

## Compartido
`funnel.css`, `funnel.js`, `assets/`

## Integraciones configuradas
- Checkout Whop: mensual 49,99 € y 6 meses 210 €
- Formulario de la clase: Formspree `xoeabpzd` (llega al correo)
- Llamada: calendly.com/alexmoreno/15min
- Analítica: Google Analytics 4 `G-5V6SQC3VV2`

Eventos que se envían a GA4: `hub_comunidad`, `hub_clase_gratis`, `hub_youtube`,
`hub_login`, `video_play`, `cta_precios`, `view_precios`, `checkout_click`,
`lead_form_submit`, `calendly_click`.

## Publicar con GitHub Pages
1. Crea un repositorio y sube el contenido de esta carpeta a la raíz.
2. Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
3. Si tienes dominio propio, añádelo en Custom domain.
