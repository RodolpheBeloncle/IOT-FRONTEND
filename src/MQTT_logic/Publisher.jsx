import React, { useEffect, useContext, useState } from 'react';
import { Card, Form, Row, Col, Button, Tag } from 'antd';
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
      <div style={{ padding: '25px' }}>
        <Col gutter={[16, 16]}>
          <Row xs={50}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              <Tag color="geekblue"> Topic: {topic} </Tag>
            </span>
          </Row>
        </Col>
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Form
              layout="vertical"
              name="basic"
              form={form}
              initialValues={record}
              onFinish={onFinish}
            >
              <Form.Item name="payload">
                <Button
                  htmlType="submit"
                  danger
                  style={{
                    width: '100%',
                    height: '100px',
                    borderRadius: '50px',
                    background: color,
                    boxShadow: '10px 10px 38px 0px rgba(0, 0, 0, 0.75)',
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
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );

  return <Card title="Publisher">{PublishForm}</Card>;
};

export default Publisher;
