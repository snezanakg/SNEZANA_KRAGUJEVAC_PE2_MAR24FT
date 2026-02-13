import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, AlertCircle, Building2, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!email.endsWith("stud.noroff.no")) {
      setError("Only stud.noroff.no email addresses are allowed");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(name, email, password, venueManager);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-stone-950">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 border border-amber-600 bg-stone-900 flex items-center justify-center">
              <Home className="w-6 h-6 text-amber-500" />
            </div>
          </Link>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif text-white mb-2">
              Membership Application
            </h1>
            <p className="text-stone-500 text-sm uppercase tracking-widest">
              Join our exclusive community
            </p>
          </div>

          {error && (
            <div className="mb-8 bg-red-900/20 border border-red-900/50 p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-600"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-600"
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
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-amber-600"
                    required
                    minLength={8}
                  />
                </div>
              </div>
            </div>

            <div className="bg-stone-950 border border-stone-800 p-6">
              <label className="flex items-center space-x-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={venueManager}
                  onChange={(e) => setVenueManager(e.target.checked)}
                  className="h-5 w-5 border border-stone-600 bg-stone-900 checked:bg-amber-600"
                />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span className="text-white font-serif">
                      Register as Venue Manager
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Enable this if you want to manage venues.
                  </p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 text-white py-4 hover:bg-amber-700 transition uppercase tracking-widest text-xs font-bold disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-stone-800 pt-6">
            <p className="text-stone-500 text-sm">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-amber-500 hover:text-amber-400 uppercase text-xs tracking-wider"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
