const threads = [
  {
    id: '1',
    lastMessage: 'Is the apartment still available?',
    from: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    time: '2h'
  },
  {
    id: '2',
    lastMessage: 'Can we schedule a viewing this weekend?',
    from: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    time: '1d'
  }
];

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET') {
    return res.status(200).json({ items: threads, total: threads.length });
  }
  return res.status(405).json({ error: 'Method Not Allowed' });
}
