import Image from 'next/image';
import { MediaItem } from '../../lib/types';
import LikeButton from '../ui/LikeButton';

interface GalleryItemProps {
  item: MediaItem;
  onClick: () => void;
  onLike: () => Promise<void>;
}

export default function GalleryItem({ item, onClick, onLike }: GalleryItemProps) {
  return (
    <div 
      className="relative group cursor-pointer overflow-hidden rounded-lg"
      onClick={onClick}
    >
      <div className="relative w-full">
        <Image
          src={item.thumbnailUrl}
          alt={item.prompt || ''}
          width={400}
          height={0}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex justify-between items-center">
          <div className="text-white text-sm truncate">
            {item.author}
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <LikeButton
              count={item.likes}
              onToggle={onLike}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}