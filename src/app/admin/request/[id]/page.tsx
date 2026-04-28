import { getAdminRequest } from '@/entities/project/index.server';
import { AdminRequestDetailPage } from '@/views/admin';

const AdminProjectRequestDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const requestId = Number(id);
  const initialRequestedProjectResponse = await getAdminRequest(requestId);

  return (
    <AdminRequestDetailPage
      requestId={requestId}
      initialRequestedProjectData={initialRequestedProjectResponse}
    />
  );
};

export default AdminProjectRequestDetail;
