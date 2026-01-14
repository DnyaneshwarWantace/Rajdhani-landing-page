import { Sparkles, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200 py-8 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="font-display text-base sm:text-xl font-semibold text-gray-900">
                Rajdhani Digital Designs
              </span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Discover premium design collections. Our curated collection brings timeless elegance to your space.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="font-display text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a href="#collections" className="text-xs sm:text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="#about" className="text-xs sm:text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-xs sm:text-sm text-gray-600 hover:text-primary-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-display text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" />
                <span className="break-all">info@rajdhani.com</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 flex-shrink-0" />
                New York, NY 10001
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-12 pt-4 sm:pt-8 border-t border-gray-200 text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            © 2025 Rajdhani Digital Designs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
