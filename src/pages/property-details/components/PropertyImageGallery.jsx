import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PropertyImageGallery = ({ images = [], videos = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const slides = useMemo(() => {
    const imgSlides = (Array.isArray(images) ? images : []).filter(Boolean).map((it, i) => {
      if (typeof it === 'string') return { id: `img-${i}`, type: 'image', url: it, alt: `Photo ${i+1}` };
      if (it && typeof it === 'object') return { id: String(it.id || `img-${i}`), type: 'image', url: it.url || it.src || '', alt: it.alt || '' };
      return null;
    }).filter(Boolean);
    const vidSlides = (Array.isArray(videos) ? videos : []).filter(Boolean).map((v, i) => ({ id: `vid-${i}`, type: 'video', url: v }));
    const all = [...imgSlides, ...vidSlides];
    return all.length ? all : [];
  }, [images, videos]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % (slides.length || 1));
  const prev = () => setCurrentIndex((prev) => (prev - 1 + (slides.length || 1)) % (slides.length || 1));
  const goTo = (i) => setCurrentIndex(i);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  if (!slides.length) {
    return (
      <div className="relative bg-card rounded-lg overflow-hidden elevation-1 h-64 flex items-center justify-center text-muted-foreground">
        No media available
      </div>
    );
  }

  const current = slides[currentIndex];

  return (
    <>
      <div className="relative bg-card rounded-lg overflow-hidden elevation-1">
        <div className="relative h-96 lg:h-[500px] overflow-hidden flex items-center justify-center bg-black/5">
          {current.type === 'image' ? (
            <Image src={current.url} alt={current.alt} className="w-full h-full object-cover" />
          ) : (
            <video src={current.url} controls className="w-full h-full object-contain bg-black" />
          )}

          {slides.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth">
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth">
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          <button onClick={toggleFullScreen} className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth">
            <Icon name="Maximize2" size={18} />
          </button>

          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {slides.length}
          </div>
        </div>

        {slides.length > 1 && (
          <div className="p-4 bg-muted/50">
            <div className="flex space-x-2 overflow-x-auto">
              {slides.map((s, i) => (
                <button key={s.id} onClick={() => goTo(i)} className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-smooth ${i === currentIndex ? 'border-primary' :'border-transparent hover:border-border'}`}>
                  {s.type === 'image' ? (
                    <Image src={s.url} alt={s.alt} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-black text-white text-xs flex items-center justify-center">Video</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {current.type === 'image' ? (
              <Image src={current.url} alt={current.alt} className="max-w-full max-h-full object-contain" />
            ) : (
              <video src={current.url} controls autoPlay className="max-w-full max-h-full object-contain bg-black" />
            )}
            <button onClick={toggleFullScreen} className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-smooth">
              <Icon name="X" size={24} />
            </button>
            {slides.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-smooth">
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-smooth">
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {slides.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyImageGallery;
