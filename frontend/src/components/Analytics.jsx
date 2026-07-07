import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ============================================================
// GOOGLE ANALYTICS GA4 — Production Only
// Set VITE_GA_MEASUREMENT_ID in Vercel environment variables
// ============================================================

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const IS_PROD = import.meta.env.PROD;

// Load the GA4 script once
function loadGA(id) {
  if (document.getElementById('ga-script')) return;

  const scriptSrc = document.createElement('script');
  scriptSrc.id = 'ga-script';
  scriptSrc.async = true;
  scriptSrc.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(scriptSrc);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, {
    send_page_view: false, // We track manually on route change
    anonymize_ip: true,
  });
}

// ============================================================
// Named export for tracking custom events from any component
// ============================================================
export const trackEvent = (eventName, params = {}) => {
  if (!IS_PROD || !GA_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
};

// Convenience wrappers
export const trackContactSubmit = () => trackEvent('generate_lead', { event_category: 'Contact', event_label: 'Contact Form Submitted' });
export const trackBookService = (categoryName) => trackEvent('begin_checkout', { event_category: 'Booking', event_label: categoryName || 'Service Booked' });
export const trackWhatsAppClick = () => trackEvent('click', { event_category: 'WhatsApp', event_label: 'WhatsApp Button Clicked' });
export const trackCallClick = () => trackEvent('click', { event_category: 'Phone', event_label: 'Call Button Clicked' });
export const trackEnquirySubmit = () => trackEvent('generate_lead', { event_category: 'Enquiry', event_label: 'Enquiry Form Submitted' });

// ============================================================
// Analytics Component — mounts in App.jsx (inside <Router>)
// ============================================================
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!IS_PROD || !GA_ID) return;
    loadGA(GA_ID);
  }, []);

  // Track page view on every route change
  useEffect(() => {
    if (!IS_PROD || !GA_ID || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

export default Analytics;
