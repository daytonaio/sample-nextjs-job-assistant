import React from 'react';
import Career from '../assets/img/career.png';
import Housing from '../assets/img/housing.png';
import Legal from '../assets/img/legal.png';

const FeaturesSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">More than just a tool</h2>
        <p className="text-gray-600 mb-12">Explore what else we can do for you</p>

        {/* Grid layout for responsive cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {/* Career Feature */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4 p-8">
              <img src={Career} alt="Career Icon" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Career Assistance</h3>
            <p className="text-gray-600">Tailored job search assistance.</p>
          </div>

          {/* Housing Feature */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4 p-8">
              <img src={Housing} alt="Housing Icon" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mental Health Support</h3>
            <p className="text-gray-600">Guidance on mental health resources and counseling services</p>
          </div>

          {/* Legal Feature */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <div className="flex justify-center mb-4 p-8">
              <img src={Legal} alt="Legal Icon" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Legal Support</h3>
            <p className="text-gray-600">Guidance on legal right and record expungement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
