import { MediaItem } from '../../lib/types';
import FullScreenOverlay from './FullScreenOverlay';
import LinearSidebar from './LinearSidebar';
import MediaDisplay from './MediaDisplay';
import MetadataPanel from './MetadataPanel';

interface MediaViewerProps {
  isOpen: boolean;
  items: MediaItem[];
  activeItem: MediaItem | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onLike: (id: string) => Promise<void>;
}

export default function MediaViewer({
  isOpen,
  items,
  activeItem,
  onClose,
  onNavigate,
  onNext,
  onPrevious,
  onLike,
}: MediaViewerProps) {
  if (!activeItem) return null;
  
  const activeIndex = items.findIndex(item => item.id === activeItem.id);
  const hasNext = activeIndex < items.length - 1;
  const hasPrevious = activeIndex > 0;
  
  return (
    <FullScreenOverlay isOpen={isOpen} onClose={onClose}>
      <div className="flex w-full h-full">
        <LinearSidebar
          items={items}
          activeItemId={activeItem.id}
          onNavigate={onNavigate}
        />
        
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="flex-1 flex items-center justify-center">
            <MediaDisplay
              item={activeItem}
              onNext={onNext}
              onPrevious={onPrevious}
              hasNext={hasNext}
              hasPrevious={hasPrevious}
            />
          </div>
          
          <div className="md:w-96 flex justify-center md:justify-start">
            <MetadataPanel
              item={activeItem}
              onLike={() => onLike(activeItem.id)}
            />
          </div>
        </div>
      </div>
    </FullScreenOverlay>
  );
}
