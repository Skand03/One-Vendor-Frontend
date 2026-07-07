import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import WhatsAppChatbot from './components/WhatsAppChatbot';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics';
import MetaPixel from './components/MetaPixel';

// ─── Lazy-loaded Customer Pages (code splitting) ─────────────
const Home = lazy(() => import('./pages/customer/Home'));
const Catalog = lazy(() => import('./pages/customer/Catalog'));
const ProductDetail = lazy(() => import('./pages/customer/ProductDetail'));
const EnquiryForm = lazy(() => import('./pages/customer/EnquiryForm'));
const BookSlot = lazy(() => import('./pages/customer/BookSlot'));
const AboutUs = lazy(() => import('./pages/customer/AboutUs'));
const ContactUs = lazy(() => import('./pages/customer/ContactUs'));
const BookingConfirmation = lazy(() => import('./pages/customer/BookingConfirmation'));
const NotFound = lazy(() => import('./pages/customer/NotFound'));
const TermsPrivacy = lazy(() => import('./pages/customer/TermsPrivacy'));

// ─── Lazy-loaded Admin Pages ──────────────────────────────────
const AdminLayout = lazy(() => import('./components/AdminLayout'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Enquiries = lazy(() => import('./pages/admin/Enquiries'));
const EnquiryDetail = lazy(() => import('./pages/admin/EnquiryDetail'));
const Bookings = lazy(() => import('./pages/admin/Bookings'));
const Products = lazy(() => import('./pages/admin/Products'));
const Customers = lazy(() => import('./pages/admin/Customers'));
const Analytics_Admin = lazy(() => import('./pages/admin/Analytics'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const Projects = lazy(() => import('./pages/admin/Projects'));
const Gallery = lazy(() => import('./pages/admin/Gallery'));
const Testimonials = lazy(() => import('./pages/admin/Testimonials'));

// ─── Page Loading Fallback ────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      <p className="text-xs font-bold text-[#000d22]/60 uppercase tracking-widest">Loading...</p>
    </div>
  </div>
);

// ─── Protected Routes ─────────────────────────────────────────
const CustomerProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const AdminProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn } = useAdminAuth();
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" replace />;
};

// ─── Main App ─────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <Router>
          <ScrollToTop />
          {/* Analytics & Pixel — load inside <Router> for useLocation access */}
          <Analytics />
          <MetaPixel />

          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* ── Customer Routes ── */}
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

              {/* ── Admin Routes ── */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="enquiries" element={<Enquiries />} />
                <Route path="enquiries/:id" element={<EnquiryDetail />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="products" element={<Products />} />
                <Route path="customers" element={<Customers />} />
                <Route path="analytics" element={<Analytics_Admin />} />
                <Route path="projects" element={<Projects />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* ── 404 ── */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          <WhatsAppChatbot />
        </Router>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
