import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import emptyProfil from '../../assets/profile.png';
import axios from 'axios';
import {
  Box,
  Checkbox,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControlLabel,
  FormControl,
  Button,
  useTheme,
} from '@mui/material';
import { newUser } from '../../interface/NewUser';

import { Upload, message, Popconfirm, notification } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ColorModeContext, tokens } from '../../theme';

import ImgCrop from 'antd-img-crop';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';

const FormUser = () => {
  const { id } = useParams();
  console.log('ID', id);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [colorTarget, setColorTarget] = useState('');
  const [userRole, setUserRole] = useState('User');
  const [picture, setPicture] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: emptyProfil,
    },
  ]);
  const navigate = useNavigate();

  const [inputsField, setInputsField] = useState(newUser);

  const checkoutSchema = yup.object().shape({
    // username: yup.string().required('Required'),
    // email: yup.string().email('Invalid email!').required('Required'),
    // password: yup
    //   .string()
    //   .required('No password provided.')
    //   .min(8, 'Password is too short - should be 8 chars minimum.')
    //   .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    // role: yup.string().oneOf(['admin', 'user', 'guest']).required(),
    // isVerified: yup.boolean(),
    // picture: yup.array(),
    // color: yup
    //   .string()
    //   .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color value'),
  });
  const [errors, setErrors] = useState({});

  const notificationSucess = () => {
    notification.success({
      message: 'User Created',
      description: `${
        id
          ? 'User has been successfully updated!'
          : 'User has been successfully created!'
      }`,
      placement: 'top',
    });
  };

  const notificationError = (err) => {
    notification.error({
      message: 'error',
      description: err.data.message,
      placement: 'top',
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value, type, checked } = e.target;
    setInputsField((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleChangeRole = (e) => {
    console.log('role: ', e.target.value);
    setUserRole(e.target.value);
    setInputsField((prevData) => ({
      ...prevData,
      role: e.target.value,
    }));
  };
  const handleChangeColor = (e) => {
    console.log('color: ', e.target.value);
    setColorTarget(e.target.value);
    setInputsField((prevData) => ({
      ...prevData,
      color: e.target.value,
    }));
  };

  const onChangeFile = ({ file, fileList }) => {
    console.log('fileList', fileList);
    setFileList(fileList);

    setInputsField((prevState) => ({
      ...prevState,
      picture: file,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append(inputsField);

    try {
      checkoutSchema.validate(inputsField, { abortEarly: false });
      await axios.put(`${import.meta.env.VITE_API_USERS}/${id}`, form);
      console.log('form', form);
      // axios.post(import.meta.env.VITE_API_USERS, inputsField);

      notificationSucess();
      // navigate('/');
    } catch (err) {
      // validation errors occurred, update error state
      const validationErrors = {};

      setErrors(validationErrors);
      notification.error({
        message: err.message,
        description: `please fix error : ${error}`,
        placement: 'top',
      });
    } finally {
      setInputsField({
        username: '',
        email: '',
        // password: '',
        isVerified: false,
        picture: [],
        role: 'user',
        color: '#ffffff',
      });
    }
  };

  const getUserById = useCallback(async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_USERS}/${id}`);

    console.log('getuser', response.data);
    const { picture } = response.data;
    setInputsField(response.data);

    setFileList([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: picture || '',
      },
    ]);
  }, []);

  useEffect(() => {
    id && getUserById();
    id && setColorTarget(inputsField.color);
    id && setUserRole(inputsField.role);
    let defaultImage = [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: inputsField?.picture,
      },
    ];
  }, []);

  const isNonMobile = useMediaQuery('(min-width:600px)');
  return (
    <Box m="20px">
      <Header
        title={`${id ? 'UPDATE USER' : 'CREATE USER'}`}
        subtitle={`${id ? 'Update User Profil' : 'Create a New User Profile'}`}
      />

      <form>
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
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
            label={id ? '' : 'Username'}
            name="username"
            value={inputsField?.username}
            onChange={handleChange}
            error={!!errors.username}
            required
          />
          <TextField
            label={id ? '' : 'Email'}
            name="email"
            value={inputsField?.email}
            onChange={handleChange}
            error={!!errors.email}
            required
          />
          {/* <TextField
            label={id ? '' : 'Password'}
            name="password"
            type="password"
            value={inputsField?.password}
            onChange={handleChange}
            error={!!errors.password}
            required
          /> */}
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
          />

          <FormControl>
            <InputLabel id="select-label">Select a role</InputLabel>
            <Select
              labelId="select-label"
              value={userRole}
              onChange={handleChangeRole}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="guest">Guest</MenuItem>
            </Select>
          </FormControl>
          {errors?.role && <span role="alert">{errors.role.message}</span>}
          <TextField
            onChange={handleChangeColor}
            label="Color"
            type="color"
            value={colorTarget}
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.color}
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
              type="submit"
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

export default FormUser;
