import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { Button, Form, Input, notification } from 'antd';

import { LoginFormDTO, LoginResponseDTO } from '../../api/dto/auth.dto';
import { useLoginMutation } from '../../api/authApi/authApi';
import { userIdSelector } from '../../redux/user/userSelectors';

export const LoginForm: FC = () => {
  const [login] = useLoginMutation();
  const UserId = useSelector(userIdSelector);
  const router = useRouter();

  const onSubmit = (userData: LoginFormDTO) => {
    login(userData)
      .unwrap()
      .then((user: LoginResponseDTO) => {
        notification.success({
          message: 'Вы авторизованы!',
        });
        router.push(`/profile/${user.user.id}`);
        console.log(UserId);
      })
      .catch((error) => {
        if (error.status === 401) {
          notification.error({
            message: error.data.message,
          });
        }
      });
  };

  return (
    <div className="">
      <Form name="login" labelCol={{ span: 5 }} labelAlign="left" onFinish={onSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            {
              type: 'email',
              message: 'Введите корректный email!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
