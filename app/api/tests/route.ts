import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Pass through to Express API
    const response = await fetch(`${request.nextUrl.origin}/api/tests`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch tests' },
        { status: response.status }
      );
    }

    const tests = await response.json();
    return NextResponse.json(tests);
  } catch (error) {
    console.error('Error in tests route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Pass through to Express API
    const response = await fetch(`${request.nextUrl.origin}/api/tests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') || '',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to create test' }));
      return NextResponse.json(
        { error: errorData.message || 'Failed to create test' },
        { status: response.status }
      );
    }

    const test = await response.json();
    return NextResponse.json(test);
  } catch (error) {
    console.error('Error in create test route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}