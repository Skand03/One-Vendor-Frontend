export const setMetaTags = (title, description) => {
  document.title = title ? `${title} | One Vendor Solutions` : 'One Vendor Solutions — Bulk School, Office & Home Essentials Sourcing';
  
  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description || 'One Vendor Solutions is the leading B2B procurement partner for School, Office, and Home bulk essentials. We simplify supply chain management for organizations with verified vendors.');
  } else {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = description || 'One Vendor Solutions is the leading B2B procurement partner for School, Office, and Home bulk essentials. We simplify supply chain management for organizations with verified vendors.';
    document.head.appendChild(metaDescription);
  }
};
