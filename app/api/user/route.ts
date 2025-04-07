import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../../server/storage';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get user ID from cookie
    const cookieStore = cookies();
    const userIdCookie = cookieStore.get('user_id');
    
    // If no user ID cookie, return unauthorized
    if (!userIdCookie) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const userId = userIdCookie.value;
    
    // Get user from storage
    const user = await storage.getUser(parseInt(userId, 10));
    if (!user) {
      // Clear invalid cookie
      cookies().delete('user_id');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
    
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching user data' },
      { status: 500 }
    );
  }
}