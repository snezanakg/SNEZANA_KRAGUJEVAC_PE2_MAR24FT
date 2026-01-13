import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, User, Calendar, Building2, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-stone-950 border-b border-stone-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 border border-amber-600 bg-stone-900 flex items-center justify-center group-hover:border-amber-400 transition-colors duration-300 rounded-sm">
              <Home className="w-5 h-5 text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold text-white tracking-widest uppercase">Holidaze</span>
              <span className="text-[0.65rem] text-amber-500 tracking-[0.2em] uppercase">Premium Stays</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-stone-400 hover:text-amber-400 transition-colors uppercase text-xs tracking-widest font-semibold">
              Collection
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/bookings" className="flex items-center space-x-1 text-stone-400 hover:text-amber-400 transition-colors uppercase text-xs tracking-widest font-semibold">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Concierge</span>
                </Link>
                
                {user?.venueManager && (
                  <Link to="/manage-venues" className="flex items-center space-x-1 text-stone-400 hover:text-amber-400 transition-colors uppercase text-xs tracking-widest font-semibold">
                    <Building2 className="w-3 h-3 mr-1" />
                    <span>Manage</span>
                  </Link>
                )}
                
                <Link to="/profile" className="flex items-center space-x-2 text-stone-400 hover:text-amber-400 transition-colors uppercase text-xs tracking-widest font-semibold">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-sm object-cover border border-stone-700" />
                  ) : (
                    <div className="w-8 h-8 bg-stone-900 rounded-sm flex items-center justify-center border border-stone-800">
                      <User className="w-3 h-3 text-amber-500" />
                    </div>
                  )}
                  <span>{user?.name}</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-stone-400 hover:text-red-400 transition-colors uppercase text-xs tracking-widest font-semibold"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  <span>Exit</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-stone-400 hover:text-amber-400 transition-colors uppercase text-xs tracking-widest font-semibold">
                  Sign In
                </Link>
                <Link to="/register" className="bg-amber-600 text-white px-6 py-2 rounded-sm hover:bg-amber-700 transition-all uppercase text-xs tracking-widest font-semibold border border-amber-500/50">
                  Join Membership
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-stone-400 hover:text-amber-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-stone-800 bg-stone-950">
            <nav className="flex flex-col space-y-6 px-2">
              <Link
                to="/"
                className="text-stone-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collection
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/bookings"
                    className="flex items-center space-x-2 text-stone-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Concierge</span>
                  </Link>
                  
                  {user?.venueManager && (
                    <Link
                      to="/manage-venues"
                      className="flex items-center space-x-2 text-stone-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Manage</span>
                    </Link>
                  )}
                  
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-stone-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-stone-400 hover:text-red-400 transition-colors text-left uppercase text-sm tracking-widest"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Exit</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-stone-400 hover:text-amber-400 transition-colors uppercase text-sm tracking-widest"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-amber-600 text-white px-4 py-3 rounded-sm hover:bg-amber-700 transition-all text-center uppercase text-sm tracking-widest"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Membership
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}