import React, { useState, useEffect } from 'react';
import LandingPage from './pages/landingPage/LandingPage'
import { SmoothScroll } from './components/ui/SmoothScroll'
import Preloader from './components/landingPage/Preloader'
import { AnimatePresence } from 'framer-motion'

import { Toaster } from '@/components/ui/sonner'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Duration matches preloader animation
    return () => clearTimeout(timer);
  }, []);

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
