import { FC } from 'react';
import { Button, Form, Input } from 'antd';

import { LoginFormDTO } from '../../api/dto/auth.dto';
import { useLoginMutation } from '../../api/authApi/authApi';

export const LoginForm: FC = () => {
  const [login] = useLoginMutation();

  const onSubmit = (value: LoginFormDTO) => {
    try {
      login(value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="">
      <Form name="login" labelCol={{ span: 5 }} labelAlign="left" onFinish={onSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}>
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
