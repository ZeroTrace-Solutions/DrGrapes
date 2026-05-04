import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/landingPage/LandingPage'
import TermsOfService from './pages/legal/DocTerms'
import PrivacyPolicy from './pages/legal/DocPrivacy'
import { SmoothScroll } from './components/ui/SmoothScroll'
import Preloader from './components/landingPage/Preloader'
import { AnimatePresence } from 'framer-motion'
import LoginPage from './pages/loginPage/LoginPage'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from './context/AuthContext'
import AdminLayout from './layouts/AdminLayout'
import DashboardOverview from './pages/admin/DashboardOverview'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import ProtectedRoute from './components/auth/ProtectedRoute'
import RoleRouter from './components/auth/RoleRouter'

function AppContent() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('hasLoaded');
    }
    return true;
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasLoaded', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading ? (
        <Preloader key="preloader" />
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/router" element={<RoleRouter />} />

          <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
            <Route path="/market" element={<div className="h-screen flex items-center justify-center bg-[#0c0f0f] text-foreground font-black text-4xl">MARKET PLACE</div>} />
          </Route>

          {/* Admin & Supplier Dashboard Routes - Protected */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPPLIER_DELIVERY', 'SUPPLIER_NO_DELIVERY']} />}>
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route path="admin" element={<DashboardOverview />} />
              <Route path="supplier/d" element={<DashboardOverview />} />
              <Route path="supplier/nd" element={<DashboardOverview />} />
            </Route>
          </Route>
        </Routes>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <SmoothScroll>
          <AppContent />
        </SmoothScroll>
        <Toaster position="top-center" expand={false} richColors />
      </AuthProvider>
    </Router>
  )
}

export default App;
