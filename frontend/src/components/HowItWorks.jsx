import React from 'react';

function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Find and book services in just a few simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "01", title: "Search", desc: "Find the service you need" },
            { number: "02", title: "Compare", desc: "Read reviews and compare prices" },
            { number: "03", title: "Book", desc: "Schedule and pay securely" }
          ].map((step, i) => (
            <div key={i} className="relative">
              <div className="text-8xl font-bold text-teal-100 absolute -top-10 left-0">{step.number}</div>
              <div className="relative bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;