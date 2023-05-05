import React, { useEffect, useState, useContext } from 'react';
import './receiver.css';
import { Card, List, Progress, Space, Row, Col, Tag } from 'antd';
import ProgressCircle from '../components/progressCircle/ProgressCircle';
import { QosOption } from './index';

const value = 30;
const pointer = {
  value: value,
};

const gaugeStyles = {
  display: 'block',
};

const Receiver = ({ sub, unSub, showUnsub, payload,controller }) => {
  const [messages, setMessages] = useState([]);
  const qosOptions = useContext(QosOption);

  const record = {
    topic: controller.topic,
    qos: 0,
  };

  // const onFinish = (values) => {
  //   console.log('values', values);
  //   console.log('record', record);
  //   sub(values);
  // };

  // !todo set possiblity to unsubscribe in the recever
  // const handleUnsub = () => {
  //   const values = form.getFieldsValue();
  //   console.log('unsub', values);
  //   unSub(values);
  // };

  useEffect(() => {
    if (payload.topic) {
      setMessages((messages) => [...messages, payload]);
    }

    console.log(payload.message);
  }, []);

  const refresh = () => {
    setMessages([]);
  };

  return (
    <>
      <Card title="Receiver">
        {controller.type === 'sensor' && (
          <Col xs={24} sm={12}>
            <Col gutter={[16, 16]}>
              <Row xs={50}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <Tag color="geekblue"> Topic: {controller.topic} </Tag>
                </span>
              </Row>
            </Col>
            {/* <Row xs={24} sm={12}> */}
            {/* <Space wrap> */}
            {/* <Progress
                  type="circle"
                  size={{ xs: 80, sm: 120 }}
                  percent={(parseInt(payload?.payload) * 100) / 50 || 0}
                  format={(percent) =>
                    payload?.payload === undefined
                      ? 'No temp'
                      : parseInt(payload?.message)
                  }
                  strokeColor={{
                    '15%': '#7cb2de',
                    '28%': 'orange',
                    '70%': '#d93027',
                  }}
                /> */}

            {/* <ProgressCircle /> */}
            {/* </Space> */}
            {/* </Row> */}
            <ProgressCircle data={payload} controller={controller} />
          </Col>
        )}
      </Card>
      {/* <button onClick={() => refresh()}>refresh</button> */}
    </>
  );
};

export default Receiver;
