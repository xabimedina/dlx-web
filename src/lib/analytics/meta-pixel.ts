'use client';

const META_CONSENT_KEY = 'dlx_meta_consent';
const META_PIXEL_ID = '29283008554649548';
const META_COOKIES = ['_fbp', '_fbc'];
// 24 meses, el plazo máximo que recomienda la AEPD para renovar el consentimiento.
const META_CONSENT_MAX_AGE_MS = 730 * 24 * 60 * 60 * 1000;

// Código oficial de Meta con tres ajustes: sin seguimiento automático de rutas ni
// de botones (las páginas vistas las envía MetaPixelTracker), y permitiendo varios
// PageView por carga, sin lo que Meta descarta la navegación interna.
const META_PIXEL_SNIPPET = `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq.disablePushState = true;
fbq.allowDuplicatePageViews = true;
fbq('set', 'autoConfig', false, '${META_PIXEL_ID}');
fbq('init', '${META_PIXEL_ID}');
`;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type MetaEventParams = Record<string, string>;

let lastTrackedPath: string | null = null;

// Clave propia: quien aceptó antes solo consintió Google Analytics.
function hasMetaConsent() {
  try {
    const grantedAt = Number(window.localStorage.getItem(META_CONSENT_KEY));
    return grantedAt > 0 && Date.now() - grantedAt < META_CONSENT_MAX_AGE_MS;
  } catch {
    return false;
  }
}

function loadMetaPixel() {
  if (window.fbq) return;

  const script = document.createElement('script');
  script.text = META_PIXEL_SNIPPET;
  document.head.appendChild(script);
}

// Meta crea sus cookies en el dominio raíz, así que hay que borrarlas en cada nivel.
function clearMetaCookies() {
  const labels = window.location.hostname.split('.');
  const domains = labels.map((_, index) => `; domain=${labels.slice(index).join('.')}`);

  for (const name of META_COOKIES) {
    for (const domain of ['', ...domains]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

function sendMetaPageView() {
  if (!hasMetaConsent()) return;

  loadMetaPixel();

  if (lastTrackedPath === window.location.pathname) return;
  lastTrackedPath = window.location.pathname;
  window.fbq?.('track', 'PageView');
}

export function trackMetaPageView() {
  if (typeof window === 'undefined') return;

  // Se espera a que el router haya actualizado window.location, que es lo que lee el píxel.
  window.setTimeout(sendMetaPageView, 0);
}

function sendMetaEvent(method: 'track' | 'trackCustom', name: string, params?: MetaEventParams) {
  if (typeof window === 'undefined' || !hasMetaConsent() || !window.fbq) return;

  window.fbq(method, name, params);
}

// Evento estándar de Meta (Contact, Lead…), usable para optimizar anuncios.
export function trackMetaEvent(name: string, params?: MetaEventParams) {
  sendMetaEvent('track', name, params);
}

// Evento propio del estudio; en Meta se convierte en conversión personalizada.
export function trackMetaCustomEvent(name: string, params?: MetaEventParams) {
  sendMetaEvent('trackCustom', name, params);
}

export function setMetaConsent(granted: boolean) {
  try {
    if (granted) window.localStorage.setItem(META_CONSENT_KEY, String(Date.now()));
    else window.localStorage.removeItem(META_CONSENT_KEY);
  } catch {
    // Sin almacenamiento no queda constancia del consentimiento y el píxel no se activa.
  }

  if (granted) {
    window.fbq?.('consent', 'grant');
    trackMetaPageView();
  } else {
    window.fbq?.('consent', 'revoke');
    clearMetaCookies();
    lastTrackedPath = null;
  }
}
