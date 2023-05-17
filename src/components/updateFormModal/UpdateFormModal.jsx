import React, { useContext } from 'react';
import securedApi from '../../services/axiosInterceptor';
import { UserContext } from '../../context/UserContextProvider';
import Spinner from '../spinner/Spinner';

import {
  Form,
  Input,
  Button,
  Modal,
  Row,
  Col,
  Divider,
  Popconfirm,
  notification,
} from 'antd';
import { InfoCircleOutlined, EditFilled } from '@ant-design/icons';
import { useTheme } from '@mui/material';

const UpdateFormModal = ({
  isOpenModal,
  setIsOpenModal,
  device,
  refreshData,
}) => {
  const { getCookie, isLoading, setIsLoading, userInfo } =
    useContext(UserContext);
  const [form] = Form.useForm();
  // Set the default values for the form
  form.setFieldsValue({ ...device, updatedBy: userInfo.email });
  const theme = useTheme();

  const onFinishFailed = (errorInfo) => {
    // Handle form validation errors
    console.error('Form Validation Failed:', errorInfo);
  };
  const handleFormInputChange = (changedValues, allValues) => {
    // Handle the form input change here
    console.log('Changed Values:', changedValues);
    console.log('All Values:', allValues);
    form.setFieldValue(allValues);

    console.log('form.getFieldValue', form.getFieldValue());
  };

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleOk = () => {
    setIsOpenModal(false);
    notification.success({
      message: 'device Updated',
      description: `Your device ${device?.type} has been successfully updated!`,
      placement: 'bottomRight',
    });
  };

  const handleCancel = () => {
    console.log('cancel');
    setIsOpenModal(false);
  };

  const onFinish = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = getCookie('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Make the API request with Axios
      const response = await securedApi.put(
        `${import.meta.env.VITE_API_AUTH_DEVICES}/${device.id}`,
        form.getFieldValue(),
        {
          headers,
        }
      );

      // Reset the form fields
      form.resetFields();

      // Delay the loading spinner for 1 second
      setTimeout(() => {
        setIsLoading(false);
        console.log('API response:', response);
        notification.success({
          message: 'Success',
          description: response,
          placement: 'top',
        });
        refreshData();
        handleCancel();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      // Handle error response
      console.error('API error:', error);

      notification.error({
        message: 'error',
        description: error,
        placement: 'top',
      });
    }
  };

  return (
    <div>
      <Button
        style={{
          backgroundColor: theme.palette.secondary.main,
        }}
        onClick={showModal}
      >
        <EditFilled />
      </Button>
      <Modal
        title={`Edit ${device?.type}`}
        open={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="DeviceWidgetForm"
          form={form}
          onFinishFailed={onFinishFailed}
          onValuesChange={handleFormInputChange}
          autoComplete="off"
          style={{ maxWidth: 600 }}
        >
          {device?.type === 'sensor' ? (
            <>
              <Divider orientation="left" plain>
                Sensor Widget
              </Divider>

              <Col xs={20} sm={20} md={20} lg={20}>
                <Form.Item
                  label="Widget Name"
                  name="widgetName"
                  rules={[
                    { required: true, message: 'Please set a widget name' },
                    {
                      pattern: /^.{1,25}$/,
                      message:
                        'String length must be between 1 to 25 characters.',
                    },
                  ]}
                >
                  <Input placeholder="Widget name" value={device.widgetName} />
                </Form.Item>

                <Form.Item
                  label="MQTT Topic Name"
                  tooltip={{
                    title: 'Name of the associated MQTT topic to connect',
                    icon: <InfoCircleOutlined />,
                  }}
                  name="topic"
                  rules={[
                    { required: true, message: 'Please input a topic!' },
                    {
                      pattern: /^.{1,50}$/,
                      message:
                        'String length must be between 1 to 50 characters.',
                    },
                  ]}
                >
                  <Input placeholder="Enter target MQTT topic" />
                </Form.Item>

                <Form.Item
                  label="Initial Value"
                  name="initValue"
                  rules={[
                    {
                      required: true,
                      message: 'Please set an initial value!',
                    },
                    {
                      pattern: /^-?\d*(\.\d+)?$/,
                      validator: (rule, value) => {
                        if (value <= 10) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          'Number must be less than or equal to 10.'
                        );
                      },
                    },
                  ]}
                >
                  <Input placeholder="Enter a numeric value only" />
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
                  <Input placeholder="C, F, K, lux, etc..." />
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
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          'Number must be less than or equal to 1000.'
                        );
                      },
                    },
                  ]}
                >
                  <Input placeholder="Enter Max allowable value" />
                </Form.Item>
              </Col>
            </>
          ) : (
            <>
              <Divider orientation="left" plain>
                Switch Widget
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
                      pattern: /^.{1,25}$/,
                      message:
                        'String length must be between 1 to 25 characters.',
                    },
                  ]}
                >
                  <Input placeholder="Insert a name for the widget" />
                </Form.Item>

                <Form.Item
                  label="MQTT Topic Name"
                  tooltip={{
                    title: 'Name of the associated MQTT topic to connect',
                    icon: <InfoCircleOutlined />,
                  }}
                  name="topic"
                  rules={[
                    { required: true, message: 'Please input a topic!' },
                    {
                      pattern: /^.{1,50}$/,
                      message:
                        'String length must be between 1 to 50 characters.',
                    },
                  ]}
                >
                  <Input placeholder="Enter target MQTT topic" />
                </Form.Item>

                <Form.Item
                  label="Initial Value"
                  name="initValue"
                  rules={[
                    {
                      required: true,
                      message: 'Please input an initial value!',
                    },
                    {
                      min: 0,
                      message: 'Value must be between 0 and 1',
                    },
                    {
                      max: 1,
                      message: 'Value must be between 0 and 1',
                    },
                  ]}
                >
                  <Input placeholder="Either 1 or 0 only" />
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
                      pattern: /^.{1,25}$/,
                      message:
                        'String length must be between 1 to 25 characters.',
                    },
                  ]}
                >
                  <Input placeholder="e.g., switch on" />
                </Form.Item>

                <Form.Item
                  label="OFF Text"
                  tooltip={{
                    title: 'The text to display when the switch is off',
                    icon: <InfoCircleOutlined />,
                  }}
                  name="off"
                  rules={[
                    { required: true, message: 'Please input an OFF text!' },
                    {
                      pattern: /^.{1,25}$/,
                      message:
                        'String length must be between 1 to 25 characters.',
                    },
                  ]}
                >
                  <Input placeholder="e.g., switch off" />
                </Form.Item>
              </Col>
            </>
          )}

          <Popconfirm
            title="Confirm Creation"
            description="Are you sure you want to update this widget?"
            onConfirm={onFinish}
            onOpenChange={() => console.log('open change')}
          >
            {!isLoading && (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Popconfirm>
        </Form>
        <Spinner isLoading={isLoading} />
      </Modal>
    </div>
  );
};

export default UpdateFormModal;
