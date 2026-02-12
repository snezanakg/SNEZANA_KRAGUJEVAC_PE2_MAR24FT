import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://v2.api.noroff.dev";
const API_KEY = "2ae3e868-69f2-430f-b7cb-5f7d53949d57"
interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue: {
    name: string;
  };
}

export function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchBookings() {
      try {
        const response = await fetch(
          `${API_BASE}/holidaze/profiles/${user.name}/bookings?_venue=true`,
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

        setBookings(data.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user]);

  if (loading) return <p className="p-6">Loading bookings...</p>;

  if (bookings.length === 0)
    return <p className="p-6">No bookings yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="luxury-border p-4 mb-4 rounded-lg"
        >
          <h2 className="text-lg font-semibold">
            {booking.venue?.name}
          </h2>
          <p>
            From: {new Date(booking.dateFrom).toLocaleDateString()}
          </p>
          <p>
            To: {new Date(booking.dateTo).toLocaleDateString()}
          </p>
          <p>Guests: {booking.guests}</p>
        </div>
      ))}
    </div>
  );
}
