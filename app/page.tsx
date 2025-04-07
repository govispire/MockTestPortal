'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if authenticated, otherwise to auth page
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/user');
        if (res.ok) {
          router.push('/dashboard');
        } else {
          router.push('/auth');
        }
      } catch (error) {
        console.error('Error checking authentication status', error);
        router.push('/auth');
      }
    };
    
    checkAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
    </div>
  );
}