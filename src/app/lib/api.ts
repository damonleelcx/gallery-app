// app/lib/api.ts

import { ApiResponse, MediaItem } from './types';

const API_BASE_URL = '/api';

export async function fetchGenerations(cursor: string | null = null, limit: number = 10): Promise<ApiResponse> {
  const params = new URLSearchParams();
  
  if (cursor) {
    params.append('cursor', cursor);
  }
  
  params.append('limit', limit.toString());
  
  try {
    const response = await fetch(`${API_BASE_URL}/generations?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch generations');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching generations:', error);
    throw error;
  }
}

export async function fetchMediaItem(id: string): Promise<MediaItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/media/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch media item');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching media item ${id}:`, error);
    throw error;
  }
}

export async function updateLikes(id: string, increment: boolean): Promise<MediaItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/likes/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ increment }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update likes');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating likes for ${id}:`, error);
    throw error;
  }
}