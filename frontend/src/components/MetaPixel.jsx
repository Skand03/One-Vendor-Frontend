import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ============================================================
// FACEBOOK / META PIXEL — Production Only
// Set VITE_META_PIXEL_ID in Vercel environment variables
// ============================================================

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const IS_PROD = import.meta.env.PROD;

function loadPixel(id) {
  if (window.fbq || document.getElementById('fb-pixel-script')) return;

  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.id = 'fb-pixel-script';
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', id);
  window.fbq('track', 'PageView');
}

// ============================================================
// Named exports for pixel events (call from any component)
// ============================================================
export const pixelTrackLead = (params = {}) => {
  if (!IS_PROD || !PIXEL_ID || typeof window.fbq !== 'function') return;
  window.fbq('track', 'Lead', params);
};

export const pixelTrackContact = () => {
  if (!IS_PROD || !PIXEL_ID || typeof window.fbq !== 'function') return;
  window.fbq('track', 'Contact');
};

export const pixelTrackViewContent = (contentName) => {
  if (!IS_PROD || !PIXEL_ID || typeof window.fbq !== 'function') return;
  window.fbq('track', 'ViewContent', { content_name: contentName });
};

export const pixelTrackInitiateCheckout = () => {
  if (!IS_PROD || !PIXEL_ID || typeof window.fbq !== 'function') return;
  window.fbq('track', 'InitiateCheckout');
};

export const pixelTrackCompleteRegistration = () => {
  if (!IS_PROD || !PIXEL_ID || typeof window.fbq !== 'function') return;
  window.fbq('track', 'CompleteRegistration');
};

// ============================================================
// MetaPixel Component — mounts in App.jsx (inside <Router>)
// ============================================================
const MetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    if (!IS_PROD || !PIXEL_ID) return;
    loadPixel(PIXEL_ID);
  }, []);

  // Track PageView on every route change
  useEffect(() => {
    if (!IS_PROD || !PIXEL_ID || typeof window.fbq !== 'function') return;
    window.fbq('track', 'PageView');
  }, [location]);

  return null;
};

export default MetaPixel;
