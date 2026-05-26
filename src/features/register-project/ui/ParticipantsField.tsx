import { type ChangeEventHandler } from 'react';

import { type UserSummaryType } from '@/entities/user';
import { XIcon } from '@/shared/assets';
import { cn } from '@/shared/utils';

import FieldErrorMessage from './FieldErrorMessage';
import {
  fieldShellClassName,
  hintClassName,
  inputTextClassName,
  labelClassName,
  placeholderClassName,
} from './styles';

interface ParticipantsFieldProps {
  participants: UserSummaryType[];
  participantInput: string;
  searchedUsers: UserSummaryType[];
  isSearching?: boolean;
  errorMessage?: string;
  onRemoveParticipant: (index: number) => void;
  onParticipantInputChange: ChangeEventHandler<HTMLInputElement>;
  onAddParticipant: (user: UserSummaryType) => void;
}

const ParticipantsField = ({
  participants,
  participantInput,
  searchedUsers = [],
  isSearching = false,
  errorMessage,
  onRemoveParticipant,
  onParticipantInputChange,
  onAddParticipant,
}: ParticipantsFieldProps) => {
  const handleAddParticipant = (user: UserSummaryType) => {
    onAddParticipant(user);
  };

  const hasInput = participantInput.trim().length > 0;
  const showSearchResults = hasInput && !isSearching && searchedUsers.length > 0;
  const showNoResults = hasInput && !isSearching && searchedUsers.length === 0;

  return (
    <div className={cn('flex flex-col gap-3')}>
      <label htmlFor="project-participants" className={cn(labelClassName)}>
        프로젝트 참여자
      </label>

      <div
        className={cn('relative flex w-full flex-wrap gap-x-3 gap-y-4 p-4', fieldShellClassName)}
      >
        <div className={cn('flex min-w-50 flex-1 flex-col items-center gap-4')}>
          <input
            id="project-participants"
            name="participants"
            type="text"
            autoComplete="off"
            value={participantInput}
            placeholder="프로젝트 참여자를 입력해주세요"
            onChange={(e) => {
              onParticipantInputChange(e);
            }}
            className={cn('w-full', inputTextClassName, placeholderClassName)}
          />
          {showSearchResults && (
            <>
              <div className={cn('flex w-full items-center gap-4')}>
                <p className={cn('shrink-0 whitespace-nowrap', hintClassName)}>검색결과</p>
                <div className={cn('h-px flex-1 bg-[#6A6A6A]')} />
              </div>
              <div className={'flex w-full flex-wrap items-start gap-4'}>
                {searchedUsers.map((user) => (
                  <button
                    key={user.userId}
                    type="button"
                    onClick={() => handleAddParticipant(user)}
                    className={cn(
                      'flex items-center justify-between gap-[0.62rem] rounded-[62.5rem] bg-[#4F4F4F] px-3 py-[0.38rem] text-left transition-colors',
                    )}
                  >
                    <div>
                      <span className={cn(labelClassName)}>
                        {user.studentNumber} {user.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
          {showNoResults && (
            <div className={cn('flex w-full flex-col gap-4')}>
              <div className={cn('flex w-full items-center gap-4')}>
                <p className={cn('shrink-0 whitespace-nowrap', hintClassName)}>검색결과</p>
                <div className={cn('h-px flex-1 bg-[#6A6A6A]')} />
              </div>
              <p className={cn('text-sm font-medium text-[#9A9A9A]')}>찾을 수 없는 사용자 입니다</p>
            </div>
          )}
          {participants.length > 0 && (
            <>
              <div className={cn('flex w-full items-center gap-4')}>
                <p className={cn('shrink-0 whitespace-nowrap text-[#FC335A]')}>프로젝트 참여자</p>
                <div className={cn('h-px flex-1 bg-[#FC335A]')} />
              </div>
              <div className={'flex w-full flex-wrap items-start gap-4'}>
                {participants.map((participant, index) => (
                  <button
                    key={participant.userId}
                    type="button"
                    onClick={() => onRemoveParticipant(index)}
                    className={cn(
                      'flex items-center gap-2.5 rounded-full bg-[#FC335A] px-4 py-2 text-base leading-[1.2rem] font-medium tracking-[-0.03rem] text-white transition-colors',
                    )}
                  >
                    <p>
                      {participant.studentNumber} {participant.name}
                    </p>
                    <XIcon />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <FieldErrorMessage message={errorMessage} />
    </div>
  );
};

export default ParticipantsField;
