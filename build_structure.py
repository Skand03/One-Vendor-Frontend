import os

def create_file(path, content=""):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if not os.path.exists(path):
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Created file: {path}")

# Frontend Folders and Files
frontend_files = [
    # Components
    "frontend/src/components/Navbar.jsx",
    "frontend/src/components/Navbar.css",
    "frontend/src/components/Footer.jsx",
    "frontend/src/components/Footer.css",
    "frontend/src/components/FormCard.jsx",
    "frontend/src/components/FormCard.css",
    "frontend/src/components/ProductCard.jsx",
    "frontend/src/components/ProductCard.css",
    "frontend/src/components/SlotPicker.jsx",
    "frontend/src/components/SlotPicker.css",
    "frontend/src/components/WhatsAppButton.jsx",
    "frontend/src/components/WhatsAppButton.css",
    
    # Customer Pages
    "frontend/src/pages/customer/Home.jsx",
    "frontend/src/pages/customer/Home.css",
    "frontend/src/pages/customer/Catalog.jsx",
    "frontend/src/pages/customer/Catalog.css",
    "frontend/src/pages/customer/ProductDetail.jsx",
    "frontend/src/pages/customer/ProductDetail.css",
    "frontend/src/pages/customer/EnquiryForm.jsx",
    "frontend/src/pages/customer/EnquiryForm.css",
    "frontend/src/pages/customer/BookSlot.jsx",
    "frontend/src/pages/customer/BookSlot.css",
    "frontend/src/pages/customer/AboutUs.jsx",
    "frontend/src/pages/customer/AboutUs.css",
    "frontend/src/pages/customer/ContactUs.jsx",
    "frontend/src/pages/customer/ContactUs.css",
    "frontend/src/pages/customer/Login.jsx",
    "frontend/src/pages/customer/Login.css",
    "frontend/src/pages/customer/Signup.jsx",
    "frontend/src/pages/customer/Signup.css",
    "frontend/src/pages/customer/ForgotPassword.jsx",
    "frontend/src/pages/customer/ForgotPassword.css",
    "frontend/src/pages/customer/MyAccount.jsx",
    "frontend/src/pages/customer/MyAccount.css",
    "frontend/src/pages/customer/BookingConfirmation.jsx",
    "frontend/src/pages/customer/BookingConfirmation.css",
    "frontend/src/pages/customer/NotFound.jsx",
    "frontend/src/pages/customer/NotFound.css",
    "frontend/src/pages/customer/TermsPrivacy.jsx",
    "frontend/src/pages/customer/TermsPrivacy.css",
    
    # Admin Pages
    "frontend/src/pages/admin/AdminLogin.jsx",
    "frontend/src/pages/admin/AdminLogin.css",
    "frontend/src/pages/admin/Dashboard.jsx",
    "frontend/src/pages/admin/Dashboard.css",
    "frontend/src/pages/admin/Enquiries.jsx",
    "frontend/src/pages/admin/Enquiries.css",
    "frontend/src/pages/admin/EnquiryDetail.jsx",
    "frontend/src/pages/admin/EnquiryDetail.css",
    "frontend/src/pages/admin/Bookings.jsx",
    "frontend/src/pages/admin/Bookings.css",
    "frontend/src/pages/admin/Products.jsx",
    "frontend/src/pages/admin/Products.css",
    "frontend/src/pages/admin/Customers.jsx",
    "frontend/src/pages/admin/Customers.css",
    "frontend/src/pages/admin/Analytics.jsx",
    "frontend/src/pages/admin/Analytics.css",
    "frontend/src/pages/admin/Settings.jsx",
    "frontend/src/pages/admin/Settings.css",
    
    # Context
    "frontend/src/context/AuthContext.jsx",
    "frontend/src/context/AdminAuthContext.jsx",
    
    # Services & Utils
    "frontend/src/services/api.js",
    "frontend/src/utils/validators.js",
    "frontend/src/utils/formatters.js",
    "frontend/src/utils/constants.js",
]

# Backend Folders and Files
backend_files = [
    "backend/main.py",
    "backend/requirements.txt",
    "backend/.env.example",
    "backend/app/config.py",
    "backend/app/routers/auth.py",
    "backend/app/routers/admin_auth.py",
    "backend/app/routers/enquiries.py",
    "backend/app/routers/bookings.py",
    "backend/app/routers/products.py",
    "backend/app/routers/customers.py",
    "backend/app/routers/admin.py",
    "backend/app/routers/analytics.py",
    "backend/app/routers/contact.py",
    "backend/app/routers/settings.py",
    "backend/app/models/enquiry.py",
    "backend/app/models/booking.py",
    "backend/app/models/product.py",
    "backend/app/models/customer.py",
    "backend/app/models/admin_user.py",
    "backend/app/models/common.py",
    "backend/app/services/supabase_client.py",
    "backend/app/services/file_upload.py",
    "backend/app/services/whatsapp.py",
    "backend/app/services/email_service.py",
    "backend/app/middleware/auth_middleware.py",
    "backend/app/middleware/admin_middleware.py",
    "backend/app/utils/response.py",
    "backend/app/utils/validators.py",
    "backend/app/utils/constants.py",
]

for file in frontend_files + backend_files:
    create_file(file)

print("Structure construction completed.")
