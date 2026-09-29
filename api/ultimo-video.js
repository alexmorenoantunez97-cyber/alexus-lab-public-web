// Vercel Function: devuelve el último vídeo del canal de YouTube (id + título) a partir del feed público.
// La web lo usa en el hub para mostrar siempre la portada y el título actualizados.
const CHANNEL_ID = 'UCmZCzPAu2-Ga9CHXvqk_MfQ';

const decode = s => (s || '')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

module.exports = async (req, res) => {
  try {
    const r = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID);
    const xml = await r.text();
    const entry = xml.split('<entry>')[1] || '';
    const id = (entry.match(/<yt:videoId>([^<]+)/) || [])[1];
    const title = decode((entry.match(/<title>([^<]+)/) || [])[1]);
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    if (!id) { res.statusCode = 502; return res.end(JSON.stringify({ error: 'sin vídeo' })); }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ id, title }));
  } catch (e) {
    res.statusCode = 502;
    res.end(JSON.stringify({ error: 'no disponible' }));
  }
};
