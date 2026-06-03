// app.jsx — Alexus Lab funnel
// High-conversion mobile-first build. Shorter copy, dynamic visuals,
// sticky CTA on mobile. Tweaks panel preserved for in-flight edits.

const { useState, useEffect, useRef } = React;

// =========================================================================
// CONFIG — tweakable from the panel
// =========================================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "narrative",
  "priceMonth": "49.99",
  "priceMonthOriginal": "79",
  "priceSemester": "249",
  "priceSemesterOriginal": "300",
  "linkMonth": "https://whop.com/checkout/plan_TDJCSpUMg5ddK",
  "linkSemester": "https://whop.com/checkout/plan_1awGPEaPXlNfs",
  "offerLabel": "Oferta de lanzamiento"
} /*EDITMODE-END*/;

// =========================================================================
// SCROLL PROGRESS BAR — top of viewport
// =========================================================================
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? h.scrollTop / total * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />;
}

// =========================================================================
// LIVE CHART — ambient animated background for hero
// =========================================================================
function LiveChart() {
  const [points, setPoints] = useState(() => {
    const out = [];
    let y = 50;
    for (let i = 0; i < 60; i++) {
      y += (Math.random() - 0.45) * 6;
      y = Math.max(15, Math.min(85, y));
      out.push(y);
    }
    return out;
  });
  useEffect(() => {
    const id = setInterval(() => {
      setPoints((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1];
        let y = last + (Math.random() - 0.45) * 6;
        y = Math.max(15, Math.min(85, y));
        next.push(y);
        return next;
      });
    }, 900);
    return () => clearInterval(id);
  }, []);
  const d = points.map((y, i) => `${i === 0 ? 'M' : 'L'}${i / (points.length - 1) * 100} ${y}`).join(' ');
  const fill = `${d} L100 100 L0 100 Z`;
  return (
    <svg className="hero__chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="hero-chart-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.16" />
          <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#hero-chart-fill)" />
      <path d={d} stroke="var(--accent-green)" strokeOpacity="0.45" strokeWidth="0.4" fill="none" vectorEffect="non-scaling-stroke" />
    </svg>);

}

// =========================================================================
// HERO VARIANTS — much shorter copy
// =========================================================================
function HeroNarrative({ t }) {
  return (
    <>
      <div className="hero__eyebrow eyebrow">
        <span className="live-dot" /> Price Action · Psicología · Operativa en vivo
      </div>
      <h1 className="headline headline--xl hero__h1">
        Trading con <span className="it accent">plan</span>,<br />
        no por <span className="it accent">impulso.</span>
      </h1>
      <p className="hero__sub">
        Dentro de AlexusLab tienes previsión semanal, operativas en directo, clases de Price Action y protocolos para controlar la presión cuando el gráfico se mueve.
      </p>
    </>);

}

function HeroDirect({ t }) {
  return (
    <>
      <div className="hero__eyebrow eyebrow">
        <span className="live-dot" /> {t.offerLabel}
      </div>
      <h1 className="headline headline--xl hero__h1">
        El plan que sigo <span className="it">yo</span>,<br />
        <span className="accent">abierto para ti.</span>
      </h1>
      <p className="hero__sub">
        Dos operativas en vivo a la semana, clases de Price Action y psicología, previsión semanal y un grupo cerrado.
      </p>
    </>);

}

function HeroAuthority({ t }) {
  return (
    <>
      <div className="hero__eyebrow eyebrow">
        <span className="live-dot" /> AlexusLab · Performance
      </div>
      <h1 className="headline headline--xl hero__h1">
        <span className="it">Disciplina</span> sobre intuición.<br />
        <span className="accent">Proceso</span> sobre promesas.
      </h1>
      <p className="hero__sub">
        Una comunidad pequeña que estudia, ejecuta y revisa cada operación. Calmados. Sistemáticos. Sin ruido.
      </p>
    </>);

}

const HERO_VARIANTS = {
  narrative: HeroNarrative,
  direct: HeroDirect,
  authority: HeroAuthority
};

// =========================================================================
// HERO SECTION
// =========================================================================
function Hero({ t }) {
  const Variant = HERO_VARIANTS[t.heroVariant] || HeroNarrative;
  return (
    <section className="hero" data-screen-label="01 Hero">
      <img className="hero__monogram" src="assets/logo-monogram-white.png" alt="" />
      <div className="hero__inner">
        <Variant t={t} />
        <div className="hero__cta-row">
          <a className="btn btn--primary btn--lg" href={t.linkMonth} target="_blank" rel="noopener">
            Entrar a AlexusLab
            <span className="arrow">→</span>
          </a>
          <a className="btn btn--ghost btn--lg" href="#sistema">
            Ver qué hay dentro
          </a>
        </div>
        <div className="hero__microcopy">
          <span className="price num">{t.priceMonth}€/mes</span>
          <span className="dot" />
          <span>Sin permanencia</span>
          <span className="dot" />
          <span>Cancelas en 1 clic</span>
        </div>
        <ul className="hero__bullets">
          <li>
            <span className="hero__bullet-num">01</span>
            <span>2 operativas en vivo / semana</span>
          </li>
          <li>
            <span className="hero__bullet-num">02</span>
            <span>Previsión semanal + tarea</span>
          </li>
          <li>
            <span className="hero__bullet-num">03</span>
            <span>Psicología aplicada al trading</span>
          </li>
        </ul>
      </div>
      <a href="#para-ti" className="hero__scroll" aria-label="Bajar">
        <span></span>
      </a>
    </section>);

}

// =========================================================================
// LIVE TICKER — replaces trust strip on mobile, infinite scroll
// =========================================================================
function LiveTicker() {
  const items = [
  "Sesión en vivo · 2x semana",
  "Price Action puro",
  "Clase de psicología cada semana",
  "Grupo cerrado",
  "Videos educativos",
  "Previsión semanal",
  "Acceso directo a Alex",
  "Sin permanencia",
  "Disciplina, no promesas",
  "Cancela cuando quieras"];

  const doubled = [...items, ...items];
  return (
    <section className="ticker" aria-label="Lo que encuentras dentro">
      <div className="ticker__track">
        {doubled.map((label, i) =>
        <span className="ticker__item" key={i}>
            <span className="ticker__dot" />
            {label}
          </span>
        )}
      </div>
    </section>);

}

// =========================================================================
// COMPARE — Antes vs Después (tightened)
// =========================================================================
function Compare() {
  const before = [
  "Cazas movimientos al azar.",
  "Cambias de estrategia cada semana.",
  "Operas con miedo, FOMO o euforia.",
  "No sabes cuándo parar.",
  "Aprendes solo y cada error te cuesta dinero.",
  "Tus cuentas fondeadas dependen de tu estado emocional."];

  const after = [
  "Tienes un plan semanal claro: zonas, sesgo y escenarios.",
  "Sabes cuándo operar y cuándo no tocar el mercado.",
  "Gestionas el riesgo con reglas, no con sensaciones.",
  "Entiendes una sola lectura: Price Action limpio.",
  "Revisas tus errores y mejoras cada semana.",
  "Operas con más calma porque tienes estructura."];

  return (
    <section className="section section--paper" id="por-que" data-screen-label="03 Antes vs Después">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">El cambio</div>
          <h2 className="headline headline--lg">
            Antes — y <span className="it">después.</span>
          </h2>
        </div>
        <div className="compare reveal">
          <div className="compare__col compare__col--before">
            <div className="label"><span className="dot" />Antes</div>
            <ul className="compare__list">
              {before.map((line, i) =>
              <li key={i}><span className="icon"><CrossIcon /></span><span>{line}</span></li>
              )}
            </ul>
          </div>
          <div className="compare__arrow" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
          <div className="compare__col compare__col--after">
            <div className="label"><span className="dot" />Después</div>
            <ul className="compare__list">
              {after.map((line, i) =>
              <li key={i}><span className="icon"><CheckIcon /></span><span>{line}</span></li>
              )}
            </ul>
          </div>
        </div>
        <p className="compare__kicker reveal">
          No necesitas más ruido. Necesitas <strong>proceso</strong>, <strong>repetición</strong> y una <strong>comunidad</strong> que te mantenga en el camino.
        </p>
      </div>
    </section>);

}

const CrossIcon = () =>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>;

const CheckIcon = () =>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12l5 5L20 6" />
  </svg>;


// =========================================================================
// FEATURES — single short sentence each
// =========================================================================
function Features() {
  const cards = [
  {
    tag: "2x / semana",
    title: <>Operativa <span className="it">en vivo</span>.</>,
    desc: "Dos sesiones semanales donde ves cómo preparo el escenario, cuándo espero, cuándo entro y cuándo decido no hacer nada.",
    viz: "trade"
  },
  {
    tag: "Cada semana",
    title: <>Price Action <span className="it">aplicado.</span></>,
    desc: "Clases claras sobre lectura del precio, contexto, liquidez, zonas y ejecución. Sin teoría vacía — todo llevado al gráfico real.",
    viz: "calendar"
  },
  {
    tag: "Cortisol",
    title: <>Control <span className="it">emocional</span>.</>,
    desc: "Protocolos para gestionar presión, cortisol, FOMO, pérdidas y euforia. La idea es simple: cabeza fría antes que botón fácil.",
    viz: "cortisol"
  },
  {
    tag: "Cada lunes",
    title: <>Previsión <span className="it">semanal.</span></>,
    desc: "Cada semana tienes una lectura previa del mercado, escenarios principales y una tarea para entrenar tu criterio.",
    viz: "forecast"
  },
  {
    tag: "No negociable",
    title: <>Reglas de <span className="it">riesgo.</span></>,
    desc: "Riesgo por trade, stop diario, cuándo reducir tamaño y cuándo apagar pantallas. Un sistema para protegerte de ti mismo.",
    viz: "equity"
  },
  {
    tag: "Comunidad",
    title: <>Grupo <span className="it">pequeño.</span></>,
    desc: "Un espacio privado de traders que buscan mejorar de verdad. Sin spam, sin señales vacías y sin ruido.",
    viz: "community"
  }];

  return (
    <section className="section" id="que-incluye" data-screen-label="04 Qué incluye">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Qué hay dentro</div>
          <h2 className="headline headline--lg">
            Todo lo que necesitas. <span className="it">Nada de relleno.</span>
          </h2>
        </div>
        <div className="features-grid reveal-stagger">
          {cards.map((c, i) =>
          <article className="feature-card" key={i}>
              <div className="feature-card__head">
                <span className="feature-card__tag">{c.tag}</span>
                <span className="feature-card__index num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className={`feature-card__visual ${['forecast', 'community', 'calendar', 'cortisol', 'trade'].includes(c.viz) ? 'tall' : ''}`}>
                <FeatureViz kind={c.viz} />
              </div>
              <h3 className="feature-card__title">{c.title}</h3>
              <p className="feature-card__desc">{c.desc}</p>
            </article>
          )}
        </div>
      </div>
    </section>);

}

function FeatureViz({ kind }) {
  if (kind === "trade" || kind === "candles") {
    return (
      <div className="viz viz--trade">
        <div className="trade-card">
          <div className="trade-card__head">
            <span className="trade-card__sym">NQ <em>1m</em></span>
            <span className="trade-card__side">LONG</span>
          </div>
          <svg className="trade-card__chart" viewBox="0 0 260 120" preserveAspectRatio="none">
            <line x1="0" y1="30" x2="260" y2="30" stroke="rgba(232,197,71,0.45)" strokeDasharray="4 4" strokeWidth="0.8" />
            <line x1="0" y1="86" x2="260" y2="86" stroke="rgba(178,107,92,0.45)" strokeDasharray="4 4" strokeWidth="0.8" />
            <line x1="0" y1="70" x2="260" y2="70" stroke="rgba(127,176,105,0.4)" strokeDasharray="2 3" strokeWidth="0.8" />
            <path d="M0 78 L20 80 L40 72 L60 76 L80 70 L100 64 L120 70 L140 56 L160 48 L180 52 L200 42 L220 34 L240 30 L260 32" stroke="#EEEDEA" strokeWidth="1.6" fill="none" opacity="0.85" />
            <text x="6" y="26" fontSize="9" fontFamily="var(--font-mono)" fill="var(--accent-yellow)">TP · 21470</text>
            <text x="6" y="66" fontSize="9" fontFamily="var(--font-mono)" fill="var(--accent-green)">ENTRY · 21430</text>
            <text x="6" y="100" fontSize="9" fontFamily="var(--font-mono)" fill="var(--signal-down)">SL · 21410</text>
          </svg>
          <div className="trade-card__meta">
            <span><em>R</em> 2.0</span>
            <span><em>Riesgo</em> 0.5%</span>
            <span><em>Plan</em> A</span>
          </div>
        </div>
      </div>);

  }
  if (kind === "calendar") {
    const days = [
    { d: "Lun", t: "Clase Price Action" },
    { d: "Mar", t: "Operativa en directo" },
    { d: "Mié", t: "Clase Psicología" },
    { d: "Jue", t: "Operativa en directo" },
    { d: "Vie", t: "Previsión + tarea" }];

    return (
      <div className="viz" style={{ padding: "22px", alignItems: "stretch", justifyContent: "center", flexDirection: "column", gap: 7 }}>
        {days.map((row, i) =>
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", background: "rgba(255,255,255,0.025)", border: "1px solid var(--line)", borderRadius: 4 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", color: "var(--accent-green)", width: 28 }}>{row.d}</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--ink-200)" }}>{row.t}</span>
          </div>
        )}
      </div>);

  }
  if (kind === "chat") {
    const msgs = [
    { n: "DR", t: "Cerré en BE, dudé cuando debía dejar correr." },
    { n: "MJ", t: "Necesito poner stop de día." },
    { n: "AT", t: "¿Cómo gestionáis una racha negativa?" }];

    return (
      <div className="viz" style={{ padding: "20px", alignItems: "stretch", justifyContent: "center", flexDirection: "column", gap: 6 }}>
        {msgs.map((m, i) =>
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 9px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--line)", borderRadius: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--ink-700)", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontSize: 9, color: "#EEEDEA", flexShrink: 0 }}>{m.n}</div>
            <div style={{ flex: 1, minWidth: 0, fontFamily: "var(--font-sans)", fontSize: 10.5, color: "var(--ink-200)", lineHeight: 1.35 }}>{m.t}</div>
          </div>
        )}
      </div>);

  }
  if (kind === "forecast") {
    return (
      <div className="viz viz--cal">
        <div className="cal">
          <div className="cal__head">
            <span>May 18 — May 22, 2026</span>
            <span className="cal__head-right">NQ · ES</span>
          </div>
          {[
          { d: "Lun", date: "18", level: "low", note: "Sin noticias. Setup en pre-market." },
          { d: "Mar", date: "19", level: "med", note: "Pending Home Sales. Manipulación corta." },
          { d: "Mié", date: "20", level: "high", note: "FOMC Minutes. Día probable de high/low." },
          { d: "Jue", date: "21", level: "med", note: "Continuación limpia tras miércoles." },
          { d: "Vie", date: "22", level: "low", note: "Consolidación. Riesgo reducido." }].
          map((row, i) =>
          <div key={i} className={`cal__row cal__row--${row.level}`}>
              <span className="cal__day"><b>{row.d}</b> {row.date}</span>
              <span className={`cal__pill cal__pill--${row.level}`}>USD</span>
              <span className="cal__note">{row.note}</span>
            </div>
          )}
          <div className="cal__strip">
            {[
            { n: "18", op: false }, { n: "19", op: true },
            { n: "20", op: false }, { n: "21", op: false }, { n: "22", op: true }].
            map((s, i) =>
            <span key={i} className={`cal__strip-cell ${s.op ? 'op' : ''}`}>
                <em>{s.n}</em>
                <span>{s.op ? "Trading + operativa" : "Trading day"}</span>
              </span>
            )}
          </div>
        </div>
      </div>);

  }
  if (kind === "equity") {
    return (
      <div className="viz">
        <svg viewBox="0 0 200 120" style={{ width: "80%", height: "75%" }}>
          <defs>
            <linearGradient id="rg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 90 Q40 70 60 75 T120 50 T200 30 L200 120 L0 120 Z" fill="url(#rg)" />
          <path d="M0 90 Q40 70 60 75 T120 50 T200 30" stroke="var(--accent-green)" strokeWidth="1.6" fill="none" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 4" />
        </svg>
      </div>);

  }
  if (kind === "community") {
    const groups = [
    { name: "Como empezar", ch: ["donde-empezar", "sitio-web"] },
    { name: "Sala operaciones", ch: ["directos", "mis-trades"] },
    { name: "Entrenamiento", ch: ["cortisol", "psicologia"] },
    { name: "Desarrollo", ch: ["previsión-semanal", "vídeos"] }];

    return (
      <div className="viz viz--channels">
        <div className="channels">
          <div className="channels__head">AlexusLab · Comunidad</div>
          {groups.map((g, gi) =>
          <div key={gi} className="channels__group">
              <div className="channels__group-label">{g.name}</div>
              {g.ch.map((c, ci) =>
            <div key={ci} className={`channels__item ${gi === 1 && ci === 0 ? 'active' : ''}`}>
                  <span className="channels__hash">#</span>
                  <span>{c}</span>
                </div>
            )}
            </div>
          )}
        </div>
      </div>);

  }
  if (kind === "cortisol") {
    return (
      <div className="viz viz--cortisol">
        <div className="cortisol">
          <div className="cortisol__top">
            <span className="cortisol__label">Sistema simpático</span>
            <span className="cortisol__pulse"><b className="num">78</b> bpm</span>
          </div>
          <svg viewBox="0 0 220 70" className="cortisol__ecg" preserveAspectRatio="none">
            <path d="M0 35 L40 35 L48 35 L55 12 L62 58 L70 35 L110 35 L118 35 L125 18 L132 52 L140 35 L180 35 L188 35 L195 22 L202 48 L210 35 L220 35"
            stroke="var(--signal-down)" strokeWidth="1.6" fill="none" />
          </svg>
          <div className="cortisol__protocol">
            <span><i>01</i> Detectar la alarma</span>
            <span><i>02</i> Manos fuera del ratón</span>
            <span><i>03</i> Respiración fisiológica</span>
            <span><i>04</i> Reenfoque — vuelves con cabeza fría</span>
          </div>
        </div>
      </div>);

  }
  return null;
}

// =========================================================================
// ALEX STORY — significantly shorter, collapsible on mobile
// =========================================================================
function AlexStory() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="section section--paper story-section" id="alex" data-screen-label="05 Quién es Alex">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <div className="eyebrow">Quién es Alex</div>
          <h2 className="headline headline--lg" style={{ textAlign: "center", maxWidth: "20ch" }}>
            De la <span className="it">fisioterapia</span> a los mercados.
          </h2>
        </div>

        <div className="story-grid reveal">
          <div className="story-photo">
            <div className="story-photo__main">
              <img src="assets/alex-portrait.jpeg" alt="Alex Moreno, fundador de AlexusLab" />
            </div>
            <div className="story-photo__caption">Alex Moreno · Fundador de AlexusLab</div>
          </div>

          <div className={`story-prose ${expanded ? 'expanded' : ''}`}>
            <p>
              Empecé en <strong>fisioterapia</strong>, donde entendí que ningún cambio real ocurre sin
              <strong> repetición, proceso y disciplina</strong>.
            </p>

            <p>
              Después monté un <strong>ecommerce</strong> y lo escalé hasta facturar
              <strong> más de un millón de euros</strong>. Ahí aprendí a tomar decisiones con números delante, presión real y riesgo diario.
            </p>

            <blockquote className="pull">
              Lo más caro que aprendí no fue una estrategia.<br />
              Fue entender que sin proceso, ningún número aguanta.
            </blockquote>

            <p>
              Cuando llegué al trading cometí errores como todos: <strong>cuentas reventadas, cuentas fondeadas, rachas buenas y momentos donde tuve que parar</strong>. Lo que cambió todo no fue una estrategia nueva. Fue construir un sistema.
            </p>

            <p>
              Previsión semanal. Riesgo claro. Reglas que no se negocian. Y una forma de trabajar la cabeza, porque en trading tu peor enemigo no suele ser el mercado: <strong>eres tú cuando no tienes estructura</strong>.
            </p>

            <div className="story-divider">· · ·</div>

            <p>
              <strong>AlexusLab nació así.</strong> No es un curso de 30 horas. Es la
              <strong> misma sala</strong> donde yo opero, abierta a un grupo reducido.
              Mismo plan, mismas reglas — y un grupo que no te deja saltártelas.
            </p>
          </div>
        </div>

        <button
          className="story-toggle"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}>
          
          {expanded ? "Mostrar menos" : "Leer historia completa"}
          <span className={`chev ${expanded ? 'up' : ''}`}>↓</span>
        </button>

        <div className="timeline reveal">
          <div className="timeline__head">
            <h4>El camino hasta aquí</h4>
            <div className="meta">FISIO · ECOMMERCE · TRADING</div>
          </div>
          <div className="timeline__grid">
            <div className="timeline__item">
              <div className="photo"><img src="assets/alex-fisio.jpeg" alt="" /></div>
              <div className="label"><span className="yr">Etapa 01</span><span className="where">Disciplina del proceso</span></div>
            </div>
            <div className="timeline__item">
              <div className="photo"><img src="assets/alex-team-dinner.jpeg" alt="" /></div>
              <div className="label"><span className="yr">Etapa 02</span><span className="where">Ambición y presión real</span></div>
            </div>
            <div className="timeline__item">
              <div className="photo"><img src="assets/alex-gym.jpeg" alt="" /></div>
              <div className="label"><span className="yr">Etapa 03</span><span className="where">Ecommerce · +1M€</span></div>
            </div>
            <div className="timeline__item">
              <div className="photo"><img src="assets/alex-suit.jpeg" alt="" /></div>
              <div className="label"><span className="yr">Hoy</span><span className="where">Trading + comunidad</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// =========================================================================
// PRICING — punchier, less feature creep
// =========================================================================
function Pricing({ t }) {
  const monthAvg = (parseFloat(t.priceSemester) / 6).toFixed(2).replace('.', ',');
  const pctMonth = Math.round((1 - parseFloat(t.priceMonth) / parseFloat(t.priceMonthOriginal)) * 100);
  const saving = (parseFloat(t.priceMonth) * 6 - parseFloat(t.priceSemester)).toFixed(0);
  return (
    <section className="section pricing-section" id="precios" data-screen-label="06 Precios">
      <div className="container">
        <div className="pricing-head reveal">
          <div className="eyebrow">{t.offerLabel}</div>
          <h2 className="headline headline--lg" style={{ textAlign: "center", maxWidth: "22ch" }}>
            Entra al precio <span className="it accent" style={{ color: "var(--accent-green)" }}>de lanzamiento.</span>
          </h2>
          <p className="sub" style={{ textAlign: "center", maxWidth: "50ch" }}>
            Precio fundador activo ahora. Cuando termine la oferta, el acceso volverá a su tarifa normal.
          </p>
          <p className="pricing-anchor">
            Una sola mala decisión por FOMO puede costarte más que un mes dentro. Aquí trabajamos precisamente para evitar esas decisiones.
          </p>
        </div>

        <div className="plans reveal-stagger">

          {/* Mensual */}
          <div className="plan">
            <h3 className="plan__name">Acceso <span className="it">mensual</span></h3>
            <p className="plan__sub">Pruébalo un mes. Cancelas cuando quieras.</p>
            <div className="plan__price-row">
              <span className="plan__price num">{t.priceMonth}€</span>
              <span className="plan__period">/ mes</span>
              <span className="plan__crossed num">{t.priceMonthOriginal}€</span>
            </div>
            <div className="plan__save"><span className="arrow">↓</span> Ahorras {pctMonth}% sobre tarifa normal</div>
            <ul className="plan__features">
              <li><span className="check"><Check /></span><span>2 operativas en vivo / semana</span></li>
              <li><span className="check"><Check /></span><span>Clases educativas de Price Action y psicología</span></li>
              <li><span className="check"><Check /></span><span>Llamada grupal de psicología mensual</span></li>
              <li><span className="check"><Check /></span><span>Previsión semanal del mercado + tarea</span></li>
              <li><span className="check"><Check /></span><span>Guía completa para bajar el cortisol y controlar las emociones en el gráfico</span></li>
              <li><span className="check"><Check /></span><span>Acceso al canal privado y a Alex</span></li>
              <li><span className="check"><Check /></span><span>Sin permanencia</span></li>
            </ul>
            <div className="plan__cta">
              <a href={t.linkMonth} target="_blank" rel="noopener" className="btn btn--ghost btn--lg" style={{ border: "1px solid rgba(255,255,255,0.32)", color: "#EEEDEA" }}>
                Entrar — {t.priceMonth}€/mes
                <span className="arrow">→</span>
              </a>
              <span className="meta">Cobro mensual · Cancelas en 1 clic</span>
            </div>
          </div>

          {/* Semestral */}
          <div className="plan plan--featured">
            <div className="plan__ribbon">Recomendado</div>
            <h3 className="plan__name">Acceso <span className="it">semestral</span></h3>
            <p className="plan__sub">El mismo acceso, más barato. 6 meses para construir el proceso.</p>
            <div className="plan__price-row">
              <span className="plan__price num">{t.priceSemester}€</span>
              <span className="plan__period">/ 6 meses</span>
              <span className="plan__crossed num">{t.priceSemesterOriginal}€</span>
            </div>
            <div className="plan__save"><span className="arrow">↓</span> Sale a <b style={{ color: "#fff" }}>{monthAvg}€/mes</b> · Ahorras {saving}€ frente al mensual</div>
            <ul className="plan__features">
              <li><span className="check"><Check /></span><span>2 operativas en vivo / semana</span></li>
              <li><span className="check"><Check /></span><span>Clases educativas de Price Action y psicología</span></li>
              <li><span className="check"><Check /></span><span>Llamada grupal de psicología mensual</span></li>
              <li><span className="check"><Check /></span><span>Previsión semanal del mercado + tarea</span></li>
              <li><span className="check"><Check /></span><span>Guía completa para bajar el cortisol y controlar las emociones en el gráfico</span></li>
              <li><span className="check"><Check /></span><span>Acceso al canal privado y a Alex</span></li>
              <li><span className="check"><Check /></span><span>Precio bloqueado durante 6 meses</span></li>
            </ul>
            <div className="plan__cta">
              <a href={t.linkSemester} target="_blank" rel="noopener" className="btn btn--primary btn--lg">
                Entrar — {t.priceSemester}€ / 6 meses
                <span className="arrow">→</span>
              </a>
              <span className="meta">Pago único · 6 meses de acceso</span>
            </div>
          </div>

        </div>

        <div className="pricing-guarantee">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
            <path d="M8 12l3 3 5-6" />
          </svg>
          <span>
            <strong style={{ color: "#EEEDEA" }}>Cancelación en 1 clic.</strong> Sin permanencias. Te das de baja desde Whop y dejas de pagar al instante.
          </span>
        </div>
      </div>
    </section>);

}

const Check = () =>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12l5 5L20 6" />
  </svg>;


// =========================================================================
// TESTIMONIALS — single-card on mobile (swipeable), grid on desktop
// =========================================================================
function Testimonials() {
  const items = [
  {
    quote: "Tres meses dentro y ya no rompo norma. Por primera vez tengo un plan diario y reglas que respeto.",
    name: "Luis R.", sub: "NQ · Madrid", initials: "LR"
  },
  {
    quote: "Lo que más me ha cambiado es la templanza. Ya no miro el gráfico como si tuviera que hacer algo todo el rato.",
    name: "Raul J.", sub: "ES · Valencia", initials: "RJ"
  },
  {
    quote: "Alex no vende humo. Te enseña a leer el precio y a ejecutar con cabeza.",
    name: "Adrián T.", sub: "NQ · Barcelona", initials: "AT"
  },
  {
    quote: "Me salió a cuenta el primer mes. No por una operación mágica, sino porque dejé de hacer las tonterías que me costaban más que la tarifa.",
    name: "Pablo G.", sub: "ES · Bilbao", initials: "PG"
  }];

  return (
    <section className="section section--paper testimonials" id="testimonios" data-screen-label="07 Testimonios">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <div className="eyebrow">Voces del Lab</div>
          <h2 className="headline headline--lg" style={{ textAlign: "center", maxWidth: "22ch" }}>
            Los que ya están <span className="it">dentro.</span>
          </h2>
          <p className="sub" style={{ textAlign: "center", maxWidth: "54ch" }}>
            Lo que más se repite no son los resultados. Es la calma, la estructura y dejar de hacer tonterías.
          </p>
        </div>
        <div className="testi-grid reveal-stagger">
          {items.map((it, i) =>
          <article className="testi" key={i}>
              <p className="testi__quote">{it.quote}</p>
              <div className="testi__author">
                <div className="testi__avatar">{it.initials}</div>
                <div className="testi__meta">
                  <span className="testi__name">{it.name}</span>
                  <span className="testi__sub">{it.sub}</span>
                </div>
              </div>
            </article>
          )}
        </div>
        <p className="testi-disclaimer">
          Los testimonios reflejan experiencias personales. No prometemos resultados financieros.
        </p>
      </div>
    </section>);

}

// =========================================================================
// FINAL CTA
// =========================================================================
function FinalCTA({ t }) {
  return (
    <section className="section final-cta" data-screen-label="08 CTA final">
      <img className="final-cta__monogram" src="assets/logo-monogram-white.png" alt="" />
      <div className="final-cta__inner reveal">
        <div className="eyebrow">Última llamada</div>
        <h2>
          Deja de <span className="it">improvisar</span><br />
          cada semana.
        </h2>
        <p>
          Entra en una comunidad donde tienes plan, directos, clases, psicología y una forma seria de trabajar el trading.
        </p>
        <div className="final-cta__buttons">
          <a className="btn btn--primary btn--lg" href={t.linkMonth} target="_blank" rel="noopener">
            Entrar a AlexusLab por {t.priceMonth}€/mes
            <span className="arrow">→</span>
          </a>
          <a className="btn btn--ghost btn--lg" href={t.linkSemester} target="_blank" rel="noopener">
            6 meses por {t.priceSemester}€
          </a>
        </div>
        <div className="cta-meta" style={{ justifyContent: "center" }}>
          <span>Acceso inmediato</span>
          <span className="dot"></span>
          <span>Sin permanencia</span>
          <span className="dot"></span>
          <span>Precio fundador activo</span>
        </div>
      </div>
    </section>);

}

// =========================================================================
// INSIDE THE LAB — mock of the platform (desire-build)
// =========================================================================
function InsideLab() {
  return (
    <section className="inside" id="inside" data-screen-label="04b Así se ve por dentro">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <div className="eyebrow">Así se ve por dentro</div>
          <h2 className="headline headline--lg" style={{ textAlign: "center", maxWidth: "24ch" }}>
            Esto es lo que ves al <span className="it">entrar.</span>
          </h2>
          <p className="sub" style={{ textAlign: "center", maxWidth: "56ch", margin: "0 auto" }}>
            No es teoría. Es la sala donde preparo, opero y explico el mercado cada semana.
          </p>
        </div>

        <div className="inside-card reveal">
          <div className="inside-card__chrome">
            <span className="inside-card__dot inside-card__dot--r" />
            <span className="inside-card__dot inside-card__dot--y" />
            <span className="inside-card__dot inside-card__dot--g" />
            <span className="inside-card__title">AlexusLab — sala de trading</span>
            <span className="inside-card__live"><span className="live-dot" /> EN VIVO</span>
          </div>
          <div className="inside-card__body">
            <aside className="inside-card__nav">
              <div className="inside-card__nav-group">PLAN</div>
              <div className="inside-card__nav-item"><span className="h">#</span>previsión-semanal</div>
              <div className="inside-card__nav-item"><span className="h">#</span>directos</div>
              <div className="inside-card__nav-item active"><span className="h">#</span>sala-operaciones</div>
              <div className="inside-card__nav-group">CABEZA</div>
              <div className="inside-card__nav-item"><span className="h">#</span>cortisol</div>
              <div className="inside-card__nav-item"><span className="h">#</span>psicología</div>
              <div className="inside-card__nav-group">GRUPO</div>
              <div className="inside-card__nav-item"><span className="h">#</span>mis-trades</div>
              <div className="inside-card__nav-item"><span className="h">#</span>logros</div>
            </aside>
            <div className="inside-card__stage inside-card__stage--solo">
              <div className="inside-doc">
                <div className="inside-doc__head">
                  <span className="inside-doc__title">Previsión · Semana 21</span>
                  <span className="inside-doc__date">May 18 — May 22</span>
                </div>
                <div className="inside-doc__row">
                  <span className="inside-doc__lbl">SESGO</span>
                  <span className="inside-doc__val">Alcista mientras se respeten <b>21390</b></span>
                </div>
                <div className="inside-doc__row">
                  <span className="inside-doc__lbl">ZONA CLAVE</span>
                  <span className="inside-doc__val"><b>21420 — 21430</b> (demanda miércoles)</span>
                </div>
                <div className="inside-doc__row">
                  <span className="inside-doc__lbl">ESCENARIO A</span>
                  <span className="inside-doc__val">Reacción en zona, continuación a <b>21470</b></span>
                </div>
                <div className="inside-doc__row">
                  <span className="inside-doc__lbl">ESCENARIO B</span>
                  <span className="inside-doc__val">Pérdida de 21390 → evitar largos, esperar 21340</span>
                </div>
                <div className="inside-doc__row">
                  <span className="inside-doc__lbl">RIESGO</span>
                  <span className="inside-doc__val"><b>0,5%</b>/trade · stop día <b>1%</b> · máx 3 trades</span>
                </div>
                <div className="inside-doc__row">
                  <span className="inside-doc__lbl">TAREA</span>
                  <span className="inside-doc__val">Marcar las 3 zonas en NQ y ES · entregar antes del lunes</span>
                </div>
              </div>
              <div className="inside-card__chart">
                <div className="inside-card__chart-head">
                  <span><b>NQ</b> 1H · zonas y escenarios</span>
                  <span className="yellow">TP · 21470</span>
                </div>
                <svg viewBox="0 0 320 130" className="inside-card__chart-svg" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="inside-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="82" width="320" height="14" fill="rgba(127,176,105,0.10)" />
                  <line x1="0" y1="32" x2="320" y2="32" stroke="rgba(232,197,71,0.55)" strokeDasharray="3 3" strokeWidth="1" />
                  <line x1="0" y1="108" x2="320" y2="108" stroke="rgba(178,107,92,0.55)" strokeDasharray="3 3" strokeWidth="1" />
                  <path d="M0 100 L24 96 L48 90 L72 88 L96 95 L120 84 L144 78 L168 82 L192 68 L216 60 L240 54 L264 50 L288 42 L312 36"
                  stroke="#EEEDEA" strokeWidth="1.6" fill="none" opacity="0.85" />
                  <path d="M0 100 L24 96 L48 90 L72 88 L96 95 L120 84 L144 78 L168 82 L192 68 L216 60 L240 54 L264 50 L288 42 L312 36 L320 36 L320 130 L0 130 Z"
                  fill="url(#inside-fill)" />
                  <text x="6" y="28" fontSize="9" fill="var(--accent-yellow)" fontFamily="var(--font-mono)">TP · 21470</text>
                  <text x="6" y="90" fontSize="9" fill="var(--accent-green)" fontFamily="var(--font-mono)">ZONA</text>
                  <text x="6" y="122" fontSize="9" fill="var(--signal-down)" fontFamily="var(--font-mono)">SL · 21390</text>
                </svg>
              </div>
            </div>
          </div>
          <div className="inside-card__pulse" aria-hidden="true"></div>
        </div>

        <p className="inside-note reveal">
          Verás planes, escenarios, directos, revisiones, tareas y conversaciones reales de trading. El objetivo no es copiar entradas — es entender por qué se toman.
        </p>

        <div className="inside-cta reveal">
          <a className="btn btn--primary btn--lg" href="#precios">
            Entrar a la comunidad
            <span className="arrow">→</span>
          </a>
          <span className="meta-line">Acceso inmediato · Sin permanencia · Cancelas cuando quieras</span>
        </div>
      </div>
    </section>);

}

// =========================================================================
// FAQ — objection handling
// =========================================================================
function FAQ() {
  const items = [
  {
    q: "¿Tengo que saber operar para entrar?",
    a: "No necesitas ser rentable, pero sí tener interés real por aprender. Si partes de cero absoluto, podrás seguir las clases, aunque el mayor valor lo sacan traders que ya han tocado gráficos y quieren estructura."
  },
  {
    q: "¿Qué mercados operamos?",
    a: "Principalmente índices como NQ y ES, aunque muchos conceptos de Price Action, riesgo y psicología son aplicables a otros mercados."
  },
  {
    q: "¿A qué hora son las operativas en directo?",
    a: "Normalmente durante la sesión de Nueva York. Empezamos a las 9:15 AM hora de NY. Si no puedes asistir, podrás ver el contenido y seguir el plan dentro de la comunidad."
  },
  {
    q: "¿Esto son señales?",
    a: "No. Puedes ver mis escenarios y operativas, pero el objetivo no es que copies. El objetivo es que entiendas el porqué de cada decisión y desarrolles criterio propio."
  },
  {
    q: "¿Hay permanencia?",
    a: "No. Puedes cancelar en 1 clic desde Whop cuando quieras."
  },
  {
    q: "¿Y si entro y no es para mí?",
    a: "Puedes cancelar cuando quieras. No hay permanencia. Entras, lo pruebas y si no encaja contigo, te das de baja desde tu cuenta de Whop en 1 clic."
  },
  {
    q: "¿Cuándo sube de precio?",
    a: "El precio actual es de lanzamiento. Cuando finalice la oferta, el acceso volverá a la tarifa normal de 79€/mes. Quien entra ahora, queda bloqueado al precio fundador todo el tiempo que mantenga la suscripción."
  },
  {
    q: "¿Prometes resultados?",
    a: "No. En trading no existen garantías. Lo que sí te damos es estructura, proceso, educación, acompañamiento y herramientas para tomar mejores decisiones."
  }];

  const [open, setOpen] = useState(-1);
  return (
    <section className="section faq-section" id="faq" data-screen-label="08 FAQ">
      <div className="container container--narrow">
        <div className="section-head section-head--center reveal">
          <div className="eyebrow">Dudas frecuentes</div>
          <h2 className="headline headline--lg" style={{ textAlign: "center", maxWidth: "22ch" }}>
            Antes de <span className="it">entrar.</span>
          </h2>
        </div>
        <div className="faq reveal">
          {items.map((it, i) =>
          <div key={i} className={`faq__item ${open === i ? 'open' : ''}`}>
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{it.q}</span>
                <span className="faq__chev">+</span>
              </button>
              <div className="faq__a"><p>{it.a}</p></div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// =========================================================================
// NAV + FOOTER
// =========================================================================
function Nav({ t }) {
  return (
    <header className="nav">
      <a href="#top" aria-label="Inicio">
        <img className="nav__logo" src="assets/logo-wordmark-white.png" alt="AlexusLab" />
      </a>
      <div className="nav__right">
        <a className="nav__cta" href={t.linkMonth} target="_blank" rel="noopener">Entrar</a>
      </div>
    </header>);

}

function Footer() {
  return (
    <footer className="footer">
      <img className="footer__logo" src="assets/logo-wordmark-white.png" alt="AlexusLab" />
      <div className="footer__legal">
        <span>© 2026 AlexusLab</span>
        <a href="#">Aviso legal</a>
        <a href="#">Privacidad</a>
        <a href="mailto:alexmorenoantunez97@gmail.com">alexmorenoantunez97@gmail.com</a>
      </div>
      <div style={{ fontSize: 11, maxWidth: "36ch", color: "var(--ink-500)" }}>
        El trading conlleva riesgo. Resultados pasados no garantizan resultados futuros. Nada de lo aquí publicado constituye asesoramiento financiero.
      </div>
    </footer>);

}

// =========================================================================
// MOBILE STICKY CTA BAR
// =========================================================================
function MobileCTABar({ t }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className={`mobile-cta ${visible ? 'in' : ''}`} aria-hidden={!visible}>
      <div className="mobile-cta__price">
        <span className="num">{t.priceMonth}€</span>
        <span className="per">/mes</span>
        <span className="strike num">{t.priceMonthOriginal}€</span>
      </div>
      <a className="mobile-cta__btn" href={t.linkMonth} target="_blank" rel="noopener">
        Entrar <span className="arrow">→</span>
      </a>
    </div>);

}

// =========================================================================
// TWEAKS PANEL
// =========================================================================
function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Hero" />
      <TweakSelect label="Variante de hero" value={t.heroVariant}
      options={[
      { value: "narrative", label: "Narrativo (calmado)" },
      { value: "direct", label: "Directo (comercial)" },
      { value: "authority", label: "Autoridad (cortante)" }]
      }
      onChange={(v) => setTweak('heroVariant', v)} />

      <TweakText label="Etiqueta de oferta" value={t.offerLabel}
      onChange={(v) => setTweak('offerLabel', v)} />

      <TweakSection label="Precios" />
      <TweakText label="Precio mensual (€)" value={t.priceMonth}
      onChange={(v) => setTweak('priceMonth', v)} />
      <TweakText label="Mensual original (€)" value={t.priceMonthOriginal}
      onChange={(v) => setTweak('priceMonthOriginal', v)} />
      <TweakText label="Precio 6 meses (€)" value={t.priceSemester}
      onChange={(v) => setTweak('priceSemester', v)} />
      <TweakText label="6 meses original (€)" value={t.priceSemesterOriginal}
      onChange={(v) => setTweak('priceSemesterOriginal', v)} />

      <TweakSection label="Links Whop" />
      <TweakText label="Link mensual" value={t.linkMonth}
      onChange={(v) => setTweak('linkMonth', v)} />
      <TweakText label="Link 6 meses" value={t.linkSemester}
      onChange={(v) => setTweak('linkSemester', v)} />
    </TweaksPanel>);

}

// =========================================================================
// APP
// =========================================================================
function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// =========================================================================
// TOP BANNER — thin sticky bar above nav with the offer
// =========================================================================
function TopBanner({ t }) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;
  return (
    <div className="top-banner" role="banner">
      <span className="top-banner__pulse" aria-hidden="true" />
      <span className="top-banner__text">
        <b>Oferta de lanzamiento</b>
        <span className="sep">·</span>
        <span className="price">{t.priceMonth}€/mes</span>
        <span className="strike num">{t.priceMonthOriginal}€</span>
      </span>
      <a href={t.linkMonth} target="_blank" rel="noopener" className="top-banner__cta">
        Entrar <span className="arrow">→</span>
      </a>
      <button className="top-banner__close" onClick={() => setClosed(true)} aria-label="Cerrar">×</button>
    </div>);

}

// =========================================================================
// LIVE TOAST — floating activity notifications, give the page a heartbeat
// =========================================================================
function LiveToast() {
  const items = [
  { kind: "live",  text: <>Próxima operativa en vivo: <b>martes 9:15 AM (NY)</b></> },
  { kind: "alert", text: <>Precio fundador en vigor: <b>49,99 €/mes</b></> },
  { kind: "live",  text: <>Alex publicando la previsión en <b>#previsión-semanal</b></> }];

  const [idx, setIdx] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [armed, setArmed] = useState(false);

  // Only arm toasts after user has scrolled past the hero — less pressure on entry
  useEffect(() => {
    if (armed) return;
    const check = () => {
      if (window.scrollY > 700) setArmed(true);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, [armed]);

  useEffect(() => {
    if (!armed || dismissed) return;
    let mounted = true;
    let next, hide;
    const cycle = (i) => {
      if (!mounted) return;
      if (i >= items.length) return; // Stop after one full pass
      setIdx(i);
      setVisible(true);
      hide = setTimeout(() => {
        if (!mounted) return;
        setVisible(false);
        next = setTimeout(() => cycle(i + 1), 2200);
      }, 6000);
    };
    const start = setTimeout(() => cycle(0), 1500);
    return () => {mounted = false;clearTimeout(start);clearTimeout(next);clearTimeout(hide);};
  }, [armed, dismissed]);

  if (dismissed || idx < 0) return null;
  const item = items[idx];
  return (
    <div className={`live-toast live-toast--${item.kind} ${visible ? 'in' : ''}`} role="status" aria-live="polite">
      <span className="live-toast__icon" aria-hidden="true">
        {item.kind === "join" &&
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>
        }
        {item.kind === "live" && <span className="live-toast__dot" />}
        {item.kind === "alert" &&
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01" /><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>
        }
      </span>
      <span className="live-toast__text">{item.text}</span>
      <button className="live-toast__close" onClick={() => setDismissed(true)} aria-label="Cerrar">×</button>
    </div>);

}

// =========================================================================
// ESTO ES PARA TI — audience identification block
// =========================================================================
function EstoEsParaTi() {
  const bullets = [
  "Sabes analizar, pero en directo dudas o entras tarde.",
  "Vienes de cursos que te dejaron más confundido que antes.",
  "Has perdido cuentas por impulsividad, FOMO o querer recuperar.",
  "Te falta un plan semanal claro antes de sentarte frente al gráfico.",
  "Quieres dejar de depender de motivación y empezar a operar con reglas.",
  "Necesitas una comunidad que te exija proceso, no solo resultados."];

  return (
    <section className="section section--paper paratip-section" id="para-ti" data-screen-label="02 Esto es para ti">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Identifícate</div>
          <h2 className="headline headline--lg">
            Esto es para ti <span className="it">si…</span>
          </h2>
        </div>
        <ul className="paratip-list reveal-stagger">
          {bullets.map((line, i) =>
          <li key={i} className="paratip-item">
            <span className="paratip-item__num">{String(i + 1).padStart(2, '0')}</span>
            <span>{line}</span>
          </li>)}
        </ul>
        <p className="paratip-kicker reveal">
          Si te reconoces en <strong>2 o más puntos</strong>, AlexusLab probablemente te puede ayudar.
        </p>
        <div className="paratip-cta reveal">
          <a className="btn btn--primary btn--lg" href="#precios">
            QUIERO ENTRAR
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>);

}

// =========================================================================
// SISTEMA SEMANAL — the weekly process inside AlexusLab
// =========================================================================
function SistemaSemanal() {
  const steps = [
  { when: "DOM / LUN", title: "Previsión", desc: "Marcamos contexto, escenarios y zonas importantes antes de que empiece la semana." },
  { when: "DURANTE LA SEMANA", title: "Operativa en vivo", desc: "Aplicamos la lectura al gráfico real, con paciencia, gestión y explicación de cada decisión." },
  { when: "CLASES", title: "Price Action + Psicología", desc: "Trabajamos tanto la lectura del mercado como el control emocional que necesitas para ejecutarla." },
  { when: "TAREA SEMANAL", title: "Práctica concreta", desc: "Cada semana tienes algo concreto que practicar para no quedarte solo mirando contenido." },
  { when: "REVISIÓN", title: "Comunidad y repaso", desc: "Compartes dudas, operaciones, errores y mejoras con traders que están en el mismo proceso." }];

  return (
    <section className="section section--paper sistema-section" id="sistema" data-screen-label="04a Sistema semanal">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <div className="eyebrow">El sistema AlexusLab</div>
          <h2 className="headline headline--lg" style={{ textAlign: "center", maxWidth: "22ch" }}>
            El sistema semanal que <span className="it">seguimos dentro.</span>
          </h2>
          <p className="sub" style={{ textAlign: "center", maxWidth: "50ch" }}>
            No vienes a consumir contenido. Vienes a <strong>construir proceso</strong>.
          </p>
        </div>
        <ol className="sistema-list reveal-stagger">
          {steps.map((s, i) =>
          <li key={i} className="sistema-step">
              <div className="sistema-step__rail">
                <span className="sistema-step__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="sistema-step__line" aria-hidden="true" />
              </div>
              <div className="sistema-step__body">
                <div className="sistema-step__when">{s.when}</div>
                <h3 className="sistema-step__title">{s.title}</h3>
                <p className="sistema-step__desc">{s.desc}</p>
              </div>
            </li>)}
        </ol>
      </div>
    </section>);

}

// =========================================================================
// QUE NO ES — expectation framing
// =========================================================================
function QueNoEs() {
  const no = [
  "Señales para copiar sin pensar.",
  "Hacerte rico en una semana.",
  "Payouts para motivarte artificialmente.",
  "Operar todos los días por obligación.",
  "Una estrategia mágica sin trabajo."];

  const si = [
  "Entender el precio.",
  "Construir criterio propio.",
  "Tener una rutina semanal.",
  "Aprender a esperar.",
  "Gestionar riesgo y emociones.",
  "Rodearte de traders que trabajan el proceso."];

  const Cross = () =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>;

  const Check = () =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>;

  return (
    <section className="section noes-section" id="no-es" data-screen-label="07a Lo que NO es">
      <div className="container">
        <div className="section-head section-head--center reveal">
          <div className="eyebrow">Expectativas claras</div>
          <h2 className="headline headline--lg" style={{ textAlign: "center", maxWidth: "24ch" }}>
            Esto <span className="it">no es</span> otro grupo de señales.
          </h2>
        </div>
        <div className="noes reveal">
          <div className="noes__col noes__col--no">
            <div className="noes__label">No es para ti si buscas…</div>
            <ul>
              {no.map((l, i) =>
              <li key={i}><span className="icon"><Cross /></span><span>{l}</span></li>)}
            </ul>
          </div>
          <div className="noes__col noes__col--si">
            <div className="noes__label">Sí es para ti si quieres…</div>
            <ul>
              {si.map((l, i) =>
              <li key={i}><span className="icon"><Check /></span><span>{l}</span></li>)}
            </ul>
          </div>
        </div>
        <p className="noes-kicker reveal">
          AlexusLab no está hecho para prometerte resultados.<br />
          Está hecho para ayudarte a <strong>dejar de improvisar</strong>.
        </p>
      </div>
    </section>);

}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();
  return (
    <div id="top" className="page">
      <TopBanner t={t} />
      <ScrollProgress />
      <Nav t={t} />
      <Hero t={t} />
      <LiveTicker />
      <EstoEsParaTi />
      <Compare />
      <Features />
      <SistemaSemanal />
      <InsideLab />
      <AlexStory />
      <QueNoEs />
      <Pricing t={t} />
      <Testimonials />
      <FAQ />
      <FinalCTA t={t} />
      <Footer />
      <MobileCTABar t={t} />
      <LiveToast />
      <Tweaks t={t} setTweak={setTweak} />
    </div>);

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);