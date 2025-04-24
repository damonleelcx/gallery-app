import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useMediaViewer } from '../../hooks/useMediaViewer';
import { updateLikes } from '../../lib/api';
import MediaViewer from '../MediaViewer';
import GalleryGrid from './GalleryGrid';

export default function Gallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mediaId = searchParams.get('media');
  
  const {
    items,
    isLoading,
    error,
    loadingRef,
    updateItemLikes,
  } = useInfiniteScroll();
  
  const {
    isOpen,
    activeItem,
    open,
    close,
    navigateToItem,
    navigateNext,
    navigatePrevious,
    items: viewerItems,
    updateItems,
  } = useMediaViewer();
  
  // Sync items from infinite scroll to viewer
  useEffect(() => {
    if (items.length > 0) {
      updateItems(items);
    }
  }, [items, updateItems]);
  
  const handleItemLike = async (id: string) => {
    try {
      const item = items.find(item => item.id === id);
      if (!item) return;
      
      const updatedItem = await updateLikes(id, true);
      updateItemLikes(id, updatedItem.likes);
    } catch (error) {
      console.error('Error liking item:', error);
    }
  };
  
  useEffect(() => {
    if (mediaId && items.length > 0) {
      open(mediaId);
    }
  }, [mediaId, items]);

  const handleOpen = (id: string) => {
    router.push(`?media=${id}`);
    open(id);
  };

  const handleClose = () => {
    router.push('');
    close();
  };

  const handleNavigate = (id: string) => {
    router.push(`?media=${id}`);
    navigateToItem(id);
  };

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = items.findIndex(item => item.id === activeItem.id);
    if (currentIndex < items.length - 1) {
      const nextId = items[currentIndex + 1].id;
      router.push(`?media=${nextId}`);
      navigateNext();
    }
  };

  const handlePrevious = () => {
    if (!activeItem) return;
    const currentIndex = items.findIndex(item => item.id === activeItem.id);
    if (currentIndex > 0) {
      const prevId = items[currentIndex - 1].id;
      router.push(`?media=${prevId}`);
      navigatePrevious();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Public Mini Gallery</h1>
      
      <GalleryGrid
        items={items}
        isLoading={isLoading}
        error={error}
        onItemClick={handleOpen}
        onItemLike={handleItemLike}
        loadingRef={loadingRef as React.RefObject<HTMLDivElement>}
      />
      
      {isOpen && (
        <MediaViewer
          isOpen={isOpen}
          items={viewerItems}
          activeItem={activeItem}
          onClose={handleClose}
          onNavigate={handleNavigate}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onLike={handleItemLike}
        />
      )}
    </div>
  );
}