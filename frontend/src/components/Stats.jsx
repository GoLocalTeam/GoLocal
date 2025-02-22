import React from 'react';

function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">10,000+</div>
            <div className="text-lg">Service Providers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50,000+</div>
            <div className="text-lg">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-lg">Service Categories</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;