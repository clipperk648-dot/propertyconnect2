import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import api from '../../../utils/api';
import usePolling from '../../../utils/usePolling';

const DashboardStats = () => {
  const [propsCount, setPropsCount] = useState(0);
  const [msgCount, setMsgCount] = useState(0);

  const load = async () => {
    try {
      const [pRes, mRes] = await Promise.all([
        api.get('/properties'),
        api.get('/messages'),
      ]);
      setPropsCount(Number(pRes?.data?.total || (Array.isArray(pRes?.data?.items) ? pRes.data.items.length : 0)));
      setMsgCount(Number(mRes?.data?.total || (Array.isArray(mRes?.data?.items) ? mRes.data.items.length : 0)));
    } catch {}
  };

  useEffect(() => { load(); }, []);
  usePolling(load, 5000, []);

  const stats = [
    { id: 1, title: 'Properties', value: propsCount, change: '', changeType: 'neutral', icon: 'Home', color: 'text-success', bgColor: 'bg-success/10' },
    { id: 2, title: 'Active Applications', value: 0, change: '', changeType: 'neutral', icon: 'FileText', color: 'text-primary', bgColor: 'bg-primary/10' },
    { id: 3, title: 'Property Views', value: 0, change: '', changeType: 'neutral', icon: 'Eye', color: 'text-muted-foreground', bgColor: 'bg-muted' },
    { id: 4, title: 'Messages', value: msgCount, change: '', changeType: 'neutral', icon: 'MessageSquare', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      case 'attention':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card rounded-lg border border-border p-6 hover:elevation-1 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{stat?.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-foreground">{stat?.value}</span>
            </div>
            <p className={`text-xs font-medium ${getChangeColor(stat?.changeType)}`}>{stat?.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
