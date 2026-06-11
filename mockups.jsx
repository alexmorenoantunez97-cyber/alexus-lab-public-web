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

// ---------- The platform dashboard (desktop) — process / psychology -------
function PlatformDesktop() {
  const nav = [
    { icon: "calendar", label: "Plan semanal" },
    { icon: "check", label: "Check-in diario" },
    { icon: "wave", label: "Evolución", active: true },
    { icon: "shield", label: "Protocolos" },
    { icon: "scan", label: "Patrones" },
    { icon: "heart", label: "Diario emocional" },
    { icon: "discord", label: "Comunidad" }
  ];
  const rows = [
    { t: "Días siguiendo plan (ejecución buena)", n: 0 },
    { t: "Días sin romper normas", n: 1 },
    { t: "Días cumpliendo el riesgo planificado", n: 0 },
    { t: "Días cumpliendo protocolos activos", n: 0 }
  ];
  return (
    <div className="pf" role="img" aria-label="Plataforma de proceso de AlexusLab">
      <div className="pf__top">
        <div className="pf__brand"><span className="pf__logo-dot" />Alexus</div>
        <div className="pf__top-mid">Progreso · últimos 90 días</div>
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
              <div className="pf__kicker">Dashboard de proceso</div>
              <div className="pf__h">Tu evolución psicológica</div>
            </div>
            <span className="pf__chip pf__chip--ok">No es PnL · es proceso</span>
          </div>

          <div className="pf__stats">
            <div className="pf__stat">
              <span className="pf__stat-l">Check-ins</span>
              <span className="pf__stat-v">1<em>/90</em></span>
            </div>
            <div className="pf__stat">
              <span className="pf__stat-l">Siguiendo plan</span>
              <span className="pf__stat-v">0<em>%</em></span>
            </div>
            <div className="pf__stat">
              <span className="pf__stat-l">Sin romper normas</span>
              <span className="pf__stat-v pf__stat-v--up">100<em>%</em></span>
            </div>
            <div className="pf__stat">
              <span className="pf__stat-l">Riesgo cumplido</span>
              <span className="pf__stat-v">0<em>%</em></span>
            </div>
          </div>

          <div className="pf__grid">
            <div className="pf__card pf__card--wide">
              <div className="pf__card-h"><PFIcon name="shield" size={14} /> Disciplina · últimos 90 días</div>
              <div className="pf__lrows">
                {rows.map((r, i) => (
                  <div key={i} className="pf__lrow">
                    <span>{r.t}</span><b>{r.n}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="pf__card">
              <div className="pf__card-h"><PFIcon name="target" size={14} /> Resultados</div>
              <div className="pf__pills">
                <span className="pf__rp pf__rp--ok">0 TP</span>
                <span className="pf__rp pf__rp--down">0 SL</span>
                <span className="pf__rp">1 BE</span>
                <span className="pf__rp pf__rp--mute">0 No operé</span>
              </div>
              <div className="pf__card-h" style={{ marginTop: 14 }}><PFIcon name="heart" size={14} /> Síntomas marcados</div>
              <div className="pf__pills">
                <span className="pf__rp pf__rp--ok">1 Positivos</span>
                <span className="pf__rp pf__rp--warn">0 Matiz</span>
                <span className="pf__rp pf__rp--down">0 Negativos</span>
              </div>
            </div>

            <div className="pf__card pf__card--wide pf__trap">
              <div className="pf__card-h"><PFIcon name="bolt" size={14} /> Tu trampa esta semana</div>
              <p>“Lo aburrido funciona. Si tu plan se siente repetitivo, está calado. No lo cambies por curiosidad.”</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ---------- The platform on a phone — weekly plan journal -----------------
function PlatformPhone() {
  const rules = [
    "Checklist leída en voz alta antes del primer trade",
    "Previsión diaria escrita 30 min antes de abrir",
    "No modificar el riesgo definido el domingo"
  ];
  return (
    <div className="pfm" role="img" aria-label="Plan semanal de AlexusLab en el móvil">
      <div className="pfm__bar">
        <span className="pfm__brand"><span className="pf__logo-dot" />Alexus</span>
        <span className="pfm__pill"><i />EN VIVO</span>
      </div>
      <div className="pfm__scroll">
        <div className="pfm__kicker">Plan · Semana 23</div>

        <div className="pfm__pillar">
          <div className="pfm__pillar-l">Pilar de la semana</div>
          <div className="pfm__pillar-v">Disciplina</div>
          <div className="pfm__pillar-d">Consolidamos los hábitos base.</div>
        </div>

        <div className="pfm__card">
          <div className="pfm__card-h"><PFIcon name="check" size={13} /> Las 3 reglas</div>
          <ol className="pfm__rules">
            {rules.map((r, i) => (
              <li key={i}><span className="pfm__rn">{i + 1}</span>{r}</li>
            ))}
          </ol>
        </div>

        <div className="pfm__card pfm__trap">
          <div className="pfm__card-h"><PFIcon name="bolt" size={13} /> Tu trampa</div>
          <p>“Lo aburrido funciona. No lo cambies por curiosidad.”</p>
        </div>
      </div>
      <div className="pfm__tabs">
        <span><PFIcon name="calendar" size={17} /></span>
        <span className="on"><PFIcon name="wave" size={17} /></span>
        <span><PFIcon name="heart" size={17} /></span>
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
