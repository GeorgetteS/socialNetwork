import { Layout } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import styles from '../../styles/Sidebar.module.css';

import { userIdSelector } from '../../redux/user/userSelectors';

const menu = [
  { name: 'Профиль', path: '/profile' },
  { name: 'Чаты', path: '/chats' },
  // { name: 'Друзья', path: '/friends' },
  { name: 'Настройки', path: '/settings' },
];

export const Sidebar = () => {
  const UserId = useSelector(userIdSelector);

  return (
    <Layout.Sider theme="light">
      <nav className={styles.nav}>
        {menu.map((item) => {
          return (
            <Link
              key={item.path}
              href={item.path === '/profile' ? `/profile/${UserId}` : item.path}>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </Layout.Sider>
  );
};
