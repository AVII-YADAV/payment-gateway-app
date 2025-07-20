import React from 'react';
import { Link } from 'react-router-dom';

const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">PayFlow</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Support</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="issue" className="block text-sm font-medium text-gray-700">Issue</label>
            <textarea id="issue" name="issue" rows={4} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Submit Ticket</button>
        </form>
        <div className="mt-12 text-gray-600">
          <p>Need more help? Visit our <Link to="/docs" className="text-blue-600 hover:underline">Documentation</Link> or <Link to="/contact" className="text-blue-600 hover:underline">Contact Us</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 