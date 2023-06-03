import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { userIdSelector } from '../../redux/user/userSelectors';

const menu = [
  { name: 'Профиль', path: 'profile' },
  { name: 'Чаты', path: 'chats' },
  { name: 'Друзья', path: 'friends' },
  { name: 'Настройки', path: 'settings' },
];

export const Sidebar: FC = () => {
  const router = useRouter();
  const UserId = useSelector(userIdSelector);

  const path = router.pathname.split('/')[1];

  const linkTo = (path) => {
    if (path === 'profile') {
      router.push(path + '/' + UserId);
    } else {
      router.push('/' + path);
    }
  };
  return (
    <Layout.Sider theme="light">
      <Menu
        selectedKeys={[path]}
        items={menu.map((item) => ({
          key: item.path,
          onClick: () => linkTo(item.path),
          label: item.name,
        }))}
      />
    </Layout.Sider>
  );
};
