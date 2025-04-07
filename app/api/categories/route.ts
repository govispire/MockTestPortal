import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Pass through to Express API
    const response = await fetch(`${request.nextUrl.origin}/api/categories`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: response.status }
      );
    }

    const categories = await response.json();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error in categories route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}