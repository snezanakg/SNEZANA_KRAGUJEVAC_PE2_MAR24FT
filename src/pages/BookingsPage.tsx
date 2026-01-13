import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Home } from 'lucide-react';
import { getMockBookings, Booking } from '../utils/mockData';

export function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Simulate API call
    const loadBookings = async () => {
      const data = getMockBookings();
      setBookings(data);
    };
    loadBookings();
  }, []);

  const isUpcoming = (dateFrom: string) => {
    return new Date(dateFrom) >= new Date();
  };

  const upcomingBookings = bookings.filter((b) => isUpcoming(b.dateFrom));
  const pastBookings = bookings.filter((b) => !isUpcoming(b.dateFrom));

  return (
    <div className="min-h-screen bg-stone-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 mb-12">
            <div className="w-12 h-12 border border-amber-600 flex items-center justify-center bg-stone-900">
                 <Calendar className="w-6 h-6 text-amber-500" />
            </div>
            <div>
                 <h1 className="text-3xl font-serif text-white uppercase tracking-wider">My Concierge</h1>
                 <p className="text-stone-500 text-xs uppercase tracking-widest mt-1">Upcoming & Past Stays</p>
            </div>
        </div>

        {/* Upcoming Bookings */}
        <section className="mb-20">
          <h2 className="text-xl font-serif text-white mb-8 border-l-2 border-amber-600 pl-4">Upcoming Itinerary</h2>
          {upcomingBookings.length === 0 ? (
            <div className="bg-stone-900 border border-stone-800 p-16 text-center">
              <Home className="w-16 h-16 text-stone-700 mx-auto mb-6" />
              <h3 className="text-xl font-serif text-white mb-2">No upcoming reservations</h3>
              <p className="text-stone-500 mb-8 font-light">
                Your itinerary is currently empty. Explore our collection to plan your next escape.
              </p>
              <Link
                to="/"
                className="inline-block bg-amber-600 text-white px-8 py-4 hover:bg-amber-700 transition-colors uppercase tracking-widest text-xs font-bold"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </section>

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <section>
            <h2 className="text-xl font-serif text-stone-400 mb-8 border-l-2 border-stone-700 pl-4">Past Stays</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} isPast />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking, isPast = false }: { booking: Booking; isPast?: boolean }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateNights = (dateFrom: string, dateTo: string) => {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    return Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(booking.dateFrom, booking.dateTo);
  
  // Safe media access
  const venueImage = booking.venue?.media?.[0]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop';
  const venueAlt = booking.venue?.media?.[0]?.alt || booking.venue?.name;

  return (
    <div className={`bg-stone-900 border border-stone-800 shadow-none group ${isPast ? 'opacity-60 hover:opacity-100 transition-opacity' : ''}`}>
      <div className="relative h-64 overflow-hidden">
        <img
          src={venueImage}
          alt={venueAlt}
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent opacity-80"></div>
        
        {/* Status Badge */}
        <div className="absolute top-0 right-0 p-4">
             {isPast ? (
                <span className="bg-stone-950/80 text-stone-400 text-[10px] uppercase tracking-widest px-3 py-1 border border-stone-700 backdrop-blur-md">
                    Completed
                </span>
             ) : (
                <span className="bg-amber-900/80 text-amber-500 text-[10px] uppercase tracking-widest px-3 py-1 border border-amber-700/50 backdrop-blur-md">
                    Confirmed
                </span>
             )}
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 p-6">
            <h3 className="font-serif text-2xl text-white mb-1 group-hover:text-amber-500 transition-colors">{booking.venue?.name}</h3>
        </div>
      </div>

      <div className="p-8">
        <div className="space-y-6">
          <div className="flex items-start">
            <Calendar className="w-5 h-5 mr-4 text-amber-600 mt-0.5" />
            <div>
                 <span className="block text-stone-200 font-serif mb-1">
                    {formatDate(booking.dateFrom)} — {formatDate(booking.dateTo)}
                 </span>
                 <span className="text-xs text-stone-500 uppercase tracking-widest">
                    {nights} {nights === 1 ? 'Night' : 'Nights'} Duration
                 </span>
            </div>
          </div>

          <div className="flex items-start border-t border-stone-800 pt-6">
            <Users className="w-5 h-5 mr-4 text-amber-600 mt-0.5" />
             <div>
                 <span className="block text-stone-200 font-serif mb-1">
                    Guest List
                 </span>
                 <span className="text-xs text-stone-500 uppercase tracking-widest">
                    {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'} Registered
                 </span>
            </div>
          </div>
        </div>

        {!isPast && (
          <div className="mt-8 pt-8 border-t border-stone-800 flex justify-between items-center">
            <Link
              to={`/venue/${booking.venueId}`}
              className="text-stone-400 hover:text-amber-500 text-[10px] uppercase tracking-widest transition-colors"
            >
              View Property Details
            </Link>
            <button className="text-red-900 hover:text-red-500 text-[10px] uppercase tracking-widest transition-colors">
              Cancel Reservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}