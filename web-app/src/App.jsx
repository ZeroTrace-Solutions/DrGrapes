import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/landingPage/LandingPage'
import TermsOfService from './pages/legal/DocTerms'
import PrivacyPolicy from './pages/legal/DocPrivacy'
import { SmoothScroll } from './components/ui/SmoothScroll'
import Preloader from './components/landingPage/Preloader'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

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
    <AnimatePresence mode="wait">
      {loading ? (
        <Preloader key="preloader" />
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
      <Toaster position="top-center" expand={false} richColors />
    </Router>
  )
}

export default App

