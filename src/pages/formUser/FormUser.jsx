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
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';

const Form = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [colorTarget, setColorTarget] = useState('');
  const [userRole, setUserRole] = useState('');
  const [fileList, setFileList] = useState([]);

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
      description: `${
        id
          ? 'User has been successfully updated!'
          : 'User has been successfully created!'
      }`,
      placement: 'top',
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value, type, checked } = e.target;
    setInputsField((prevData) => ({
      ...prevData,
      color: colorTarget,
      role: userRole,
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
      id
        ? axios.put(`http://localhost:8000/users/${id}`, inputsField)
        : axios.post('http://localhost:8000/users', inputsField);
      console.log('Form data is valid:', inputsField);
      checkoutSchema.validate(inputsField, { abortEarly: false });
      openNotification();
      setInputsField({
        username: '',
        email: '',
        password: '',
        isVerified: false,
        picture: [],
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

  const onChangeFile = ({ fileList: newFileList }) => {
    // if ((file.status = 'removed')) {
    //   inputsField.picture = [];
    //   setInputsField((prevState) => ({
    //     ...prevState,
    //     picture: inputsField.picture,
    //   }));
    // }
    setFileList(newFileList);
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

  const getUserById = useCallback(async () => {
    const response = await axios.get(`http://localhost:8000/users/${id}`);

    console.log('getuser', response.data);
    setInputsField(response.data);
  }, []);

  useEffect(() => {
    id && getUserById();
    console.log('picture', inputsField?.picture);
    //!! user role
    console.log('role', inputsField.role);
  }, []);

  const isNonMobile = useMediaQuery('(min-width:600px)');
  return (
    <Box m="20px">
      <Header
        title={`${id ? 'UPDATE USER' : 'CREATE USER'}`}
        subtitle={`${id ? 'Update User Profil' : 'Create a New User Profile'}`}
      />

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
              fileList={fileList}
              onChange={onChangeFile}
              onPreview={onPreview}
              beforeUpload={() => false}
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          </ImgCrop>
          <TextField
            label="Username"
            name="username"
            value={inputsField?.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            required
          />
          <TextField
            label="Email"
            name="email"
            value={inputsField?.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={inputsField?.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                value={inputsField?.isVerified}
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
            value={inputsField.role}
            onChange={handleChangeUser}
          >
            <MenuItem value="">
              <em>-- {inputsField.role} --</em>
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
            description={`${
              id
                ? 'Are you sur to update this user ?'
                : 'Are you sur to create this new user ?'
            }`}
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
              {`${id ? 'Update User' : 'Create New User'}`}
            </Button>
          </Popconfirm>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
