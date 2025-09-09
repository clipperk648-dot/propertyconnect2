import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PropertyImageGallery = ({ images = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const mockImages = images?.length > 0 ? images : [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      alt: "Modern apartment living room with large windows"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      alt: "Spacious bedroom with natural lighting"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
      alt: "Modern kitchen with granite countertops"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop",
      alt: "Elegant bathroom with modern fixtures"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      alt: "Balcony with city view"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockImages?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockImages?.length) % mockImages?.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="relative bg-card rounded-lg overflow-hidden elevation-1">
        {/* Main Image */}
        <div className="relative h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={mockImages?.[currentImageIndex]?.url}
            alt={mockImages?.[currentImageIndex]?.alt}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {mockImages?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          {/* Full Screen Button */}
          <button
            onClick={toggleFullScreen}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
          >
            <Icon name="Maximize2" size={18} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {mockImages?.length}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        {mockImages?.length > 1 && (
          <div className="p-4 bg-muted/50">
            <div className="flex space-x-2 overflow-x-auto">
              {mockImages?.map((image, index) => (
                <button
                  key={image?.id}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-smooth ${
                    index === currentImageIndex
                      ? 'border-primary' :'border-transparent hover:border-border'
                  }`}
                >
                  <Image
                    src={image?.url}
                    alt={image?.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Full Screen Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={mockImages?.[currentImageIndex]?.url}
              alt={mockImages?.[currentImageIndex]?.alt}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <button
              onClick={toggleFullScreen}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-smooth"
            >
              <Icon name="X" size={24} />
            </button>

            {/* Navigation in Full Screen */}
            {mockImages?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-smooth"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-smooth"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}

            {/* Image Counter in Full Screen */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {mockImages?.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyImageGallery;