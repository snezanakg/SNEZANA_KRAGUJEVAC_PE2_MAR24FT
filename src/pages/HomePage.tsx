import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFromApi } from "../utils/api";

interface Venue {
  id: string;
  name: string;
  description: string;
  price: number;
  media?: { url: string; alt?: string }[];
}

export default function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVenues() {
      try {
        const response = await fetchFromApi("/holidaze/venues?_bookings=true");
        setVenues(response.data);
      } catch (error) {
        console.error("Failed to load venues", error);
      } finally {
        setLoading(false);
      }
    }

    loadVenues();
  }, []);

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <p className="text-center mt-10 text-stone-400">
        Loading venues...
      </p>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-6 text-white">
        Explore Venues
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search venues..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 p-3 rounded bg-stone-900 border border-stone-700 text-white focus:outline-none focus:border-amber-500"
      />

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredVenues.length === 0 && (
          <p className="text-stone-500">No venues found.</p>
        )}

        {filteredVenues.map((venue) => (
          <Link
            key={venue.id}
            to={`/venue/${venue.id}`}
            className="bg-stone-900 rounded p-4 hover:bg-stone-800 transition border border-stone-800"
          >
            {venue.media?.[0]?.url && (
              <img
                src={venue.media[0].url}
                alt={venue.media[0].alt || venue.name}
                className="h-48 w-full object-cover rounded mb-3"
              />
            )}

            <h2 className="text-xl font-semibold text-white">
              {venue.name}
            </h2>

            <p className="text-stone-400 text-sm line-clamp-2">
              {venue.description}
            </p>

            <p className="mt-2 font-bold text-amber-500">
              ${venue.price} / night
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
