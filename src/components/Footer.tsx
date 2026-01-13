import { Home, Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 border-t border-stone-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 border border-amber-600 flex items-center justify-center">
                <Home className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-2xl font-serif font-bold text-white tracking-widest uppercase">Holidaze</span>
            </Link>
            <p className="text-stone-500 mb-8 max-w-sm leading-relaxed font-light text-sm">
              Defining the art of hospitality. Holidaze connects discerning travelers with the world's most exceptional properties.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-amber-500 hover:border-amber-500 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-amber-500 hover:border-amber-500 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-amber-500 hover:border-amber-500 transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif uppercase tracking-widest text-sm mb-6">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-stone-500 hover:text-amber-500 transition-colors text-sm tracking-wide">
                  The Collection
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-stone-500 hover:text-amber-500 transition-colors text-sm tracking-wide">
                  Member Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-stone-500 hover:text-amber-500 transition-colors text-sm tracking-wide">
                  Apply for Membership
                </Link>
              </li>
              <li>
                <a href="#" className="text-stone-500 hover:text-amber-500 transition-colors text-sm tracking-wide">
                  Our Story
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-serif uppercase tracking-widest text-sm mb-6">Concierge</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-stone-500 hover:text-amber-500 transition-colors cursor-pointer group">
                <Mail className="w-4 h-4 group-hover:text-amber-500" />
                <span className="text-sm">concierge@holidaze.com</span>
              </li>
              <li className="flex items-center space-x-3 text-stone-500 hover:text-amber-500 transition-colors cursor-pointer group">
                <Phone className="w-4 h-4 group-hover:text-amber-500" />
                <span className="text-sm">+47 123 45 678</span>
              </li>
              <li className="flex items-center space-x-3 text-stone-500 hover:text-amber-500 transition-colors cursor-pointer group">
                <MapPin className="w-4 h-4 group-hover:text-amber-500" />
                <span className="text-sm">Oslo, Norway</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-900 pt-10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-stone-600 text-xs tracking-widest uppercase mb-4 md:mb-0">
            © {currentYear} Holidaze. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-stone-600 hover:text-stone-300 text-xs tracking-widest uppercase transition-colors">Privacy</a>
            <a href="#" className="text-stone-600 hover:text-stone-300 text-xs tracking-widest uppercase transition-colors">Terms</a>
            <div className="h-3 w-[1px] bg-stone-800"></div>
            <span className="text-stone-600 text-xs tracking-widest uppercase">
              Designed by <span className="text-amber-600">Snezana Kragujevac</span> • 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}