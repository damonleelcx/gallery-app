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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-auto">
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