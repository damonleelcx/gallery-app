import { MediaItem } from '../../lib/types';
import LikeButton from '../ui/LikeButton';

interface MetadataPanelProps {
  item: MediaItem;
  onLike: () => Promise<void>;
}

export default function MetadataPanel({ item, onLike }: MetadataPanelProps) {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Format duration (for videos)
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto relative z-[65] md:mt-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{item.author}</h2>
        <LikeButton
          count={item.likes}
          onToggle={onLike}
          size="md"
        />
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        {formatDate(item.uploadedAt)}
      </div>
      
      {item.prompt && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Prompt</h3>
          <p className="text-gray-700">{item.prompt}</p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {item.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-700 px-2 py-1 text-sm rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium mb-2">Details</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-gray-500">Type</div>
          <div className="text-gray-900 capitalize">{item.type}</div>
          
          {item.type === 'video' && item.durationSec && (
            <>
              <div className="text-gray-500">Duration</div>
              <div className="text-gray-900">{formatDuration(item.durationSec)}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}