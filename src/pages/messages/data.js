export const initialConversations = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastMessage: 'Is the unit still available for viewing next week?',
    time: '2h',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    status: 'Online',
    messages: [
      { id: 101, sender: 'Sarah', text: 'Hi — is the unit still available?', time: '10:12 AM' },
      { id: 102, sender: 'You', text: 'Yes, it is. When would you like to view?', time: '10:15 AM' }
    ]
  },
  {
    id: 2,
    name: 'Michael Chen',
    lastMessage: 'I submitted the application — any updates?',
    time: '1d',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    status: 'Offline',
    messages: [
      { id: 201, sender: 'Michael', text: 'I submitted the application — any updates?', time: 'Yesterday' }
    ]
  },
  {
    id: 3,
    name: 'Emma Davis',
    lastMessage: 'Thanks for the quick reply!',
    time: '3d',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    status: 'Online',
    messages: [
      { id: 301, sender: 'Emma', text: 'Thanks for the quick reply!', time: '3 days ago' }
    ]
  }
];
