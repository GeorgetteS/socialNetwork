import Image from 'next/image';
import { FC } from 'react';

import { Layout } from 'antd';

import styles from '../../styles/Header.module.css';

export const Header: FC = () => {
  return (
    <Layout.Header className={styles.root}>
      <div className={styles.row}>
        <Image src={'logo.svg'} width={40} height={40} alt="logo" />
      </div>
    </Layout.Header>
  );
};
