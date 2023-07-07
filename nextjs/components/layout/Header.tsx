import { useRouter } from 'next/router';
import { FC } from 'react';

import { Button } from 'antd';

import { useLogoutMutation } from '../../restApi/authApi/authApi';

import { HeaderView } from './HeaderView';
import { InputSelectUser } from '../form/InputSelectUser/InputSelectUser';

export const Header: FC = () => {
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const onLogout = () => {
    logout('')
      .unwrap()
      .then(() => {
        router.push('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <HeaderView rightPlace={<Button onClick={onLogout}>Выйти</Button>}>
      <InputSelectUser label="Найти друзей" />
    </HeaderView>
  );
};
