'use client';

import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

import { ProjectFormReqType } from '@/entities/project';
import { useModalStore } from '@/shared/stores';
import { cn } from '@/shared/utils';

import { usePatchMyProject } from '../model/usePatchMyProject';

interface EditConfirmModalProps {
  projectId: number;
  requestBody: ProjectFormReqType;
}

const EditConfirmModal = ({ projectId, requestBody }: EditConfirmModalProps) => {
  const router = useRouter();
  const { closeModal } = useModalStore();
  const { mutate: patchProject, isPending } = usePatchMyProject();

  const handleConfirm = () => {
    patchProject(
      { projectId, ...requestBody },
      {
        onSuccess: () => {
          closeModal();
          router.push('/mypage');
          toast.success('프로젝트 수정 요청이 완료되었습니다.');
        },
        onError: () => {
          toast.error('프로젝트 수정에 실패했습니다. 잠시 후 다시 시도해주세요.');
        },
      },
    );
  };

  return (
    <div
      className={cn(
        'flex w-120 flex-col items-center gap-6 rounded-xl border border-[#2F2F2F] bg-[rgba(34,34,34,0.50)] p-6 backdrop-blur-[18px]',
      )}
    >
      <h2 className={cn('w-full text-center text-[1.25rem] font-semibold text-white')}>
        프로젝트 내용 수정
      </h2>
      <p className={cn('w-full text-center text-[1rem] leading-6 font-medium text-white')}>
        프로젝트 수정 시 수정 내용에 대해 관리자에게
        <br />
        승인을 받아야 합니다. 승인을 받기 전까지 EveryGSM에서는
        <br />
        수정 전 프로젝트의 내용이 노출됩니다.
      </p>
      <button
        onClick={handleConfirm}
        disabled={isPending}
        className={cn(
          'w-full cursor-pointer rounded-xl bg-[#FC335A] px-9 py-3 text-[1.125rem] font-medium text-white disabled:opacity-50',
        )}
      >
        확인
      </button>
    </div>
  );
};

export default EditConfirmModal;
