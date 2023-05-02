import React from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Button,
  Modal,
  Row,
  Col,
  Radio,
  Divider,
  Popconfirm,
  notification,
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const UpdateFormModal = ({
  isOpenModal,
  setIsOpenModal,
  device,
  setDevice,
  setGridRows,
  gridRows,
}) => {
  const [form] = Form.useForm();

  const openNotification = (type) => {
    notification.success({
      message: 'device Updated',
      description: `Your device type ${type} has been successfully updated!`,
      placement: 'bottomRight',
    });
  };

  const onFormInputsChange = (values) => {
    setDevice((prevState) => ({ ...prevState, ...values }));
    console.log('onChange target value  : ', values);
  };

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleOk = () => {
    setIsOpenModal(false);
    notification.success({
      message: 'device Updated',
      description: `Your device ${device.type} has been successfully updated!`,
      placement: 'bottomRight',
    });
  };

  const handleCancel = () => {
    setDevice(null);
    setIsOpenModal(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = async () => {
    await axios
      .put(`http://localhost:8000/devices/${device.id}`, device)
      .then((res) => {
        console.log('add controllers', res);
        openNotification(res.data.type);
      })
      .catch((err) => {
        onFinishFailed(err);
        console.log(err);
      });

    console.log('handleModify id :', device.id);
    const updatedRows = gridRows.map((row) => {
      if (row.id === device.id) {
        return device;
      } else {
        return row;
      }
    });
    setGridRows(updatedRows);
    setDevice(null);
    setIsOpenModal(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Update Widget
      </Button>
      <Modal
        title="Device Widget Form"
        open={isOpenModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
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
          {device.type === 'sensor' ? (
            <>
              <Divider orientation="left" plain>
                Sensor Widget
              </Divider>
              <Row gutter={[16, 16]}>
                <Col xs={50} sm={50} md={50} lg={50}>
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
                      value={device.widgetName}
                    />
                  </Form.Item>

                  <Form.Item
                    label="MQTT Topic Name"
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
                    <Input placeholder="Enter target MQTT topic" />
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
                    <Input placeholder="Enter Max, allowable value" />
                  </Form.Item>

                  {/* <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                    <Popconfirm
                      title="Confirm Update"
                      description="Are you sur to Update this widget ?"
                      onConfirm={onFinish}
                      onOpenChange={() => console.log("open change")}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Popconfirm>
                  </Form.Item> */}
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Divider orientation="left" plain>
                Switch Widget
              </Divider>
              <Row gutter={[16, 16]}>
                <Col xs={50} sm={50} md={50} lg={50}>
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
                    <Input placeholder="Insert a name for the widget" />
                  </Form.Item>

                  <Form.Item
                    label="MQTT Topic Name"
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
                    <Input placeholder="Enter target MQTT topic" />
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
                      { required: true, message: 'Please input an OFF text!' },
                      {
                        pattern: /^.{1,25}$/, // Change the range {1,25} as per your requirement
                        message:
                          'String length must be between 1 to 25 characters.',
                      },
                    ]}
                  >
                    <Input placeholder="ex : swicht off" />
                  </Form.Item>

                  {/* <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                    <Popconfirm
                      title="Confirm Creation"
                      description="Are you sur to update this widget ?"
                      onConfirm={onFinish}
                      onOpenChange={() => console.log("open change")}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Popconfirm>
                  </Form.Item> */}
                </Col>
              </Row>
            </>
          )}

          <Popconfirm
            title="Confirm Creation"
            description="Are you sur to update this widget ?"
            onConfirm={onFinish}
            onOpenChange={() => console.log('open change')}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Popconfirm>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateFormModal;
