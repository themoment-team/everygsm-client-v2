import Link from 'next/link';

import { ArrowIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';

const NotFound = () => {
  return (
    <div
      className={cn(
        'flex h-[calc(100vh-72px)] flex-col items-center justify-center gap-6 bg-[#191919]',
      )}
    >
      <h1 className={cn('text-9xl leading-[9.6rem] font-bold tracking-[-0.16rem] text-[#FC335A]')}>
        404
      </h1>
      <p
        className={cn(
          'text-center text-4xl leading-[2.7rem] font-bold tracking-[-0.045rem] text-[#FFF]',
        )}
      >
        잘못된 경로입니다
      </p>
      <p className={cn('text-center text-base leading-6 font-medium text-[#DDD]')}>
        존재하지 않는 주소를 입력하셨거나, <br />
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <Link
        href="/"
        className={cn(
          'flex items-center gap-4 rounded-xl px-3 py-1.5 text-base leading-6 font-medium text-[#DDD] hover:bg-[rgba(51,51,51,0.50)]',
        )}
      >
        메인페이지로 <ArrowIcon color="#DDD" />
      </Link>
    </div>
  );
};

export default NotFound;
