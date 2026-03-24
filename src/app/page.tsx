'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Business configuration - set via environment variables for each deployment
const businessData = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Pett Plumbing and Gas Adelaide',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '0477 894 446',
  location: process.env.NEXT_PUBLIC_BUSINESS_LOCATION || 'Adelaide, SA',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Adelaide SA',
  rating: process.env.NEXT_PUBLIC_BUSINESS_RATING || '5.0',
  reviews: process.env.NEXT_PUBLIC_BUSINESS_REVIEWS || '9',
  googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || '',
  // Real testimonials from Google Reviews (pipe-separated: "Name|Text|Name|Text...")
  realReviews: process.env.NEXT_PUBLIC_REAL_REVIEWS || '',
}

const services = [
  {
    title: 'Leak Detection',
    description: 'Advanced technology to locate and repair hidden leaks before they cause damage.',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    title: 'Drain Cleaning',
    description: 'Effective unclogging and thorough drain cleaning solutions.',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  },
  {
    title: 'Hot Water Systems',
    description: 'Professional installation, service and repair of water heaters.',
    icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z',
  },
  {
    title: 'Bathroom & Kitchen',
    description: 'Comprehensive plumbing services for kitchens and bathrooms.',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    title: 'Gas Fitting',
    description: 'Licensed gas fitters for safe installation and maintenance.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Pipe Repair',
    description: 'Reliable repair and replacement services for damaged pipes.',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
]

// Default testimonials (used if no real reviews provided)
const defaultTestimonials = [
  {
    name: 'Sarah M.',
    text: 'Incredible service! They arrived within 30 minutes and fixed our emergency leak. Highly professional team.',
    source: 'Google',
  },
  {
    name: 'James W.',
    text: `Best plumbers in ${businessData.location.split(',')[0]}. Fair pricing, quality work, and they cleaned up after themselves.`,
    source: 'Google',
  },
  {
    name: 'Emma T.',
    text: 'Called them for a blocked drain at 10pm. They came out same night and sorted it. Lifesavers!',
    source: 'Google',
  },
  {
    name: 'Michael C.',
    text: 'Very impressed with their hot water system installation. Efficient and reasonably priced.',
    source: 'Google',
  },
]

// Parse real reviews from env var (format: "Name|Review text|Name|Review text...")
function parseRealReviews(): { name: string; text: string; source: string }[] {
  if (!businessData.realReviews) return defaultTestimonials
  
  const parts = businessData.realReviews.split('|')
  const reviews: { name: string; text: string; source: string }[] = []
  
  for (let i = 0; i < parts.length - 1; i += 2) {
    reviews.push({
      name: parts[i].trim(),
      text: parts[i + 1].trim(),
      source: 'Google',
    })
  }
  
  return reviews.length > 0 ? reviews : defaultTestimonials
}

const testimonials = parseRealReviews()

const faqs = [
  {
    question: 'Are your plumbers licensed and insured?',
    answer: 'Yes, all our plumbers are fully licensed, insured, and have undergone extensive training to ensure they provide the highest quality service.',
  },
  {
    question: 'Do you offer free quotes?',
    answer: 'Absolutely! We provide free, no-obligation quotes for all plumbing work. Just give us a call or fill out our contact form.',
  },
  {
    question: 'What are your service hours?',
    answer: 'We offer 24/7 emergency plumbing services. For non-urgent work, we\'re available Monday to Saturday, 7am to 6pm.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, credit/debit cards, bank transfer, and offer payment plans for larger jobs.',
  },
]

// Stock images
const heroImage = 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&h=1000&fit=crop'
const aboutImage = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop'


// Animated text component
function AnimatedHeading({ children, className = '' }: { children: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const words = children.split(' ')

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
        >
          <span
            className={`inline-block transition-all duration-500 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0'
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </h2>
  )
}

// FAQ Accordion Item
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left hover:text-primary transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        <span className={`text-2xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-40 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeReviewIndex, setActiveReviewIndex] = useState(0)
  const reviewsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle review slider scroll for indicators
  useEffect(() => {
    const container = reviewsContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const cardWidth = container.firstElementChild?.clientWidth || 320
      const index = Math.round(scrollLeft / (cardWidth + 16)) // 16px gap
      setActiveReviewIndex(Math.min(index, testimonials.length - 1))
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on navigation
  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const handleCall = () => {
    window.location.href = `tel:${businessData.phone.replace(/\s/g, '')}`
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg py-3' : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg sm:text-xl text-gray-900 truncate max-w-[200px] sm:max-w-none">{businessData.name}</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-600 hover:text-primary transition-colors">Services</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
            <a href="#reviews" className="text-gray-600 hover:text-primary transition-colors">Reviews</a>
            <a href="#faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <a href={`tel:${businessData.phone.replace(/\s/g, '')}`} className="hidden sm:flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">{businessData.phone}</span>
            </a>
            <button
              onClick={handleCall}
              className="hidden sm:block bg-primary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Contact
            </button>
            
            {/* Mobile call button */}
            <a
              href={`tel:${businessData.phone.replace(/\s/g, '')}`}
              className="sm:hidden bg-primary text-white p-2.5 rounded-full"
              aria-label="Call us"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            
            {/* Hamburger menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <span className="font-bold text-lg text-gray-900">{businessData.name}</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-700"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col p-4 gap-2">
            <a href="#services" onClick={handleNavClick} className="py-4 text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100">Services</a>
            <a href="#about" onClick={handleNavClick} className="py-4 text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100">About</a>
            <a href="#reviews" onClick={handleNavClick} className="py-4 text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100">Reviews</a>
            <a href="#faq" onClick={handleNavClick} className="py-4 text-lg font-medium text-gray-700 hover:text-primary border-b border-gray-100">FAQ</a>
          </nav>
          <div className="mt-auto p-4 border-t">
            <a
              href={`tel:${businessData.phone.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-full font-bold text-lg w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {businessData.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-8 sm:pt-24 sm:pb-12 md:pt-32 md:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                Your trusted{' '}
                <span className="text-primary">plumbing solutions</span>{' '}
                in {businessData.location}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
                With years of experience, we&apos;ve built a reputation for delivering top-notch plumbing solutions tailored to meet your needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <a
                  href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                  className="bg-primary text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-primary-dark transition-all hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call {businessData.phone}
                </a>
                <a
                  href="#services"
                  className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:border-primary hover:text-primary transition-all flex items-center justify-center min-h-[48px]"
                >
                  Our Services
                </a>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {testimonials.slice(0, 4).map((t, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-primary/20 flex items-center justify-center"
                    >
                      <span className="text-primary font-bold text-sm">{t.name.charAt(0)}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[1,2,3,4,5].map((i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">{businessData.rating}</span> from {businessData.reviews}+ reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="bg-yellow-400 rounded-3xl overflow-hidden aspect-[4/5] relative">
                <Image
                  src={heroImage}
                  alt="Professional Plumber"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Licensed & Insured</p>
                  <p className="text-sm text-gray-500">Fully certified team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1: Call */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">Call us {businessData.phone.split(' ')[0]}</h3>
                <p className="text-gray-600 text-sm sm:text-base">We remain available 24/7 for any plumbing emergency.</p>
              </div>
              <div className="hidden md:block text-gray-300 text-3xl step-arrows">→</div>
            </div>

            {/* Step 2: Evaluate */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">Expert evaluation</h3>
                <p className="text-gray-600 text-sm sm:text-base">Our experts will evaluate the situation and find solutions.</p>
              </div>
              <div className="hidden md:block text-gray-300 text-3xl step-arrows">→</div>
            </div>

            {/* Step 3: Arrive */}
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1">We arrive in 30 minutes</h3>
                <p className="text-gray-600 text-sm sm:text-base">Our team will arrive with all the necessary equipment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Card with Hover */}
            <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
              <div className="aspect-[4/3] relative">
                <Image
                  src={aboutImage}
                  alt="Expert Plumber at Work"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <h3 className="text-white text-2xl font-bold group-hover:translate-x-2 transition-transform">
                  Learn more about us →
                </h3>
              </div>
            </div>

            {/* Content */}
            <div>
              <AnimatedHeading className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Plumbing solutions tailored to your needs
              </AnimatedHeading>
              <p className="text-lg text-gray-600 mb-8">
                Our team of licensed and experienced plumbers is committed to providing prompt, professional, and courteous service, ensuring that your plumbing system is always in optimal condition.
              </p>

              <div className="space-y-4">
                {[
                  'Experienced and certified plumbers',
                  'High-quality materials and equipment',
                  'Customer satisfaction guarantee',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <AnimatedHeading className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our services
            </AnimatedHeading>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We offer a comprehensive range of plumbing services designed to address all your plumbing needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all hover:-translate-y-2 cursor-pointer group"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-blue-100">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Emergency CTA */}
          <div className="mt-12 bg-yellow-400 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Have a plumbing emergency?
            </h3>
            <button
              onClick={handleCall}
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all hover:shadow-lg"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <AnimatedHeading className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your questions, answered
              </AnimatedHeading>
              <p className="text-lg text-gray-600 mb-6">
                Answers to the most common questions our customers have. If you don&apos;t find the information you&apos;re looking for, feel free to contact us.
              </p>
              <button
                onClick={handleCall}
                className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-all"
              >
                Contact Us
              </button>
            </div>

            <div>
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <AnimatedHeading className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What our customers say
            </AnimatedHeading>
            <p className="text-base sm:text-lg text-gray-600">
              Our customers are at the heart of everything we do.
            </p>
          </div>

          {/* Mobile: Horizontal scroll slider / Desktop: Auto-scroll */}
          <div className="relative">
            {/* Mobile slider with scroll-snap */}
            <div 
              ref={reviewsContainerRef}
              className="reviews-slider md:flex md:gap-6 md:animate-scroll"
            >
              {/* On mobile show original testimonials, on desktop duplicate for infinite scroll */}
              {testimonials.map((testimonial, i) => (
                <div
                  key={`mobile-${i}`}
                  className="review-card md:hidden flex-shrink-0 w-[calc(100vw-2rem)] max-w-[320px] bg-white rounded-2xl p-5 sm:p-6 shadow-lg"
                >
                  <div className="flex gap-1 text-yellow-400 mb-3 sm:mb-4">
                    {[1,2,3,4,5].map((j) => (
                      <svg key={j} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-base sm:text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">Review on {testimonial.source}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Desktop: duplicated for infinite scroll */}
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <div
                  key={`desktop-${i}`}
                  className="hidden md:block flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[1,2,3,4,5].map((j) => (
                      <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">Review on {testimonial.source}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile scroll indicators */}
            <div className="scroll-indicators md:hidden">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`scroll-indicator ${i === activeReviewIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need a plumber fast?
          </h2>
          <button
            onClick={handleCall}
            className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-full font-bold text-xl hover:bg-yellow-300 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            Call Us {businessData.phone}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-xl text-white">{businessData.name}</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Top-notch residential and commercial plumbing service in {businessData.location} and surrounding areas.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', name: 'Facebook' },
                  { icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', name: 'Twitter' },
                  { icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z', name: 'Instagram' },
                  { icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z', name: 'YouTube' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5 fill-current text-gray-400 hover:text-white" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">{businessData.location}</h4>
              <p className="mb-2">{businessData.address}</p>
              <p className="mb-4">{businessData.phone}</p>
              {businessData.googleMapsUrl ? (
                <a href={businessData.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View on Google →</a>
              ) : (
                <span className="text-gray-500">View on Google →</span>
              )}
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} {businessData.name}. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
