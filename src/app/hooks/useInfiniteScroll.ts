import { useEffect, useRef, useState } from 'react';
import { fetchGenerations } from '../lib/api';
import { MediaItem } from '../lib/types';

export function useInfiniteScroll() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const loadMoreItems = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchGenerations(cursor);
      setItems(prevItems => [...prevItems, ...response.items]);
      setCursor(response.nextCursor || null);
      setHasMore(response.hasMore);
    } catch (err) {
      setError('Failed to load more items. Please try again.');
      console.error('Error fetching more items:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loadingRef.current) {
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            loadMoreItems();
          }
        },
        { threshold: 0.5 }
      );
      
      observer.current.observe(loadingRef.current);
    }
    
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loadingRef, hasMore, isLoading]);

  const updateItemLikes = (id: string, likes: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, likes } : item
      )
    );
  };

  return {
    items,
    isLoading,
    error,
    hasMore,
    loadingRef,
    updateItemLikes,
    loadMoreItems, // Add this to the returned object
  };
}
