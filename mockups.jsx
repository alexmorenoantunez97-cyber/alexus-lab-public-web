// mockups.jsx — Device frames + the AlexusLab platform dashboard UI.
// These are the visual centerpiece: a private platform shown on desktop + phone.
// Top-level function declarations are global across Babel scripts.

// ---------- Icon set (line icons, inherit currentColor) -------------------
function PFIcon({ name, size = 16 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "grid":     return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "calendar": return <svg {...p}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>;
    case "check":    return <svg {...p}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>;
    case "shield":   return <svg {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></svg>;
    case "heart":    return <svg {...p}><path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 6 4.5 4.5 0 0 0 2 8.5C2 12 5 14.5 12 20c2-1.6 4-3.2 5.5-4.6"/></svg>;
    case "scan":     return <svg {...p}><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></svg>;
    case "wave":     return <svg {...p}><path d="M3 12h3l2-6 4 14 3-9 2 3h4"/></svg>;
    case "users":    return <svg {...p}><circle cx="9" cy="8" r="3"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5"/><circle cx="17" cy="9" r="2"/><path d="M14.5 19c0-2.5 2-4 4-4s3.5 1.5 3.5 4"/></svg>;
    case "play":     return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/></svg>;
    case "book":     return <svg {...p}><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h12"/></svg>;
    case "bolt":     return <svg {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>;
    case "lock":     return <svg {...p}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>;
    case "discord":  return <svg {...p}><path d="M8 12a1 1 0 1 0 0 .01M16 12a1 1 0 1 0 0 .01M7 7c4-1.5 6-1.5 10 0M7 17c4 1.5 6 1.5 10 0M7 7l-2 9c2 1.5 3 2 5 2M17 7l2 9c-2 1.5-3 2-5 2"/></svg>;
    case "arrow":    return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "target":   return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>;
    case "clock":    return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    default: return null;
  }
}

// ---------- The platform dashboard (desktop layout) -----------------------
function PlatformDesktop() {
  const nav = [
    { icon: "grid", label: "Dashboard", active: true },
    { icon: "calendar", label: "Plan semanal" },
    { icon: "check", label: "Checklist" },
    { icon: "shield", label: "Riesgo" },
    { icon: "heart", label: "Diario emocional" },
    { icon: "scan", label: "Diagnóstico" },
    { icon: "wave", label: "Patrones" },
    { icon: "discord", label: "Comunidad" }
  ];
  const checklist = [
    { t: "Contexto de la semana definido", done: true },
    { t: "Zonas marcadas en NQ y ES", done: true },
    { t: "Riesgo máximo del día fijado", done: true },
    { t: "Sin noticias de alto impacto", done: false },
    { t: "Estado mental: en calma", done: false }
  ];
  return (
    <div className="pf" role="img" aria-label="Plataforma privada de AlexusLab">
      <div className="pf__top">
        <div className="pf__brand"><span className="pf__logo-dot" />AlexusLab</div>
        <div className="pf__top-mid">Semana 23 · 2 — 6 Jun</div>
        <div className="pf__top-right">
          <span className="pf__pill pf__pill--live"><i />EN VIVO</span>
          <span className="pf__avatar">A</span>
        </div>
      </div>
      <div className="pf__body">
        <aside className="pf__side">
          {nav.map((n, i) => (
            <div key={i} className={`pf__nav ${n.active ? 'active' : ''}`}>
              <PFIcon name={n.icon} size={15} />
              <span>{n.label}</span>
            </div>
          ))}
        </aside>
        <main className="pf__main">
          <div className="pf__mainhead">
            <div>
              <div className="pf__kicker">Plan de la semana</div>
              <div className="pf__h">Contexto alcista · operar solo continuaciones</div>
            </div>
            <span className="pf__chip pf__chip--ok">Riesgo bajo control</span>
          </div>

          <div className="pf__stats">
            <div className="pf__stat">
              <span className="pf__stat-l">Riesgo máx / día</span>
              <span className="pf__stat-v">1.0<em>%</em></span>
            </div>
            <div className="pf__stat">
              <span className="pf__stat-l">Días operables</span>
              <span className="pf__stat-v">3</span>
            </div>
            <div className="pf__stat">
              <span className="pf__stat-l">R objetivo</span>
              <span className="pf__stat-v pf__stat-v--up">+4R</span>
            </div>
            <div className="pf__stat">
              <span className="pf__stat-l">Foco</span>
              <span className="pf__stat-v pf__stat-v--sm">Esperar confirmación</span>
            </div>
          </div>

          <div className="pf__grid">
            <div className="pf__card pf__card--wide">
              <div className="pf__card-h"><PFIcon name="check" size={14} /> Checklist pre-market</div>
              <ul className="pf__check">
                {checklist.map((c, i) => (
                  <li key={i} className={c.done ? 'done' : ''}>
                    <span className="pf__box">{c.done && <PFIcon name="check" size={11} />}</span>
                    <span>{c.t}</span>
                  </li>
                ))}
              </ul>
              <div className="pf__check-foot"><span>3 / 5 completado</span><span className="pf__bar"><i style={{ width: "60%" }} /></span></div>
            </div>

            <div className="pf__card">
              <div className="pf__card-h"><PFIcon name="shield" size={14} /> Control de riesgo</div>
              <div className="pf__gauge">
                <svg viewBox="0 0 120 70">
                  <path d="M10 64 A50 50 0 0 1 110 64" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
                  <path d="M10 64 A50 50 0 0 1 86 26" fill="none" stroke="var(--accent-green)" strokeWidth="8" strokeLinecap="round" />
                </svg>
                <div className="pf__gauge-v"><b>0.6</b><span>de 1.0% usado</span></div>
              </div>
              <div className="pf__risk-row"><span>Stop diario</span><b>−1.0%</b></div>
              <div className="pf__risk-row"><span>Trades hoy</span><b>2 / 3</b></div>
            </div>

            <div className="pf__card">
              <div className="pf__card-h"><PFIcon name="heart" size={14} /> Estado emocional</div>
              <div className="pf__emo">
                {["Calma", "Tensión", "FOMO", "Euforia"].map((e, i) => (
                  <span key={i} className={`pf__emo-pill ${i === 0 ? 'on' : ''}`}>{e}</span>
                ))}
              </div>
              <div className="pf__emo-note">Registro de hoy: <b>en calma</b>. Listo para ejecutar el plan.</div>
            </div>

            <div className="pf__card pf__card--wide">
              <div className="pf__card-h"><PFIcon name="scan" size={14} /> Diagnóstico de errores · últimos 30 días</div>
              <div className="pf__diag">
                {[
                  { t: "Entradas anticipadas", n: 4, w: "70%", tone: "down" },
                  { t: "Stop movido por miedo", n: 2, w: "38%", tone: "warn" },
                  { t: "Operar día no planificado", n: 1, w: "18%", tone: "ok" }
                ].map((d, i) => (
                  <div key={i} className="pf__diag-row">
                    <span className="pf__diag-t">{d.t}</span>
                    <span className="pf__diag-bar"><i className={`t-${d.tone}`} style={{ width: d.w }} /></span>
                    <span className="pf__diag-n">{d.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ---------- The platform on a phone (condensed) ---------------------------
function PlatformPhone() {
  const check = [
    { t: "Contexto definido", done: true },
    { t: "Zonas marcadas", done: true },
    { t: "Riesgo fijado", done: true },
    { t: "Mente en calma", done: false }
  ];
  return (
    <div className="pfm" role="img" aria-label="Plataforma de AlexusLab en el móvil">
      <div className="pfm__bar">
        <span className="pfm__brand"><span className="pf__logo-dot" />AlexusLab</span>
        <span className="pfm__pill"><i />EN VIVO</span>
      </div>
      <div className="pfm__scroll">
        <div className="pfm__kicker">Plan · Semana 23</div>
        <div className="pfm__plan">
          <div className="pfm__plan-h">Contexto alcista</div>
          <div className="pfm__plan-row"><span>Riesgo máx</span><b>1.0%</b></div>
          <div className="pfm__plan-row"><span>Días operables</span><b>3</b></div>
          <div className="pfm__plan-row"><span>Foco</span><b>Confirmación</b></div>
        </div>

        <div className="pfm__card">
          <div className="pfm__card-h"><PFIcon name="check" size={13} /> Checklist pre-market</div>
          <ul className="pfm__check">
            {check.map((c, i) => (
              <li key={i} className={c.done ? 'done' : ''}>
                <span className="pfm__box">{c.done && <PFIcon name="check" size={10} />}</span>{c.t}
              </li>
            ))}
          </ul>
          <div className="pfm__bar"><i style={{ width: "75%" }} /></div>
        </div>

        <div className="pfm__card">
          <div className="pfm__card-h"><PFIcon name="shield" size={13} /> Riesgo de hoy</div>
          <div className="pfm__risk"><b>0.6%</b><span>de 1.0% · 2 / 3 trades</span></div>
        </div>
      </div>
      <div className="pfm__tabs">
        <span className="on"><PFIcon name="grid" size={17} /></span>
        <span><PFIcon name="calendar" size={17} /></span>
        <span><PFIcon name="shield" size={17} /></span>
        <span><PFIcon name="discord" size={17} /></span>
      </div>
    </div>
  );
}

// ---------- Browser window frame wrapping desktop dashboard ----------------
function BrowserFrame({ children, url = "app.alexus-lab.com" }) {
  return (
    <div className="browser">
      <div className="browser__bar">
        <span className="browser__dot" /><span className="browser__dot" /><span className="browser__dot" />
        <span className="browser__url"><PFIcon name="lock" size={11} /> {url}</span>
      </div>
      <div className="browser__screen">{children}</div>
    </div>
  );
}

// ---------- Phone frame ----------------------------------------------------
function PhoneFrame({ children }) {
  return (
    <div className="phone">
      <div className="phone__notch" />
      <div className="phone__screen">{children}</div>
    </div>
  );
}
