import { Link } from 'react-router-dom';
import { MapPin, Users, Star, Wifi, Utensils, PawPrint } from 'lucide-react';
import { Venue } from '../utils/mockData';

interface VenueCardProps {
  venue: Venue;
}

export function VenueCard({ venue }: VenueCardProps) {
  // Safe access for media
  const coverImage = venue.media?.[0]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop';
  const coverAlt = venue.media?.[0]?.alt || venue.name;

  return (
    <Link
      to={`/venue/${venue.id}`}
      className="bg-stone-900 border border-stone-800 rounded-none overflow-hidden hover:border-amber-600 transition-colors duration-500 group relative block"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={coverImage}
          alt={coverAlt}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent"></div>
        
        <div className="absolute top-4 right-4 bg-stone-950/90 backdrop-blur-md border border-amber-900/50 px-3 py-1.5 flex items-center space-x-1.5 rounded-none">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="font-serif text-amber-100 text-sm tracking-wide">{venue.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center text-stone-500 text-xs tracking-widest uppercase mb-2">
             <MapPin className="w-3 h-3 mr-1.5 text-amber-600" />
             <span className="line-clamp-1">{venue.location.city}, {venue.location.country}</span>
          </div>
          <h3 className="font-serif text-2xl text-stone-100 line-clamp-1 group-hover:text-amber-500 transition-colors duration-300">
            {venue.name}
          </h3>
        </div>
        
        {/* Amenities - Minimalist */}
        <div className="flex items-center gap-4 mb-6 border-t border-stone-800/50 pt-4">
          <div className="flex items-center text-stone-400 text-xs tracking-wide">
            <Users className="w-3 h-3 mr-1.5 text-stone-600" />
            <span>Max {venue.maxGuests}</span>
          </div>
          
          <div className="flex gap-3">
             {venue.meta.wifi && <Wifi className="w-3 h-3 text-stone-600" />}
             {venue.meta.breakfast && <Utensils className="w-3 h-3 text-stone-600" />}
             {venue.meta.pets && <PawPrint className="w-3 h-3 text-stone-600" />}
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-stone-500 text-[10px] uppercase tracking-widest mb-1">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-serif text-amber-500">${venue.price}</span>
              <span className="text-stone-600 text-xs">/ night</span>
            </div>
          </div>
          
          <span className="text-xs uppercase tracking-widest text-stone-500 border-b border-stone-800 group-hover:border-amber-600 group-hover:text-amber-600 pb-0.5 transition-all">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}