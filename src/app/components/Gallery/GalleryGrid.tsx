import React from 'react';
import { MediaItem } from '../../lib/types';
import ErrorMessage from '../ErrorBoundary';
import Loading from '../ui/Loading';
import GalleryItem from './GalleryItem';

interface GalleryGridProps {
  items: MediaItem[];
  isLoading: boolean;
  error: string | null;
  onItemClick: (id: string) => void;
  onItemLike: (id: string) => Promise<void>;
  loadingRef: React.RefObject<HTMLDivElement>;
}

export default function GalleryGrid({
  items,
  isLoading,
  error,
  onItemClick,
  onItemLike,
  loadingRef,
}: GalleryGridProps) {
  if (items.length === 0 && !isLoading && !error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-500">
        <p className="text-lg">No items to display</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
        {items.map((item) => (
          <GalleryItem
            key={item.id}
            item={item}
            onClick={() => onItemClick(item.id)}
            onLike={() => onItemLike(item.id)}
          />
        ))}
      </div>
      
      {error && (
        <div className="mt-6">
          <ErrorMessage message={error} />
        </div>
      )}
      
      <div
        ref={loadingRef}
        className="w-full flex justify-center p-6"
      >
        {isLoading && <Loading />}
      </div>
    </div>
  );
}