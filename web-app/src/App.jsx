import React, { useState, useEffect } from 'react';
import LandingPage from './pages/landingPage/LandingPage'
import { SmoothScroll } from './components/ui/SmoothScroll'
import Preloader from './components/landingPage/Preloader'
import { AnimatePresence } from 'framer-motion'

import { Toaster } from '@/components/ui/sonner'

function App() {
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
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" />
        ) : (
          <LandingPage key="landing" />
        )}
      </AnimatePresence>
      <Toaster position="top-center" expand={false} richColors />
    </SmoothScroll>
  )
}

export default App
