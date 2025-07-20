import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PaymentsPage from './pages/PaymentsPage';
import BankingPage from './pages/BankingPage';
import PayrollPage from './pages/PayrollPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SupportPage from './pages/SupportPage';
import BlogPage from './pages/BlogPage';
import DocsPage from './pages/DocsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/banking" element={<BankingPage />} />
        <Route path="/payroll" element={<PayrollPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/docs" element={<DocsPage />} />
        
        {/* Additional routes for sub-pages */}
        <Route path="/gateway" element={<PaymentsPage />} />
        <Route path="/links" element={<PaymentsPage />} />
        <Route path="/pages" element={<PaymentsPage />} />
        <Route path="/qr" element={<PaymentsPage />} />
        <Route path="/subscriptions" element={<PaymentsPage />} />
        <Route path="/smart-collect" element={<PaymentsPage />} />
        <Route path="/current-accounts" element={<BankingPage />} />
        <Route path="/payouts" element={<BankingPage />} />
        <Route path="/payout-links" element={<BankingPage />} />
        <Route path="/credit-card" element={<BankingPage />} />
        <Route path="/source-to-pay" element={<BankingPage />} />
        <Route path="/forex" element={<BankingPage />} />
        <Route path="/automated-payroll" element={<PayrollPage />} />
        <Route path="/compliance" element={<PayrollPage />} />
        <Route path="/employee-portal" element={<PayrollPage />} />
        <Route path="/tax-filing" element={<PayrollPage />} />
        <Route path="/benefits" element={<PayrollPage />} />
        <Route path="/reports" element={<PayrollPage />} />
        <Route path="/demo" element={<HomePage />} />
        <Route path="/careers" element={<AboutPage />} />
        <Route path="/privacy" element={<AboutPage />} />
        <Route path="/partners" element={<AboutPage />} />
        <Route path="/resources" element={<DocsPage />} />
        <Route path="/pos" element={<PaymentsPage />} />
        
        {/* 404 Catch-all route - must be last */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App; 