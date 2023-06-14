import React, { useState, useContext, useEffect, useCallback } from 'react';
import './formUser.css';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContextProvider';
import emptyProfil from '../../assets/profile.png';
import securedApi from '../../services/axiosInterceptor';
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
import { ColorModeContext, tokens } from '../../theme';
import ImgCrop from 'antd-img-crop';
import * as yup from 'yup';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';

const FormUser = () => {
  const { id } = useParams();
  const { getCookie, isLoading, setIsLoading } = useContext(UserContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [colorTarget, setColorTarget] = useState('');
  const [userRole, setUserRole] = useState('User');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: emptyProfil,
    },
  ]);
  const [confirmVisible, setConfirmVisible] = useState(false);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputsField((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleChangeRole = (e) => {
    setUserRole(e.target.value);
    setInputsField((prevData) => ({
      ...prevData,
      role: e.target.value,
    }));
  };
  const handleChangeColor = (e) => {
    setColorTarget(e.target.value);
    setInputsField((prevData) => ({
      ...prevData,
      color: e.target.value,
    }));
  };

  const onChangeFile = ({ file, fileList }) => {
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

    try {
      // Set user credentials
      const token = getCookie('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Form fields and their values stored in state variables
      const form = new FormData();
      const { color, picture, role, username, email, isVerified, password } =
        inputsField;
      form.append('color', color);
      form.append('picture', picture);
      form.append('role', role);
      form.append('password', password);
      form.append('isVerified', isVerified);
      form.append('username', username);
      form.append('email', email);

      let response;

      if (id) {
        response = await securedApi.put(
          `${import.meta.env.VITE_API_AUTH_USERS}/${id}`,
          form,
          { headers: headers }
        );
        notification.success({
          message: 'Sucess',
          description: response,
          placement: 'top',
        });
        navigate('/');
      } else {
        // Create new user logic
        form.forEach((element) => {
        });

        response = await securedApi.post(
          import.meta.env.VITE_API_AUTH_USERS,
          form,
          { headers }
        );
        notification.success({
          message: 'Controller deleted',
          description: response,
          placement: 'top',
        });
        navigate('/');
      }

      // Handle the API response
      if (response.status !== 200) {
        throw new Error('API call failed');
      }
    } catch (error) {
      notification.error({
        message: 'error',
        description: error.response.data,
        placement: 'top',
      });
    } finally {
      setInputsField({
        username: '',
        email: '',
        password: '',
        isVerified: false,
        picture: [],
        role: 'user',
        color: '#ffffff',
      });
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: emptyProfile,
        },
      ]);
    }
  };

  const getUserById = useCallback(async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_USERS}/${id}`);
    setInputsField(response.data);
    setFileList([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: response.data.picture,
      },
    ]);
  }, []);

  useEffect(() => {
  
    id && getUserById();
    id && setColorTarget(inputsField.color);
    id && setUserRole(inputsField.role);
    !id &&
      setInputsField({
        username: '',
        email: '',
        password: '',
        isVerified: false,
        picture: [],
        role: 'user',
        color: '#ffffff',
      });
    !id &&
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: emptyProfil,
        },
      ]);
  }, [id]);

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
            label={'Username'}
            name="username"
            value={inputsField?.username}
            onChange={handleChange}
            error={!!errors.username}
            required
          />
          <TextField
            label={'Email'}
            name="email"
            value={inputsField?.email}
            onChange={handleChange}
            error={!!errors.email}
            required
          />
          <FormControl>
            <TextField
              label={'Password'}
              name="password"
              type="password"
              value={inputsField?.password}
              onChange={handleChange}
              error={!!errors.password}
              required
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={inputsField?.isVerified}
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
              value={inputsField.role}
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
            open={confirmVisible}
            onConfirm={handleSubmit}
            onCancel={() => setConfirmVisible(false)}
            onOpenChange={(visible) => setConfirmVisible(visible)}
          >
            <Button
              // type="submit"
              onClick={() => setConfirmVisible(true)}
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
