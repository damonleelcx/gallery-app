import { NextRequest, NextResponse } from 'next/server';
import { mockMediaItems } from '../../../../mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mediaItem = mockMediaItems.find(item => item.id === id);
  
  if (!mediaItem) {
    return NextResponse.json(
      { error: 'Media item not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(mediaItem);
}