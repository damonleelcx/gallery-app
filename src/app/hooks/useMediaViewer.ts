import { useState } from 'react';
import { updateLikes } from '../lib/api';
import { MediaItem } from '../lib/types';

export function useMediaViewer(initialItems: MediaItem[] = []) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [items, setItems] = useState<MediaItem[]>(initialItems);

  const open = (id: string) => {
    setActiveItemId(id);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const navigateToItem = (id: string) => {
    setActiveItemId(id);
  };

  const navigateNext = () => {
    if (!activeItemId) return;
    
    const currentIndex = items.findIndex(item => item.id === activeItemId);
    if (currentIndex < items.length - 1) {
      setActiveItemId(items[currentIndex + 1].id);
    }
  };

  const navigatePrevious = () => {
    if (!activeItemId) return;
    
    const currentIndex = items.findIndex(item => item.id === activeItemId);
    if (currentIndex > 0) {
      setActiveItemId(items[currentIndex - 1].id);
    }
  };

  const toggleLike = async (id: string, currentLikes: number) => {
    try {
      const updatedItem = await updateLikes(id, true);
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? updatedItem : item
        )
      );
      return updatedItem;
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  };

  const updateItems = (newItems: MediaItem[]) => {
    setItems(newItems);
  };

  const activeItem = activeItemId 
    ? items.find(item => item.id === activeItemId) || null
    : null;

  return {
    isOpen,
    activeItemId,
    activeItem,
    items,
    open,
    close,
    navigateToItem,
    navigateNext,
    navigatePrevious,
    toggleLike,
    updateItems,
  };
}