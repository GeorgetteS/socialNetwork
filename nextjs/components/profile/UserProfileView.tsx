import { ReactNode } from 'react';

import styles from '../../styles/UserProfile.module.css';

interface IUserProfileView {
  userInfo: ReactNode;
  postPublishPanel?: ReactNode;
  posts: ReactNode;
  social: ReactNode;
}

export const UserProfileView = ({
  userInfo,
  postPublishPanel,
  posts,
  social,
}: IUserProfileView) => {
  return (
    <div className={styles.main_column}>
      {userInfo}
      <div className={styles.main_content}>
        <div className={styles.posts}>
          {postPublishPanel}
          {posts}
        </div>
        <div className={styles.social}>{social}</div>
      </div>
    </div>
  );
};
