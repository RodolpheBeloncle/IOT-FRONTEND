import React, { useContext, useState } from 'react';
import { Card, Form, Input, Row, Col, Button, Select } from 'antd';

import { QosOption } from './index';

const Subscriber = ({ sub, unSub, showUnsub, topic }) => {
  const [form] = Form.useForm();
  const [selectedQos, setSelectedQuos] = useState(0);
  const qosOptions = useContext(QosOption);

  function handleSelectChange(value) {
    console.log('qos selected', selectedQos);
    setSelectedQuos(value);
  }

  const record = {
    topic: topic,
    qos: selectedQos,
  };



  const onFinish = (values) => {
    
    console.log('values', values);
    console.log('record', record);
    sub(values);
  };

  const handleUnsub = () => {
    const values = form.getFieldsValue();
    console.log('unsub', values);
    unSub(values);
  };

  const SubForm = (
    // <Form
    //   layout="vertical"
    //   name="basic"
    //   form={form}
    //   initialValues={record}
    //   onFinish={onFinish}
    // >
    //   <Row gutter={20}>
    //     <Col span={12}>
    //       <Form.Item label="Topic" name="topic">
    //         <Input />
    //       </Form.Item>
    //     </Col>
    //     <Col span={12}>
    //       <Form.Item label="QoS" name="qos">
    //         <Select options={qosOptions} />
    //       </Form.Item>
    //     </Col>
    //     <Col span={8} offset={16} style={{ textAlign: 'right' }}>
    //       <Form.Item>
    //         <Button type="primary" htmlType="submit">
    //           Subscribe
    //         </Button>
    //         {showUnsub ? (
    //           <Button
    //             type="danger"
    //             style={{ marginLeft: '10px' }}
    //             onClick={handleUnsub}
    //           >
    //             Unsubscribe
    //           </Button>
    //         ) : null}
    //       </Form.Item>
    //     </Col>
    //   </Row>
    // </Form>


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
            <Input />
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
