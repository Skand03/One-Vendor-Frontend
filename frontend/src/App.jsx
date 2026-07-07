import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import WhatsAppChatbot from './components/WhatsAppChatbot';
import ScrollToTop from './components/ScrollToTop';

// Customer Pages
import Home from './pages/customer/Home';
import Catalog from './pages/customer/Catalog';
import ProductDetail from './pages/customer/ProductDetail';
import EnquiryForm from './pages/customer/EnquiryForm';
import BookSlot from './pages/customer/BookSlot';
import AboutUs from './pages/customer/AboutUs';
import ContactUs from './pages/customer/ContactUs';

import BookingConfirmation from './pages/customer/BookingConfirmation';
import NotFound from './pages/customer/NotFound';
import TermsPrivacy from './pages/customer/TermsPrivacy';

// Admin Pages
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Enquiries from './pages/admin/Enquiries';
import EnquiryDetail from './pages/admin/EnquiryDetail';
import Bookings from './pages/admin/Bookings';
import Products from './pages/admin/Products';
import Customers from './pages/admin/Customers';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

// Protected Route for Customers
const CustomerProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

// Protected Route for Admins
const AdminProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn } = useAdminAuth();
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:category" element={<Catalog />} />
            <Route path="/catalog/:category/:productId" element={<ProductDetail />} />
            <Route path="/enquiry" element={<EnquiryForm />} />
            <Route path="/book-slot" element={<BookSlot />} />

            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/terms-privacy" element={<TermsPrivacy />} />



            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="enquiries" element={<Enquiries />} />
              <Route path="enquiries/:id" element={<EnquiryDetail />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<Customers />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* fallback 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppChatbot />
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
