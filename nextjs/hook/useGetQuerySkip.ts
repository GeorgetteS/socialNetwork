import { useSelector } from 'react-redux';

import { userIdSelector } from '../redux/user/userSelectors';

export function useGetQuerySkip() {
  const UserId = useSelector(userIdSelector);

  const skip = {
    skip: UserId === undefined,
  };

  return { UserId, skip };
}
