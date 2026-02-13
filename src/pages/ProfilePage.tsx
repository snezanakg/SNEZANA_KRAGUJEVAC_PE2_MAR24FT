import { useState } from "react";
import { User, Mail, Camera, Building2, CheckCircle, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, updateAvatar } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState("");
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
      setAvatarUrl("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Failed to update avatar");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 bg-stone-950 min-h-screen">
        <p className="text-center text-stone-500 font-serif animate-pulse">
          Loading Profile...
        </p>
      </div>
    );
  }

  const userAvatar =
    typeof user.avatar === "string" ? user.avatar : user.avatar?.url;

  return (
    <div className="min-h-screen bg-stone-950 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-12 h-12 border border-amber-600 flex items-center justify-center">
            <User className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-white uppercase tracking-wider">
              My Profile
            </h1>
            <p className="text-stone-500 text-xs uppercase tracking-widest mt-1">
              Personal Dashboard
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-stone-900 border border-stone-800 p-8 text-center">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={user.name}
                className="w-32 h-32 object-cover mx-auto border border-stone-800 mb-6"
              />
            ) : (
              <div className="w-32 h-32 bg-stone-950 border border-stone-800 flex items-center justify-center mx-auto mb-6">
                <User className="w-12 h-12 text-stone-700" />
              </div>
            )}

            <h2 className="text-xl font-serif text-white mb-2">
              {user.name}
            </h2>
            <p className="text-stone-500 text-xs mb-4">
              {user.email}
            </p>

            {user.venueManager && (
              <div className="inline-flex items-center space-x-2 bg-amber-900/10 border border-amber-900/50 text-amber-500 px-4 py-2 text-xs uppercase tracking-widest">
                <Building2 className="w-3 h-3" />
                <span>Venue Manager</span>
              </div>
            )}
          </div>

          {/* Update Avatar */}
          <div className="md:col-span-2 bg-stone-900 border border-stone-800 p-8">
            <h3 className="text-lg font-serif text-white mb-6">
              Update Portrait
            </h3>

            {success && (
              <div className="mb-6 bg-green-900/10 border border-green-900/30 p-4 flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-xs text-green-400">
                  Portrait updated successfully
                </p>
              </div>
            )}

            <form onSubmit={handleUpdateAvatar} className="space-y-6">
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white placeholder-stone-700 focus:outline-none focus:border-amber-600"
              />

              <button
                type="submit"
                disabled={isUpdating || !avatarUrl.trim()}
                className="w-full bg-amber-600 text-white py-3 hover:bg-amber-700 transition uppercase tracking-widest text-xs disabled:opacity-50"
              >
                {isUpdating ? "Processing..." : "Update Portrait"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
