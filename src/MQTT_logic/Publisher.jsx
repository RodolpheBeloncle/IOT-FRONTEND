import React, { useEffect, useContext, useState } from 'react';
import { Card, Form, Row, Col, Button, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { QosOption } from './index';

const Publisher = ({ publish, topic, type }) => {
  const [color, setColor] = useState('red');
  const [record, setRecord] = useState({
    topic: topic,
    qos: 0,
    payload: 'off',
  });

  const onFinish = () => {
    console.log('onFinish', Object.assign(record));
    publish(record);
  };

  const [form] = Form.useForm();
  const qosOptions = useContext(QosOption);

  useEffect(() => {
    setColor(() => (record.payload === 'off' ? 'red' : 'green'));
  }, [record.payload]);

  const PublishForm = (
    <>
      <Row gutter={20}>
        <span> device topic : {topic}</span>
        <span> controller type : {type}</span>
      </Row>
      <Form
        layout="vertical"
        name="basic"
        form={form}
        initialValues={record}
        onFinish={onFinish}
      >
        <Row gutter={20}>
          <Col span={12}>
            <Space direction="vertical">
              <Form.Item name="payload">
                <Button
                  htmlType="submit"
                  danger
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50px',
                    background: color,
                  }}
                  size="large"
                  type="primary"
                  icon={<PoweroffOutlined />}
                  onClick={() => {
                    setRecord(() => ({
                      ...record,
                      payload: record.payload === 'off' ? 'on' : 'off',
                    }));
                  }}
                />
              </Form.Item>
              <p>State running</p>
            </Space>
          </Col>
          {/* <Col span={12}>
            <Form.Item label="QoS" name="qos">
              <Select options={qosOptions} />
            </Form.Item>
          </Col> */}
          {/*
    <Col span={8} offset={16} style={{ textAlign: 'right' }}>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Publish
        </Button>
      </Form.Item>
    </Col> */}
        </Row>
      </Form>
    </>
  );

  return <Card title="Publisher">{PublishForm}</Card>;
};

export default Publisher;
