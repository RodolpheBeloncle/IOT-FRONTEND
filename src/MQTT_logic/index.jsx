import React, { createContext, useEffect, useState } from 'react';
import { Space, Spin, message } from 'antd';
import Connection from './Connection';
import Publisher from './publisher/Publisher';
import Subscriber from './Subscriber';
import Receiver from './receiver/Receiver';
import mqtt from 'mqtt';

export const QosOption = createContext([]);
const qosOption = [
  {
    label: '0',
    value: 0,
  },
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
];

const HookMqtt = ({ controllersIOT, connectStatus, setConnectStatus }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  const [topic, setTopic] = useState(controllersIOT.topic);
  // const [connectStatus, setConnectStatus] = useState("Connect");

  const [messageApi, contextHolder] = message.useMessage();
  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };
  const messageerror = (error) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };
  const warning = (message) => {
    messageApi.open({
      type: 'warning',
      content: message,
    });
  };

  const mqttPublish = (context) => {
    if (client) {
      var options = {
        retain: true,
        qos: 1,
      };
      const { topic, qos, payload } = context;
      client.publish(topic, payload, options, (error) => {
        if (error) {
          console.log('Publish error: ', error.message);
          // !! handle this error warning(error.message);
        }
      });
    }
  };

  // const mqttSub = (subscription) => {
  //   if (client) {
  //     const { topic, qos } = subscription;
  //     client.subscribe(topic, { qos }, (error) => {
  //       if (error) {
  //         console.log('Subscribe to topics error', error);
  //         return;
  //       }
  //       setIsSub(true);
  //     });
  //   }
  // };

  // const mqttUnSub = (subscription) => {
  //   if (client) {
  //     const { topic } = subscription;
  //     client.unsubscribe(topic, (error) => {
  //       if (error) {
  //         console.log('Unsubscribe error', error);
  //         return;
  //       }
  //       setIsSub(false);
  //     });
  //   }
  // };

  const mqttSub = () => {
    const record = {
      topic: topic,
      qos: 0,
    };

    if (client) {
      const { topic, qos } = record;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error.message);
          // !! handle this error warning(error.message);
        }
        setIsSub(true);
        success(`subscribed to topic : ${controllersIOT.topic}`);
      });
    }
  };

  const mqttUnSub = () => {
    const record = {
      topic: topic,
      qos: 0,
    };
    if (client) {
      const { topic } = record;
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log('Unsubscribe error', error.message);
          warning(error.message);
        }
        setIsSub(false);
        success(`unsubscribed to topic : ${topic}`);
      });
    }
  };

  const mqttConnect = (host, mqttOption) => {
    setConnectStatus('connecting');
    setClient(mqtt.connect(host, mqttOption));
    success(`connected to device`);
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus('connect');
        mqttUnSub();
        setIsLoading(false);
        success(`disconnected to device ! `);
      });
    }
  };

  useEffect(() => {
    connectStatus === 'connecting' ? setIsLoading(true) : setIsLoading(false);

    if (client) {
      client.on('connect', () => {
        setConnectStatus('connected');
        mqttSub();
        setIsLoading(false);
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        setIsLoading(false);
        client.end();
      });
      client.on('reconnect', () => {
        setIsLoading(true);
        setConnectStatus('reconnecting');
      });
      client.on('message', (topic, message, packet) => {
        setPayload({ topic, message: message.toString() });
      });
    }
    // console.log('Received message:', payload);
  }, [client, connectStatus, topic]);

  return (
    <>
      {contextHolder}
      <Connection
        isLoading={isLoading}
        deviceId={controllersIOT.id}
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
        setConnectStatus={setConnectStatus}
      />
      <QosOption.Provider value={qosOption}>
    
        {controllersIOT.type === 'switch' ? (
          <Publisher
            publish={mqttPublish}
            type={controllersIOT.type}
            topic={topic}
            connectStatus={connectStatus}
          />
        ) : null}
      </QosOption.Provider>
      {controllersIOT.type === 'sensor' ? (
        <Receiver
          payload={payload}
          sub={mqttSub}
          unSub={mqttUnSub}
          showUnsub={isSubed}
          topic={topic}
          connectStatus={connectStatus}
          controller={controllersIOT}
        />
      ) : null}
      <QosOption.Provider value={qosOption}>
        <Subscriber
          sub={mqttSub}
          unSub={mqttUnSub}
          showUnsub={isSubed}
          topic={topic}
          setTopic={setTopic}
        />
      </QosOption.Provider>
    </>
  );
};

export default HookMqtt;
