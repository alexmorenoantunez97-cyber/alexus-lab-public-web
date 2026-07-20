// sections.jsx — Content sections for the platform-first AlexusLab landing.
// Uses globals from mockups.jsx (PFIcon, PlatformDesktop, PlatformPhone, BrowserFrame, PhoneFrame).

// ---------- Small shared bits ---------------------------------------------
// CountUp — anima cifras tipo "25+" al entrar en viewport; texto no numérico queda tal cual.
function CountUp({ value }) {
  const m = /^(\d+)(.*)$/.exec(String(value).trim());
  const ref = React.useRef(null);
  const [n, setN] = React.useState(m ? 0 : null);
  React.useEffect(() => {
    if (!m || !ref.current) return;
    const target = parseInt(m[1], 10);
    let raf, started = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started) return;
      started = true;
      const t0 = performance.now(), dur = 1400;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  if (!m) return <b ref={ref}>{value}</b>;
  return <b ref={ref}>{n}{m[2]}</b>;
}
window.CountUp = CountUp;

function CTAMicro({ children }) {
  return <span className="cta-micro">{children}</span>;
}

function SectionHead({ eyebrow, title, sub, center }) {
  return (
    <div className={`section-head ${center ? 'section-head--center' : ''} reveal`}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="headline headline--lg" style={center ? { textAlign: "center", maxWidth: "24ch" } : null}>{title}</h2>
      {sub && <p className="sub" style={center ? { textAlign: "center", maxWidth: "54ch" } : null}>{sub}</p>}
    </div>
  );
}

// ---------- 2. Value bar (4 badges) ---------------------------------------
function ValueBar() {
  const items = [
    { icon: "grid", label: "Plataforma privada incluida" },
    { icon: "discord", label: "Comunidad activa en Discord" },
    { icon: "play", label: "Directos y análisis" },
    { icon: "calendar", label: "Sistema semanal de mejora" }
  ];
  return (
    <section className="valuebar">
      <div className="valuebar__inner">
        {items.map((it, i) => (
          <div className="valuebar__item reveal" key={i}>
            <span className="valuebar__ic"><PFIcon name={it.icon} size={18} /></span>
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------- 3. Problem -----------------------------------------------------
function Problem() {
  const cards = [
    "Entras sin un plan claro.",
    "Mueves el stop por miedo.",
    "Operas días que deberías evitar.",
    "Repites errores y no los detectas.",
    "No sabes qué trabajar cada semana.",
    "Te aíslas frente al gráfico."
  ];
  return (
    <section className="section problem-section" id="problema" data-screen-label="03 Problema">
      <div className="container">
        <SectionHead
          eyebrow="El problema"
          title={<>El problema no es solo tu análisis. Es tu falta de <span className="it">estructura.</span></>}
        />
        <div className="problem-grid reveal-stagger">
          {cards.map((c, i) => (
            <div className="problem-card" key={i}>
              <span className="problem-card__x"><PFIcon name="bolt" size={15} /></span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 4. Solution (3 blocks) ----------------------------------------
function Solution({ t }) {
  const blocks = [
    { n: "01", icon: "calendar", title: "Preparación semanal", desc: "Defines el contexto de la semana, tu riesgo máximo, los días operables y el foco principal de mejora." },
    { n: "02", icon: "check", title: "Checklist pre-operativa", desc: "Antes de operar, validas si estás en condiciones reales de entrar al mercado." },
    { n: "03", icon: "scan", title: "Revisión post-operativa", desc: "Después de operar, detectas errores, emociones, patrones repetidos y puntos concretos a mejorar." }
  ];
  return (
    <section className="section section--paper solution-section" id="solucion" data-screen-label="04 Solución">
      <div className="container">
        <SectionHead
          center
          eyebrow="La solución"
          title={<>Un proceso para <span className="it">preparar, ejecutar y revisar</span> tu operativa.</>}
        />
        <div className="solution-grid reveal-stagger">
          {blocks.map((b, i) => (
            <div className="solution-card" key={i}>
              <div className="solution-card__top">
                <span className="solution-card__ic"><PFIcon name={b.icon} size={20} /></span>
                <span className="solution-card__n">{b.n}</span>
              </div>
              <h3 className="solution-card__title">{b.title}</h3>
              <p className="solution-card__desc">{b.desc}</p>
            </div>
          ))}
        </div>
        <div className="section-cta reveal">
          <a className="btn btn--primary btn--lg" href="#precios">
            Quiero operar con estructura<span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- 4b. Quién soy ---------------------------------------------------
function QuienSoy({ t }) {
  return (
    <section className="section quiensoy-section" id="quien-soy" data-screen-label="04b Quién soy">
      <div className="container quiensoy-grid">
        <div className="quiensoy-photo reveal">
          <img src="assets/alex-crossed-arms.jpeg" alt="Alex Moreno, fundador de AlexusLab" />
        </div>
        <div className="quiensoy-copy reveal">
          <div className="eyebrow">Quién te acompaña</div>
          <h2 className="headline headline--lg">Soy Alex, y esto no es <span className="it">teoría.</span></h2>
          <p className="sub">
            Llevo años operando NQ y ES en directo, cometiendo los mismos errores que cualquiera — y construyendo, con el tiempo, un proceso que de verdad sostiene. AlexusLab es esa misma estructura, abierta a un grupo reducido.
          </p>
          <div className="quiensoy-stats">
            <div><b>{t.statFondeos}</b><span>Miembros fondeados</span></div>
            <div><b>{t.statRetiros}</b><span>Así nos definen</span></div>
            <div><b>{t.statMiembros}</b><span>Miembros activos</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- 5. Platform (the star) ----------------------------------------
function PlatformSection({ t }) {
  const features = [
    { icon: "calendar", label: "Plan semanal: pilar y reglas" },
    { icon: "check", label: "Check-in diario de proceso" },
    { icon: "heart", label: "Diario emocional ante el gráfico" },
    { icon: "wave", label: "Evolución psicológica (no PnL)" },
    { icon: "scan", label: "Diagnóstico de patrones repetidos" },
    { icon: "shield", label: "Protocolos de intervención" },
    { icon: "bolt", label: "Hoja anti-liadas" },
    { icon: "discord", label: "Conectada a la comunidad" }
  ];
  return (
    <section className="section platform-section" id="plataforma" data-screen-label="05 Plataforma">
      <div className="platform-section__glow" aria-hidden="true" />
      <div className="container">
        <SectionHead
          center
          eyebrow="La plataforma"
          title={<>La plataforma privada de <span className="it">AlexusLab.</span></>}
          sub="No es un dashboard de PnL. Es un dashboard de proceso: tu plan semanal, tu check-in diario y tu evolución psicológica frente al gráfico."
        />

        <div className="platform-show reveal">
          <BrowserFrame>
            <PlatformDesktop />
          </BrowserFrame>
          <div className="platform-show__phone">
            <PhoneFrame>
              <PlatformPhone />
            </PhoneFrame>
          </div>
        </div>

        <div className="platform-feats reveal-stagger">
          {features.map((f, i) => (
            <div className="platform-feat" key={i}>
              <span className="platform-feat__ic"><PFIcon name={f.icon} size={17} /></span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        <div className="section-cta reveal">
          <a className="btn btn--primary btn--lg" href={t.linkMonth} target="_blank" rel="noopener">
            Entrar a la plataforma<span className="arrow">→</span>
          </a>
          <a className="platform-login" href={t.platformUrl} target="_blank" rel="noopener">
            <PFIcon name="lock" size={13} /> ¿Ya eres miembro? Acceder a app.alexus-lab.com
          </a>
          <CTAMicro>Acceso inmediato · Sin permanencia · Cancelas cuando quieras</CTAMicro>
        </div>
      </div>
    </section>
  );
}

// ---------- 5b. Resultados + prueba social (WhatsApp) ---------------------
function Resultados({ t }) {
  const shots = [
    { src: "assets/proof-2.png", cap: "Payout de 3.000$ — Tradeify" },
    { src: "assets/proof-6.png", cap: "Verificación superada — FTMO" },
    { src: "assets/proof-8.png", cap: "Cuenta fondeada 50K — Lucid Trading" },
    { src: "assets/proof-9.png", cap: "Payout de 1.200$ — TickTick Trader" },
    { src: "assets/proof-7.png", cap: "Funded Trader Certificate — Orion" },
    { src: "assets/proof-12.png", cap: "Payout de 1.500$ — Topstep" }
  ];
  return (
    <section className="section results-section" id="resultados" data-screen-label="05b Resultados">
      <div className="container">
        <SectionHead center eyebrow="Resultados reales"
          title={<>No son promesas. Son <span className="it">capturas reales.</span></>}
          sub="Certificados de fondeo, payouts y mensajes tal cual me los mandan los miembros de la comunidad." />

        <div className="results-stats reveal-stagger">
          <div className="results-stat"><b>{t.statMiembros}</b><span>Miembros activos</span></div>
          <div className="results-stat"><b>{t.statFondeos}</b><span>Traders acompañados</span></div>
          <div className="results-stat"><b>{t.statRetiros}</b><span>Así nos definen</span></div>
        </div>

        <div className="proof-grid reveal-stagger">
          {shots.map((s, i) => (
            <div className="proof-shot" key={i}>
              <img src={s.src} alt={s.cap} loading="lazy" />
              <div className="proof-shot__cap">{s.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 6. Discord community ------------------------------------------
function Community() {
  const items = [
    "Análisis compartidos",
    "Dudas de la comunidad",
    "Seguimiento semanal",
    "Comentarios sobre contexto",
    "Espacio para traders que van en serio"
  ];
  const channels = [
    { g: "EMPEZAR", ch: ["bienvenida", "cómo-empezar"] },
    { g: "MERCADO", ch: ["previsión-semanal", "directos", "sala-operaciones"] },
    { g: "PROCESO", ch: ["mis-trades", "diagnóstico", "anti-liadas"] }
  ];
  return (
    <section className="section section--paper community-section" id="comunidad" data-screen-label="06 Comunidad">
      <div className="container community-grid">
        <div className="community-copy reveal">
          <div className="eyebrow">Comunidad</div>
          <h2 className="headline headline--lg">No estarás <span className="it">solo</span> frente al gráfico.</h2>
          <p className="sub">La plataforma te da estructura. Discord te da contexto, feedback y acompañamiento.</p>
          <ul className="community-list">
            {items.map((it, i) => (
              <li key={i}><span className="community-list__ic"><PFIcon name="check" size={14} /></span>{it}</li>
            ))}
          </ul>
        </div>
        <div className="community-mock reveal">
          <div className="dc">
            <div className="dc__head"><PFIcon name="discord" size={15} /> AlexusLab</div>
            {channels.map((grp, i) => (
              <div className="dc__group" key={i}>
                <div className="dc__glabel">{grp.g}</div>
                {grp.ch.map((c, j) => (
                  <div key={j} className={`dc__ch ${(i === 1 && j === 1) ? 'active' : ''}`}><span>#</span>{c}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="community-photo">
            <img src="assets/alex-handshake.jpeg" alt="Alex con un miembro de la comunidad" />
            <span className="community-photo__cap">Acompañamiento real, no un bot en el chat.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- 7. Directos / educativo ---------------------------------------
function Directos() {
  const cards = [
    { icon: "play", t: "Directos de operativa" },
    { icon: "wave", t: "Análisis del contexto semanal" },
    { icon: "scan", t: "Revisión de trades" },
    { icon: "target", t: "Lectura de Price Action" },
    { icon: "shield", t: "Gestión de riesgo" },
    { icon: "heart", t: "Psicología y disciplina" }
  ];
  return (
    <section className="section directos-section" id="directos" data-screen-label="07 Directos">
      <div className="container">
        <SectionHead
          center
          eyebrow="Directos y formación"
          title={<>Aprende viendo el <span className="it">proceso real.</span></>}
        />
        <div className="directos-grid reveal-stagger">
          {cards.map((c, i) => (
            <div className="directos-card" key={i}>
              <span className="directos-card__ic"><PFIcon name={c.icon} size={18} /></span>
              <span>{c.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 8. Qué incluye -------------------------------------------------
function Incluye({ t }) {
  const items = [
    "Acceso a la plataforma privada",
    "Acceso al Discord privado",
    "Directos de operativa y análisis",
    "Recursos educativos",
    "Planificación semanal",
    "Checklist pre-market",
    "Revisión post-operativa",
    "Sistema de gestión de riesgo",
    "Acompañamiento de comunidad"
  ];
  return (
    <section className="section section--paper incluye-section" id="incluye" data-screen-label="08 Qué incluye">
      <div className="container container--narrow">
        <SectionHead
          center
          eyebrow="Qué incluye"
          title={<>Todo lo que necesitas para <span className="it">dejar de improvisar.</span></>}
        />
        <ul className="incluye-list reveal-stagger">
          {items.map((it, i) => (
            <li key={i}><span className="incluye-list__ic"><PFIcon name="check" size={15} /></span>{it}</li>
          ))}
        </ul>
        <div className="section-cta reveal">
          <a className="btn btn--primary btn--lg" href={t.linkMonth} target="_blank" rel="noopener">
            Entrar ahora<span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ---------- 9. Para quién / no es -----------------------------------------
function ParaQuien() {
  const si = [
    "Quieres operar con más estructura.",
    "Estás cansado de repetir errores.",
    "Quieres mejorar tu gestión de riesgo.",
    "Buscas una comunidad seria.",
    "Quieres aprender del proceso real.",
    "Estás dispuesto a revisar tu operativa."
  ];
  const no = [
    "Buscas señales.",
    "Quieres dinero rápido.",
    "No quieres responsabilizarte de tus errores.",
    "Buscas una promesa mágica.",
    "No estás dispuesto a seguir un proceso."
  ];
  const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>;
  const Cross = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>;
  return (
    <section className="section paraquien-section" id="para-quien" data-screen-label="09 Para quién">
      <div className="container">
        <SectionHead center eyebrow="¿Es para ti?" title={<>Para quién <span className="it">es</span> — y para quién <span className="it">no.</span></>} />
        <div className="paraquien reveal">
          <div className="paraquien__col paraquien__col--si">
            <div className="paraquien__label">AlexusLab es para ti si…</div>
            <ul>{si.map((l, i) => <li key={i}><span className="icon"><Check /></span>{l}</li>)}</ul>
          </div>
          <div className="paraquien__col paraquien__col--no">
            <div className="paraquien__label">No es para ti si…</div>
            <ul>{no.map((l, i) => <li key={i}><span className="icon"><Cross /></span>{l}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- 10. Reviews ----------------------------------------------------
function Reviews() {
  const realShots = ["assets/proof-17.png", "assets/proof-15.png", "assets/proof-16.png", "assets/proof-14.png", "assets/proof-13.png", "assets/proof-3.png"];
  const items = [
    { quote: "Por primera vez tengo un plan diario y reglas que respeto. Dejé de improvisar cada mañana.", name: "Luis R.", sub: "NQ · Madrid", initials: "LR" },
    { quote: "Lo que más me ha cambiado es la templanza. Ya no miro el gráfico como si tuviera que hacer algo todo el rato.", name: "Raul J.", sub: "ES · Valencia", initials: "RJ" },
    { quote: "Alex no vende humo. Te enseña a leer el precio y a ejecutar con cabeza.", name: "Adrián T.", sub: "NQ · Barcelona", initials: "AT" },
    { quote: "La plataforma me ordenó. Saber qué revisar cada semana me quitó el caos de encima.", name: "Pablo G.", sub: "ES · Bilbao", initials: "PG" }
  ];
  return (
    <section className="section section--paper reviews-section" id="reviews" data-screen-label="10 Reviews">
      <div className="container">
        <SectionHead center eyebrow="Lo que dicen dentro" title={<>Estructura, calma y <span className="it">proceso.</span></>}
          sub="Lo que más se repite no son los resultados. Es dejar de hacer tonterías." />
        <div className="reviews-grid reveal-stagger">
          {items.map((it, i) => (
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
          ))}
        </div>

        <div className="reviews-real">
          <div className="reviews-real__label">Mensajes reales, tal cual me los mandan</div>
          <div className="reviews-real__grid reveal-stagger">
            {realShots.map((s, i) => (
              <div className="reviews-real__shot" key={i}>
                <img src={s} alt="Mensaje real de un miembro de la comunidad" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="reviews-real__hint">Desliza para ver más →</div>
        </div>

        <p className="testi-disclaimer">Los testimonios reflejan experiencias personales. No prometemos resultados financieros.</p>
      </div>
    </section>
  );
}

// ---------- 11. Pricing (3 planes, estilo Chermane) -----------------------
function Pricing({ t }) {
  const monthAvg = (parseFloat(t.priceSemester) / 6).toFixed(2).replace('.', ',');
  const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>;

  const comunidad = [
    "Plataforma privada completa",
    "Discord privado de la comunidad",
    "Directos de operativa y análisis",
    "Plan semanal + checklist + revisión",
    "Sistema de gestión de riesgo"
  ];

  return (
    <section className="section pricing-section" id="precios" data-screen-label="08 Precio">
      <div className="container">
        <SectionHead center eyebrow={t.offerLabel}
          title={<>Únete a la <span className="it accent" style={{ color: "var(--accent-green)" }}>comunidad.</span></>}
          sub="Acceso completo a la plataforma, la comunidad y los directos." />

        <div className="plans3 plans3--two reveal-stagger">

          {/* Mensual */}
          <div className="plan3">
            <div className="plan3__head">
              <h3 className="plan3__name">Comunidad · Mensual</h3>
              <span className="plan3__badge plan3__badge--hot">POPULAR</span>
            </div>
            <p className="plan3__sub">Pruébala un mes. Cancelas cuando quieras.</p>
            <div className="plan3__price">
              <span className="plan3__amount num">{t.priceMonth}€</span>
              <span className="plan3__per">/ mes</span>
              <span className="plan3__was num">{t.priceMonthOriginal}€</span>
            </div>
            <a href={t.linkMonth} target="_blank" rel="noopener" className="plan3__cta plan3__cta--light">Entrar ahora</a>
            <ul className="plan3__list">
              {comunidad.map((it, i) => <li key={i}><span className="plan3__ck"><Check /></span>{it}</li>)}
              <li><span className="plan3__ck"><Check /></span>Sin permanencia</li>
            </ul>
          </div>

          {/* Semestral — destacado */}
          <div className="plan3 plan3--dark">
            <div className="plan3__head">
              <h3 className="plan3__name">Comunidad · Semestral</h3>
              <span className="plan3__badge plan3__badge--best">MEJOR VALOR</span>
            </div>
            <p className="plan3__sub">El mismo acceso, más barato. 6 meses de proceso.</p>
            <div className="plan3__price">
              <span className="plan3__amount num">{t.priceSemester}€</span>
              <span className="plan3__per">/ 6 meses</span>
              <span className="plan3__was num">{t.priceSemesterOriginal}€</span>
            </div>
            <a href={t.linkSemester} target="_blank" rel="noopener" className="plan3__cta plan3__cta--solid">Entrar ahora</a>
            <div className="plan3__note">Sale a <b>{monthAvg}€/mes</b> · precio bloqueado 6 meses</div>
            <ul className="plan3__list">
              {comunidad.map((it, i) => <li key={i}><span className="plan3__ck"><Check /></span>{it}</li>)}
              <li><span className="plan3__ck"><Check /></span>Precio bloqueado durante 6 meses</li>
            </ul>
          </div>

        </div>

        <p className="pricing-micro reveal">Acceso privado. Sin señales. Sin humo. Solo estructura, proceso y acompañamiento.</p>
      </div>
    </section>
  );
}

// ---------- 13. Final CTA — multi-step qualifying form -------------------
function QuestForm({ t }) {
  const STEPS = [
    { key: "nombre", q: "¿Cómo te llamas?", type: "text", placeholder: "Tu nombre" },
    { key: "telefono", q: "¿Cuál es tu teléfono?", type: "tel", placeholder: "+34 600 000 000" },
    { key: "edadOrigen", q: "¿Cuántos años tienes y de dónde eres?", type: "text", placeholder: "Ej: 27 años, Madrid" },
    { key: "objetivo", q: "¿Cuál es tu objetivo principal en el trading?", type: "text", placeholder: "Ej: vivir de esto, ingreso extra..." },
    { key: "tiempo", q: "¿Cuánto tiempo llevas intentándolo?", type: "choice", options: ["- 6 meses", "+ 6 meses", "+ 1 año"] },
    { key: "obstaculo", q: "¿Cuál es tu mayor obstáculo ahora mismo?", type: "text", placeholder: "Cuéntamelo con tus palabras" }
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const done = step >= STEPS.length;
  const cur = STEPS[step];
  const pct = Math.min(100, Math.round((step / STEPS.length) * 100));

  const setVal = (v) => setAnswers(a => ({ ...a, [cur.key]: v }));
  const canNext = cur && answers[cur.key] && String(answers[cur.key]).trim().length > 0;
  const next = () => { if (canNext) setStep(s => s + 1); };

  const calendlyHref = (() => {
    if (!t.linkCourse) return "#";
    try {
      const url = new URL(t.linkCourse);
      if (answers.nombre) url.searchParams.set('name', answers.nombre);
      return url.toString();
    } catch (e) { return t.linkCourse; }
  })();

  return (
    <div className="qform">
      <div className="qform__intro">
        <div className="qform__step"><span className="qform__step-n">1</span><div><b>Rellenas el formulario</b><span>Cuéntame tu situación. Te lleva un minuto.</span></div></div>
        <span className="qform__step-arrow">→</span>
        <div className="qform__step"><span className="qform__step-n">2</span><div><b>Reservas tu llamada</b><span>Eliges el hueco que mejor te encaje, gratis.</span></div></div>
        <span className="qform__step-arrow">→</span>
        <div className="qform__step"><span className="qform__step-n">3</span><div><b>Hablamos 15 min</b><span>Analizamos tu situación sin compromiso.</span></div></div>
      </div>

      <div className="qform__bar"><i style={{ width: `${pct}%` }} /></div>

      {!done ? (
        <div className="qform__body">
          <div className="qform__meta">Paso {step + 1} de {STEPS.length}</div>
          <label className="qform__q">{cur.q}</label>
          {cur.type === "choice" ? (
            <div className="qform__choices">
              {cur.options.map((op, i) => (
                <button key={i} className={`qform__choice ${answers[cur.key] === op ? 'sel' : ''}`}
                  onClick={() => { setVal(op); setTimeout(() => setStep(s => s + 1), 180); }}>
                  {op}
                </button>
              ))}
            </div>
          ) : (
            <input
              className="qform__input"
              type={cur.type}
              placeholder={cur.placeholder}
              value={answers[cur.key] || ""}
              onChange={(e) => setVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') next(); }}
            />
          )}
          {cur.type !== "choice" && (
            <button className="qform__next" disabled={!canNext} onClick={next}>
              {step === STEPS.length - 1 ? "Ver mis huecos disponibles" : "Siguiente"}<span className="arrow">→</span>
            </button>
          )}
        </div>
      ) : (
        <div className="qform__final">
          <div className="qform__final-check"><Check /></div>
          <h3>Perfecto{answers.nombre ? `, ${answers.nombre}` : ""}.</h3>
          <p>Ya tengo lo que necesito. Ahora elige el hueco que mejor te encaje para hablar 15 minutos, gratis.</p>
          <a className="btn btn--primary btn--lg qform__cta" href={calendlyHref} target="_blank" rel="noopener">
            Reservar mi llamada gratuita<span className="arrow">→</span>
          </a>
        </div>
      )}
    </div>
  );
}

const Check = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>;

function FinalCTA({ t }) {
  return (
    <section className="section final-cta" data-screen-label="13 CTA final">
      <img className="final-cta__monogram" src="assets/logo-monogram-white.png" alt="" />
      <div className="final-cta__inner reveal">
        <div className="final-cta__layout">
          <div className="final-cta__photo">
            <img src="assets/alex-charla.png" alt="Alex Moreno, fundador de AlexusLab" />
          </div>
          <div className="final-cta__copy-col">
            <div className="eyebrow">Último paso</div>
            <h2>Hablemos <span className="it">gratis.</span></h2>
            <p>Cuéntame tu situación en una llamada de 15 minutos, sin compromiso. Analizamos dónde estás y te digo honestamente si AlexusLab puede ayudarte.</p>
            <QuestForm t={t} />
          </div>
        </div>
        <CTAMicro>Sin compromiso · 100% gratuita · Respondo yo, no un bot</CTAMicro>
      </div>
    </section>
  );
}
