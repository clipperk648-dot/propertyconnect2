import React from 'react';
import Icon from '../../../components/AppIcon';

const ApplicationStatusOverview = ({ applications }) => {
  const getStatusCounts = () => {
    const counts = {
      total: applications?.length || 0,
      pending: 0,
      approved: 0,
      under_review: 0,
      declined: 0,
      pending_documents: 0
    };

    applications?.forEach(app => {
      if (app?.status === 'approved') counts.approved++;
      else if (app?.status === 'under_review') counts.under_review++;
      else if (app?.status === 'declined') counts.declined++;
      else if (app?.status === 'pending_documents') counts.pending_documents++;
      else counts.pending++;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  const statusCards = [
    {
      title: 'Total Applications',
      count: statusCounts?.total,
      icon: 'FileText',
      color: 'text-blue-600 bg-blue-50',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Under Review',
      count: statusCounts?.under_review,
      icon: 'Clock',
      color: 'text-warning bg-warning/10',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Approved',
      count: statusCounts?.approved,
      icon: 'CheckCircle',
      color: 'text-success bg-success/10',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Documents Required',
      count: statusCounts?.pending_documents,
      icon: 'AlertCircle',
      color: 'text-blue-600 bg-blue-50',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Declined',
      count: statusCounts?.declined,
      icon: 'XCircle',
      color: 'text-error bg-error/10',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {statusCards?.map((card, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6 hover:elevation-1 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">{card?.title}</p>
              <p className="text-2xl font-bold text-foreground">{card?.count}</p>
            </div>
            <div className={`p-3 rounded-full ${card?.bgColor}`}>
              <Icon 
                name={card?.icon} 
                size={24} 
                className={card?.color?.split(' ')?.[0]} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStatusOverview;