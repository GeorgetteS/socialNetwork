import { useRouter } from 'next/router';
import { useState } from 'react';

import { Button, Form, Input, notification } from 'antd';

import { LoginFormDTO, LoginResponseDTO } from '../../restApi/dto/auth.dto';
import { useLoginMutation } from '../../restApi/authApi/authApi';

export const LoginForm = () => {
  const [login] = useLoginMutation();
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit = (userData: LoginFormDTO) => {
    setIsDisabled(true);
    login(userData)
      .unwrap()
      .then((user: LoginResponseDTO) => {
        notification.success({
          message: 'Вы авторизованы!',
        });
        router.push(`/profile/${user.user.id}`);
      })
      .catch((error) => {
        if (error.status === 401) {
          notification.error({
            message: error.data.message,
          });
        }
      })
      .finally(() => {
        setIsDisabled(false);
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
          <Button type="primary" htmlType="submit" disabled={isDisabled}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
