import Image from 'next/image';
import React from 'react';
import { MediaItem } from '../../lib/types';

interface MediaDisplayProps {
  item: MediaItem;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function MediaDisplay({
  item,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: MediaDisplayProps) {
  const handleNavigation = (e: React.MouseEvent, direction: 'next' | 'previous') => {
    e.stopPropagation();
if (direction === 'next') {
  onNext();
} else {
  onPrevious();
}
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {hasPrevious && (
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-10"
          onClick={(e) => handleNavigation(e, 'previous')}
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {item.type === 'image' ? (
        <div className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={item.mediaUrl}
              alt={item.prompt || ''}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center">
          <video
            src={item.mediaUrl}
            controls
            className="max-w-full max-h-full"
            poster={item.thumbnailUrl}
          />
        </div>
      )}

      {hasNext && (
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-10"
          onClick={(e) => handleNavigation(e, 'next')}
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}