import { getAdminRequest } from '@/entities/project/index.server';
import { AdminRequestDetailPage } from '@/views/admin';

const AdminProjectRequestDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const initialProjectData = await getAdminRequest(Number(id));

  return <AdminRequestDetailPage initialProjectData={initialProjectData} />;
};

export default AdminProjectRequestDetail;
