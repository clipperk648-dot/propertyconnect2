import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const propertyTypes = ['Selfcon', 'Single room', 'Duplex', 'Hostel', 'Shop', 'Store'];
const amenitiesList = ['Well tiled', 'Running water', 'Electricity', 'Well water', 'Painted', 'POP', 'Fenced', 'Security', 'Solar', 'Prepaid'];

function slugify(val) {
  return String(val || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const AddPropertyModal = ({ open = false, onClose = () => {}, onAdd = () => {} }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    forSale: false,
    forRent: true,
    type: propertyTypes[0],
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    location: '',
    amenities: [],
    images: [],
    videos: []
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      imagePreviews.forEach(p => URL.revokeObjectURL(p));
      videoPreviews.forEach(p => URL.revokeObjectURL(p));
    };
  }, [imagePreviews, videoPreviews]);

  useEffect(() => {
    if (!open) {
      setForm({
        title: '',
        description: '',
        price: '',
        forSale: false,
        forRent: true,
        type: propertyTypes[0],
        bedrooms: 1,
        bathrooms: 1,
        area: '',
        location: '',
        amenities: [],
        images: [],
        videos: []
      });
      setImagePreviews([]);
      setVideoPreviews([]);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [open]);

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'forSale') {
      setForm(prev => ({ ...prev, forSale: checked, forRent: !checked }));
      return;
    }
    if (type === 'checkbox' && name === 'forRent') {
      setForm(prev => ({ ...prev, forRent: checked, forSale: !checked }));
      return;
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity) ? prev.amenities.filter(a => a !== amenity) : [...prev.amenities, amenity]
    }));
  };

  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(f => URL.createObjectURL(f));
    setForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
    setImagePreviews(prev => ([...prev, ...previews]));
  };

  const handleVideoFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map(f => URL.createObjectURL(f));
    setForm(prev => ({ ...prev, videos: [...prev.videos, ...files] }));
    setVideoPreviews(prev => ([...prev, ...previews]));
  };

  const validate = () => {
    const errs = {};
    if (!form.title) errs.title = 'Property title is required';
    if (!form.location) errs.location = 'Location is required';
    if (!form.price) errs.price = 'Price is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const payload = {
        title: form.title,
        location: form.location,
        city: form.location,
        price: Number(form.price),
        type: slugify(form.type),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        sqft: Number(form.area || 0),
        amenities: form.amenities,
        status: 'active',
        images: [],
        image: '',
      };

      const res = await fetch('/.netlify/functions/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let json = {};
      try {
        const text = await res.text();
        json = text ? JSON.parse(text) : {};
      } catch (err) {
        json = {};
      }

      if (!res.ok) {
        const msg = json?.error || res.statusText || 'Failed to save';
        throw new Error(msg);
      }

      const saved = json.item || {};
      const uiProperty = {
        ...saved,
        id: saved.id || saved._id,
        image: saved.image || (Array.isArray(saved.images) ? saved.images[0] : ''),
        dateAdded: saved.createdAt || new Date().toISOString(),
        views: saved.views || 0,
        inquiries: saved.inquiries || 0,
        favorites: saved.favorites || 0,
      };

      onAdd(uiProperty);
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setErrors(prev => ({ ...prev, form: err.message || 'Failed to save property' }));
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center pt-16 sm:pt-24">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      <form onSubmit={handleSubmit} className="relative z-70 w-full max-w-3xl mx-auto bg-card border border-border rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Add New Property</h2>
          <button type="button" onClick={onClose} className="text-muted-foreground hover:text-foreground">Close</button>
        </div>

        {errors.form && (
          <div className="mb-3 text-sm text-error">
            {errors.form}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Title" name="title" value={form.title} onChange={handleInput} error={errors.title} />
          <Input label="Location" name="location" value={form.location} onChange={handleInput} error={errors.location} />

          <Input label="Price" name="price" value={form.price} onChange={handleInput} type="number" error={errors.price} />

          <div>
            <label className="block text-sm font-medium mb-1">Listing Type</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center space-x-2">
                <input type="checkbox" name="forSale" checked={form.forSale} onChange={handleInput} />
                <span className="text-sm">For Sale</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input type="checkbox" name="forRent" checked={form.forRent} onChange={handleInput} />
                <span className="text-sm">For Rent</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Property Type</label>
            <select name="type" value={form.type} onChange={handleInput} className="w-full rounded border px-3 py-2">
              {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <Input label="Bedrooms" name="bedrooms" value={form.bedrooms} onChange={handleInput} type="number" />
          <Input label="Bathrooms" name="bathrooms" value={form.bathrooms} onChange={handleInput} type="number" />

          <Input label="Area (sqft)" name="area" value={form.area} onChange={handleInput} />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleInput} className="w-full rounded border px-3 py-2 h-28" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  className={`px-3 py-1 rounded-md border ${form.amenities.includes(a) ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground'}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upload Images</label>
            <input type="file" accept="image/*" multiple onChange={handleImageFiles} />
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {imagePreviews.map((p, i) => (
                <img key={p + i} src={p} alt={`preview-${i}`} className="w-24 h-16 object-cover rounded" />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upload Video</label>
            <input type="file" accept="video/*" multiple onChange={handleVideoFiles} />
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {videoPreviews.map((v, i) => (
                <video key={v + i} src={v} className="w-40 h-24 object-cover rounded" controls />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
          <Button variant="default" type="submit" loading={isSubmitting}>Add Property</Button>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyModal;
