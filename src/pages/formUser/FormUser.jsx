import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Checkbox,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Button,
  useTheme,
} from '@mui/material';

import { Popconfirm, notification } from 'antd';
import { ColorModeContext, tokens } from '../../theme';
import emptyAvatar from '../../assets/profile.png';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import { UserContext } from '../../context/UserContextProvider';
// import newUser from '../../interface/NewUser';

const Form = ({ newUser }) => {
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [colorTarget, setColorTarget] = useState('');
  const [userRole, setUserRole] = useState('');
  // const [inputsField, setInputsField] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   isVerified: false,
  //   picture: [
  //     {
  //       uid: '-1',
  //       name: 'image.png',
  //       status: 'done',
  //       url: userInfo.picture ? userInfo.picture : emptyAvatar,
  //     },
  //   ],
  //   role: 'user',
  //   color: '#ffffff',
  // });
  const [inputsField, setInputsField] = useState({});

  const checkoutSchema = yup.object().shape({
    username: yup.string().required('Required'),
    email: yup.string().email('Invalid email!').required('Required'),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    role: yup.string().oneOf(['admin', 'manager', 'user']).required(),
    isVerified: yup.boolean(),
    picture: yup.array(),
    color: yup
      .string()
      .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color value')
      .required('Color is required'),
  });
  const [errors, setErrors] = useState({});

  const openNotification = () => {
    notification.success({
      message: 'device Created',
      description: `User has been successfully created!`,
      placement: 'top',
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value, type, checked } = e.target;
    setInputsField((prevData) => ({
      ...prevData,
      color: colorTarget,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleChangeUser = (e) => {
    setUserRole(e.target.value);

    setInputsField((prevState) => ({
      ...prevState,
      role: userRole,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post('http://localhost:8000/users', inputsField);
      console.log('Form data is valid:', inputsField);
      checkoutSchema.validate(inputsField, { abortEarly: false });
      openNotification();
      setInputsField({
        username: '',
        email: '',
        password: '',
        isVerified: false,
        picture: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: userInfo.picture ? userInfo.picture : emptyAvatar,
          },
        ],
        role: 'user',
        color: '#ffffff',
      });
      // form data is valid, proceed with submission

      // await axios.post(import.meta.env.VITE_REACT_APP_API_USERS, inputsField);
    } catch (err) {
      // validation errors occurred, update error state
      const validationErrors = {};

      setErrors(validationErrors);
    }
  };

  const onChangeFile = ({ file, fileList }) => {
    if ((file.status = 'removed')) {
      inputsField.picture = [];
      setInputsField((prevState) => ({
        ...prevState,
        picture: inputsField.picture,
      }));
    }
    setInputsField((prevState) => ({
      ...prevState,
      picture: fileList,
    }));
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(async () => {
    const response = await axios.get('http://localhost:8000/users' + `/${id}`);
    console.log(response);
    id ? setInputsField(response.data) : setInputsField(newUser);
  }, [id, newUser]);

  const isNonMobile = useMediaQuery('(min-width:600px)');
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <form onSubmit>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          <ImgCrop rotationSlider>
            <Upload
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={inputsField.picture}
              onChange={onChangeFile}
              onPreview={onPreview}
            >
              {'Upload'}
            </Upload>
          </ImgCrop>

          <TextField
            label="Username"
            name="username"
            value={inputsField.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={inputsField.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={inputsField.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            required
          />

          <FormControlLabel
            control={
              <Checkbox
                value={inputsField.isVerified}
                onChange={handleChange}
                name="isVerified"
              />
            }
            label="isVerified"
            error={!!errors.isVerified}
            helperText={errors.isVerified}
          />

          <InputLabel id="role">Role</InputLabel>
          <Select
            labelId="role"
            id="role"
            value={userRole}
            onChange={handleChangeUser}
          >
            <MenuItem value="">
              <em>-- Select a role --</em>
            </MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
          {errors?.role && <span role="alert">{errors.role.message}</span>}

          <TextField
            onChange={(e) => setColorTarget(e.target.value)}
            label="Color"
            type="color"
            value={colorTarget}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.color}
            helperText={errors.color}
          />
        </Box>

        <Box display="flex" justifyContent="end" mt="20px">
          <Popconfirm
            placement="topRight"
            title="Confirm Creation"
            description="Are you sur to create this new user ?"
            onConfirm={handleSubmit}
            onOpenChange={() => console.log('open change')}
          >
            <Button
              // type="submit"
              // onClick={(e) => handleSubmit(e)}
              variant="contained"
              style={{
                backgroundColor: colors.greenAccent[600],
              }}
            >
              Create New User
            </Button>
          </Popconfirm>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
