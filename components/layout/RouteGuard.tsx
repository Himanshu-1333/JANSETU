'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAuthLoaded } = useApp();

  useEffect(() => {
    if (!isAuthLoaded) return;

    // Gate unauthenticated users to /login and authenticated users away from /login
    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login');
    } else if (isAuthenticated && pathname === '/login') {
      router.push('/');
    }
  }, [pathname, isAuthenticated, isAuthLoaded, router]);

  return <>{children}</>;
};
