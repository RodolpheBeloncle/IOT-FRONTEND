import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Upload, Image, Col, Row, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../services/axiosInterceptor';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
// import axios from '../Services/axiosInterceptor';
const Profil = () => {
  const { userInfo, getCookie, clearCookie } = useContext(UserContext);
  const navigate = useNavigate();
  // !!  === TODO setname in cookie too   ===

  const [input, setInput] = useState({
    newpassword: '',
    confirmpassword: '',
    username: userInfo.username,
  });

  const handleLogout = () => {
    document.cookie =
      'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;';
    clearCookie('token');
    clearCookie('googleAuth');
    navigate('/login');
  };

  const handleChangeProfil = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    if (input.password !== input.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const token = getCookie('token');
      const response = await axios.post(
        import.meta.env.VITE_API_USERS,
        input,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        message.success(response.data.message);
        // handleLogout();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error('An error occurred. Please try again later.');
    }
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Form.Item>
          <Upload>
            <Image
              src={
                userInfo.picture
                  ? userInfo.picture
                  : 'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
              }
              alt="profil_pic"
              className="img-fluid"
              style={{ borderRadius: '1rem 0 0 1rem' }}
            />
          </Upload>
        </Form.Item>
      </Col>
      <Col xs={24} sm={16}>
        <Form onFinish={handleSubmit}>
          <Form.Item label="Update Username">
            <Input
              type="text"
              value={input.username}
              onChange={handleChangeProfil}
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item label="Update Password">
            <Input.Password
              type="password"
              value={input.password}
              onChange={handleChangeProfil}
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input.Password
              type="password"
              value={input.confirmpassword}
              onChange={handleChangeProfil}
              placeholder="Confirm password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Profil;
