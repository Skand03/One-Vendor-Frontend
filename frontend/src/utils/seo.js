export const setMetaTags = (title, description, image, type = 'website') => {
  const siteTitle = title ? `${title} | One Vendor Solutions` : 'One Vendor Solutions | Premium B2B Procurement';
  const siteDesc = description || 'One Vendor Solutions is the leading B2B procurement partner for School, Office, and Home bulk essentials. We simplify supply chain management for schools and corporate offices.';
  const siteImg = image || '/logo.jpg';
  const siteUrl = window.location.href;

  document.title = siteTitle;

  const updateMeta = (nameAttr, nameVal, propAttr, propVal, contentVal) => {
    let el;
    if (nameAttr) {
      el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
    } else if (propAttr) {
      el = document.querySelector(`meta[${propAttr}="${propVal}"]`);
    }

    if (!el) {
      el = document.createElement('meta');
      if (nameAttr) el.setAttribute(nameAttr, nameVal);
      if (propAttr) el.setAttribute(propAttr, propVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', contentVal);
  };

  // Standard Meta Tags
  updateMeta('name', 'description', null, null, siteDesc);

  // Open Graph / Facebook Meta Tags
  updateMeta(null, null, 'property', 'og:title', siteTitle);
  updateMeta(null, null, 'property', 'og:description', siteDesc);
  updateMeta(null, null, 'property', 'og:image', siteImg);
  updateMeta(null, null, 'property', 'og:url', siteUrl);
  updateMeta(null, null, 'property', 'og:type', type);

  // Twitter Card Meta Tags
  updateMeta('name', 'twitter:card', null, null, 'summary_large_image');
  updateMeta('name', 'twitter:title', null, null, siteTitle);
  updateMeta('name', 'twitter:description', null, null, siteDesc);
  updateMeta('name', 'twitter:image', null, null, siteImg);
};

export const setSchemaMarkup = (schemaObj) => {
  let scriptEl = document.getElementById('ld-json-schema');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'ld-json-schema';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.text = JSON.stringify(schemaObj);
};
