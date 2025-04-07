import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Pass through to Express API
    const response = await fetch(`${request.nextUrl.origin}/api/tests/${id}`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch test' },
        { status: response.status }
      );
    }

    const test = await response.json();
    return NextResponse.json(test);
  } catch (error) {
    console.error('Error in test detail route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    // Pass through to Express API
    const response = await fetch(`${request.nextUrl.origin}/api/tests/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') || '',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to update test' }));
      return NextResponse.json(
        { error: errorData.message || 'Failed to update test' },
        { status: response.status }
      );
    }

    const test = await response.json();
    return NextResponse.json(test);
  } catch (error) {
    console.error('Error in update test route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Pass through to Express API
    const response = await fetch(`${request.nextUrl.origin}/api/tests/${id}`, {
      method: 'DELETE',
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to delete test' }));
      return NextResponse.json(
        { error: errorData.message || 'Failed to delete test' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in delete test route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}