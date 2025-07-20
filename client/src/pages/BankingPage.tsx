import React from 'react';
import { Link } from 'react-router-dom';

const BankingPage: React.FC = () => {
  const bankingFeatures = [
    {
      title: 'Current Accounts',
      description: 'Get a fully-functional current account with integrated banking',
      icon: '🏦',
      link: '/current-accounts'
    },
    {
      title: 'Payouts',
      description: 'Automate bank transfers and bulk payouts',
      icon: '💸',
      link: '/payouts'
    },
    {
      title: 'Payout Links',
      description: 'Create and share payout links instantly',
      icon: '🔗',
      link: '/payout-links'
    },
    {
      title: 'Corporate Credit Card',
      description: 'VISA corporate credit cards for your business',
      icon: '💳',
      link: '/credit-card'
    },
    {
      title: 'Source to Pay',
      description: 'End-to-end procurement and payment solution',
      icon: '📋',
      link: '/source-to-pay'
    },
    {
      title: 'Forex & FDI',
      description: 'International transfers and foreign investments',
      icon: '🌍',
      link: '/forex'
    }
  ];

  const benefits = [
    'Zero balance current accounts',
    'Instant payouts to any bank',
    'Automated vendor payments',
    'Real-time transaction tracking',
    'Multi-user access controls',
    'Integrated accounting tools'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-bold text-blue-600">PayFlow</Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/payments" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Payments</Link>
                <Link to="/banking" className="text-blue-600 px-3 py-2 text-sm font-medium">Banking+</Link>
                <Link to="/payroll" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Payroll</Link>
                <Link to="/partners" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Partners</Link>
                <Link to="/resources" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Resources</Link>
                <Link to="/pricing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Pricing</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Login</Link>
              <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Effortless Banking
                <span className="block text-green-600">for India's boldest disruptors</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Powerful Automation | Smart Dashboard | Integrated Access
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
                  Sign Up Now
                </Link>
                <Link to="/demo" className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
                  Know More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">A</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Abhishek</p>
                      <p className="text-sm text-gray-500">MYGATE FOUNDER</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Current Account</span>
                    <span className="font-semibold text-gray-900">POWERS</span>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Available Balance</span>
                    <span className="font-semibold text-gray-900">₹ 20,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Balance</span>
                    <span className="font-semibold text-gray-900">₹ 10,000</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Account Statement</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Jan</span>
                    <span>FEB</span>
                    <span>MAR</span>
                    <span>APR</span>
                    <span>MAY</span>
                    <span>JUN</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Current Account Insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Banking Solutions</h2>
            <p className="text-xl text-gray-600">Everything you need to manage your business finances</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bankingFeatures.map((feature) => (
              <div key={feature.title} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link to={feature.link} className="text-green-600 font-semibold hover:text-green-700">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose PayFlow Banking+?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Supercharge your business banking experience with powerful automation, 
                smart dashboard, and integrated access to all financial processes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/signup" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Open Account
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Features</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Zero Balance</h4>
                    <p className="text-sm text-gray-600">No minimum balance requirement</p>
                  </div>
                  <div className="text-green-600 font-semibold">✓</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Instant Payouts</h4>
                    <p className="text-sm text-gray-600">Real-time transfers to any bank</p>
                  </div>
                  <div className="text-green-600 font-semibold">✓</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Multi-user Access</h4>
                    <p className="text-sm text-gray-600">Team collaboration features</p>
                  </div>
                  <div className="text-green-600 font-semibold">✓</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Analytics Dashboard</h4>
                    <p className="text-sm text-gray-600">Real-time insights and reports</p>
                  </div>
                  <div className="text-green-600 font-semibold">✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Seamless Integration</h2>
            <p className="text-xl text-gray-600">Connect with your existing tools and workflows</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['Tally', 'QuickBooks', 'Zoho', 'FreshBooks', 'Xero', 'SAP'].map((tool) => (
              <div key={tool} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gray-600 font-semibold">{tool}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{tool}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to supercharge your banking?</h2>
          <p className="text-xl text-green-100 mb-8">Join thousands of businesses using PayFlow Banking+</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Open Account
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">PayFlow</h3>
              <p className="text-gray-400 mb-4">
                The complete payment and banking solution for businesses of all sizes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/payments" className="hover:text-white">Payment Gateway</Link></li>
                <li><Link to="/banking" className="hover:text-white">Banking+</Link></li>
                <li><Link to="/payroll" className="hover:text-white">Payroll</Link></li>
                <li><Link to="/pos" className="hover:text-white">POS</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/docs" className="hover:text-white">Documentation</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/support" className="hover:text-white">Support</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PayFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BankingPage; 