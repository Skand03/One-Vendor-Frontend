import os

frontend_files = [
    # Customer Pages
    "frontend/src/pages/customer/Home.jsx",
    "frontend/src/pages/customer/Catalog.jsx",
    "frontend/src/pages/customer/ProductDetail.jsx",
    "frontend/src/pages/customer/EnquiryForm.jsx",
    "frontend/src/pages/customer/BookSlot.jsx",
    "frontend/src/pages/customer/AboutUs.jsx",
    "frontend/src/pages/customer/ContactUs.jsx",
    "frontend/src/pages/customer/Login.jsx",
    "frontend/src/pages/customer/Signup.jsx",
    "frontend/src/pages/customer/ForgotPassword.jsx",
    "frontend/src/pages/customer/MyAccount.jsx",
    "frontend/src/pages/customer/BookingConfirmation.jsx",
    "frontend/src/pages/customer/NotFound.jsx",
    "frontend/src/pages/customer/TermsPrivacy.jsx",
    
    # Admin Pages
    "frontend/src/pages/admin/AdminLogin.jsx",
    "frontend/src/pages/admin/Dashboard.jsx",
    "frontend/src/pages/admin/Enquiries.jsx",
    "frontend/src/pages/admin/EnquiryDetail.jsx",
    "frontend/src/pages/admin/Bookings.jsx",
    "frontend/src/pages/admin/Products.jsx",
    "frontend/src/pages/admin/Customers.jsx",
    "frontend/src/pages/admin/Analytics.jsx",
    "frontend/src/pages/admin/Settings.jsx",
]

for file in frontend_files:
    basename = os.path.basename(file).replace('.jsx', '')
    content = f"""import React from 'react';
import './{basename}.css';

const {basename} = () => {{
  return (
    <div className="{basename.lower()}-page" style={{{{ padding: '40px', textAlign: 'center' }}}}>
      <h1>{basename} Component</h1>
      <p>Placeholder for {basename} page.</p>
    </div>
  );
}};

export default {basename};
"""
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Populated: {file}")

# Also populate basic components
components = [
    "Navbar", "Footer", "FormCard", "ProductCard", "SlotPicker", "WhatsAppButton"
]
for comp in components:
    file = f"frontend/src/components/{comp}.jsx"
    content = f"""import React from 'react';
import './{comp}.css';

const {comp} = () => {{
  return (
    <div className="{comp.lower()}-component" style={{{{ border: '1px dashed #ccc', padding: '10px', margin: '10px' }}}}>
      <h3>{comp} Component</h3>
    </div>
  );
}};

export default {comp};
"""
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Populated: {file}")
