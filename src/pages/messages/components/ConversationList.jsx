import React from 'react';
import Image from '../../../components/AppImage';

const ConversationList = ({ conversations = [], activeId, onSelect }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div className="font-semibold">Conversations</div>
        <div className="text-xs text-muted-foreground">{conversations?.length}</div>
      </div>

      <div className="divide-y">
        {conversations?.map(conv => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`w-full text-left p-3 flex items-center space-x-3 hover:bg-muted transition-colors ${activeId === conv.id ? 'bg-muted/60' : ''}`}
            type="button"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium text-foreground">{conv.name}</div>
                <div className="text-xs text-muted-foreground">{conv.time}</div>
              </div>
              <div className="text-sm text-muted-foreground truncate">{conv.lastMessage}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
