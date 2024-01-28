import React from 'react';
import { Button, Form, Input, message } from 'antd';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Login } from '../api/User';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onFinish = async (form) => {
    try {
      const response = await Login(form);
      if (response.status === "success" && signIn({
        auth: {
          token: response.token,
          type: 'Bearer'
        },
        // expiresIn: response.data.expiresIn,
        authState: { ...response.data },
      })) {
        localStorage.setItem('token', response.token)
        navigate('/')
      } else {
        message.error("Invalid username or password");
      }
    } catch (ex) {
      console.log(ex)
      message.error("Oops! Something went wrong please try gain.")
    }
  };


  return (
    <div style={{
      display: "flex", justifyContent: "center", 
      paddingTop: "100px"}}>
     <div style={{
      border: '1px solid #ccc',
      padding: "20px",
      borderRadius: "8px",
      paddingTop: "40px"
     }}>
     <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: 'Username is required!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Password is required!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 18,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
     </div>
    </div>
  );
}
export default LoginPage;