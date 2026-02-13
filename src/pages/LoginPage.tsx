import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-stone-950">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 border border-amber-600 bg-stone-900 flex items-center justify-center group-hover:border-amber-400 transition-colors duration-300">
              <Home className="w-6 h-6 text-amber-500" />
            </div>
          </Link>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-900/30"></div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-white mb-2">
              Member Login
            </h1>
            <p className="text-stone-500 font-light text-sm uppercase tracking-widest">
              Access your private account
            </p>
          </div>

          {error && (
            <div className="mb-8 bg-red-900/20 border border-red-900/50 p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 font-light">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@stud.noroff.no"
                  className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 text-white placeholder-stone-700 focus:outline-none focus:border-amber-600 transition-colors font-light"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 text-white placeholder-stone-700 focus:outline-none focus:border-amber-600 transition-colors font-light"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 text-white py-4 hover:bg-amber-700 transition-colors uppercase tracking-widest text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-stone-800 pt-6">
            <p className="text-stone-500 text-sm font-light">
              Not a member?{" "}
              <Link
                to="/register"
                className="text-amber-500 hover:text-amber-400 transition-colors ml-1 uppercase text-xs tracking-wider"
              >
                Apply here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
