import { OtherMember } from 'pages/conference/components/media-content/members/member/other-member';
import { SelfMember } from 'pages/conference/components/media-content/members/member/self-member';
import { IMember } from 'shared/domains/conference/models';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

type TProps = {
  member: IMember;
};

function MemberObserver({ member }: TProps) {
  const user = userService.store.user;
  const isSelfMember = user?.id === member.user.id;

  return isSelfMember ? (
    <SelfMember member={member} />
  ) : (
    <OtherMember member={member} />
  );
}

export const Member = withObserverMemo(MemberObserver);
