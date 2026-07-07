// ============================================================
// ONE VENDOR SOLUTIONS — SEO UTILITY
// Enterprise-grade SEO meta management
// ============================================================

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://onevendorsolutions.com';
const SITE_NAME = 'One Vendor Solutions';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_DESC = 'One Vendor Solutions is India\'s leading B2B bulk procurement partner for schools, offices, and homes. Simplify your supply chain with verified vendors for stationery, furniture, IT equipment, and more.';

// ============================================================
// CORE META TAG SETTER — Handles all search engines
// ============================================================
export const setMetaTags = (title, description, image, type = 'website', extraMeta = {}) => {
  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | School, Office & Home Bulk Procurement India`;
  const pageDesc = description || DEFAULT_DESC;
  const pageImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : DEFAULT_IMAGE;
  const pageUrl = typeof window !== 'undefined' ? window.location.href : SITE_URL;
  const canonicalUrl = typeof window !== 'undefined' ? `${SITE_URL}${window.location.pathname}` : SITE_URL;

  // ─── Page Title ───────────────────────────────────────────
  document.title = pageTitle;

  // ─── Helper to upsert <meta> tags ─────────────────────────
  const upsertMeta = (selector, attribute, value) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      // parse selector to set attributes (name=x or property=x)
      if (selector.includes('[name=')) {
        el.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
      } else if (selector.includes('[property=')) {
        el.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
      }
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  };

  // ─── Helper to upsert <link> tags ─────────────────────────
  const upsertLink = (rel, href) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  // ─── Standard SEO Meta ────────────────────────────────────
  upsertMeta('[name="description"]', 'content', pageDesc);
  upsertMeta('[name="keywords"]', 'content', extraMeta.keywords || 'B2B procurement India, bulk stationery, school essentials wholesale, office supplies bulk, home essentials supplier, One Vendor Solutions');
  upsertMeta('[name="author"]', 'content', 'One Vendor Solutions');
  upsertMeta('[name="robots"]', 'content', extraMeta.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  upsertMeta('[name="googlebot"]', 'content', 'index, follow');
  upsertMeta('[name="bingbot"]', 'content', 'index, follow');
  upsertMeta('[name="rating"]', 'content', 'general');
  upsertMeta('[name="revisit-after"]', 'content', '7 days');
  upsertMeta('[name="language"]', 'content', 'English');
  upsertMeta('[name="geo.region"]', 'content', 'IN');
  upsertMeta('[name="geo.placename"]', 'content', 'India');

  // ─── Canonical URL ────────────────────────────────────────
  upsertLink('canonical', canonicalUrl);

  // ─── Open Graph (Facebook, WhatsApp, LinkedIn, Slack, Discord) ─
  upsertMeta('[property="og:title"]', 'content', pageTitle);
  upsertMeta('[property="og:description"]', 'content', pageDesc);
  upsertMeta('[property="og:image"]', 'content', pageImage);
  upsertMeta('[property="og:image:width"]', 'content', '1200');
  upsertMeta('[property="og:image:height"]', 'content', '630');
  upsertMeta('[property="og:image:alt"]', 'content', pageTitle);
  upsertMeta('[property="og:url"]', 'content', canonicalUrl);
  upsertMeta('[property="og:type"]', 'content', type);
  upsertMeta('[property="og:site_name"]', 'content', SITE_NAME);
  upsertMeta('[property="og:locale"]', 'content', 'en_IN');

  // ─── Twitter / X Card ──────────────────────────────────────
  upsertMeta('[name="twitter:card"]', 'content', 'summary_large_image');
  upsertMeta('[name="twitter:title"]', 'content', pageTitle);
  upsertMeta('[name="twitter:description"]', 'content', pageDesc);
  upsertMeta('[name="twitter:image"]', 'content', pageImage);
  upsertMeta('[name="twitter:image:alt"]', 'content', pageTitle);
  upsertMeta('[name="twitter:site"]', 'content', '@OneVendorSol');
  upsertMeta('[name="twitter:creator"]', 'content', '@OneVendorSol');
};

// ============================================================
// STRUCTURED DATA (JSON-LD) INJECTOR
// ============================================================
export const setSchemaMarkup = (schemaObj, id = 'ld-json-schema') => {
  // Remove existing schema with this ID
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const scriptEl = document.createElement('script');
  scriptEl.id = id;
  scriptEl.type = 'application/ld+json';
  scriptEl.text = JSON.stringify(schemaObj);
  document.head.appendChild(scriptEl);
};

// ============================================================
// PRE-BUILT SCHEMA GENERATORS
// ============================================================

/** Organization + Local Business Schema — inject on all pages */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.jpeg`,
        width: 200,
        height: 200,
      },
      description: DEFAULT_DESC,
      email: 'onevendorsolutions@gmail.com',
      telephone: '+918576084127',
      foundingDate: '2023',
      founder: {
        '@type': 'Person',
        name: 'Ujjwal Pandey',
        jobTitle: 'CEO & Founder',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Near water sport complex gorakhpur',
        addressLocality: 'Gorakhpur',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://wa.me/918576084127',
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: '+918576084127',
      email: 'onevendorsolutions@gmail.com',
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, Bank Transfer, UPI',
      openingHours: 'Mo-Sa 09:00-18:00',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Near water sport complex gorakhpur',
        addressLocality: 'Gorakhpur',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '26.7606',
        longitude: '83.3732',
      },
      image: `${SITE_URL}/logo.jpeg`,
      servesCuisine: 'B2B Procurement',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESC,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/catalog?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
});

/** Breadcrumb Schema */
export const getBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

/** FAQ Schema */
export const getFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
});

/** Service Schema */
export const getServiceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  url: `${SITE_URL}/catalog`,
});
