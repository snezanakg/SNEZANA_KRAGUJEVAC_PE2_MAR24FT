import { useState, useEffect } from 'react';
import { Search, MapPin, Users, Star, ArrowRight } from 'lucide-react';
import { VenueCard } from '../components/VenueCard';
import { getMockVenues, Venue } from '../utils/mockData';

export function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);

  useEffect(() => {
    // Simulate API call
    const loadVenues = async () => {
      const data = getMockVenues();
      setVenues(data);
      setFilteredVenues(data);
    };
    loadVenues();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredVenues(venues);
    } else {
      const filtered = venues.filter(
        (venue) =>
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          venue.location.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVenues(filtered);
    }
  }, [searchQuery, venues]);

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Hero Section - Luxe Style */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Darkened Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover opacity-30 grayscale-[50%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/40"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <span className="block text-amber-500 tracking-[0.3em] uppercase text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Exclusive Accommodations
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 tracking-wide leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            Experience the <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Extraordinary</span>
          </h1>
          <p className="text-lg text-stone-400 mb-12 max-w-xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Curated sanctuaries for the discerning traveler. Unparalleled luxury in the world's most breathtaking locations.
          </p>
          
          {/* Minimalist Search Bar */}
          <div className="bg-stone-900/90 backdrop-blur-md p-1 pl-6 pr-1 border border-stone-800 flex items-center max-w-2xl mx-auto animate-in fade-in zoom-in duration-1000 delay-500">
            <Search className="w-5 h-5 text-stone-500" />
            <input
              type="text"
              placeholder="Search destinations..."
              className="flex-1 px-4 py-4 bg-transparent text-stone-100 placeholder-stone-600 outline-none font-serif tracking-wide"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-stone-100 text-stone-950 hover:bg-amber-400 hover:text-stone-900 px-8 py-3 transition-colors uppercase text-xs tracking-widest font-bold">
              Discover
            </button>
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-stone-900">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-serif text-white mb-2">The Collection</h2>
            <div className="h-0.5 w-12 bg-amber-600"></div>
          </div>
          <span className="text-stone-500 font-mono text-xs border border-stone-800 px-3 py-1">
            {filteredVenues.length} ESTATES
          </span>
        </div>

        {filteredVenues.length === 0 ? (
          <div className="text-center py-32 border border-stone-900 bg-stone-900/20">
            <p className="text-stone-500 font-serif text-xl italic">No properties found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </section>

      {/* Values Section */}
      <section className="bg-stone-900 py-32 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="group">
              <div className="w-16 h-16 border border-stone-700 flex items-center justify-center mx-auto mb-8 group-hover:border-amber-500 transition-colors duration-500 rounded-none rotate-45">
                <div className="-rotate-45">
                   <Star className="w-6 h-6 text-stone-400 group-hover:text-amber-500 transition-colors" />
                </div>
              </div>
              <h3 className="text-lg font-serif text-white mb-4 tracking-wide">World Class Service</h3>
              <p className="text-stone-500 text-sm leading-7">
                Every stay is verified for exceptional quality and uncompromising service standards.
              </p>
            </div>

            <div className="group">
              <div className="w-16 h-16 border border-stone-700 flex items-center justify-center mx-auto mb-8 group-hover:border-amber-500 transition-colors duration-500 rounded-none rotate-45">
                <div className="-rotate-45">
                   <MapPin className="w-6 h-6 text-stone-400 group-hover:text-amber-500 transition-colors" />
                </div>
              </div>
              <h3 className="text-lg font-serif text-white mb-4 tracking-wide">Prime Locations</h3>
              <p className="text-stone-500 text-sm leading-7">
                Access to the most coveted addresses and secluded retreats across the globe.
              </p>
            </div>

            <div className="group">
              <div className="w-16 h-16 border border-stone-700 flex items-center justify-center mx-auto mb-8 group-hover:border-amber-500 transition-colors duration-500 rounded-none rotate-45">
                 <div className="-rotate-45">
                   <Users className="w-6 h-6 text-stone-400 group-hover:text-amber-500 transition-colors" />
                 </div>
              </div>
              <h3 className="text-lg font-serif text-white mb-4 tracking-wide">Private Concierge</h3>
              <p className="text-stone-500 text-sm leading-7">
                Dedicated support to ensure your journey is seamless from arrival to departure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}