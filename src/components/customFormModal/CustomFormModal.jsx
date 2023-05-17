import React, { useState, useContext, useEffect } from 'react';
import securedApi from '../../services/axiosInterceptor';
import { UserContext } from '../../context/UserContextProvider';
import Swal from 'sweetalert2';
import './customFormModal.css';
import { Form, Input, Modal, Row, Col, Radio, Divider, Popconfirm } from 'antd';
import {
  PoweroffOutlined,
  LineChartOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';

const CustomFormModal = ({ isOpenModal, setIsOpenModal, userInfo }) => {
  const [form] = Form.useForm();
  const { getCookie, isLoading, setIsLoading } = useContext(UserContext);
  const [formWidget, setFormWidget] = useState('switch');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [formInputs, setFormInputs] = useState({
    type: formWidget,
    widgetName: '',
    topic: '',
    initValue: '',
    on: '',
    off: '',
    maxValue: '',
    unit: '',
    createdBy: userInfo.email,
  });

  const onFormInputsChange = (values) => {
    setFormInputs((prevState) => ({ ...prevState, ...values }));
    console.log('onChange target value  : ', values);
  };

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleOk = () => {
    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    alert(errorInfo);
  };

  const onCreate = async (widget) => {
    // If the form submission is successful, trigger the notification

    Swal.fire({
      icon: 'success',
      title: '☑️ Successful',
      text: `${widget} have been successfully created`,
      customClass: {
        container: 'popup-modal-container',
        icon: 'popup-modal-icon', // Add a custom class for the icon
      },
      showConfirmButton: false, // Hide the default "OK" button
      timer: 2000,
    });
  };

  const throwError = async (error) => {
    Swal.fire({
      icon: 'error',
      title: `⚠️ error`,
      text: error,
      customClass: {
        container: 'popup-modal-container',
        icon: 'popup-modal-icon', // Add a custom class for the icon
      },
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const onFinish = async () => {
    try {
      // Set user credentials
      const token = getCookie('token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await securedApi.post(
        import.meta.env.VITE_API_AUTH_DEVICES,
        formInputs,
        { headers: headers }
      );

      console.log('add controllers', response);
      handleOk();
      form.resetFields();
      onCreate(formInputs.widgetName);
    } catch (error) {
      console.log(error.response.data);
      handleCancel();
      throwError(error.response.data);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={showModal}
        style={{ backgroundColor: theme.palette.secondary.main }}
      >
        Add Widget
      </Button>
      <Modal
        title="Device Widget Form"
        open={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Radio.Group defaultValue={formWidget}>
          <Radio.Button
            value="sensor"
            onChange={(e) => {
              setFormWidget(e.target.value);
              form.resetFields();
              setFormInputs((prevState) => ({
                ...prevState,
                type: e.target.value,
              }));
              console.log('type', e.target.value);
            }}
          >
            {' '}
            <LineChartOutlined />
            Sensor
          </Radio.Button>
          <Radio.Button
            value="switch"
            onChange={(e) => {
              setFormWidget(e.target.value);
              form.resetFields();
              setFormInputs((prevState) => ({
                ...prevState,
                type: e.target.value,
              }));
              console.log('type', e.target.value);
            }}
          >
            {' '}
            <PoweroffOutlined />
            Switch
          </Radio.Button>
        </Radio.Group>

        <Form
          name="Device Widget Form"
          form={form}
          // onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={(values) => onFormInputsChange(values)}
          autoComplete="off"
          style={{
            maxWidth: 600,
          }}
        >
          {formWidget === 'sensor' ? (
            <>
              <Divider orientation="left" plain>
                {formWidget[0].toUpperCase() +
                  formWidget.slice(1).toLowerCase()}{' '}
                Widget
              </Divider>

              <Col xs={20} sm={20} md={20} lg={20}>
                <Form.Item
                  label="Widget Name"
                  name="widgetName"
                  rules={[
                    { required: true, message: 'please set a widget name' },
                    {
                      pattern: /^.{1,25}$/, // Change the range {1,25} as per your requirement
                      message:
                        'String length must be between 1 to 25 characters.',
                    },
                  ]}
                >
                  <Input
                    placeholder="Widget name"
                    value={formInputs.widgetName}
                  />
                </Form.Item>

                <Form.Item
                  label="MQTT Topic"
                  tooltip={{
                    title: 'Name of the associated mqtt topic to connected',
                    icon: <InfoCircleOutlined />,
                  }}
                  name="topic"
                  rules={[
                    { required: true, message: 'Please input a topic!' },
                    {
                      pattern: /^.{1,50}$/, // Change the range {1,50} as per your requirement
                      message:
                        'String length must be between 1 to 50 characters.',
                    },
                  ]}
                >
                  <Input placeholder="target MQTT topic" />
                </Form.Item>
                <Form.Item
                  label="Initial Value"
                  name="initValue"
                  rules={[
                    {
                      required: true,
                      message: 'Please set a initial value!',
                    },
                    {
                      pattern: /^-?\d*(\.\d+)?$/,
                      validator: (rule, value) => {
                        if (value <= 10) {
                          // Change the maximum value as per your requirement
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          'Number must be less than or equal to 10.'
                        ); // Change the error message as per your requirement
                      },
                    },
                  ]}
                >
                  <Input placeholder="Numeric value only" />
                </Form.Item>
                <Form.Item
                  label="Unit"
                  name="unit"
                  rules={[
                    { required: true, message: 'Please set a unit value!' },
                    {
                      pattern: /^[A-Za-z]+$/,
                      message: 'Input must contain only letters.',
                    },
                  ]}
                >
                  <Input placeholder="C,F,K,lux,etc..." />
                </Form.Item>
                <Form.Item
                  label="Max Value"
                  name="maxValue"
                  rules={[
                    { required: true, message: 'Please set a max value!' },
                    {
                      pattern: /^-?\d*(\.\d+)?$/,
                      validator: (rule, value) => {
                        if (value <= 1000) {
                          // Change the maximum value as per your requirement
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          'Number must be less than or equal to 1000.'
                        ); // Change the error message as per your requirement
                      },
                    },
                  ]}
                >
                  <Input placeholder="Max allowable value" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                  <Popconfirm
                    title="Confirm Creation"
                    description="Are you sur to create new widget ?"
                    onConfirm={onFinish}
                    onOpenChange={() => console.log('open change')}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Popconfirm>
                </Form.Item>
              </Col>
            </>
          ) : null}

          {formWidget === 'switch' ? (
            <>
              <Divider orientation="left" plain>
                {formWidget[0].toUpperCase() +
                  formWidget.slice(1).toLowerCase()}{' '}
                Widget
              </Divider>

              <Col xs={20} sm={20} md={20} lg={20}>
                <Form.Item
                  label="Widget Name"
                  name="widgetName"
                  rules={[
                    {
                      required: true,
                      message: 'Please input a widget name!',
                    },
                    {
                      pattern: /^.{1,25}$/, // Change the range {1,25} as per your requirement
                      message:
                        'String length must be between 1 to 25 characters.',
                    },
                  ]}
                >
                  <Input placeholder="Name for the widget" />
                </Form.Item>

                <Form.Item
                  label="MQTT Topic"
                  tooltip={{
                    title: 'Name of the associated mqtt topic to connected',
                    icon: <InfoCircleOutlined />,
                  }}
                  name="topic"
                  rules={[
                    { required: true, message: 'Please input a topic!' },
                    {
                      pattern: /^.{1,50}$/, // Change the range {1,25} as per your requirement
                      message:
                        'String length must be between 1 to 50 characters.',
                    },
                  ]}
                >
                  <Input placeholder="Target MQTT topic" />
                </Form.Item>

                <Form.Item
                  label="Initial Value"
                  name="initValue"
                  rules={[
                    {
                      required: true,
                      message: 'Please input a initial value!',
                    },
                    {
                      min: 0,
                      message: 'value have to be between 0 and 1',
                    },
                    {
                      max: 1,
                      message: 'value have to be between 0 and 1',
                    },
                  ]}
                >
                  <Input placeholder="Ether 1 or 0 only" />
                </Form.Item>

                <Form.Item
                  label="ON Text"
                  tooltip={{
                    title: 'The text to display when the switch is on',
                    icon: <InfoCircleOutlined />,
                  }}
                  name="on"
                  rules={[
                    { required: true, message: 'Please input an ON text!' },
                    {
                      pattern: /^.{1,25}$/, // Change the range {1,25} as per your requirement
                      message:
                        'String length must be between 1 to 25 characters.',
                    },
                  ]}
                >
                  <Input placeholder="ex : swicht on" />
                </Form.Item>

                <Form.Item
                  label="OFF Text"
                  tooltip={{
                    title: 'The text to display when the switch is off',
                    icon: <InfoCircleOutlined />,
                  }}
                  name="off"
                  rules={[
                    {
                      required: true,
                      message: 'Please input an OFF text!',
                    },
                    {
                      pattern: /^.{1,25}$/, // Change the range {1,25} as per your requirement
                      message:
                        'String length must be between 1 to 25 characters.',
                    },
                  ]}
                >
                  <Input placeholder="ex : swicht off" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                  <Popconfirm
                    title="Confirm Creation"
                    description="Are you sur to create new widget ?"
                    onConfirm={onFinish}
                    onOpenChange={() => console.log('open change')}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Popconfirm>
                </Form.Item>
              </Col>
            </>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
};

export default CustomFormModal;
