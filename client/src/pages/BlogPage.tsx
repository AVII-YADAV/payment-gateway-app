import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
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
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
        <ul className="space-y-6">
          <li className="border-b pb-4">
            <Link to="#" className="text-2xl font-semibold text-blue-600 hover:underline">How to Integrate PayFlow with Your Website</Link>
            <p className="text-gray-600 mt-2">A step-by-step guide to integrating PayFlow payment gateway.</p>
          </li>
          <li className="border-b pb-4">
            <Link to="#" className="text-2xl font-semibold text-blue-600 hover:underline">Top 5 Payment Trends in 2024</Link>
            <p className="text-gray-600 mt-2">Stay ahead with the latest payment technology trends.</p>
          </li>
          <li className="border-b pb-4">
            <Link to="#" className="text-2xl font-semibold text-blue-600 hover:underline">Why Choose PayFlow for Your Business?</Link>
            <p className="text-gray-600 mt-2">Discover the benefits of using PayFlow for your business payments.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogPage; 