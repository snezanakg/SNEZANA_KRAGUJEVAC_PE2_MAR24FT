import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, Building2, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [venueManager, setVenueManager] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!email.endsWith('stud.noroff.no')) {
      setError('Only stud.noroff.no email addresses are allowed');
      return;
    }

    setIsSubmitting(true);

    try {
      await register(name, email, password, venueManager);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-stone-950">
      <div className="w-full max-w-lg">
         {/* Logo above card */}
         <div className="flex justify-center mb-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 border border-amber-600 bg-stone-900 flex items-center justify-center group-hover:border-amber-400 transition-colors duration-300">
                <Home className="w-6 h-6 text-amber-500" />
              </div>
            </Link>
         </div>

        <div className="bg-stone-900 border border-stone-800 p-10 shadow-2xl relative">
           {/* Decorative Corner */}
           <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-900/30"></div>
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-white mb-2">Membership Application</h1>
            <p className="text-stone-500 font-light text-sm uppercase tracking-widest">Join our exclusive community</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 bg-red-900/20 border border-red-900/50 p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 font-light">{error}</p>
            </div>
          )}

          {/* Info Message */}
          <div className="mb-8 bg-stone-950 border border-stone-800 p-4">
            <p className="text-xs text-stone-500">
              <span className="text-amber-500 uppercase tracking-widest text-[10px] block mb-1">Requirement</span>
              Only <span className="font-mono text-stone-300">stud.noroff.no</span> email addresses are accepted for registration.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-600" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 text-white placeholder-stone-700 focus:outline-none focus:border-amber-600 transition-colors font-light"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@stud.noroff.no"
                  className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 text-white placeholder-stone-700 focus:outline-none focus:border-amber-600 transition-colors font-light"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-600" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 chars"
                      className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 text-white placeholder-stone-700 focus:outline-none focus:border-amber-600 transition-colors font-light"
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-600" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 text-white placeholder-stone-700 focus:outline-none focus:border-amber-600 transition-colors font-light"
                      required
                      minLength={8}
                    />
                  </div>
                </div>
            </div>

            {/* Venue Manager Toggle */}
            <div className="bg-stone-950 border border-stone-800 p-6 group cursor-pointer hover:border-amber-900/50 transition-colors">
              <label className="flex items-start space-x-4 cursor-pointer">
                <div className="relative flex items-center">
                    <input
                    type="checkbox"
                    checked={venueManager}
                    onChange={(e) => setVenueManager(e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-none border border-stone-600 bg-stone-900 checked:border-amber-600 checked:bg-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600/50"
                    />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span className="font-serif text-white">Register as Venue Manager</span>
                  </div>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    Select this option if you intend to list and manage properties on Holidaze.
                  </p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 text-white py-4 hover:bg-amber-700 transition-colors uppercase tracking-widest text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-900/10"
            >
              {isSubmitting ? 'Processing Application...' : 'Create Account'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center border-t border-stone-800 pt-6">
            <p className="text-stone-500 text-sm font-light">
              Already a member?{' '}
              <Link to="/login" className="text-amber-500 hover:text-amber-400 transition-colors ml-1 uppercase text-xs tracking-wider">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}