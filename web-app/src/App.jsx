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
import DashboardOverview from './pages/admin/dashboard/DashboardOverview'
import AdminProfilePage from './pages/admin/profile/AdminProfilePage'
import LevelsPage from './pages/admin/questions/LevelsPage'
import ModulesPage from './pages/admin/questions/ModulesPage'
import SubjectsPage from './pages/admin/questions/SubjectsPage'
import ExamsPage from './pages/admin/questions/ExamsPage'
import AddQuestionsPage from './pages/admin/questions/AddQuestionsPage'
import UsersPage from './pages/admin/entities/UsersPage'
import AdminsPage from './pages/admin/entities/AdminsPage'
import SubadminsPage from './pages/admin/entities/SubadminsPage'
import SuppliersNoDeliveryPage from './pages/admin/entities/SuppliersNoDeliveryPage'
import SuppliersDeliveryPage from './pages/admin/entities/SuppliersDeliveryPage'
import ProductsPage from './pages/admin/ProductsPage'
import OrdersPage from './pages/admin/OrdersPage'
import SalesPage from './pages/admin/SalesPage'
import ProfitPage from './pages/admin/finance/ProfitPage'
import SalariesPage from './pages/admin/finance/SalariesPage'
import ExpensesPage from './pages/admin/finance/ExpensesPage'
import { Outlet } from 'react-router-dom'

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
              <Route path="admin">
                <Route index element={<DashboardOverview />} />
                <Route path="overview" element={<DashboardOverview />} />
                <Route path="profile" element={<AdminProfilePage />} />

                {/* Questions Bank */}
                <Route path="questions/levels" element={<LevelsPage />} />
                <Route path="questions/modules" element={<ModulesPage />} />
                <Route path="questions/subjects" element={<SubjectsPage />} />
                <Route path="questions/exams" element={<ExamsPage />} />
                <Route path="questions/add" element={<AddQuestionsPage />} />

                {/* Entities */}
                <Route path="entities/users" element={<UsersPage />} />
                <Route path="entities/admins" element={<AdminsPage />} />
                <Route path="entities/subadmins" element={<SubadminsPage />} />
                <Route path="entities/suppliers-no-delivery" element={<SuppliersNoDeliveryPage />} />
                <Route path="entities/suppliers-delivery" element={<SuppliersDeliveryPage />} />

                {/* Platform */}
                <Route path="products" element={<ProductsPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="sales" element={<SalesPage />} />

                {/* Finance */}
                <Route path="finance/profit" element={<ProfitPage />} />
                <Route path="finance/salaries" element={<SalariesPage />} />
                <Route path="finance/expenses" element={<ExpensesPage />} />
              </Route>

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
