import React, { useState, useContext } from 'react';
import { Button, Modal, message, Form, Input, notification } from 'antd';
import './styles/register.css';
import axios from '../services/axiosInterceptor';
// import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const Register = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isLoading, setIsLoading } = useContext(UserContext);
  const [form] = Form.useForm();

  const handleRegister = async (form) => {
    const { password, email, username } = form;

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_AUTH_REGISTER,
        {
          password,
          email,
          username,
        }
      );

      notification.success({
        message: 'Registration Successful',
        description: response,
        placement: 'top',
      });

      console.log(response);
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'error',
        description: error.response.data,
        placement: 'top',
      });
    } finally {
      navigate('/login');
    }
  };

  const onFinish = (values) => {
    setIsModalVisible(true);
    console.log('Form values:', values);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      setIsModalVisible(false);
      handleRegister(values);
      console.log('Registering user:', values);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-4 p-lg-5 text-black">
                <Form
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  layout="vertical"
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                      {
                        type: 'email',
                        message: 'Please enter a valid email address',
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
                        message: 'Please input your password!',
                      },
                      {
                        min: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error('Passwords must match')
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Register
                    </Button>
                  </Form.Item>

                  <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                    Already Have an Account?
                    <Link to="/login" style={{ color: '#393f81' }}>
                      Login Here
                    </Link>
                  </p>
                </Form>

                <Modal
                  title="Confirm Registration"
                  open={isModalVisible}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
                >
                  <p>Are you sure you want to register with these details?</p>
                  <p>Username: {form.getFieldValue('username')}</p>
                  <p>Email: {form.getFieldValue('email')}</p>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
