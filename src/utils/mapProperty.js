export function mapPropertyDoc(doc) {
  if (!doc || typeof doc !== 'object') return null;
  const id = String(doc.id || doc._id || '');
  if (!id) return null;

  const images = Array.isArray(doc.images) ? doc.images.filter(Boolean) : [];
  const videos = Array.isArray(doc.videos) ? doc.videos.filter(Boolean) : [];
  const image = doc.image || images[0] || '';
  const video = doc.video || videos[0] || '';
  const listingType = String(doc.listingType || doc.type || 'rent').toLowerCase();
  const priceType = String(doc.priceType || (listingType === 'sale' ? 'sale' : 'month')).toLowerCase();
  const applicationStatus = doc.applicationStatus || 'Not Applied';

  return {
    id,
    title: doc.title || 'Untitled Property',
    address: doc.location || doc.city || '',
    city: doc.city || '',
    price: Number(doc.price || 0),
    priceType,
    bedrooms: Number(doc.bedrooms || 0),
    bathrooms: Number(doc.bathrooms || 0),
    sqft: Number(doc.sqft || doc.area || 0),
    image,
    images: images.length ? images : image ? [image] : [],
    video,
    videos: videos.length ? videos : video ? [video] : [],
    status: doc.status || 'Available',
    savedDate: doc.createdAt || new Date().toISOString(),
    propertyType: doc.propertyType || doc.propertyTypeLabel || doc.type || 'Apartment',
    propertyTypeLabel: doc.propertyTypeLabel || doc.propertyType || doc.type || '',
    listingType,
    forSale: doc.forSale != null ? Boolean(doc.forSale) : listingType === 'sale',
    forRent: doc.forRent != null ? Boolean(doc.forRent) : listingType !== 'sale',
    description: doc.description || '',
    amenities: Array.isArray(doc.amenities) ? doc.amenities : [],
    applicationStatus,
    views: Number(doc.views || 0),
    inquiries: Number(doc.inquiries || 0),
    favorites: Number(doc.favorites || 0),
    ownerId: doc.ownerId ? String(doc.ownerId) : '',
  };
}
