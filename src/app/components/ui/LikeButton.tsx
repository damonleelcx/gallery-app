import { useState } from 'react';

interface LikeButtonProps {
  count: number;
  isLiked?: boolean;
  onToggle: () => Promise<void>;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export default function LikeButton({
  count,
  isLiked = false,
  onToggle,
  size = 'md',
  showCount = true,
}: LikeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(count);
  
  const handleClick = async () => {
    try {
      setIsLoading(true);
      await onToggle();
      setLiked(!liked);
      setLikeCount(prev => liked ? prev - 1 : prev + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  return (
    <button
      className={`flex items-center gap-1 transition-colors ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 disabled:opacity-50 ${sizeClasses[size]}`}
      onClick={handleClick}
      disabled={isLoading}
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        className={`
          ${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}
          ${liked ? 'fill-red-500' : ''}
        `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {showCount && <span>{likeCount}</span>}
    </button>
  );
}