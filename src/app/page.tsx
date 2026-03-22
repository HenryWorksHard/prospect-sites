'use client'

// Business configuration - set via environment variables for each deployment
const businessData = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Pett Plumbing and Gas Adelaide',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '0477 894 446',
  location: process.env.NEXT_PUBLIC_BUSINESS_LOCATION || 'Adelaide, SA',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Adelaide SA',
  rating: process.env.NEXT_PUBLIC_BUSINESS_RATING || '5.0',
  reviews: process.env.NEXT_PUBLIC_BUSINESS_REVIEWS || '9',
}

const services = [
  {
    title: 'General Plumbing',
    description: 'Complete plumbing solutions for residential and commercial properties. From repairs to installations, we handle it all.',
  },
  {
    title: 'Gas Fitting',
    description: 'Licensed gas fitters for safe installation, repairs, and maintenance of all gas appliances and systems.',
  },
  {
    title: 'Emergency Repairs',
    description: 'Fast response times for urgent plumbing issues. Available when you need us most.',
  },
  {
    title: 'Hot Water Systems',
    description: 'Installation and repair of all hot water systems including gas, electric, and solar.',
  },
  {
    title: 'Blocked Drains',
    description: 'Professional drain cleaning and unblocking using modern equipment and techniques.',
  },
  {
    title: 'Leak Detection',
    description: 'Advanced leak detection to find and fix hidden water leaks before they cause damage.',
  },
]

export default function Home() {
  const handleCall = () => {
    window.location.href = `tel:${businessData.phone.replace(/\s/g, '')}`
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{businessData.name}</h1>
            <p className="text-sm text-blue-200">{businessData.location}</p>
          </div>
          <button
            onClick={handleCall}
            className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Call Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Plumbing Services in {businessData.location}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Licensed and insured plumbers delivering quality workmanship and reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCall}
              className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              {businessData.phone}
            </button>
            <a
              href="#services"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Our Services
            </a>
          </div>
          <div className="mt-8 flex justify-center items-center gap-2">
            <span className="text-yellow-300">★★★★★</span>
            <span className="text-blue-100">
              {businessData.rating} rating ({businessData.reviews} reviews on Google)
            </span>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">Licensed</div>
              <p className="text-gray-600">Fully licensed plumbers</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">Insured</div>
              <p className="text-gray-600">Complete peace of mind</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">Local</div>
              <p className="text-gray-600">Serving {businessData.location}</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">{businessData.rating}★</div>
              <p className="text-gray-600">{businessData.reviews} Google reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Our Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary rounded-full"></div>
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose {businessData.name}?</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Quality Workmanship</h4>
                <p className="text-gray-600">Every job is completed to the highest standards, ensuring lasting results you can trust.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Transparent Pricing</h4>
                <p className="text-gray-600">No hidden fees or surprises. You'll know exactly what you're paying before we start.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Fast Response</h4>
                <p className="text-gray-600">We understand plumbing emergencies can't wait. Quick response times when you need us.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Local Knowledge</h4>
                <p className="text-gray-600">Years of experience serving {businessData.location} means we understand local plumbing needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Contact us today for a free quote on your plumbing needs.
          </p>
          <button
            onClick={handleCall}
            className="bg-white text-primary px-12 py-4 rounded-lg font-bold text-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            Call {businessData.phone}
          </button>
          <p className="mt-6 text-blue-200">
            Serving {businessData.address}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">{businessData.name}</h4>
              <p className="mb-2">{businessData.address}</p>
              <p>{businessData.phone}</p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                <li>General Plumbing</li>
                <li>Gas Fitting</li>
                <li>Emergency Repairs</li>
                <li>Hot Water Systems</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Service Areas</h4>
              <p>{businessData.location} and surrounding suburbs</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} {businessData.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
