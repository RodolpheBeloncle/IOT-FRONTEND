import React, { useEffect, useState, useContext } from 'react';
import './receiver.css';
import { Card, List, Progress, Space, Row, Col, Tag } from 'antd';
import ProgressCircle from '../../components/progressCircle/ProgressCircle';
import { QosOption } from '../index';

const value = 30;
const pointer = {
  value: value,
};

const gaugeStyles = {
  display: 'block',
};

const Receiver = ({ sub, unSub, showUnsub, payload, controller,topic }) => {
  const [messages, setMessages] = useState([]);
  const qosOptions = useContext(QosOption);

 
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
  }, [topic]);

  const refresh = () => {
    setMessages([]);
  };

  return (
    <>
      <Card title="Receiver">
        {controller.type === 'sensor' && (
          <>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              <Tag color="geekblue"> Topic: {topic} </Tag>
            </span>
            <ProgressCircle data={payload} controller={controller} />
          </>
        )}
      </Card>
      {/* <button onClick={() => refresh()}>refresh</button> */}
    </>
  );
};

export default Receiver;
