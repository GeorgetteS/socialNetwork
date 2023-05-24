import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';

import styles from '../../styles/Sidebar.module.css';

const menu = [
  { name: 'Профиль', path: '/profile' },
  { name: 'Чаты', path: '/chats' },
  { name: 'Друзья', path: '/friends' },
  { name: 'Настройки', path: '/settings' },
];

export const Sidebar: FC = () => {
  const router = useRouter();

  const linkTo = (path) => {
    router.push(path);
  };
  return (
    <Layout.Sider theme="light">
      <Menu
        selectedKeys={[router.pathname]}
        items={menu.map((item) => ({
          key: item.path,
          onClick: () => linkTo(item.path),
          label: item.name,
        }))}
      />
    </Layout.Sider>
  );
};
