import React from 'react';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const paymentPlans = [
    {
      name: 'Standard',
      price: '2.5%',
      description: 'per successful transaction',
      features: [
        'All payment methods',
        'Dashboard access',
        'Basic support',
        'Standard settlement',
        'Webhook support',
        'API access'
      ],
      popular: false,
      color: 'blue'
    },
    {
      name: 'Professional',
      price: '2.0%',
      description: 'per successful transaction',
      features: [
        'Everything in Standard',
        'Priority support',
        'Advanced analytics',
        'Faster settlement',
        'Custom branding',
        'Dedicated account manager'
      ],
      popular: true,
      color: 'blue'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'volume-based pricing',
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantees',
        'On-premise options',
        'Custom features'
      ],
      popular: false,
      color: 'blue'
    }
  ];

  const bankingPlans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'forever',
      features: [
        'Zero balance account',
        'Basic payouts',
        'Standard support',
        'Mobile app access',
        'Transaction history',
        'Basic reports'
      ],
      popular: false,
      color: 'green'
    },
    {
      name: 'Professional',
      price: '₹999',
      description: 'per month',
      features: [
        'Everything in Basic',
        'Unlimited payouts',
        'Priority support',
        'Advanced analytics',
        'Multi-user access',
        'API integration'
      ],
      popular: true,
      color: 'green'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'volume-based pricing',
      features: [
        'Everything in Professional',
        'Custom features',
        'Dedicated support',
        'SLA guarantees',
        'White-label options',
        'Custom integrations'
      ],
      popular: false,
      color: 'green'
    }
  ];

  const payrollPlans = [
    {
      name: 'Starter',
      price: '₹50',
      description: 'per employee per month',
      features: [
        'Up to 50 employees',
        'Basic payroll processing',
        'Email support',
        'Standard compliance',
        'Employee portal',
        'Basic reports'
      ],
      popular: false,
      color: 'purple'
    },
    {
      name: 'Professional',
      price: '₹75',
      description: 'per employee per month',
      features: [
        'Up to 200 employees',
        'Advanced compliance',
        'Priority support',
        'Advanced analytics',
        'Custom workflows',
        'API integration'
      ],
      popular: true,
      color: 'purple'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'volume-based pricing',
      features: [
        'Unlimited employees',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantees',
        'White-label options',
        'Custom features'
      ],
      popular: false,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-600',
          text: 'text-blue-600',
          border: 'border-blue-600',
          hover: 'hover:bg-blue-700',
          light: 'bg-blue-50',
          dark: 'bg-blue-600'
        };
      case 'green':
        return {
          bg: 'bg-green-600',
          text: 'text-green-600',
          border: 'border-green-600',
          hover: 'hover:bg-green-700',
          light: 'bg-green-50',
          dark: 'bg-green-600'
        };
      case 'purple':
        return {
          bg: 'bg-purple-600',
          text: 'text-purple-600',
          border: 'border-purple-600',
          hover: 'hover:bg-purple-700',
          light: 'bg-purple-50',
          dark: 'bg-purple-600'
        };
      default:
        return {
          bg: 'bg-blue-600',
          text: 'text-blue-600',
          border: 'border-blue-600',
          hover: 'hover:bg-blue-700',
          light: 'bg-blue-50',
          dark: 'bg-blue-600'
        };
    }
  };

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
                <Link to="/banking" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Banking+</Link>
                <Link to="/payroll" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Payroll</Link>
                <Link to="/partners" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Partners</Link>
                <Link to="/resources" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Resources</Link>
                <Link to="/pricing" className="text-blue-600 px-3 py-2 text-sm font-medium">Pricing</Link>
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
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your business. No hidden fees, no setup costs. 
            Scale as you grow.
          </p>
        </div>
      </section>

      {/* Payment Gateway Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Payment Gateway</h2>
            <p className="text-xl text-gray-600">Accept payments online with transparent pricing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paymentPlans.map((plan) => {
              const colors = getColorClasses(plan.color);
              return (
                <div key={plan.name} className={`relative ${plan.popular ? `${colors.dark} text-white` : 'bg-white border border-gray-200'} rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className={`text-4xl font-bold mb-2 ${plan.popular ? 'text-white' : colors.text}`}>{plan.price}</div>
                  <p className={`mb-8 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg className={`w-5 h-5 ${plan.popular ? 'text-blue-200' : 'text-green-500'} mr-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={plan.popular ? 'text-blue-100' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/signup" 
                    className={`w-full ${plan.popular ? 'bg-white text-blue-600 hover:bg-gray-50' : `${colors.bg} text-white ${colors.hover}`} py-3 rounded-lg font-semibold transition-colors block text-center`}
                  >
                    Get Started
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Banking+ Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Banking+</h2>
            <p className="text-xl text-gray-600">Supercharge your business banking experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bankingPlans.map((plan) => {
              const colors = getColorClasses(plan.color);
              return (
                <div key={plan.name} className={`relative ${plan.popular ? `${colors.dark} text-white` : 'bg-white border border-gray-200'} rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className={`text-4xl font-bold mb-2 ${plan.popular ? 'text-white' : colors.text}`}>{plan.price}</div>
                  <p className={`mb-8 ${plan.popular ? 'text-green-100' : 'text-gray-600'}`}>{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg className={`w-5 h-5 ${plan.popular ? 'text-green-200' : 'text-green-500'} mr-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={plan.popular ? 'text-green-100' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/signup" 
                    className={`w-full ${plan.popular ? 'bg-white text-green-600 hover:bg-gray-50' : `${colors.bg} text-white ${colors.hover}`} py-3 rounded-lg font-semibold transition-colors block text-center`}
                  >
                    Get Started
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payroll Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Payroll</h2>
            <p className="text-xl text-gray-600">Automated payroll and compliance management</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {payrollPlans.map((plan) => {
              const colors = getColorClasses(plan.color);
              return (
                <div key={plan.name} className={`relative ${plan.popular ? `${colors.dark} text-white` : 'bg-white border border-gray-200'} rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className={`text-4xl font-bold mb-2 ${plan.popular ? 'text-white' : colors.text}`}>{plan.price}</div>
                  <p className={`mb-8 ${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg className={`w-5 h-5 ${plan.popular ? 'text-purple-200' : 'text-green-500'} mr-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className={plan.popular ? 'text-purple-100' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/signup" 
                    className={`w-full ${plan.popular ? 'bg-white text-purple-600 hover:bg-gray-50' : `${colors.bg} text-white ${colors.hover}`} py-3 rounded-lg font-semibold transition-colors block text-center`}
                  >
                    Get Started
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our pricing</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Are there any setup fees?</h3>
              <p className="text-gray-600">No, there are no setup fees or hidden charges. You only pay for successful transactions.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Can I change my plan later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What payment methods are supported?</h3>
              <p className="text-gray-600">We support 100+ payment methods including UPI, cards, netbanking, wallets, and more.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Is there a minimum transaction volume?</h3>
              <p className="text-gray-600">No minimum transaction volume required. Start accepting payments from day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of businesses that trust PayFlow</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Free Trial
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
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
              <h3 className="text-2xl font-bold text-blue-400 mb-4">PayFlow</h3>
              <p className="text-gray-400 mb-4">
                The complete payment solution for businesses of all sizes.
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

export default PricingPage; 