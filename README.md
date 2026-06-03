# Alexus Lab — Despliegue

Carpeta lista para subir a cualquier hosting estático (Vercel, Netlify, Cloudflare Pages, Hostinger, etc.).

## Estructura
- `index.html` — la landing
- `app.jsx` / `tweaks-panel.jsx` — código React (transpilado en el navegador con Babel)
- `styles.css` + `assets/tokens.css` — estilos
- `assets/` — fotos, logos y tokens de diseño

## Cómo conectar el dominio `alexus-lab.com` (Namecheap → Vercel)

### 1. Subir la carpeta a Vercel (gratis)
1. Entra en https://vercel.com y haz una cuenta (puedes usar Google o GitHub).
2. En el dashboard, pulsa **Add New… → Project**.
3. Elige **Browse all templates → Other** o directamente el bloque **"Deploy"** y arrastra esta carpeta `deploy/` completa (o el ZIP descomprimido).
4. Vercel detecta que es un sitio estático. Pulsa **Deploy**.
5. En 30 segundos tendrás una URL del tipo `alexus-lab-xxx.vercel.app`. Comprueba que la página carga bien.

> Alternativa más sencilla: **Netlify Drop** (https://app.netlify.com/drop). Arrastras la carpeta y te da una URL temporal al instante, sin login obligatorio para probar.

### 2. Añadir tu dominio en Vercel
1. En tu proyecto de Vercel, ve a **Settings → Domains**.
2. Escribe `alexus-lab.com` y pulsa **Add**.
3. Añade también `www.alexus-lab.com` si quieres que ambas funcionen.
4. Vercel te muestra qué registros DNS configurar — apúntalos. Serán algo así:
   - **Tipo A** · Host: `@` · Valor: `76.76.21.21`
   - **Tipo CNAME** · Host: `www` · Valor: `cname.vercel-dns.com`

### 3. Configurar DNS en Namecheap
1. Entra en https://ap.www.namecheap.com → **Domain List**.
2. Junto a `alexus-lab.com`, pulsa **Manage**.
3. Pestaña **Advanced DNS**.
4. **Borra todos los registros existentes** de tipo A, CNAME o URL Redirect que apunten al parking de Namecheap.
5. Añade los registros que te dio Vercel:
   - **A Record** · Host: `@` · Value: `76.76.21.21` · TTL: Automatic
   - **CNAME Record** · Host: `www` · Value: `cname.vercel-dns.com` · TTL: Automatic
6. Pulsa el check verde para guardar cada uno.

### 4. Esperar la propagación
- Tarda entre **5 minutos y 2 horas** (a veces más, pero raramente). Puedes comprobar el estado en Vercel — pondrá un check verde en cada dominio cuando esté listo.
- Vercel emite el certificado SSL automáticamente. La web saldrá ya con `https://`.

### 5. Listo
`https://alexus-lab.com` muestra tu landing. Cada vez que quieras actualizarla, vuelve al proyecto en Vercel y arrastra la carpeta de nuevo (botón **Deployments → Redeploy** o re-import).

---

## Cómo actualizar contenido sin redesplegar
- Cambios de precios, etiqueta de oferta, links de Whop, variante del hero: están en `app.jsx` dentro del bloque `TWEAK_DEFAULTS`. Edita y vuelve a subir.
- Cambios de texto largo (historia, testimonios, features): también en `app.jsx`.

## Notas técnicas
- La landing **no necesita build** — Babel se ejecuta en el navegador. Esto añade ~200KB de carga inicial pero permite editar y desplegar sin instalar nada.
- Si en el futuro quieres optimizar para velocidad pura, te paso una versión pre-compilada.
