import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import WhatsAppChatbot from './components/WhatsAppChatbot';

// Customer Pages
import Home from './pages/customer/Home';
import Catalog from './pages/customer/Catalog';
import ProductDetail from './pages/customer/ProductDetail';
import EnquiryForm from './pages/customer/EnquiryForm';
import BookSlot from './pages/customer/BookSlot';
import AboutUs from './pages/customer/AboutUs';
import ContactUs from './pages/customer/ContactUs';
import Login from './pages/customer/Login';
import Signup from './pages/customer/Signup';
import ForgotPassword from './pages/customer/ForgotPassword';
import MyAccount from './pages/customer/MyAccount';
import BookingConfirmation from './pages/customer/BookingConfirmation';
import NotFound from './pages/customer/NotFound';
import TermsPrivacy from './pages/customer/TermsPrivacy';

// Admin Pages
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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/terms-privacy" element={<TermsPrivacy />} />

            {/* Protected Customer Route */}
            <Route 
              path="/my-account" 
              element={
                <CustomerProtectedRoute>
                  <MyAccount />
                </CustomerProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminProtectedRoute>
                  <Dashboard />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/enquiries" 
              element={
                <AdminProtectedRoute>
                  <Enquiries />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/enquiries/:id" 
              element={
                <AdminProtectedRoute>
                  <EnquiryDetail />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/bookings" 
              element={
                <AdminProtectedRoute>
                  <Bookings />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/products" 
              element={
                <AdminProtectedRoute>
                  <Products />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/customers" 
              element={
                <AdminProtectedRoute>
                  <Customers />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/analytics" 
              element={
                <AdminProtectedRoute>
                  <Analytics />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/settings" 
              element={
                <AdminProtectedRoute>
                  <Settings />
                </AdminProtectedRoute>
              } 
            />

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
