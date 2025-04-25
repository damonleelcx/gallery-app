import { mockMediaItems } from "@/mock-data";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useMediaViewer } from "../../hooks/useMediaViewer";
import { updateLikes,fetchMediaItem } from "../../lib/api";
import MediaViewer from "../MediaViewer";
import GalleryGrid from "./GalleryGrid";

function GalleryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mediaId = searchParams.get("media");

  const {
    items,
    isLoading,
    error,
    loadingRef,
    updateItemLikes,
    setItems,
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
      const item = items.find((item) => item.id === id);
      if (!item) return;

      const updatedItem = await updateLikes(id, true);
      updateItemLikes(id, updatedItem.likes);
    } catch (error) {
      console.error("Error liking item:", error);
    }
  };

  // Keep track of pending media ID
  useEffect(() => {
    if (mediaId && !isOpen) {
      const targetItem = items.find((item) => item.id === mediaId);
      if (targetItem) {
        // If we have the item, open it immediately
        open(mediaId);
      } else {
        // Instead of loading more items, find it directly from mock data
        const mockItem = await fetchMediaItem(mediaId);

        if (mockItem) {
          // Add the found item to our items array
          setItems(prevItems => [...prevItems, mockItem]);
          open(mediaId);
        }
      }
    } else if (!mediaId && isOpen) {
      // If we don't have a media ID but the viewer is open, close it
      close();
    }
  }, [mediaId, items, open, isOpen, close, setItems]);

  const handleClose = () => {
    close();
    router.push("/", { scroll: false });
    // Use push instead of replace to ensure the URL change triggers after the close
  };

  // Add cleanup effect to handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      if (!searchParams.get("media")) {
        close();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [close, searchParams]);

  const handleNavigate = (id: string) => {
    router.replace(`?media=${id}`, { scroll: false });
    navigateToItem(id);
  };

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = items.findIndex((item) => item.id === activeItem.id);
    if (currentIndex < items.length - 1) {
      const nextId = items[currentIndex + 1].id;
      router.replace(`?media=${nextId}`, { scroll: false });
      navigateNext();
    }
  };

  const handlePrevious = () => {
    if (!activeItem) return;
    const currentIndex = items.findIndex((item) => item.id === activeItem.id);
    if (currentIndex > 0) {
      const prevId = items[currentIndex - 1].id;
      router.replace(`?media=${prevId}`, { scroll: false });
      navigatePrevious();
    }
  };

  const handleOpen = (id: string) => {
    router.push(`?media=${id}`, { scroll: false });
    open(id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Public Mini Gallery
      </h1>

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

export default function Gallery() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
