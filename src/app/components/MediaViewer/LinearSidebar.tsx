import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { MediaItem } from '../../lib/types';

interface LinearSidebarProps {
  items: MediaItem[];
  activeItemId: string | null;
  onNavigate: (id: string) => void;
}

export default function LinearSidebar({
  items,
  activeItemId,
  onNavigate,
}: LinearSidebarProps) {
  const activeItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeItemId]);

  return (
    <div className="hidden md:block bg-black bg-opacity-50 h-full overflow-y-auto py-2 w-20">
      <div className="flex flex-col items-center space-y-2">
        {items.map((item) => (
          <div 
            key={item.id}
            ref={item.id === activeItemId ? activeItemRef : null}
            className={`
              w-16 h-16 relative cursor-pointer transition-all duration-200
              ${item.id === activeItemId ? 'border-2 border-blue-500' : 'opacity-70 hover:opacity-100'}
            `}
            onClick={() => onNavigate(item.id)}
          >
            <Image
              src={item.thumbnailUrl}
              alt=""
              fill
              className="object-cover"
              sizes="64px"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-50 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
