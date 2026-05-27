'use client';

import { toast } from 'sonner';

import { useDeleteMyProject } from '@/entities/project';
import { useModalStore } from '@/shared/stores';
import { cn } from '@/shared/utils';

interface DeleteConfirmModalProps {
  projectId: number;
}

const DeleteConfirmModal = ({ projectId }: DeleteConfirmModalProps) => {
  const { closeModal } = useModalStore();
  const { mutate: deleteProject, isPending } = useDeleteMyProject();

  const handleConfirm = () => {
    deleteProject(projectId, {
      onSuccess: () => {
        closeModal();
        toast.success('프로젝트가 삭제되었습니다.');
      },
      onError: () => {
        toast.error('프로젝트 삭제에 실패했습니다.');
      },
    });
  };

  return (
    <div
      className={cn(
        'flex w-120 flex-col items-start gap-6 rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.50)] p-6 backdrop-blur-[18px]',
      )}
    >
      <h2 className={cn('w-full text-center text-[1.25rem] font-semibold text-white')}>
        프로젝트 삭제
      </h2>
      <p className={cn('w-full text-center text-[1rem] leading-6 font-medium text-white')}>
        프로젝트를 정말 삭제하시겠습니까? 삭제된 프로젝트는
        <br />
        다시 복구할 수 없습니다.
      </p>

      <div className={cn('flex w-full items-center justify-between')}>
        <button
          onClick={closeModal}
          disabled={isPending}
          className={cn(
            'flex cursor-pointer items-center justify-center rounded-xl border border-[#FC335A] px-9 py-3 text-[1.125rem] font-medium text-[#FC335A] disabled:opacity-50',
          )}
        >
          취소
        </button>
        <button
          onClick={handleConfirm}
          disabled={isPending}
          className={cn(
            'flex cursor-pointer items-center justify-center rounded-xl bg-[#FC335A] px-9 py-3 text-[1.125rem] font-medium text-white disabled:opacity-50',
          )}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
