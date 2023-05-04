import React, { useState, useContext } from 'react';
import { Button, Modal, message, Form, Input } from 'antd';
import './styles/register.css';
// import axios from '../services/axiosInterceptor';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

const Register = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setCookie } = useContext(UserContext);
  const [form] = Form.useForm();

  // const handleRegister = (form) => {
  //   axios
  //     .post('api/auth/users/register', form)
  //     .then((response) => {
  //       console.log(response);
  //       alert(response.data);
  //       navigate('/login');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert(error.message);
  //       console.log(error);
  //     });
  // };

  // ? ==== register json_server ====
  const handleRegister = async (form) => {
    const { password, email, username } = form;
    axios
      // .post(import.meta.env.VITE_API_USERS, form)
      .post(import.meta.env.VITE_API_JSONREGISTER, {
        password,
        email,
        username,
      })
      .then((res) => {
        console.log('register : ', res.data.accessToken);
        setCookie('token', res.data.accessToken);
        alert(res.statusText);
      })
      .catch((err) => alert(err))
      .finally(() => {
        navigate('/login');
      });
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
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
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
      </div>
    </section>

    // <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
    //   <div className="container py-5 h-100">
    //     <div className="row d-flex justify-content-center align-items-center h-100">
    //       <div className="col col-xl-10">
    //         <div className="card" style={{ borderRadius: '1rem' }}>
    //           <div className="row g-0">
    //             <div className="col-md-6 col-lg-5 d-none d-md-block">
    //               <img
    //                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
    //                 alt="login form"
    //                 className="img-fluid"
    //                 style={{ borderRadius: '1rem 0 0 1rem' }}
    //               />
    //             </div>
    //             <div className="col-md-6 col-lg-7 d-flex align-items-center">
    //               <div className="card-body p-4 p-lg-5 text-black">
    //                 <form onSubmit>
    //                   <div className="d-flex align-items-center mb-3 pb-1">
    //                     <i
    //                       className="fas fa-cubes fa-2x me-3"
    //                       style={{ color: ' #ff6219' }}
    //                     ></i>
    //                     <span className="h1 fw-bold mb-0">Logo</span>
    //                   </div>

    //                   <h5
    //                     className="fw-normal mb-3 pb-3"
    //                     style={{ letterSpacing: '1px' }}
    //                   >
    //                     Create A New Account
    //                   </h5>

    //                   <div className="form-outline mb-4">
    //                     <input
    //                       placeholder="Enter Your username"
    //                       type="text"
    //                       className="form-control form-control-lg"
    //                       name="username"
    //                       value={input.username}
    //                       onChange={handleChangeField}
    //                     />
    //                     {validationErrors.username && (
    //                       <span className="error">
    //                         {validationErrors.username}
    //                       </span>
    //                     )}
    //                   </div>

    //                   <div className="form-outline mb-4">
    //                     <input
    //                       placeholder="Enter Valid Email Address"
    //                       type="email"
    //                       className="form-control form-control-lg"
    //                       name="email"
    //                       value={input.email}
    //                       onChange={handleChangeField}
    //                     />
    //                     {validationErrors.email && (
    //                       <span className="error">
    //                         {validationErrors.email}
    //                       </span>
    //                     )}
    //                   </div>
    //                   <div className="form-outline mb-4">
    //                     <input
    //                       placeholder="Enter Password"
    //                       type="password"
    //                       className="form-control form-control-lg"
    //                       name="password"
    //                       value={input.password}
    //                       onChange={handleChangeField}
    //                     />
    //                     {validationErrors.password && (
    //                       <span className="error">
    //                         {validationErrors.password}
    //                       </span>
    //                     )}
    //                   </div>

    //                   <div className="form-outline mb-4">
    //                     <input
    //                       placeholder="Confirm Password"
    //                       type="password"
    //                       className="form-control form-control-lg"
    //                       name="confirmPassword"
    //                       value={input.confirmPassword}
    //                       onChange={handleChangeField}
    //                     />
    //                     {validationErrors.confirmPassword && (
    //                       <span className="error">
    //                         {validationErrors.confirmPassword}
    //                       </span>
    //                     )}
    //                   </div>

    //                   {/* <Button onClick={showPromiseConfirm}>
    //                       With promise
    //                     </Button> */}

    //                   <Space wrap>
    //                     <Button onClick={(e) => showConfirm(e)}>
    //                       Register {isLoading && <span>...</span>}
    //                     </Button>
    //                   </Space>

    //                   <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
    //                     Already Have an Account?
    //                     <Link to="/login" style={{ color: '#393f81' }}>
    //                       Login Here
    //                     </Link>
    //                   </p>
    //                 </form>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Register;
