'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-black">
                <span style={{ color: 'var(--pmd-orange)' }}>PMD</span> Consulting
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('home')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">Home</button>
                <button onClick={() => scrollToSection('services')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">Services</button>
                <button onClick={() => scrollToSection('about')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">About</button>
                <button onClick={() => scrollToSection('team')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">Team</button>
                <button onClick={() => scrollToSection('contact')} className="text-black hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors">Contact</button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black hover:text-orange-500 focus:outline-none focus:text-orange-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection('home')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">Home</button>
              <button onClick={() => scrollToSection('services')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">Services</button>
              <button onClick={() => scrollToSection('about')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">About</button>
              <button onClick={() => scrollToSection('team')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">Team</button>
              <button onClick={() => scrollToSection('contact')} className="text-black hover:text-orange-500 block px-3 py-2 text-base font-medium">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
              Transform Your Business with
              <span style={{ color: 'var(--pmd-orange)' }}> PMD Consulting</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Strategic solutions that drive growth, innovation, and sustainable success for forward-thinking organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('services')}
                className="btn-primary bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg"
              >
                Explore Our Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-300 rounded-full opacity-30"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our <span style={{ color: 'var(--pmd-orange)' }}>Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive consulting solutions tailored to your unique business challenges and growth objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Strategic Planning",
                description: "Develop comprehensive business strategies that align with your vision and market opportunities.",
                icon: "🎯"
              },
              {
                title: "Digital Transformation",
                description: "Modernize your operations with cutting-edge technology solutions and digital strategies.",
                icon: "💻"
              },
              {
                title: "Process Optimization",
                description: "Streamline workflows and improve efficiency through data-driven process improvements.",
                icon: "⚡"
              },
              {
                title: "Market Analysis",
                description: "Deep-dive market research and competitive analysis to inform strategic decisions.",
                icon: "📊"
              },
              {
                title: "Change Management",
                description: "Guide your organization through successful transitions and cultural transformations.",
                icon: "🔄"
              },
              {
                title: "Performance Consulting",
                description: "Optimize team performance and organizational effectiveness through proven methodologies.",
                icon: "📈"
              }
            ].map((service, index) => (
              <div key={index} className="service-card bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-black mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                About <span style={{ color: 'var(--pmd-orange)' }}>PMD Consulting</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded with a vision to transform businesses through strategic innovation, PMD Consulting has been at the forefront of organizational excellence for over a decade.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of seasoned consultants brings together decades of experience across industries, delivering measurable results that drive sustainable growth and competitive advantage.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">98%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="animate-fade-in">
              <div className="bg-orange-500 h-96 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🏢</div>
                    <h3 className="text-2xl font-bold mb-2">Your Success Partner</h3>
                    <p className="text-orange-100">Building tomorrow's leaders today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Meet Our <span style={{ color: 'var(--pmd-orange)' }}>Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to delivering exceptional results for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Managing Partner",
                bio: "20+ years of strategic consulting experience across Fortune 500 companies.",
                avatar: "👩‍💼"
              },
              {
                name: "Michael Chen",
                role: "Senior Consultant",
                bio: "Expert in digital transformation and technology strategy implementation.",
                avatar: "👨‍💻"
              },
              {
                name: "Emily Rodriguez",
                role: "Operations Specialist",
                bio: "Specialized in process optimization and organizational development.",
                avatar: "👩‍🔧"
              }
            ].map((member, index) => (
              <div key={index} className="service-card bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                <p className="text-orange-500 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              What Our <span style={{ color: 'var(--pmd-orange)' }}>Clients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "PMD Consulting transformed our business strategy and helped us achieve 40% growth in just one year.",
                author: "Jennifer Smith",
                company: "TechCorp Inc."
              },
              {
                quote: "Their expertise in digital transformation was invaluable. We're now leading our industry in innovation.",
                author: "David Wilson",
                company: "Global Solutions"
              },
              {
                quote: "Professional, results-driven, and truly committed to our success. Highly recommended!",
                author: "Maria Garcia",
                company: "InnovateCo"
              }
            ].map((testimonial, index) => (
              <div key={index} className="service-card bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="text-orange-500 text-2xl mb-4">"</div>
                <p className="text-gray-600 mb-6 italic">{testimonial.quote}</p>
                <div>
                  <div className="font-bold text-black">{testimonial.author}</div>
                  <div className="text-orange-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to <span style={{ color: 'var(--pmd-orange)' }}>Transform</span> Your Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Let's discuss how PMD Consulting can help you achieve your strategic goals and drive sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="text-orange-500 mr-4">📍</div>
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-gray-300">123 Business District, Suite 100<br />New York, NY 10001</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-orange-500 mr-4">📧</div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-300">hello@pmdconsulting.com</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-orange-500 mr-4">📞</div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-300">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                />
                <textarea
                  placeholder="Tell us about your project"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="btn-primary w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span style={{ color: 'var(--pmd-orange)' }}>PMD</span> Consulting
              </h3>
              <p className="text-gray-400">
                Transforming businesses through strategic innovation and sustainable growth solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Strategic Planning</li>
                <li>Digital Transformation</li>
                <li>Process Optimization</li>
                <li>Market Analysis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                  <span className="text-white">📘</span>
                </div>
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                  <span className="text-white">🐦</span>
                </div>
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                  <span className="text-white">💼</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PMD Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
