import { FC } from 'react';
import { Button, Form, Input } from 'antd';

export const LoginForm: FC = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="">
      <Form name="login" labelCol={{ span: 5 }} labelAlign="left">
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
