// app.jsx — AlexusLab platform-first landing.
// Infra + Hero + composition. Content sections live in sections.jsx,
// platform/device mockups in mockups.jsx. Top-level functions are global.

const { useState, useEffect, useRef } = React;

// =========================================================================
// CONFIG — tweakable from the panel
// =========================================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "priceMonth": "49.99",
  "priceMonthOriginal": "79",
  "priceSemester": "249",
  "priceSemesterOriginal": "300",
  "priceCourse": "997",
  "priceCourseOriginal": "1497",
  "linkMonth": "https://whop.com/checkout/plan_TDJCSpUMg5ddK",
  "linkSemester": "https://whop.com/checkout/plan_1awGPEaPXlNfs",
  "linkCourse": "https://calendly.com/alexmoreno/15min",
  "platformUrl": "https://app.alexus-lab.com/",
  "offerLabel": "Oferta de lanzamiento"
}/*EDITMODE-END*/;

// =========================================================================
// SCROLL PROGRESS
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
// TOP BANNER
// =========================================================================
function TopBanner({ t }) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;
  return (
    <div className="top-banner" role="banner">
      <span className="top-banner__pulse" aria-hidden="true" />
      <span className="top-banner__text">
        <b>{t.offerLabel}</b>
        <span className="sep">·</span>
        <span className="price">{t.priceMonth}€/mes</span>
        <span className="strike num">antes {t.priceMonthOriginal}€</span>
      </span>
      <a href={t.linkMonth} target="_blank" rel="noopener" className="top-banner__cta">
        Entrar <span className="arrow">→</span>
      </a>
      <button className="top-banner__close" onClick={() => setClosed(true)} aria-label="Cerrar">×</button>
    </div>
  );
}

// =========================================================================
// NAV
// =========================================================================
function Nav({ t }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#plataforma", label: "Plataforma" },
    { href: "#comunidad", label: "Comunidad" },
    { href: "#directos", label: "Directos" },
    { href: "#precios", label: "Precio" },
    { href: "#faq", label: "FAQ" }
  ];
  return (
    <header className="nav">
      <a href="#top" aria-label="Inicio" className="nav__brand">
        <img className="nav__logo" src="assets/logo-wordmark-black.png" alt="AlexusLab" />
      </a>
      <nav className="nav__links">
        {links.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}
      </nav>
      <div className="nav__right">
        <a className="nav__login" href={t.platformUrl} target="_blank" rel="noopener">Acceder</a>
        <a className="nav__cta" href={t.linkMonth} target="_blank" rel="noopener">Entrar a AlexusLab</a>
        <button className="nav__burger" onClick={() => setOpen(o => !o)} aria-label="Menú">
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="nav__drawer">
          {links.map((l, i) => <a key={i} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
          <a className="nav__drawer-login" href={t.platformUrl} target="_blank" rel="noopener" onClick={() => setOpen(false)}>Acceder a la plataforma</a>
          <a className="nav__drawer-cta" href={t.linkMonth} target="_blank" rel="noopener" onClick={() => setOpen(false)}>Entrar a AlexusLab →</a>
        </div>
      )}
    </header>
  );
}

// =========================================================================
// HERO — platform first
// =========================================================================
function Hero({ t }) {
  return (
    <section className="hero hero--platform" data-screen-label="01 Hero">
      <div className="hero--platform__glow" aria-hidden="true" />
      <div className="hero__grid">
        <div className="hero__copy">
          <div className="hero__eyebrow eyebrow">
            <span className="live-dot" /> La comunidad privada de trading
          </div>
          <h1 className="headline headline--xl hero__h1">
            Lleva tu trading al<br />
            <span className="it accent">siguiente nivel.</span>
          </h1>
          <p className="hero__sub">
            Una comunidad privada con plataforma de proceso, directos de operativa y seguimiento semanal. Deja de operar en solitario y hazlo con estructura.
          </p>
          <div className="hero__cta-row">
            <a className="btn btn--primary btn--lg" href={t.linkMonth} target="_blank" rel="noopener">
              Entrar a AlexusLab<span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost btn--lg" href="#plataforma">Ver qué incluye</a>
          </div>
          <p className="hero__micro">No es una comunidad de señales. Es un sistema para dejar de improvisar.</p>
          <a className="hero__login" href={t.platformUrl} target="_blank" rel="noopener">
            ¿Ya eres miembro? Acceder a la plataforma <span className="arrow">→</span>
          </a>
        </div>

        <div className="hero__visual hero__visual--phone">
          <PhoneFrame><PlatformPhone /></PhoneFrame>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// FAQ
// =========================================================================
function FAQ() {
  const items = [
    { q: "¿AlexusLab es una comunidad de señales?", a: "No. No damos señales para copiar. Te damos una plataforma, un proceso semanal y acompañamiento para que entiendas el porqué de cada decisión y desarrolles criterio propio." },
    { q: "¿La plataforma está incluida?", a: "Sí. El acceso incluye la plataforma privada completa: plan semanal, checklist pre-market, control de riesgo, registro emocional y diagnóstico de errores." },
    { q: "¿Puedo usar la plataforma desde el móvil?", a: "Sí. Está pensada mobile-first: puedes preparar tu semana, pasar el checklist y revisar tu operativa desde el teléfono." },
    { q: "¿Qué pasa si dejo de pagar?", a: "Pierdes el acceso a la plataforma y al Discord privado. No hay permanencia: puedes volver a entrar cuando quieras." },
    { q: "¿Necesito experiencia previa?", a: "No necesitas ser rentable, pero sí tener interés real por aprender. Si partes de cero podrás seguir el contenido; el mayor valor lo sacan traders que ya han tocado gráficos y quieren estructura." },
    { q: "¿Dónde se hacen los directos?", a: "Durante la sesión de Nueva York (empezamos a las 9:15 AM hora de NY). Si no puedes asistir en directo, sigues el plan y el contenido dentro de la plataforma y el Discord." },
    { q: "¿Cómo accedo a Discord?", a: "Al suscribirte recibes acceso inmediato a la plataforma y al Discord privado de la comunidad." },
    { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Te das de baja en 1 clic desde Whop, sin permanencias ni llamadas." },
    { q: "¿Esto me garantiza ser rentable?", a: "No. AlexusLab no promete rentabilidad ni resultados garantizados. Te ofrece estructura, acompañamiento, educación y herramientas para mejorar tu proceso como trader." }
  ];
  const [open, setOpen] = useState(-1);
  return (
    <section className="section faq-section" id="faq" data-screen-label="12 FAQ">
      <div className="container container--narrow">
        <div className="section-head section-head--center reveal">
          <div className="eyebrow">Dudas frecuentes</div>
          <h2 className="headline headline--lg" style={{ textAlign: "center", maxWidth: "22ch" }}>
            Antes de <span className="it">entrar.</span>
          </h2>
        </div>
        <div className="faq reveal">
          {items.map((it, i) => (
            <div key={i} className={`faq__item ${open === i ? 'open' : ''}`}>
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{it.q}</span>
                <span className="faq__chev">+</span>
              </button>
              <div className="faq__a"><p>{it.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// FOOTER
// =========================================================================
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
      <div style={{ fontSize: 11, maxWidth: "40ch", color: "var(--ink-500)" }}>
        El trading conlleva riesgo. Resultados pasados no garantizan resultados futuros. Nada de lo aquí publicado constituye asesoramiento financiero.
      </div>
    </footer>
  );
}

// =========================================================================
// MOBILE STICKY CTA
// =========================================================================
function MobileCTABar({ t }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
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
        Entrar a AlexusLab <span className="arrow">→</span>
      </a>
    </div>
  );
}

// =========================================================================
// LIVE TOAST — armed after scroll, one calm pass
// =========================================================================
function LiveToast() {
  const items = [
    { kind: "live", text: <>Próximo directo de operativa: <b>martes 9:15 AM (NY)</b></> },
    { kind: "alert", text: <>{TWEAK_DEFAULTS.offerLabel} activa: <b>plataforma + comunidad</b></> },
    { kind: "live", text: <>Nuevo plan publicado en <b>#previsión-semanal</b></> }
  ];
  const [idx, setIdx] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (armed) return;
    const check = () => { if (window.scrollY > 800) setArmed(true); };
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, [armed]);
  useEffect(() => {
    if (!armed || dismissed) return;
    let mounted = true; let next, hide;
    const cycle = (i) => {
      if (!mounted || i >= items.length) return;
      setIdx(i); setVisible(true);
      hide = setTimeout(() => {
        if (!mounted) return;
        setVisible(false);
        next = setTimeout(() => cycle(i + 1), 2400);
      }, 6000);
    };
    const start = setTimeout(() => cycle(0), 1500);
    return () => { mounted = false; clearTimeout(start); clearTimeout(next); clearTimeout(hide); };
  }, [armed, dismissed]);
  if (dismissed || idx < 0) return null;
  const item = items[idx];
  return (
    <div className={`live-toast live-toast--${item.kind} ${visible ? 'in' : ''}`} role="status" aria-live="polite">
      <span className="live-toast__icon" aria-hidden="true">
        {item.kind === "live" && <span className="live-toast__dot" />}
        {item.kind === "alert" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01" /><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>}
      </span>
      <span className="live-toast__text">{item.text}</span>
      <button className="live-toast__close" onClick={() => setDismissed(true)} aria-label="Cerrar">×</button>
    </div>
  );
}

// =========================================================================
// TWEAKS
// =========================================================================
function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection label="Oferta" />
      <TweakText label="Etiqueta de oferta" value={t.offerLabel} onChange={(v) => setTweak('offerLabel', v)} />
      <TweakSection label="Precios" />
      <TweakText label="Precio mensual (€)" value={t.priceMonth} onChange={(v) => setTweak('priceMonth', v)} />
      <TweakText label="Mensual original (€)" value={t.priceMonthOriginal} onChange={(v) => setTweak('priceMonthOriginal', v)} />
      <TweakText label="Precio 6 meses (€)" value={t.priceSemester} onChange={(v) => setTweak('priceSemester', v)} />
      <TweakText label="6 meses original (€)" value={t.priceSemesterOriginal} onChange={(v) => setTweak('priceSemesterOriginal', v)} />
      <TweakText label="Precio curso (€)" value={t.priceCourse} onChange={(v) => setTweak('priceCourse', v)} />
      <TweakText label="Curso original (€)" value={t.priceCourseOriginal} onChange={(v) => setTweak('priceCourseOriginal', v)} />
      <TweakSection label="Links Whop" />
      <TweakText label="Link mensual" value={t.linkMonth} onChange={(v) => setTweak('linkMonth', v)} />
      <TweakText label="Link 6 meses" value={t.linkSemester} onChange={(v) => setTweak('linkSemester', v)} />
      <TweakText label="Link agendar llamada (curso)" value={t.linkCourse} onChange={(v) => setTweak('linkCourse', v)} />
      <TweakText label="URL plataforma (login)" value={t.platformUrl} onChange={(v) => setTweak('platformUrl', v)} />
    </TweaksPanel>
  );
}

// =========================================================================
// REVEAL ON SCROLL
// =========================================================================
function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// =========================================================================
// APP
// =========================================================================
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();
  return (
    <div id="top" className="page">
      <ScrollProgress />
      <Nav t={t} />
      <Hero t={t} />
      <ValueBar />
      <Problem />
      <Solution t={t} />
      <PlatformSection t={t} />
      <Pricing t={t} />
      <Community />
      <Directos />
      <Incluye t={t} />
      <ParaQuien />
      <Reviews />
      <FAQ />
      <FinalCTA t={t} />
      <Footer />
      <MobileCTABar t={t} />
      <LiveToast />
      <Tweaks t={t} setTweak={setTweak} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
