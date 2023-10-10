import { Layout } from 'antd';

import styles from '../../styles/Header.module.css';

export const HeaderView = ({ children, rightPlace, logo }) => {
  return (
    <Layout.Header className={styles.root}>
      <div className="my_container">
        <div className={styles.row}>
          {logo}
          <div className={styles.center}>
            <div className={styles.input}>{children}</div>
          </div>
          {rightPlace}
        </div>
      </div>
    </Layout.Header>
  );
};
