// funnel.js — shared behaviour for the AlexusLab funnel pages.

// === CONFIGURACIÓN ===
// Pega aquí el ID de tu píxel de Meta (Administrador de eventos → Orígenes de datos). Vacío = no se carga.
var META_PIXEL_ID = '';

(function () {
  // ---------- consentimiento de cookies + píxel ----------
  function consent() { try { return localStorage.getItem('al_consent'); } catch (e) { return null; } }
  function loadPixel() {
    if (!META_PIXEL_ID || window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID); fbq('track', 'PageView');
  }
  function setConsent(v) {
    try { localStorage.setItem('al_consent', v); } catch (e) {}
    var g = v === 'yes' ? 'granted' : 'denied';
    if (window.gtag) gtag('consent', 'update', { analytics_storage: g, ad_storage: g, ad_user_data: g, ad_personalization: g });
    if (v === 'yes') loadPixel();
    banner.classList.remove('on');
  }
  var banner = document.createElement('div');
  banner.className = 'ck'; banner.setAttribute('role', 'dialog'); banner.setAttribute('aria-label', 'Cookies');
  banner.innerHTML = '<p>Uso cookies de analítica y publicidad para saber qué funciona en esta web. Solo se activan si aceptas. <a href="cookies.html">Más info</a></p>' +
    '<div class="ck__b"><button type="button" data-ck="no">Rechazar</button><button type="button" data-ck="yes">Aceptar</button></div>';
  document.body.appendChild(banner);
  banner.querySelectorAll('[data-ck]').forEach(function (b) { b.onclick = function () { setConsent(b.getAttribute('data-ck')); }; });
  // Sin aviso automático: por defecto no se instalan cookies de analítica ni publicidad (GA4 mide sin cookies).
  // El usuario puede activarlas desde la página de Cookies (botón data-cookie-settings).
  if (consent() === 'yes') loadPixel();
  document.querySelectorAll('[data-cookie-settings]').forEach(function (b) { b.onclick = function () { banner.classList.add('on'); }; });

  // ---------- medición ----------
  // alTrack('evento', {params}) → GA4 y, si hay consentimiento y píxel, Meta.
  var META_MAP = { generate_lead: 'Lead', checkout_click: 'InitiateCheckout', purchase: 'Purchase', calendly_booked: 'Schedule' };
  window.alTrack = function (name, params) {
    params = params || {};
    try { if (window.gtag) gtag('event', name, params); } catch (e) {}
    try {
      if (window.fbq) {
        if (META_MAP[name]) fbq('track', META_MAP[name], params.value ? { value: params.value, currency: params.currency || 'EUR' } : {});
        else fbq('trackCustom', name, params);
      }
    } catch (e) {}
  };

  document.querySelectorAll('a[href]').forEach(function (a) {
    a.addEventListener('click', function () {
      var h = a.getAttribute('href') || '', t = (a.textContent || '').trim().slice(0, 60);
      if (h.indexOf('whop.com') > -1) { var six = h.indexOf('1awGPEaPXlNfs') > -1; alTrack('checkout_click', { plan: six ? '6meses' : 'mensual', value: six ? 210 : 49.99, currency: 'EUR', label: t }); }
      else if (h.indexOf('calendly') > -1) alTrack('calendly_click', { label: t });
      else if (h.indexOf('ig.me') > -1 || h.indexOf('instagram.com') > -1) alTrack('ig_dm_click', { page: location.pathname });
      else if (h === '#precios') alTrack('cta_precios', { label: t });
      else if (/comunidad/i.test(h)) alTrack('hub_comunidad');
      else if (/mentoria/i.test(h)) alTrack('hub_llamada');
      else if (h.indexOf('youtube') > -1) alTrack('hub_youtube');
      else if (h.indexOf('app.alexus-lab') > -1) alTrack('hub_login');
    });
  });

  var precios = document.getElementById('precios');
  if (precios) {
    var po = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { alTrack('view_precios'); po.disconnect(); } }, { threshold: .3 });
    po.observe(precios);
  }

  // ---------- banners dinámicos: duplica el contenido para que el bucle sea continuo ----------
  document.querySelectorAll('.ann__track,.big-mq__track').forEach(function (t) {
    var box = t.parentNode, base = t.innerHTML, n = 0;
    while (t.scrollWidth < box.clientWidth + 40 && n++ < 8) t.innerHTML += base;
    t.innerHTML += t.innerHTML;
  });

  // ---------- carruseles: barra de progreso ----------
  document.querySelectorAll('.car').forEach(function (c) {
    var bar = c.nextElementSibling && c.nextElementSibling.classList.contains('car-bar') ? c.nextElementSibling.firstElementChild : null;
    if (!bar) return;
    var upd = function () {
      var max = c.scrollWidth - c.clientWidth, ratio = Math.min(1, c.clientWidth / c.scrollWidth);
      bar.parentNode.style.visibility = max > 4 ? 'visible' : 'hidden';
      bar.style.width = (ratio * 100) + '%';
      bar.style.transform = 'translateX(' + (max > 0 ? (c.scrollLeft / max) * (1 / ratio - 1) * 100 : 0) + '%)';
    };
    c.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  });

  // ---------- reveal on scroll ----------
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  // ---------- sticky mobile CTA: aparece tras el hero y se oculta sobre data-hide-on ----------
  var sticky = document.querySelector('.sticky-cta');
  var anchor = document.querySelector('[data-sticky-after]');
  if (sticky) {
    document.body.classList.add('has-sticky');
    var past = !anchor, hiddenBy = false;
    var upd = function () { sticky.classList.toggle('on', past && !hiddenBy); };
    if (anchor) {
      new IntersectionObserver(function (es) {
        past = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; upd();
      }, { threshold: 0 }).observe(anchor);
    } else setTimeout(upd, 500);
    var hideSel = sticky.getAttribute('data-hide-on');
    if (hideSel) document.querySelectorAll(hideSel).forEach(function (el) {
      new IntersectionObserver(function (es) { hiddenBy = es[0].isIntersecting; upd(); }, { threshold: 0 }).observe(el);
    });
  }
})();
