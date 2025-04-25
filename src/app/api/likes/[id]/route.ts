import { mockMediaItems } from '@/mock-data';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const { increment } = await request.json();
  
  const itemIndex = mockMediaItems.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return NextResponse.json(
      { error: 'Media item not found' },
      { status: 404 }
    );
  }
  
  // Update likes
  mockMediaItems[itemIndex].likes += increment ? 1 : -1;
  
  return NextResponse.json(mockMediaItems[itemIndex]);
}