import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export function withAuth<T extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<T>) {
  const ComponentWithAuth = (props: T) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      router.push('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Add display name for easier debugging
  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
}
