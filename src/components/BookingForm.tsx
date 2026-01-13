import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, X } from 'lucide-react';
import { Venue } from '../utils/mockData';

interface BookingFormProps {
  venue: Venue;
  onCancel: () => void;
}

export function BookingForm({ venue, onCancel }: BookingFormProps) {
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!dateFrom || !dateTo) {
      setError('Please select check-in and check-out dates');
      return;
    }

    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (fromDate < today) {
      setError('Check-in date cannot be in the past');
      return;
    }

    if (toDate <= fromDate) {
      setError('Check-out date must be after check-in date');
      return;
    }

    if (guests < 1 || guests > venue.maxGuests) {
      setError(`Number of guests must be between 1 and ${venue.maxGuests}`);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/bookings');
    }, 1500);
  };

  const calculateNights = () => {
    if (!dateFrom || !dateTo) return 0;
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    const nights = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * venue.price;

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-serif text-lg text-white">Reserve Your Stay</h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 hover:bg-stone-800 rounded-none transition-colors text-stone-500 hover:text-amber-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-900/50 text-red-300 p-3 text-xs font-mono">
          {error}
        </div>
      )}

      {/* Date Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
            Check-in
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-600" />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              min={today}
              className="w-full pl-10 pr-3 py-3 bg-stone-950 border border-stone-800 text-white rounded-none focus:outline-none focus:border-amber-600 transition-colors text-sm uppercase"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
            Check-out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-600" />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              min={dateFrom || today}
              className="w-full pl-10 pr-3 py-3 bg-stone-950 border border-stone-800 text-white rounded-none focus:outline-none focus:border-amber-600 transition-colors text-sm uppercase"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-600" />
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              min={1}
              max={venue.maxGuests}
              className="w-full pl-10 pr-3 py-3 bg-stone-950 border border-stone-800 text-white rounded-none focus:outline-none focus:border-amber-600 transition-colors"
              required
            />
          </div>
          <p className="text-[10px] text-stone-600 mt-1 uppercase tracking-wide">Max capacity: {venue.maxGuests}</p>
        </div>
      </div>

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="bg-stone-950 border border-stone-800 p-4 space-y-3">
          <div className="flex justify-between text-xs text-stone-400">
            <span>${venue.price} × {nights} nights</span>
            <span>${venue.price * nights}</span>
          </div>
          <div className="border-t border-stone-800 pt-3 flex justify-between font-serif text-amber-500 text-lg">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-amber-600 text-white py-4 hover:bg-amber-700 transition-colors uppercase tracking-widest text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-none"
      >
        {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
      </button>
    </form>
  );
}
