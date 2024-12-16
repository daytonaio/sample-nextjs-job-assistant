import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaHeartbeat, FaGavel } from 'react-icons/fa';

const Services = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-8">Choose the Service You Need</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Job Assistance Card */}
          <Link to="/job-assistance" className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="flex items-center">
              <FaBriefcase className="text-blue-600 w-12 h-12 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Job Assistance</h3>
                <p className="text-gray-600">Get personalized job search support, resume help, and more.</p>
              </div>
            </div>
          </Link>

          {/* Mental Health Support Card */}
          <Link to="/mental-support" className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="flex items-center">
              <FaHeartbeat className="text-pink-600 w-12 h-12 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Mental Health Support</h3>
                <p className="text-gray-600">Access counseling, therapy, and emotional support resources.</p>
              </div>
            </div>
          </Link>

          {/* Legal Support Card */}
          <Link to="/legal-support" className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <div className="flex items-center">
              <FaGavel className="text-green-600 w-12 h-12 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">Legal Support</h3>
                <p className="text-gray-600">Get help with legal matters, including advice and representation.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
