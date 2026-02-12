import { useState } from "react";

const API_BASE = "https://v2.api.noroff.dev";
const API_KEY = "2ae3e868-69f2-430f-b7cb-5f7d53949d57";

export function BookingForm({ venueId }: { venueId: string }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState(1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem("holidaze_token");

    if (!token) {
      alert("You must be logged in");
      return;
    }

    const response = await fetch(`${API_BASE}/holidaze/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({
        dateFrom,
        dateTo,
        guests,
        venueId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      alert(data.errors?.[0]?.message || "Booking failed");
      return;
    }

    alert("Booking successful 🎉");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        required
      />
      <input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        required
      />
      <input
        type="number"
        min={1}
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
      />
      <button type="submit">Book</button>
    </form>
  );
}
