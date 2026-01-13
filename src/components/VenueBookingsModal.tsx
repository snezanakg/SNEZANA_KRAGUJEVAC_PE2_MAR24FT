import { useState, useEffect } from 'react';
import { X, Calendar, Users, Mail } from 'lucide-react';
import { Venue, Booking } from '../utils/mockData';

interface VenueBookingsModalProps {
  venue: Venue;
  onClose: () => void;
  bookings?: Booking[];
}

export function VenueBookingsModal({ venue, onClose }: VenueBookingsModalProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Simulate API call to fetch bookings for this venue
    const mockBookings: Booking[] = [
      {
        id: 'b1',
        dateFrom: '2026-02-15',
        dateTo: '2026-02-20',
        guests: 4,
        customer: {
          name: 'John Doe',
          email: 'john@stud.noroff.no',
          avatar: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', alt: 'John Doe' },
        },
      },
      {
        id: 'b2',
        dateFrom: '2026-03-10',
        dateTo: '2026-03-15',
        guests: 2,
        customer: {
          name: 'Jane Smith',
          email: 'jane@stud.noroff.no',
          avatar: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop', alt: 'Jane Smith' },
        },
      },
      {
        id: 'b3',
        dateFrom: '2026-04-05',
        dateTo: '2026-04-12',
        guests: 6,
        customer: {
          name: 'Mike Johnson',
          email: 'mike@stud.noroff.no',
          avatar: { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', alt: 'Mike Johnson' },
        },
      },
    ];
    setBookings(mockBookings);
  }, [venue.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateNights = (dateFrom: string, dateTo: string) => {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    return Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  };

  const isUpcoming = (dateFrom: string) => {
    return new Date(dateFrom) >= new Date();
  };

  const upcomingBookings = bookings.filter((b) => isUpcoming(b.dateFrom));
  const pastBookings = bookings.filter((b) => !isUpcoming(b.dateFrom));

  return (
    <div className="fixed inset-0 bg-stone-950/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-stone-900 border border-stone-800 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-none">
        {/* Header */}
        <div className="sticky top-0 bg-stone-900 border-b border-stone-800 px-8 py-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-serif text-white uppercase tracking-wide">Reservation Log</h2>
            <p className="text-stone-500 text-xs mt-1 uppercase tracking-widest">{venue.name}</p>
          </div>
          <button
            onClick={onClose}
             className="p-2 hover:bg-stone-800 rounded-none transition-colors text-stone-500 hover:text-amber-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {bookings.length === 0 ? (
            <div className="text-center py-12 border border-stone-800 bg-stone-950/50">
              <Calendar className="w-12 h-12 text-stone-700 mx-auto mb-4" />
              <p className="text-stone-500 font-serif">No reservations found for this property.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Upcoming Bookings */}
              {upcomingBookings.length > 0 && (
                <div>
                  <h3 className="text-lg font-serif text-white mb-6 border-l-2 border-amber-600 pl-4">
                    Upcoming Arrivals ({upcomingBookings.length})
                  </h3>
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="bg-stone-950 border border-l-2 border-l-amber-600 border-t-stone-800 border-r-stone-800 border-b-stone-800 p-6 shadow-none">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-6">
                            <img
                              src={booking.customer?.avatar?.url}
                              alt={booking.customer?.name}
                              className="w-12 h-12 rounded-none object-cover border border-stone-700"
                            />
                            <div>
                              <p className="font-serif text-white text-lg">{booking.customer?.name}</p>
                              <p className="text-xs text-stone-500 flex items-center mt-1 uppercase tracking-wider">
                                <Mail className="w-3 h-3 mr-2" />
                                {booking.customer?.email}
                              </p>
                              
                              <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-stone-800">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-stone-600 mb-1">Dates</span>
                                    <span className="flex items-center text-stone-300 text-sm">
                                        <Calendar className="w-3 h-3 mr-2 text-amber-600" />
                                        {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-stone-600 mb-1">Guests</span>
                                    <span className="flex items-center text-stone-300 text-sm">
                                        <Users className="w-3 h-3 mr-2 text-amber-600" />
                                        {booking.guests}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest text-stone-600 mb-1">Duration</span>
                                    <span className="text-stone-300 text-sm">
                                        {calculateNights(booking.dateFrom, booking.dateTo)} nights
                                    </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Bookings */}
              {pastBookings.length > 0 && (
                <div>
                  <h3 className="text-lg font-serif text-stone-500 mb-6 border-l-2 border-stone-700 pl-4">
                    Past Stays ({pastBookings.length})
                  </h3>
                  <div className="space-y-4 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    {pastBookings.map((booking) => (
                      <div key={booking.id} className="bg-stone-950 border border-stone-800 p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-6">
                            <img
                              src={booking.customer?.avatar?.url}
                              alt={booking.customer?.name}
                              className="w-12 h-12 rounded-none object-cover grayscale"
                            />
                            <div>
                              <p className="font-serif text-stone-300 text-lg">{booking.customer?.name}</p>
                              <p className="text-xs text-stone-600 flex items-center mt-1 uppercase tracking-wider">
                                {booking.customer?.email}
                              </p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-stone-500">
                                <span className="flex items-center">
                                  {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
