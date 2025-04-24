import { NextRequest, NextResponse } from 'next/server';
import { mockMediaItems } from '../../../../mock-data';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
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