import { useEffect, useState } from "react";
import { fetchFromApi } from "../utils/api";

export function VenueManagerPage() {
  const [venues, setVenues] = useState<any[]>([]);

  useEffect(() => {
    async function loadVenues() {
      const data = await fetchFromApi("/holidaze/venues?_owner=true");
      setVenues(data.data);
    }
    loadVenues();
  }, []);

  return (
    <div className="space-y-4">
      {venues.map((venue) => (
        <div key={venue.id} className="p-4 border rounded">
          <h2>{venue.name}</h2>
          <p>${venue.price} / night</p>
        </div>
      ))}
    </div>
  );
}

