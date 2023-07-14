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

const AuthPanel = () => {
  return (
    <div className={styles.auth_panel}>
      <Tabs items={items}></Tabs>
    </div>
  );
};

export default AuthPanel;
