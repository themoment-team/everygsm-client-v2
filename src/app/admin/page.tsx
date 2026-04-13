import { getAdminRequests } from '@/entities/project/index.server';
import { AdminPage } from '@/views/admin';

const Admin = async () => {
  const initialPendingProjectsData = await getAdminRequests();

  return <AdminPage initialPendingProjectsData={initialPendingProjectsData} />;
};

export default Admin;
