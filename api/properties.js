const properties = [
  {
    id: 1,
    title: 'Modern Apartment in Downtown',
    price: 3200,
    beds: 2,
    baths: 2,
    sqft: 1100,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    city: 'Seattle',
    state: 'WA',
  },
  {
    id: 2,
    title: 'Cozy Suburban House',
    price: 2400,
    beds: 3,
    baths: 2,
    sqft: 1450,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    city: 'Bellevue',
    state: 'WA',
  },
  {
    id: 3,
    title: 'Luxury Condo with View',
    price: 5200,
    beds: 2,
    baths: 2,
    sqft: 1350,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    city: 'Kirkland',
    state: 'WA',
  }
];

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET') {
    const { city } = req.query || {};
    const data = city ? properties.filter(p => p.city.toLowerCase() === String(city).toLowerCase()) : properties;
    return res.status(200).json({ items: data, total: data.length });
  }
  return res.status(405).json({ error: 'Method Not Allowed' });
}
