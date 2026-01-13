import { useState } from 'react';
import { User, Mail, Camera, Building2, CheckCircle, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function ProfilePage() {
  const { user, updateAvatar } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpdateAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!avatarUrl.trim()) return;

    setIsUpdating(true);
    setSuccess(false);

    try {
      await updateAvatar(avatarUrl);
      setSuccess(true);
      setAvatarUrl('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert('Failed to update avatar');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-stone-950 min-h-screen">
        <p className="text-center text-stone-500 font-serif animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  // Safe access for avatar object which might be a string in mockData context but objects in real API
  // In our AuthContext we set it as a string for now, but let's be safe
  const userAvatar = typeof user.avatar === 'string' ? user.avatar : user.avatar?.url;

  return (
    <div className="min-h-screen bg-stone-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
            <div className="w-12 h-12 border border-amber-600 flex items-center justify-center">
                 <User className="w-6 h-6 text-amber-500" />
            </div>
            <div>
                 <h1 className="text-3xl font-serif text-white uppercase tracking-wider">My Profile</h1>
                 <p className="text-stone-500 text-xs uppercase tracking-widest mt-1">Personal Dashboard</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-stone-900 border border-stone-800 shadow-none p-8 text-center relative group hover:border-amber-900/50 transition-colors">
               {/* Decorative Lines */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-900/30 to-transparent"></div>
               
              <div className="relative inline-block mb-6">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-none object-cover mx-auto border-2 border-stone-800 p-1"
                  />
                ) : (
                  <div className="w-32 h-32 bg-stone-950 border border-stone-800 rounded-none flex items-center justify-center mx-auto">
                    <User className="w-12 h-12 text-stone-700" />
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-stone-950 border border-amber-600 p-2 cursor-pointer hover:bg-amber-600 hover:text-white transition-colors group/edit">
                  <Camera className="w-4 h-4 text-amber-600 group-hover/edit:text-white" />
                </div>
              </div>

              <h2 className="text-xl font-serif text-white mb-2 tracking-wide">{user.name}</h2>
              <p className="text-stone-500 text-xs font-mono mb-6">{user.email}</p>

              {user.venueManager && (
                <div className="inline-flex items-center space-x-2 bg-amber-900/10 border border-amber-900/50 text-amber-500 px-4 py-2 text-[10px] uppercase tracking-widest">
                  <Building2 className="w-3 h-3" />
                  <span>Venue Manager</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Details & Update Avatar */}
          <div className="md:col-span-2 space-y-8">
            {/* Account Details */}
            <div className="bg-stone-900 border border-stone-800 p-8">
              <h3 className="text-lg font-serif text-white mb-8 border-l-2 border-amber-600 pl-4">Account Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 pb-6 border-b border-stone-800">
                  <div className="w-10 h-10 flex items-center justify-center border border-stone-800 bg-stone-950">
                     <User className="w-4 h-4 text-stone-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Full Name</p>
                    <p className="text-stone-200 font-light">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pb-6 border-b border-stone-800">
                   <div className="w-10 h-10 flex items-center justify-center border border-stone-800 bg-stone-950">
                      <Mail className="w-4 h-4 text-stone-500" />
                   </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Email Address</p>
                    <p className="text-stone-200 font-light">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                   <div className="w-10 h-10 flex items-center justify-center border border-stone-800 bg-stone-950">
                      <Building2 className="w-4 h-4 text-stone-500" />
                   </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Account Type</p>
                    <p className="text-stone-200 font-light">
                      {user.venueManager ? 'Venue Manager' : 'Customer'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Avatar */}
            <div className="bg-stone-900 border border-stone-800 p-8">
              <h3 className="text-lg font-serif text-white mb-8 border-l-2 border-amber-600 pl-4">Update Portrait</h3>
              
              {success && (
                <div className="mb-6 bg-green-900/10 border border-green-900/30 p-4 flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <p className="text-xs text-green-400 font-mono">Portrait updated successfully</p>
                </div>
              )}

              <form onSubmit={handleUpdateAvatar} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/your-image.jpg"
                    className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white placeholder-stone-700 focus:outline-none focus:border-amber-600 transition-colors font-light text-sm"
                  />
                  <p className="text-[10px] text-stone-600 mt-2 font-mono">
                    Must be a direct link to a publicly accessible image.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isUpdating || !avatarUrl.trim()}
                  className="w-full bg-stone-800 text-stone-300 py-3 hover:bg-amber-600 hover:text-white transition-all uppercase tracking-widest text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-stone-700 hover:border-amber-500"
                >
                  {isUpdating ? 'Processing...' : 'Update Portrait'}
                </button>
              </form>
            </div>

            {/* Account Info */}
            {user.venueManager && (
              <div className="bg-stone-900 border border-stone-800 p-6 flex items-start space-x-4">
                 <Home className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                 <div>
                    <h3 className="text-sm font-serif text-white mb-2">Venue Manager Access</h3>
                    <p className="text-xs text-stone-400 leading-relaxed font-light">
                    As a verified venue manager, you have exclusive access to list and manage properties. 
                    Navigate to the management console to oversee your portfolio.
                    </p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
