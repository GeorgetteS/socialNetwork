import { Layout } from 'antd';
import Image from 'next/image';
import { FC } from 'react';

import styles from '../../styles/Header.module.css';

export const HeaderView: FC = ({ children, rightPlace }) => {
  return (
    <Layout.Header className={styles.root}>
      <div className="my_container">
        <div className={styles.row}>
          <Image src={'/logo.svg'} width={40} height={40} alt="logo" />
          <div className={styles.center}>
            <div className={styles.input}>{children}</div>
          </div>
          {rightPlace}
        </div>
      </div>
    </Layout.Header>
  );
};
