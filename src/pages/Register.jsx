import React, { useEffect, useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space, message, Form, Input } from 'antd';
import './styles/register.css';
import axios from '../services/axiosInterceptor';
import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  // const checkoutSchema = yup.object().shape({
  //   username: yup.string().required('Please provide username'),
  //   email: yup
  //     .string()
  //     .email('Invalid email!')
  //     .required('Please provide an email'),
  //   password: yup
  //     .string()
  //     .min(8, 'Password is too short - should be 8 chars minimum.')
  //     .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  //     .required('No password provided.'),
  //   confirmPassword: yup
  //     .string()
  //     .oneOf([yup.ref('password'), null], 'Passwords must match')
  //     .required('Please confirm your password'),
  // });
  // const schema = yup.object().shape({
  //   username: yup.string()
  //     .required('Username is required'),
  //   email: yup.string()
  //     .email('Invalid email')
  //     .required('Email is required'),
  //   password: yup.string()
  //     .min(6, 'Password must be at least 6 characters')
  //     .required('Password is required'),
  //   confirmPassword: yup.string()
  //     .oneOf([yup.ref('password'), null], 'Passwords must match')
  //     .required('Confirm password is required'),
  // });

  const handleRegister = (form) => {
    // ====

    axios
      .post('api/auth/users/register', form)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: 'Registration',
      icon: <ExclamationCircleFilled />,
      content: 'Confirm Registration',
      onOk() {
        handleRegister();
      },
      onCancel() {
        console.log('Cancel');
        setInput({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      },
    });
  };
  // const showPromiseConfirm = () => {
  //   confirm({
  //     title: 'Do you want to delete these items?',
  //     icon: <ExclamationCircleFilled />,
  //     content:
  //       'When clicked the OK button, this dialog will be closed after 1 second',
  //     onOk() {
  //       return new Promise((resolve, reject) => {
  //         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
  //       }).catch(() => console.log('Oops errors!'));
  //     },
  //     onCancel() {},
  //   });
  // };

  const handleChangeField = (e) => {
    const { name, value } = e.target;
    console.log(`${name}: ${value}`);
    setInput({
      ...input,
      [name]: value,
    });
  };

  // const handleOk = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setConfirmLoading(true);
  //     await checkoutSchema.validate(input, { abortEarly: false });
  //     console.log('Form data is valid:', input);
  //     const { response } = await axios.post('api/auth/users/register', input);
  //     console.log(response.message);
  //     setOpen(false);
  //     setConfirmLoading(false);
  //     message.success(response.message, 3);
  //     navigate('/');
  //   } catch (error) {
  //     // If validation fails, set the validation errors
  //     console.log(error);
  //     const errors = {};

  //     error.inner.forEach((err) => {
  //       errors[err.path] = err.message;
  //     });

  //     setValidationErrors(errors);
  //     setOpen(false);
  //     setConfirmLoading(false);
  //   }
  // };

  // const handleOk = async (e) => {
  //   e.preventDefault();

  //   try {
  //     setConfirmLoading(true);
  //     await checkoutSchema.validate(input, { abortEarly: false });
  //     console.log('Form data is valid:', input);
  //     const { response } = await axios.post('api/auth/users/register', input);
  //     console.log(response.message);
  //     setOpen(false);
  //     setConfirmLoading(false);
  //     message.success(response.message, 3);
  //     navigate('/');
  //   } catch (error) {
  //     // If validation fails, set the validation errors
  //     console.log(error);
  //     const errors = {};

  //     error.inner.forEach((err) => {
  //       errors[err.path] = err.message;
  //     });

  //     setValidationErrors(errors);
  //     setOpen(false);
  //     setConfirmLoading(false);
  //   }
  // };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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
    <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
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
              </Form>

              <Modal
                title="Confirm Registration"
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                input={input}
              >
                <p>Are you sure you want to register with these details?</p>
                <p>Username: {form.getFieldValue('username')}</p>
                <p>Email: {form.getFieldValue('email')}</p>
              </Modal>
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
