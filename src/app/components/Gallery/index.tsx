import { useEffect } from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { useMediaViewer } from '../../hooks/useMediaViewer';
import { updateLikes } from '../../lib/api';
import MediaViewer from '../MediaViewer';
import GalleryGrid from './GalleryGrid';

export default function Gallery() {
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Public Mini Gallery</h1>
      
      <GalleryGrid
        items={items}
        isLoading={isLoading}
        error={error}
        onItemClick={open}
        onItemLike={handleItemLike}
        loadingRef={loadingRef}
      />
      
      {isOpen && (
        <MediaViewer
          isOpen={isOpen}
          items={viewerItems}
          activeItem={activeItem}
          onClose={close}
          onNavigate={navigateToItem}
          onNext={navigateNext}
          onPrevious={navigatePrevious}
          onLike={handleItemLike}
        />
      )}
    </div>
  );
}