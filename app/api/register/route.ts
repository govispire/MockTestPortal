import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../../../server/storage';
import { hashPassword } from '../../../server/auth';
import { cookies } from 'next/headers';
import { insertUserSchema } from '../../../shared/schema';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json();
    
    // Validate user data with zod schema
    const result = insertUserSchema.safeParse(userData);
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid user data', errors: result.error.format() },
        { status: 400 }
      );
    }
    
    // Check if username already exists
    const existingUser = await storage.getUserByUsername(userData.username);
    if (existingUser) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const hashedPassword = await hashPassword(userData.password);
    
    // Create user with role (default to 'student' if not provided)
    const newUser = await storage.createUser({
      ...userData,
      password: hashedPassword,
      role: userData.role || 'student',
    });
    
    // Create session cookie
    const cookieStore = cookies();
    cookieStore.set({
      name: 'user_id',
      value: newUser.id.toString(),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}