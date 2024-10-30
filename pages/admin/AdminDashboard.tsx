import React from 'react';
import { useRouter } from 'next/router';
import { withAuth } from '@/components/hoc/withAuth';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Render different admin sections based on the slug
  const renderSection = () => {
    switch (slug?.[0]) {
      case 'users':
        return <div>User Management Section</div>;
      case 'posts':
        return <div>Post Management Section</div>;
      case 'portfolio':
        return <div>Portfolio Management Section</div>;
      default:
        return <div>Admin Dashboard Home</div>;
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {renderSection()}
    </div>
  );
};

export default withAuth(AdminDashboard);