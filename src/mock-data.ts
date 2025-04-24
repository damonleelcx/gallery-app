// mock-data.ts

import { MediaItem } from './app/lib/types';

// Function to generate a date string in the past (up to 30 days ago)
const randomPastDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  now.setDate(now.getDate() - daysAgo);
  return now.toISOString();
};

// Tags pool
const imageTags = ['landscape', 'portrait', 'abstract', 'nature', 'urban', 'illustration', 'photography', 'digital art'];
const videoTags = ['animation', 'short film', 'timelapse', 'tutorial', 'interview', 'documentary', 'experimental'];

// Helper to get random elements from an array
const getRandomElements = (arr: string[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Create mock data
export const mockMediaItems: MediaItem[] = [
  // Images
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `img-${i + 1}`,
    thumbnailUrl: `/sample-data/images/thumbnail-${(i % 10) + 1}.jpg`,
    mediaUrl: `/sample-data/images/full-${(i % 10) + 1}.jpg`,
    likes: Math.floor(Math.random() * 1000),
    prompt: `A beautiful scene with amazing details and lighting effects, style ${i % 5}`,
    author: `Creator${(i % 5) + 1}`,
    uploadedAt: randomPastDate(),
    tags: getRandomElements(imageTags, Math.floor(Math.random() * 3) + 1),
    type: 'image' as const,
  })),
  
  // Videos
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `vid-${i + 1}`,
    thumbnailUrl: `/sample-data/videos/poster-${(i % 5) + 1}.jpg`,
    mediaUrl: `/sample-data/videos/video-${(i % 5) + 1}.mp4`,
    likes: Math.floor(Math.random() * 800),
    prompt: `An impressive video sequence with beautiful composition and motion, style ${i % 3}`,
    author: `VideoCreator${(i % 3) + 1}`,
    uploadedAt: randomPastDate(),
    tags: getRandomElements(videoTags, Math.floor(Math.random() * 3) + 1),
    type: 'video' as const,
    durationSec: Math.floor(Math.random() * 120) + 10, // 10-130 seconds
  })),
].sort((a, b) => b.likes - a.likes); // Sort by likes in descending order