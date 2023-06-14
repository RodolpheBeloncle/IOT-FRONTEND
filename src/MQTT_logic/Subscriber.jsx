import React, { useContext, useState, useEffect } from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';

import { QosOption } from './index';

const Subscriber = ({ sub, unSub, showUnsub, topic, setTopic }) => {
  const [form] = Form.useForm();
  const [selectedQos, setSelectedQuos] = useState(0);
  const qosOptions = useContext(QosOption);

  function handleSelectChange(value) {
    setSelectedQuos(value);
  }

  function handleChangeTopic(event) {
    setTopic(event.target.value);
  }

  const record = {
    topic: topic,
    qos: selectedQos,
  };

  const onFinish = (values) => {
    sub(values);
  };

  const handleUnsub = () => {
    const values = form.getFieldsValue();
    unSub(values);
  };

  useEffect(() => {}, [topic]);

  const SubForm = (
    <Form
      layout="vertical"
      name="basic"
      form={form}
      initialValues={record}
      onFinish={onFinish}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item label="Topic" name="topic">
            <Input onChange={handleChangeTopic} value={topic} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="QoS" name="qos">
            <Select
              options={qosOptions}
              value={selectedQos}
              onChange={handleSelectChange}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Row justify="center">
            {showUnsub === false ? (
              <Row xs={24} sm={8}>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Subscribe topic
                  </Button>
                </Form.Item>
              </Row>
            ) : (
              <Row
                xs={24}
                sm={8}
                style={{ marginTop: '16px', textAlign: 'right' }}
              >
                <Button onClick={handleUnsub} block>
                  Unsubscribe
                </Button>
              </Row>
            )}
          </Row>
        </Col>
      </Row>
    </Form>
  );

  return <Card title="Subscriber">{SubForm}</Card>;
};

export default Subscriber;
