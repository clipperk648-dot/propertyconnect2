export function mapPropertyDoc(doc) {
  if (!doc || typeof doc !== 'object') return null;
  const id = String(doc.id || doc._id || '');
  const image = doc.image || (Array.isArray(doc.images) && doc.images.length ? doc.images[0] : '');
  return {
    id,
    title: doc.title || 'Untitled Property',
    address: doc.location || doc.city || '',
    price: Number(doc.price || 0),
    bedrooms: Number(doc.bedrooms || 0),
    bathrooms: Number(doc.bathrooms || 0),
    sqft: Number(doc.sqft || doc.area || 0),
    image,
    status: doc.status || 'Available',
    savedDate: doc.createdAt || new Date().toISOString(),
    propertyType: doc.propertyType || doc.type || 'Apartment',
    applicationStatus: 'Not Applied',
  };
}
