import React, { useEffect, useState } from 'react';
import './receiver.css';
import { Card, List, Progress, Space, Row } from 'antd';

const Receiver = ({ payload, type, topic }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (payload.topic) {
      setMessages((messages) => [...messages, payload]);
    }
    console.log('payload message', parseInt(payload.message));
  }, [payload]);

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
