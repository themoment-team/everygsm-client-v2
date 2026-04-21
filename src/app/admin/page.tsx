import { getAdminRequests } from '@/entities/project/index.server';
import { AdminPage } from '@/views/admin';

const Admin = async () => {
  const initialRequestedProjectsData = await getAdminRequests();

  return <AdminPage initialRequestedProjectsData={initialRequestedProjectsData} />;
};

export default Admin;
