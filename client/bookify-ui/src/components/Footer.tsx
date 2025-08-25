
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Apartments', path: '/apartments' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Blog', path: '/blog' }
  ];

  const services = [
    { label: 'Apartment Rentals', path: '/apartments' },
    { label: 'Property Management', path: '/services/management' },
    { label: 'Concierge Services', path: '/services/concierge' },
    { label: 'Maintenance', path: '/services/maintenance' },
    { label: 'Virtual Tours', path: '/services/tours' },
    { label: 'Corporate Housing', path: '/services/corporate' }
  ];

  const locations = [
    { label: 'Manhattan', path: '/apartments?location=manhattan' },
    { label: 'Brooklyn', path: '/apartments?location=brooklyn' },
    { label: 'SoHo', path: '/apartments?location=soho' },
    { label: 'Chelsea', path: '/apartments?location=chelsea' },
    { label: 'Upper East Side', path: '/apartments?location=upper-east-side' },
    { label: 'Tribeca', path: '/apartments?location=tribeca' }
  ];

  const support = [
    { label: 'Help Center', path: '/help' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
    { label: 'Accessibility', path: '/accessibility' },
    { label: 'Sitemap', path: '/sitemap' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-slate-900 text-white border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <div className="text-white font-bold text-xl">L</div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  LuxuryStay
                </span>
                <span className="text-xs text-gray-400 -mt-1">Premium Apartments</span>
              </div>
            </a>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Discover premium apartments in the world's most desirable locations. Your perfect luxury home awaits.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>123 Fifth Avenue, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>hello@luxurystay.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-gray-300 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.path}
                    className="text-gray-300 hover:text-purple-400 transition-colors text-sm"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Locations</h3>
            <ul className="space-y-3">
              {locations.map((location, index) => (
                <li key={index}>
                  <a
                    href={location.path}
                    className="text-gray-300 hover:text-purple-400 transition-colors text-sm"
                  >
                    {location.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="text-gray-300 hover:text-purple-400 transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-6">
              Subscribe to get exclusive deals and updates on premium properties.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 bg-slate-950/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© 2024 LuxuryStay. Made with</span>
              <Heart className="w-4 h-4 text-pink-400 fill-current" />
              <span>in New York</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;