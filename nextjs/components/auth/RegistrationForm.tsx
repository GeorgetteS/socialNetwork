import { FC } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Input, notification } from 'antd';

import { RegistrstionFormDTO } from '../../api/dto/auth.dto';
import { useRegistrationMutation } from '../../api/authApi/authApi';

export const RegistrationForm: FC = () => {
  const [registration] = useRegistrationMutation();
  const router = useRouter();

  const onSubmit = (userData: RegistrstionFormDTO) => {
    registration(userData)
      .unwrap()
      .then(() => {
        notification.success({
          message: 'Вы зарегистрированы!',
        });
        router.push('/');
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
      <Form name="registration" labelCol={{ span: 5 }} labelAlign="left" onFinish={onSubmit}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Введите ваше имя!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="surname"
          rules={[{ required: true, message: 'Введите вашу фамилию!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Введите email!' },
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
          rules={[{ required: true, message: 'Введите пароль!' }]}>
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
