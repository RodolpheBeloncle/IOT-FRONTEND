import React, { useEffect, useState, useContext } from 'react';
import './receiver.css';
import { Card, List, Progress, Space, Row, Col, Tag } from 'antd';
import ProgressCircle from '../../components/progressCircle/ProgressCircle';
import ConnectIndicator from '../../components/connectIndicator/ConnectIndicator';
import TagLabel from '../../components/tagLabel/TagLabel';
import { QosOption } from '../index';

const value = 30;
const pointer = {
  value: value,
};

const gaugeStyles = {
  display: 'block',
};

const Receiver = ({
  sub,
  unSub,
  showUnsub,
  payload,
  controller,
  topic,
  connectStatus,
}) => {
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
              {controller.widgetName && (
                <TagLabel
                  style={{
                    display: 'flex',
                    fontFamily: 'Lucida Handwriting',
                  }}
                  label={'widget'}
                  content={controller.widgetName}
                  color={'red'}
                />
              )}
              {controller.createdBy && (
                <TagLabel
                  style={{
                    display: 'flex',
                    fontFamily: 'Lucida Handwriting',
                  }}
                  label={'createdBy'}
                  content={controller.createdBy}
                  color={'cyan'}
                />
              )}

              <Tag
                style={{
                  display: 'flex',
                  fontFamily: 'Lucida Handwriting',
                }}
                color="geekblue"
              >
                Topic: {topic}
                <ConnectIndicator connectStatus={connectStatus} />
              </Tag>
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
