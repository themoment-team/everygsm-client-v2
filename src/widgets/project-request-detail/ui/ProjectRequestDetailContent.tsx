import Image from 'next/image';
import Link from 'next/link';

import type { ProjectType } from '@/entities/project';
import { getProjectRequestStatusMeta } from '@/entities/project';
import { ArrowIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';

interface ProjectRequestDetailContentProps {
  project: ProjectType | undefined;
}

const ProjectRequestDetailContent = ({ project }: ProjectRequestDetailContentProps) => {
  if (!project) {
    return (
      <div
        className={cn(
          'flex w-full max-w-212 flex-col items-center gap-y-4 rounded-xl bg-[rgba(34,34,34,0.50)] p-6 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
        )}
      >
        <h1 className={cn('text-2xl font-semibold text-[#FF7C7C]')}>
          프로젝트 정보를 불러올 수 없습니다.
        </h1>
        <p className={cn('text-sm font-medium text-[#DDDDDD]')}>
          요청하신 프로젝트는 존재하지 않거나, 접근 권한이 없습니다.
        </p>
      </div>
    );
  }

  const { status, reason, logo, title, affiliation, description, techStack, repository, prodUrl } =
    project;
  const hasLogo = Boolean(logo?.trim());
  const requestStatusMeta = getProjectRequestStatusMeta(status);
  const displayAffiliation = affiliation ?? '소속 정보 없음';

  return (
    <>
      {status === 'REJECTED' && (
        <div
          className={cn(
            'flex w-full max-w-212 flex-col gap-y-3 rounded-xl bg-[rgba(34,34,34,0.50)] p-6 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
          )}
        >
          <h2
            className={cn(
              'text-4xl leading-[2.7rem] font-bold tracking-[-0.045rem] text-[#FF7C7C]',
            )}
          >
            거절 사유
          </h2>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-[#FFFFFF]',
            )}
          >
            {reason || '거절 사유가 제공되지 않았습니다.'}
          </p>
        </div>
      )}

      <div
        className={cn(
          'flex w-full max-w-212 flex-col gap-y-9 rounded-xl bg-[rgba(34,34,34,0.50)] p-6 shadow-[inset_0_0_0_1px_#2F2F2F] backdrop-blur-[1.125rem]',
        )}
      >
        <h2 className={cn('text-4xl leading-[2.7rem] font-bold tracking-[-0.045rem] text-white')}>
          프로젝트 등록 요청 작성 내용
        </h2>
        <p className={cn('text-xl leading-6 font-semibold tracking-[-0.0375rem] text-white')}>
          요청 상태:{' '}
          <span className={cn(requestStatusMeta.textColorClassName)}>
            {requestStatusMeta.label}
          </span>
        </p>
        <div className={cn('flex flex-col gap-y-3')}>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#DDDDDD]',
            )}
          >
            프로젝트 로고
          </p>
          {hasLogo ? (
            <div className={cn('relative h-14 w-14 overflow-hidden rounded-full')}>
              <Image src={logo} alt={title} fill sizes="56px" className={cn('object-cover')} />
            </div>
          ) : (
            <div aria-hidden className={cn('h-14 w-14 rounded-full bg-[#4F4F4F]')} />
          )}
        </div>
        <div className={cn('flex flex-col gap-y-3')}>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#888888]',
            )}
          >
            프로젝트 제목
          </p>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-[#FFFFFF]',
            )}
          >
            {title}
          </p>
        </div>
        <div className={cn('flex flex-col gap-y-3')}>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#888888]',
            )}
          >
            소속 동아리 또는 팀명
          </p>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-[#FFFFFF]',
            )}
          >
            {displayAffiliation}
          </p>
        </div>
        <div className={cn('flex flex-col gap-y-3')}>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#888888]',
            )}
          >
            프로젝트 설명
          </p>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-[#FFFFFF]',
            )}
          >
            {description}
          </p>
        </div>
        <div className={cn('flex flex-col gap-y-3')}>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#888888]',
            )}
          >
            기술 스택
          </p>
          <div className={cn('flex gap-x-3')}>
            {techStack.map((stack, index) => (
              <p
                key={index}
                className={cn(
                  'rounded-full bg-[#4F4F4F] px-3 py-1.5 text-base leading-[1.2rem] font-normal text-[#FFFFFF]',
                )}
              >
                {stack.stackName}
              </p>
            ))}
          </div>
        </div>
        <div className={cn('flex flex-col gap-y-3')}>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#888888]',
            )}
          >
            깃허브 레포지토리
          </p>
          <div className={cn('flex gap-x-3')}>
            {repository.map((repo, index) => (
              <Link
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl bg-[rgba(34,34,34,0.50)] p-4 shadow-[inset_0_0_0_1px_#2F2F2F]',
                )}
              >
                <p
                  className={cn(
                    'text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-[#FFFFFF]',
                  )}
                >
                  {repo.repoName}
                </p>
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>
        <div className={cn('flex flex-col gap-y-3')}>
          <p
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.02rem] text-[#888888]',
            )}
          >
            프로젝트 배포 URL
          </p>
          <Link
            href={prodUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-[#FFFFFF]',
            )}
          >
            {prodUrl}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProjectRequestDetailContent;
