import { useRouter } from 'next/router';
import Image from 'next/image';
import { FC } from 'react';

import { Button, Layout } from 'antd';

import styles from '../../styles/Header.module.css';
import { useLogoutMutation } from '../../api/authApi/authApi';

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
    <Layout.Header className={styles.root}>
      <div className="my_container">
        <div className={styles.row}>
          <Image src={'logo.svg'} width={40} height={40} alt="logo" />
          <Button onClick={onLogout}>Выйти</Button>
        </div>
      </div>
    </Layout.Header>
  );
};
