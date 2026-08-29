'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';

type AuthGuardProps = {
  children: React.ReactNode;
  requiredRole?: 'ADMIN' | 'PARTICIPANT' | 'JUDGE';
};

export default function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter();
  const { authenticated, loading, error, user, logout } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingState message="Verifying authentication..." mode="full-page" />
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!authenticated || !user) {
    React.useEffect(() => {
      router.push('/login');
    }, [router]);
    return null;
  }

  // Check role-based access
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ErrorState 
          variant="access-denied" 
          title="Access Denied" 
          message={`This page requires ${requiredRole} access. Your current role is ${user.role}.`}
          onRetry={() => router.push('/dashboard')}
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ErrorState 
          variant="connection" 
          title="Authentication Error" 
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // Authenticated and authorized - render children
  return <>{children}</>;
}
