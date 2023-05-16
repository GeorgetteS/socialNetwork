import { FC } from 'react';

import { Tabs } from 'antd';

import { RegistrationForm } from './RegistrationForm';
import { LoginForm } from './LoginForm';

import styles from '../../styles/AuthPanel.module.css';

const items = [
  {
    key: '1',
    label: `Войти`,
    children: <LoginForm />,
  },
  {
    key: '2',
    label: `Зарегистрироваться`,
    children: <RegistrationForm />,
  },
];

export const AuthPanel: FC = () => {
  return (
    <div className={styles.auth_panel}>
      <Tabs items={items}></Tabs>
    </div>
  );
};
