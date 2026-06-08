'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import {
  type ProjectResponseType,
  useAdminApproveProject,
  useAdminRejectProject,
  useGetAdminRequest,
} from '@/entities/project';
import { ArrowIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';
import { ProjectRequestDetailContent } from '@/widgets/project-request-detail';

interface AdminRequestDetailPageProps {
  requestId: number;
  initialRequestedProjectData?: ProjectResponseType | undefined;
}

const AdminRequestDetailPage = ({
  requestId,
  initialRequestedProjectData,
}: AdminRequestDetailPageProps) => {
  const router = useRouter();
  const [rejectReason, setRejectReason] = useState('');

  const { data: adminRequestData } = useGetAdminRequest(requestId, {
    initialData: initialRequestedProjectData,
  });
  const project = adminRequestData?.data ?? initialRequestedProjectData?.data;

  const { mutateAsync: approveProject, isPending: isApprovePending } = useAdminApproveProject();
  const { mutateAsync: rejectProject, isPending: isRejectPending } = useAdminRejectProject();

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#191919]">
        <p className="text-white">프로젝트를 찾을 수 없습니다.</p>
      </main>
    );
  }

  const handleApprove = async () => {
    try {
      await approveProject(project.projectId);
      router.push('/admin');
    } catch (error) {
      console.error('Failed to approve project:', error);
      toast.error('승인 처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) return;

    try {
      await rejectProject({
        projectId: project.projectId,
        reason: rejectReason,
      });
      router.push('/admin');
    } catch (error) {
      console.error('Failed to reject project:', error);
      toast.error('거절 처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const isRejectDisabled = isRejectPending || !rejectReason.trim();

  return (
    <main className={cn('min-h-[calc(100vh-72px)] bg-[#191919]')}>
      <div className={cn('flex justify-center pt-10 pb-10')}>
        <div className={cn('relative w-full')}>
          <Link
            href="/admin"
            className={cn(
              'absolute top-9 right-[calc(50%+26.5rem+2.5rem)] flex items-center gap-x-3 text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#FFFFFF]',
            )}
          >
            <span className={cn('rotate-180')}>
              <ArrowIcon color="#DDDDDD" />
            </span>
            이전으로
          </Link>

          <div className={cn('mx-auto w-full max-w-212')}>
            <ProjectRequestDetailContent project={project} />
          </div>

          <div className={cn('absolute top-0 right-9 flex w-115 shrink-0 flex-col gap-y-4')}>
            <div
              className={cn(
                'flex flex-col gap-y-6 rounded-xl bg-[rgba(34,34,34,0.50)] p-6 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
              )}
            >
              <div className={cn('flex flex-col gap-y-3')}>
                <h3 className={cn('text-base text-white')}>거절사유</h3>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="거절 사유를 입력하세요"
                  className={cn(
                    'w-full resize-none rounded-xl px-4 py-2.5 text-white placeholder-[#9A9A9A] shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
                  )}
                  rows={1}
                />
              </div>
              <button
                onClick={handleReject}
                disabled={isRejectDisabled}
                className={cn(
                  'flex cursor-pointer items-center justify-end gap-x-4 text-sm text-[#FC335A] transition disabled:cursor-not-allowed disabled:text-[#542730]',
                )}
              >
                {isRejectPending ? '거절 중...' : '등록 거절'}
                <ArrowIcon color={isRejectDisabled ? '#542730' : '#FC335A'} />
              </button>
            </div>

            <div
              className={cn(
                'flex items-center justify-end gap-x-8 rounded-xl bg-[rgba(34,34,34,0.50)] p-6 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
              )}
            >
              <button
                onClick={handleApprove}
                disabled={isApprovePending}
                className={cn('flex cursor-pointer items-center gap-x-4 text-white transition')}
              >
                {isApprovePending ? '승인 중...' : '등록 확인'}
                <ArrowIcon color="#FFFFFF" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminRequestDetailPage;
