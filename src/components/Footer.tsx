import { Link, useLocation } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  const location = useLocation()

  // Hide footer on login/register pages
  const hideFooterRoutes = ['/login', '/register']
  if (hideFooterRoutes.includes(location.pathname)) {
    return null
  }

  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Subtle Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="md:col-span-4">
            <h3 className="text-2xl font-black mb-6 tracking-tighter italic">
              GOLDEN<span className="text-orange-500 font-light">SPOON</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Experience the art of fine dining where every plate tells a story of passion, 
              flavor, and elegance. Join us for an unforgettable culinary journey.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-orange-500">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Collections'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
                    className="text-gray-400 hover:text-white transition-colors font-medium text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offerings */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-orange-500">Experience</h4>
            <ul className="space-y-4">
              <li><Link to="/access" className="text-gray-400 hover:text-white transition-colors font-medium text-sm">Private Dining</Link></li>
              <li><a href="#smart" className="text-gray-400 hover:text-white transition-colors font-medium text-sm">Chef's Table</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors font-medium text-sm">Reservations</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-orange-500">Find Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-orange-500 shrink-0" size={20} />
                <span className="text-gray-400 text-sm leading-relaxed">
                  123 Culinary Boulevard, <br /> Gourmet District, NY 10012
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-orange-500 shrink-0" size={20} />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors text-sm font-bold">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-orange-500 shrink-0" size={20} />
                <a href="mailto:info@goldenspoon.com" className="text-gray-400 hover:text-white transition-colors text-sm font-bold">
                  hello@goldenspoon.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            &copy; 2026 Golden Spoon Restaurant Group.
          </p>
          <div className="flex gap-8 mt-6 md:mt-0">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
              <a key={item} href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-orange-500 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}