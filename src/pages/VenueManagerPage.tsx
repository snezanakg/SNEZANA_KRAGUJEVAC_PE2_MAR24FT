import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://v2.api.noroff.dev";
const API_KEY = "2ae3e868-69f2-430f-b7cb-5f7d53949d57";

interface Venue {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function VenueManagerPage() {
  const { user } = useAuth();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchVenues() {
      try {
        const response = await fetch(
          `${API_BASE}/holidaze/profiles/${user.name}/venues`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "X-Noroff-API-Key": API_KEY,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.errors?.[0]?.message);
        }

        setVenues(data.data);
      } catch (error) {
        console.error("Failed to load venues", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [user]);

  if (loading) {
    return <p className="p-6">Loading venues...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Managed Venues</h1>

      {venues.length === 0 && (
        <p className="text-gray-400">You haven't created any venues yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="bg-gray-900 p-4 rounded-lg border border-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2">{venue.name}</h2>
            <p className="text-gray-400 text-sm mb-3">
              {venue.description}
            </p>
            <p className="font-bold">${venue.price} / night</p>
          </div>
        ))}
      </div>
    </div>
  );
}
