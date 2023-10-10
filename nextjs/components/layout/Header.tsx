import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from 'antd';

import Link from 'next/link';

import { useLogoutMutation } from '../../restApi/authApi/authApi';

import { HeaderView } from './HeaderView';
import { InputSelectUser } from '../form/InputSelectUser/InputSelectUser';

export const Header = () => {
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const onLogout = () => {
    logout('')
      .unwrap()
      .then(() => {
        router.push('/auth');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <HeaderView
      logo={
        <Link href={'/'} style={{ height: 40 }}>
          <Image src={'/logo.svg'} width={40} height={40} alt="logo" priority={true} />
        </Link>
      }
      rightPlace={<Button onClick={onLogout}>Выйти</Button>}>
      <InputSelectUser label="Найти друзей" />
    </HeaderView>
  );
};
