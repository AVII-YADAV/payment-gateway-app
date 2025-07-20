import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">PG</span>
              </div>
              <span className="text-2xl font-bold gradient-text">PaymentGateway</span>
            </Link>
          </div>

          {/* Auth Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8"
          >
            <Outlet />
          </motion.div>

          {/* Footer links */}
          <div className="text-center space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                ← Back to Home
              </Link>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              © 2024 PaymentGateway. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-primary-600 to-purple-600 p-8">
        <div className="max-w-lg text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            {/* SVG Illustration */}
            <svg
              className="w-64 h-64 mx-auto"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circles */}
              <circle cx="100" cy="100" r="80" fill="rgba(255,255,255,0.1)" />
              <circle cx="100" cy="100" r="60" fill="rgba(255,255,255,0.1)" />
              <circle cx="100" cy="100" r="40" fill="rgba(255,255,255,0.1)" />
              
              {/* Payment card */}
              <rect x="60" y="70" width="80" height="50" rx="8" fill="rgba(255,255,255,0.9)" />
              <rect x="70" y="80" width="40" height="8" rx="4" fill="#3B82F6" />
              <rect x="70" y="95" width="20" height="8" rx="4" fill="#6B7280" />
              <rect x="70" y="105" width="30" height="8" rx="4" fill="#6B7280" />
              
              {/* Security shield */}
              <path
                d="M100 40 L120 50 L120 70 Q120 85 100 95 Q80 85 80 70 L80 50 Z"
                fill="rgba(255,255,255,0.9)"
              />
              <path
                d="M100 50 L110 55 L110 70 Q110 80 100 85 Q90 80 90 70 L90 55 Z"
                fill="#10B981"
              />
              
              {/* Floating elements */}
              <circle cx="40" cy="60" r="4" fill="rgba(255,255,255,0.6)" />
              <circle cx="160" cy="80" r="3" fill="rgba(255,255,255,0.6)" />
              <circle cx="50" cy="140" r="5" fill="rgba(255,255,255,0.6)" />
              <circle cx="150" cy="130" r="4" fill="rgba(255,255,255,0.6)" />
            </svg>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Secure Payment Processing
            </h2>
            <p className="text-lg text-primary-100 leading-relaxed">
              Join thousands of businesses using our secure payment gateway to accept payments online. 
              Fast, reliable, and trusted by merchants worldwide.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex justify-center space-x-6"
          >
            {/* Feature highlights */}
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium">Secure</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium">Reliable</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium">Fast</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 