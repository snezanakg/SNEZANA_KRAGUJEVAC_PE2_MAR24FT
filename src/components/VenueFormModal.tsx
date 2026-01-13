import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Venue, Media } from '../utils/mockData';

interface VenueFormModalProps {
  venue?: Venue;
  onClose: () => void;
  onSubmit: (venueData: Partial<Venue>) => void;
}

export function VenueFormModal({ venue, onClose, onSubmit }: VenueFormModalProps) {
  const [formData, setFormData] = useState({
    name: venue?.name || '',
    description: venue?.description || '',
    price: venue?.price || 0,
    maxGuests: venue?.maxGuests || 1,
    media: venue?.media || [],
    location: {
      address: venue?.location.address || '',
      city: venue?.location.city || '',
      country: venue?.location.country || '',
      lat: venue?.location.lat || 0,
      lng: venue?.location.lng || 0,
    },
    meta: {
      wifi: venue?.meta.wifi || false,
      parking: venue?.meta.parking || false,
      breakfast: venue?.meta.breakfast || false,
      pets: venue?.meta.pets || false,
    },
  });

  const [newImageUrl, setNewImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
        const newMedia: Media = {
            url: newImageUrl.trim(),
            alt: `${formData.name} image`
        };
      setFormData({
        ...formData,
        media: [...formData.media, newMedia],
      });
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      media: formData.media.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-stone-950/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-stone-900 border border-stone-800 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-none">
        {/* Header */}
        <div className="sticky top-0 bg-stone-900 border-b border-stone-800 px-8 py-6 flex justify-between items-center z-10">
          <h2 className="text-2xl font-serif text-white uppercase tracking-wide">
            {venue ? 'Edit Residence' : 'New Listing'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-800 rounded-none transition-colors text-stone-500 hover:text-amber-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Info */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
              Property Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white rounded-none focus:outline-none focus:border-amber-600 transition-colors placeholder-stone-700"
              placeholder="e.g. Seaside Villa"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white rounded-none focus:outline-none focus:border-amber-600 transition-colors placeholder-stone-700"
              placeholder="Describe the property details..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                Price per Night *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">$</span>
                <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    min="0"
                    step="1"
                    className="w-full pl-8 pr-4 py-3 bg-stone-950 border border-stone-800 text-white rounded-none focus:outline-none focus:border-amber-600 transition-colors"
                    required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">
                Maximum Guests *
              </label>
              <input
                type="number"
                value={formData.maxGuests}
                onChange={(e) => setFormData({ ...formData, maxGuests: parseInt(e.target.value) })}
                min="1"
                className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white rounded-none focus:outline-none focus:border-amber-600 transition-colors"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="border-t border-stone-800 pt-8">
            <h3 className="text-lg font-serif text-white mb-6 border-l-2 border-amber-600 pl-4">Location</h3>
            <div className="space-y-6">
              <input
                type="text"
                value={formData.location.address}
                onChange={(e) =>
                  setFormData({ ...formData, location: { ...formData.location, address: e.target.value } })
                }
                placeholder="Street Address"
                className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white rounded-none focus:outline-none focus:border-amber-600 transition-colors placeholder-stone-700"
              />
              <div className="grid grid-cols-2 gap-8">
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) =>
                    setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })
                  }
                  placeholder="City *"
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white rounded-none focus:outline-none focus:border-amber-600 transition-colors placeholder-stone-700"
                  required
                />
                <input
                  type="text"
                  value={formData.location.country}
                  onChange={(e) =>
                    setFormData({ ...formData, location: { ...formData.location, country: e.target.value } })
                  }
                  placeholder="Country *"
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 text-white rounded-none focus:outline-none focus:border-amber-600 transition-colors placeholder-stone-700"
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="border-t border-stone-800 pt-8">
            <h3 className="text-lg font-serif text-white mb-6 border-l-2 border-amber-600 pl-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-6">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.meta.wifi}
                  onChange={(e) => setFormData({ ...formData, meta: { ...formData.meta, wifi: e.target.checked } })}
                  className="appearance-none w-5 h-5 border border-stone-600 bg-stone-950 checked:bg-amber-600 checked:border-amber-600 transition-colors cursor-pointer"
                />
                <span className="text-stone-400 text-sm group-hover:text-white transition-colors">WiFi Available</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.meta.parking}
                  onChange={(e) => setFormData({ ...formData, meta: { ...formData.meta, parking: e.target.checked } })}
                  className="appearance-none w-5 h-5 border border-stone-600 bg-stone-950 checked:bg-amber-600 checked:border-amber-600 transition-colors cursor-pointer"
                />
                <span className="text-stone-400 text-sm group-hover:text-white transition-colors">Private Parking</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.meta.breakfast}
                  onChange={(e) => setFormData({ ...formData, meta: { ...formData.meta, breakfast: e.target.checked } })}
                  className="appearance-none w-5 h-5 border border-stone-600 bg-stone-950 checked:bg-amber-600 checked:border-amber-600 transition-colors cursor-pointer"
                />
                <span className="text-stone-400 text-sm group-hover:text-white transition-colors">Breakfast Included</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.meta.pets}
                  onChange={(e) => setFormData({ ...formData, meta: { ...formData.meta, pets: e.target.checked } })}
                  className="appearance-none w-5 h-5 border border-stone-600 bg-stone-950 checked:bg-amber-600 checked:border-amber-600 transition-colors cursor-pointer"
                />
                <span className="text-stone-400 text-sm group-hover:text-white transition-colors">Pets Allowed</span>
              </label>
            </div>
          </div>

          {/* Images */}
          <div className="border-t border-stone-800 pt-8">
            <h3 className="text-lg font-serif text-white mb-6 border-l-2 border-amber-600 pl-4">Gallery</h3>
            <div className="space-y-6">
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="flex-1 px-4 py-3 bg-stone-950 border border-stone-800 text-white placeholder-stone-700 rounded-none focus:outline-none focus:border-amber-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="bg-stone-800 text-white px-6 py-3 hover:bg-amber-600 transition-colors uppercase tracking-widest text-xs font-bold"
                >
                  Add
                </button>
              </div>

              {formData.media.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {formData.media.map((mediaItem, index) => (
                    <div key={index} className="relative group">
                      <img src={mediaItem.url} alt={mediaItem.alt} className="w-full h-32 object-cover border border-stone-800" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-stone-950/80 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 pt-8 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-transparent border border-stone-700 text-stone-400 py-4 hover:bg-stone-800 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-amber-600 text-white py-4 hover:bg-amber-700 transition-colors uppercase tracking-widest text-xs font-bold"
            >
              {venue ? 'Save Changes' : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
