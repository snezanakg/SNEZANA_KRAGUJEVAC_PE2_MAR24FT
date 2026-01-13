import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Users, Star, Wifi, Car, Utensils, PawPrint, ArrowLeft, Calendar } from 'lucide-react';
import { getMockVenues, Venue } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';
import { BookingCalendar } from '../components/BookingCalendar';
import { BookingForm } from '../components/BookingForm';

export function VenuePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Simulate API call
    const venues = getMockVenues();
    const foundVenue = venues.find((v) => v.id === id);
    if (foundVenue) {
      setVenue(foundVenue);
    }
  }, [id]);

  if (!venue) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-stone-950 min-h-screen">
        <p className="text-center text-stone-500 font-serif animate-pulse">Loading residence...</p>
      </div>
    );
  }

  const canBook = isAuthenticated && !user?.venueManager;
  
  // Safe Access helpers
  const mainImage = venue.media?.[selectedImage]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop';
  const mainAlt = venue.media?.[selectedImage]?.alt || venue.name;
  const ownerAvatar = venue.owner.avatar?.url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop';

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-stone-500 hover:text-amber-500 transition-colors uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Collection</span>
        </button>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="relative h-[500px] overflow-hidden group">
            <img
              src={mainImage}
              alt={mainAlt}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 to-transparent pointer-events-none"></div>
          </div>
          <div className="grid grid-cols-2 gap-1 h-[500px]">
            {venue.media.slice(0, 4).map((mediaItem, index) => (
              <div
                key={index}
                className={`relative overflow-hidden cursor-pointer group ${
                  selectedImage === index ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                } transition-opacity duration-300`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={mediaItem.url} 
                  alt={mediaItem.alt || venue.name} 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" 
                />
                {selectedImage === index && (
                    <div className="absolute inset-0 border-2 border-amber-500/50 pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Venue Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="border-b border-stone-800 pb-8 mb-8">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-4xl md:text-5xl font-serif text-white">{venue.name}</h1>
                     <div className="flex items-center bg-stone-900 border border-stone-800 px-4 py-2">
                        <Star className="w-4 h-4 mr-2 text-amber-500 fill-amber-500" />
                        <span className="font-serif text-white text-lg">{venue.rating.toFixed(1)}</span>
                    </div>
                </div>
                
                <div className="flex items-center text-stone-500 uppercase tracking-widest text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                    <span>{venue.location.city}, {venue.location.country}</span>
                </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h3 className="font-serif text-xl mb-4 text-white">The Residence</h3>
              <p className="text-stone-400 leading-relaxed text-lg font-light">{venue.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h3 className="font-serif text-xl mb-6 text-white">Features & Amenities</h3>
              <div className="grid grid-cols-2 gap-6 bg-stone-900/30 border border-stone-800 p-8">
                <div className={`flex items-center space-x-3 ${venue.meta.wifi ? 'text-stone-300' : 'text-stone-700'}`}>
                  <Wifi className="w-5 h-5" />
                  <span className="font-light">High-Speed WiFi</span>
                </div>
                <div className={`flex items-center space-x-3 ${venue.meta.parking ? 'text-stone-300' : 'text-stone-700'}`}>
                  <Car className="w-5 h-5" />
                  <span className="font-light">Private Parking</span>
                </div>
                <div className={`flex items-center space-x-3 ${venue.meta.breakfast ? 'text-stone-300' : 'text-stone-700'}`}>
                  <Utensils className="w-5 h-5" />
                  <span className="font-light">Gourmet Breakfast</span>
                </div>
                <div className={`flex items-center space-x-3 ${venue.meta.pets ? 'text-stone-300' : 'text-stone-700'}`}>
                  <PawPrint className="w-5 h-5" />
                  <span className="font-light">Pet Friendly</span>
                </div>
              </div>
            </div>

            {/* Max Guests */}
            <div className="mb-12 border-b border-stone-800 pb-8">
              <h3 className="font-serif text-xl mb-4 text-white">Capacity</h3>
              <div className="flex items-center space-x-3 text-stone-300">
                <Users className="w-5 h-5 text-amber-600" />
                <span className="font-light">Accommodates up to <span className="text-white font-medium">{venue.maxGuests} guests</span></span>
              </div>
            </div>

            {/* Location */}
            <div className="mb-12">
              <h3 className="font-serif text-xl mb-4 text-white">Location</h3>
              <p className="text-stone-400 font-light mb-2">
                {venue.location.address}
              </p>
              <p className="text-stone-500 uppercase tracking-widest text-sm">
                {venue.location.city}, {venue.location.country}
              </p>
            </div>

            {/* Host */}
            <div className="pt-8">
              <h3 className="font-serif text-xl mb-6 text-white">Your Host</h3>
              <div className="flex items-center space-x-6">
                <img
                  src={ownerAvatar}
                  alt={venue.owner.name}
                  className="w-20 h-20 rounded-none object-cover border border-stone-700"
                />
                <div>
                  <p className="font-serif text-lg text-white mb-1">{venue.owner.name}</p>
                  <p className="text-stone-500 text-sm">{venue.owner.email}</p>
                  <button className="mt-2 text-xs uppercase tracking-widest text-amber-600 hover:text-amber-500 transition-colors">
                    Contact Host
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-stone-900 border border-stone-800 p-8 shadow-2xl">
                <div className="mb-8 flex items-baseline justify-between border-b border-stone-800 pb-6">
                  <div>
                      <span className="text-3xl font-serif text-amber-500">${venue.price}</span>
                      <span className="text-stone-500 text-sm"> / night</span>
                  </div>
                  <div className="text-xs text-stone-500 uppercase tracking-widest">
                    Best Rate Guarantee
                  </div>
                </div>

                {canBook ? (
                  <>
                    {!showBookingForm ? (
                      <button
                        onClick={() => setShowBookingForm(true)}
                        className="w-full bg-amber-600 text-white py-4 hover:bg-amber-700 transition-colors uppercase tracking-widest text-xs font-bold"
                      >
                        Reserve Stay
                      </button>
                    ) : (
                      <BookingForm
                        venue={venue}
                        onCancel={() => setShowBookingForm(false)}
                      />
                    )}
                  </>
                ) : !isAuthenticated ? (
                  <div className="text-center">
                    <p className="text-stone-400 mb-6 font-light">Join our membership to reserve this exclusive property.</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full bg-stone-100 text-stone-950 py-4 hover:bg-white transition-colors uppercase tracking-widest text-xs font-bold"
                    >
                      Sign In
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-4 border border-stone-800 bg-stone-950">
                    <p className="text-stone-500 text-xs uppercase tracking-widest">
                      Venue Manager View Only
                    </p>
                  </div>
                )}

                {/* Calendar */}
                <div className="mt-10 pt-8 border-t border-stone-800">
                  <h4 className="font-serif text-white mb-6 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-amber-600" />
                    Availability
                  </h4>
                  <div className="bg-stone-950 p-4 border border-stone-800">
                     <BookingCalendar venue={venue} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}