import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Settings } from 'lucide-react';
import { getMockVenues, Venue } from '../utils/mockData';
import { VenueFormModal } from '../components/VenueFormModal';
import { VenueBookingsModal } from '../components/VenueBookingsModal';

export function VenueManagerPage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [viewingBookings, setViewingBookings] = useState<Venue | null>(null);

  useEffect(() => {
    // Simulate API call - in real app, fetch only venues owned by current user
    const loadVenues = async () => {
      const data = getMockVenues().slice(0, 3); // Show only first 3 as user's venues
      setVenues(data);
    };
    loadVenues();
  }, []);

  const handleCreateVenue = (venueData: Partial<Venue>) => {
    const newVenue: Venue = {
      id: Date.now().toString(),
      name: venueData.name || '',
      description: venueData.description || '',
      media: venueData.media || [],
      price: venueData.price || 0,
      maxGuests: venueData.maxGuests || 1,
      rating: 0,
      meta: venueData.meta || { wifi: false, parking: false, breakfast: false, pets: false },
      location: venueData.location || { address: '', city: '', country: '', lat: 0, lng: 0 },
      owner: {
        name: 'Current User',
        email: 'user@example.com',
        avatar: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', alt: 'User' },
      },
    };
    setVenues([...venues, newVenue]);
    setShowCreateModal(false);
  };

  const handleUpdateVenue = (venueData: Partial<Venue>) => {
    if (!editingVenue) return;
    const updatedVenues = venues.map((v) =>
      v.id === editingVenue.id ? { ...v, ...venueData } : v
    );
    setVenues(updatedVenues);
    setEditingVenue(null);
  };

  const handleDeleteVenue = (venueId: string) => {
    if (confirm('Are you sure you want to delete this venue?')) {
      setVenues(venues.filter((v) => v.id !== venueId));
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b border-stone-800 pb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 border border-amber-600 flex items-center justify-center bg-stone-900">
                 <Settings className="w-6 h-6 text-amber-500" />
            </div>
            <div>
                 <h1 className="text-3xl font-serif text-white uppercase tracking-wider">Property Manager</h1>
                 <p className="text-stone-500 text-xs uppercase tracking-widest mt-1">Portfolio Administration</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-amber-600 text-white px-6 py-3 hover:bg-amber-700 transition-colors uppercase tracking-widest text-xs font-bold flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
        </div>

        {/* Venues List */}
        {venues.length === 0 ? (
          <div className="bg-stone-900 border border-stone-800 p-16 text-center">
            <h3 className="text-xl font-serif text-white mb-2">Portfolio Empty</h3>
            <p className="text-stone-500 mb-8 font-light">
              You haven't listed any properties yet.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center space-x-2 bg-stone-800 text-stone-300 border border-stone-700 px-6 py-3 hover:bg-stone-700 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Create Listing</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {venues.map((venue) => (
              <VenueManagerCard
                key={venue.id}
                venue={venue}
                onEdit={() => setEditingVenue(venue)}
                onDelete={() => handleDeleteVenue(venue.id)}
                onViewBookings={() => setViewingBookings(venue)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <VenueFormModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateVenue}
        />
      )}

      {editingVenue && (
        <VenueFormModal
          venue={editingVenue}
          onClose={() => setEditingVenue(null)}
          onSubmit={handleUpdateVenue}
        />
      )}

      {viewingBookings && (
        <VenueBookingsModal
          venue={viewingBookings}
          onClose={() => setViewingBookings(null)}
        />
      )}
    </div>
  );
}

function VenueManagerCard({
  venue,
  onEdit,
  onDelete,
  onViewBookings,
}: {
  venue: Venue;
  onEdit: () => void;
  onDelete: () => void;
  onViewBookings: () => void;
}) {
  const mainImage = venue.media?.[0]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop';
  
  return (
    <div className="bg-stone-900 border border-stone-800 shadow-none group hover:border-amber-900/30 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
        {/* Image */}
        <div className="md:col-span-1 h-full min-h-[240px]">
          <img
            src={mainImage}
            alt={venue.name}
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Details */}
        <div className="md:col-span-2 p-8 border-r border-stone-800">
          <div className="mb-4">
              <h3 className="text-xl font-serif text-white mb-2">{venue.name}</h3>
              <p className="text-stone-500 text-xs font-mono uppercase tracking-widest">{venue.location.city}, {venue.location.country}</p>
          </div>
          
          <p className="text-stone-400 mb-6 line-clamp-2 font-light text-sm leading-relaxed">{venue.description}</p>
          
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-stone-800">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">Rate</span>
              <span className="font-serif text-amber-500 text-lg">${venue.price}<span className="text-stone-600 text-sm">/night</span></span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">Status</span>
              <span className="text-xs text-stone-300 border border-stone-700 px-2 py-1 inline-block">Active</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="md:col-span-1 p-8 flex flex-col justify-center space-y-4 bg-stone-950/30">
          <button
            onClick={onViewBookings}
            className="w-full flex items-center justify-center space-x-3 text-stone-300 hover:text-amber-500 transition-colors text-xs uppercase tracking-widest border border-stone-800 hover:border-amber-600 py-3"
          >
            <Calendar className="w-4 h-4" />
            <span>View Bookings</span>
          </button>
          <button
            onClick={onEdit}
            className="w-full flex items-center justify-center space-x-3 text-stone-300 hover:text-amber-500 transition-colors text-xs uppercase tracking-widest border border-stone-800 hover:border-amber-600 py-3"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Property</span>
          </button>
          <button
            onClick={onDelete}
            className="w-full flex items-center justify-center space-x-3 text-red-800 hover:text-red-500 transition-colors text-xs uppercase tracking-widest border border-stone-800 hover:border-red-900 py-3"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}