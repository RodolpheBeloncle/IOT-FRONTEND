import React, { useState, useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
} from '@mui/material';

import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';

const Form = () => {
  // test ant design implementation //

  const [fileList, setFileList] = useState([]);

  const validateFileType = ({ type, name }) => {
    if (!allowedTypes) {
      return true;
    }

    if (type) {
      return allowedTypes.includes(type);
    }
  };

  const uploadProps = useMemo(
    () => ({
      beforeUpload: (file) => {
        const isAllowedType = validateFileType(file, 'image/png');
        if (!isAllowedType) {
          setFileList((state) => [...state]);
          message.error(`${file.name} is not PNG file`);
          return false;
        }
        setFileList((state) => [...state, file]);
        return false;
      },
      onRemove: (file) => {
        if (fileList.some((item) => item.uid === file.uid)) {
          setFileList((fileList) =>
            fileList.filter((item) => item.uid !== file.uid)
          );
          return true;
        }
        return false;
      },
    }),
    [fileList]
  );

  //================================
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = async (values) => {
    console.log(values);

    await axios
      .post(process.env.REACT_APP_API_URL_DEVICES, values)
      .then((res) => {
        console.log('add controllers', res);
        openNotification(res.data.type);
        handleOk();
        form.resetFields();
      })
      .catch((err) => {
        onFinishFailed(err);
        console.log(err);
      });
  };

  const initialValues = {
    username: '',
    email: '',
    password: '',
    isVerified: false,
    picture: '',
    role: '',
    color: '',
  };
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
        initialValues={initialValues}
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
              <Upload
                multiple
                {...uploadProps}
                fileList={fileList}
                sx={{ gridColumn: 'span 2' }}
              >
                <Button icon={<UploadOutlined />}>Upload png only</Button>
              </Upload>

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
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
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
                sx={{ gridColumn: 'span 4' }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="role"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="role"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: 'span 4' }}
              /> */}
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="role"
                id="role"
                name="role"
                value={values.role}
                label="role"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: 'span 4' }}
              >
                <MenuItem value={10}>User</MenuItem>
                <MenuItem value={20}>Admin</MenuItem>
                <MenuItem value={30}>Manager</MenuItem>
              </Select>

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
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
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
