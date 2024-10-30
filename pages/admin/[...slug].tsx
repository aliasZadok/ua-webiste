import dynamic from 'next/dynamic';

// Dynamically import the AdminDashboard component with SSR disabled
const AdminDashboard = dynamic(() => import('@/pages/admin/AdminDashboard'), {
  ssr: false,
});

export default function AdminPage() {
  return <AdminDashboard />;
}