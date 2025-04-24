// app/lib/types.ts

export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  thumbnailUrl: string;
  mediaUrl: string;
  likes: number;
  prompt?: string;
  author: string;
  uploadedAt: string;
  tags?: string[];
  type: MediaType;
  durationSec?: number; // Video-specific field
}

export interface ApiResponse {
  items: MediaItem[];
  nextCursor?: string;
  hasMore: boolean;
}

export interface GalleryState {
  items: MediaItem[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  cursor: string | null;
}

export interface ViewerState {
  isOpen: boolean;
  activeItemId: string | null;
  items: MediaItem[];
}