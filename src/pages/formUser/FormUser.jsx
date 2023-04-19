import React, { useState, useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  // Button,
  Checkbox,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Input,
} from '@mui/material';
import emptyAvatar from '../../assets/profile.png';

import { Upload, message, Modal, Button } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';

const Form = () => {
  // const [fileList, setFileList] = useState([]);
  const [inputsField, setInputsField] = useState({
    username: '',
    email: '',
    password: '',
    isVerified: false,
    picture: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: emptyAvatar,
      },
    ],

    role: '',
    color: '',
  });

  const handleChange = (e) => {
    // setFileList(newFileList);
    console.log(e);
    // let name = e.target.name;
    // let value = e.target.value;

    // setInputsField((prevState) => ({ ...prevState, [name]: value }));
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

  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = async (values) => {
    console.log(values);

    // await axios
    //   .post(process.env.REACT_APP_API_URL_DEVICES, values)
    //   .then((res) => {
    //     console.log('add controllers', res);
    //     openNotification(res.data.type);
    //     handleOk();
    //     form.resetFields();
    //   })
    //   .catch((err) => {
    //     onFinishFailed(err);
    //     console.log(err);
    //   });
  };

  // const initialValues = {
  //   username: '',
  //   email: '',
  //   password: '',
  //   isVerified: false,
  //   picture: fileList,
  //   role: '',
  //   color: '',
  // };
  const checkoutSchema = yup.object().shape({
    username: yup.string().required('Required'),
    email: yup.string().email('Invalid email!').required('Required'),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    role: yup.string().oneOf(['admin', 'manager', 'user']).required(),
  });

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={inputsField}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
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
                  fileList={inputsField.picture}
                  onChange={onChangeFile}
                  onPreview={onPreview}
                >
                  {inputsField.picture.length < 1 && '+ Upload'}
                </Upload>
              </ImgCrop>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 2' }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 2' }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="checkbox"
                label="is Verified"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.isVerified}
                name="isVerified"
                error={!!touched.isVerified && !!errors.isVerified}
                helperText={touched.isVerified && errors.isVerified}
                sx={{ gridColumn: 'span 2' }}
              /> */}

              <InputLabel
                id="role"
                style={{ disableAnimation: false }}
                disableAnimation={false}
                htmlFor="assignRole"
                sx={{ gridColumn: 'span 4' }}
              >
                Is Verified
                <Checkbox
                  label="IsVerified"
                  name="isVerified"
                  sx={{ gridColumn: 'span 2' }}
                  checked={values.isVerified}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </InputLabel>

              <TextField
                fullWidth
                variant="filled"
                type="color"
                label="color"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.color}
                name="color"
                error={!!touched.color && !!errors.color}
                helperText={touched.color && errors.color}
                sx={{ gridColumn: 'span 2' }}
              />
            </Box>

            <InputLabel
              id="role"
              style={{ disableAnimation: false }}
              disableAnimation={false}
              htmlFor="assignRole"
              sx={{ gridColumn: 'span 4' }}
            >
              Select role *
            </InputLabel>

            <Select
              labelId="role"
              id="role"
              name="role"
              value={values.role}
              label="role"
              onChange={handleChange}
              error={!!touched.role && !!errors.role}
              helperText={touched.role && errors.role}
              input={<Input name="assignRole" id="assignRole" />}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
