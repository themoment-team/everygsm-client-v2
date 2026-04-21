import { getAdminRequest } from '@/entities/project/index.server';
import { AdminRequestDetailPage } from '@/views/admin';

const AdminProjectRequestDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const initialRequestedProjectResponse = await getAdminRequest(Number(id));
  const initialRequestedProjectData = initialRequestedProjectResponse?.data ?? null;

  return <AdminRequestDetailPage initialRequestedProjectData={initialRequestedProjectData} />;
};

export default AdminProjectRequestDetail;
