'use client';
import AdminNav from '@/components/admin/AdminNav';

import React, { useEffect, useState } from 'react';
import AuthGuard from '@/app/guards/AuthGuard';
import AdminLayout from '@/components/layout/AdminLayout';
import AdminLeaderboard from '@/components/admin/AdminLeaderboard';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { leaderboardService } from '@/services/leaderboard';

export default function LeaderboardPage() {
  return (
    <AuthGuard requiredRole="ADMIN">
      <LeaderboardContent />
    </AuthGuard>
  );
}

function LeaderboardContent() {
  const [standings, setStandings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      const data = await leaderboardService.getLeaderboard();
      setStandings(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <AdminLayout title="Global Leaderboard" nav={<AdminNav />}>
        <LoadingState message="Loading rankings..." mode="full-page" />
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Global Leaderboard" nav={<AdminNav />}>
        <ErrorState 
          variant="connection" 
          title="Failed to Load" 
          message={error} 
          onRetry={() => { setLoading(true); fetchLeaderboard(); }} 
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Global Leaderboard" subtitle="Real-time Team Rankings" nav={<AdminNav />}>
      <div className="max-w-6xl mx-auto mt-6">
        <AdminLeaderboard standings={standings} />
      </div>
    </AdminLayout>
  );
}
