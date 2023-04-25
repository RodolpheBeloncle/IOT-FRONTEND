import React, { useEffect, useState, useContext } from 'react';
import './receiver.css';
import { Card, List, Progress, Space, Row } from 'antd';
import { QosOption } from './index';

const Receiver = ({ sub, unSub, showUnsub, payload, type, topic }) => {
  const [messages, setMessages] = useState([]);
  const qosOptions = useContext(QosOption);

  const record = {
    topic: topic,
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
  
  }, []);

  const refresh = () => {
    setMessages([]);
  };

  return (
    <>
      <Card title="Receiver">
        <Row gutter={20}>
          <span> device topic : {topic}</span>
          <span> controller type : {type}</span>
        </Row>

        {type === 'sensor' ? (
          <>
            <Space wrap>
              <p>Message{payload.message}</p>
              <Progress
                type="circle"
                size={120}
                percent={(parseInt(messages.payload) * 100) / 50}
                format={(percent) =>
                  messages.payload === undefined
                    ? 'no temp'
                    : parseInt(messages.payload)
                }
                strokeColor={{
                  '15%': '#7cb2de',
                  '28%': 'orange',
                  '70%': '#d93027',
                }}
              />
            </Space>
          </>
        ) : null}
      </Card>
      {/* <button onClick={() => refresh()}>refresh</button> */}
    </>
  );
};

export default Receiver;
