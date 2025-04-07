import type { Metadata } from 'next';
import '../client/src/index.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'MockPrep - Online Mock Test Platform',
  description: 'Prepare for exams with interactive mock tests, performance tracking and analytics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}