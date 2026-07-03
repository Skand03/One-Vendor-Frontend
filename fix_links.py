import re

# Fix Home.jsx links
home_path = "frontend/src/pages/customer/Home.jsx"
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace main CTA button in navbar with Link
content = content.replace(
    '<button className="bg-gold-accent text-primary font-label-md text-label-md px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all hover:bg-[#c5a02e] hover:scale-105 active:scale-95 shadow-md">\n                Book a Service / Enquiry\n            </button>',
    '<Link to="/book-slot" className="bg-gold-accent text-primary font-label-md text-label-md px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-all hover:bg-[#c5a02e] hover:scale-105 active:scale-95 shadow-md flex items-center justify-center">\n                Book a Service / Enquiry\n            </Link>'
)

# Replace "View Products" buttons with Links
content = re.sub(
    r'<button className="flex items-center space-x-2 text-gold-accent font-bold group-hover:translate-x-2 transition-transform">\s*<span>View Products</span>\s*<span className="material-symbols-outlined">arrow_forward</span>\s*</button>',
    '<Link to="/catalog" className="flex items-center space-x-2 text-gold-accent font-bold group-hover:translate-x-2 transition-transform">\n<span>View Products</span>\n<span className="material-symbols-outlined">arrow_forward</span>\n</Link>',
    content
)

# Replace "Get in Touch" div button with Link
content = content.replace(
    '<div className="bg-surface-container p-sm rounded-lg flex items-center gap-2 text-primary font-label-md border border-outline-variant/20 hover:border-secondary transition-colors cursor-pointer">\n                                    <span className="material-symbols-outlined">mail</span>\n                                    Get in Touch\n                                </div>',
    '<Link to="/contact" className="bg-surface-container p-sm rounded-lg flex items-center gap-2 text-primary font-label-md border border-outline-variant/20 hover:border-secondary transition-colors cursor-pointer">\n                                    <span className="material-symbols-outlined">mail</span>\n                                    Get in Touch\n                                </Link>'
)

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Home.jsx links.")


# Fix Catalog.jsx links
catalog_path = "frontend/src/pages/customer/Catalog.jsx"
with open(catalog_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Navbar Book a Service button to Link
content = content.replace(
    '<button className="bg-primary-container text-white px-md py-xs rounded-lg font-label-md hover:bg-primary transition-all active:scale-95">Book a Service</button>',
    '<Link to="/book-slot" className="bg-primary-container text-white px-md py-xs rounded-lg font-label-md hover:bg-primary transition-all active:scale-95 flex items-center justify-center">Book a Service</Link>'
)

# Sidebar Bulk Enquiry button to Link
content = content.replace(
    '<button className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-lg font-label-md hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-sm shadow-sm">\n<span className="material-symbols-outlined text-[18px]">request_quote</span>\n                                Bulk Enquiry\n                            </button>',
    '<Link to="/enquiry" className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-lg font-label-md hover:bg-secondary-fixed transition-colors flex items-center justify-center gap-sm shadow-sm">\n<span className="material-symbols-outlined text-[18px]">request_quote</span>\n                                Bulk Enquiry\n                            </Link>'
)

# Product "Enquiry for Bulk Price" buttons to Link
content = re.sub(
    r'<button className="w-full py-3 bg-white border-2 border-secondary-fixed-dim text-secondary font-bold rounded-lg hover:bg-secondary-fixed-dim/10 transition-all flex items-center justify-center gap-xs">\s*Enquiry for Bulk Price\s*</button>',
    '<Link to="/enquiry" className="w-full py-3 bg-white border-2 border-secondary-fixed-dim text-secondary font-bold rounded-lg hover:bg-secondary-fixed-dim/10 transition-all flex items-center justify-center gap-xs">Enquiry for Bulk Price</Link>',
    content
)

with open(catalog_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Catalog.jsx links.")
