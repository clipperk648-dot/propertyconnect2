import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] space-y-2 ${isOwn ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-4 py-2 rounded-lg ${isOwn ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground'}`}>
          {message?.text && <div className="text-sm break-words">{message.text}</div>}

          {message?.images?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.images.map((src, i) => (
                <Image key={src + i} src={src} alt={`img-${i}`} className="w-36 h-24 object-cover rounded" />
              ))}
            </div>
          )}

          {message?.videos?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.videos.map((src, i) => (
                <video key={src + i} src={src} className="w-48 h-28 object-cover rounded" controls />
              ))}
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{message.time}</div>
      </div>
      {!isOwn && (
        <div className="w-10 h-10 rounded-full overflow-hidden ml-3">
          <Image src={message?.avatar} alt={message?.sender} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
