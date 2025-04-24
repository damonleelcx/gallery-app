import { NextRequest, NextResponse } from 'next/server';
import { mockMediaItems } from '../../../mock-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get('cursor');
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  
  // Calculate start index
  let startIndex = 0;
  if (cursor) {
    startIndex = parseInt(cursor, 10);
  }
  
  // Get items for this page
  const items = mockMediaItems.slice(startIndex, startIndex + limit);
  
  // Calculate next cursor
  const nextCursor = startIndex + items.length < mockMediaItems.length 
    ? (startIndex + items.length).toString() 
    : undefined;
  
  // Check if there are more items
  const hasMore = startIndex + items.length < mockMediaItems.length;
  
  // Return data
  return NextResponse.json({
    items,
    nextCursor,
    hasMore,
  });
}