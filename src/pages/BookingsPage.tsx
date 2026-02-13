
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://v2.api.noroff.dev";
const API_KEY = "2ae3e868-69f2-430f-b7cb-5f7d53949d57";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue: {
    name: string;
  };
}

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    async function fetchBookings() {
      try {
        const token = localStorage.getItem("holidaze_token");

        const response = await fetch(
          `${API_BASE}/holidaze/profiles/${user.name}/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": API_KEY,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.errors?.[0]?.message || "Failed to fetch bookings");
        }

        setBookings(data.data || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user]);

  if (loading)
    return (
      <div className="p-10 text-center text-stone-400">
        Loading bookings...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );

  if (bookings.length === 0)
    return (
      <div className="p-10 text-center text-stone-400">
        No bookings yet.
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-950 text-white px-6 py-12">
      <h1 className="text-3xl font-serif mb-10 text-center">
        My Bookings
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border border-stone-800 bg-stone-900 p-6 hover:border-amber-600 transition-colors"
          >
            <h2 className="text-xl font-serif mb-2 text-amber-500">
              {booking.venue?.name}
            </h2>

            <p className="text-stone-400 text-sm">
              From:{" "}
              <span className="text-white">
                {new Date(booking.dateFrom).toLocaleDateString()}
              </span>
            </p>

            <p className="text-stone-400 text-sm">
              To:{" "}
              <span className="text-white">
                {new Date(booking.dateTo).toLocaleDateString()}
              </span>
            </p>

            <p className="text-stone-400 text-sm">
              Guests:{" "}
              <span className="text-white">{booking.guests}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
