import { Layout } from 'antd';
import Image from 'next/image';

import styles from '../../styles/Header.module.css';

export const HeaderView = ({ children, rightPlace }) => {
  return (
    <Layout.Header className={styles.root}>
      <div className="my_container">
        <div className={styles.row}>
          <Image src={'/logo.svg'} width={40} height={40} alt="logo" priority={true} />
          <div className={styles.center}>
            <div className={styles.input}>{children}</div>
          </div>
          {rightPlace}
        </div>
      </div>
    </Layout.Header>
  );
};
