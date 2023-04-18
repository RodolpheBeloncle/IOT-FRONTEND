import React, { createContext, useEffect, useState } from "react";
import Connection from "./Connection";
import Publisher from "./Publisher";
// import Subscriber from './Subscriber';
import Receiver from "./Receiver";
import mqtt from "mqtt";

export const QosOption = createContext([]);
const qosOption = [
  {
    label: "0",
    value: 0,
  },
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

const HookMqtt = ({ controllersIOT, connectStatus, setConnectStatus }) => {
  const [client, setClient] = useState(null);
  const [isSubed, setIsSub] = useState(false);
  const [payload, setPayload] = useState({});
  // const [connectStatus, setConnectStatus] = useState("Connect");

  const mqttPublish = (context) => {
    if (client) {
      var options = {
        retain: true,
        qos: 1,
      };
      const { topic, qos, payload } = context;
      client.publish(topic, payload, options, (error) => {
        if (error) {
          console.log("Publish error: ", error);
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
      topic: controllersIOT.topic,
      qos: 0,
    };

    if (client) {
      const { topic, qos } = record;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        setIsSub(true);
      });
    }
  };

  const mqttUnSub = () => {
    const record = {
      topic: controllersIOT.topic,
      qos: 0,
    };
    if (client) {
      const { topic } = record;
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log("Unsubscribe error", error);
          return;
        }
        setIsSub(false);
      });
    }
  };

  const mqttConnect = (host, mqttOption) => {
    mqttUnSub();
    mqttSub();
    setConnectStatus("connecting");
    setClient(mqtt.connect(host, mqttOption));
  };

  const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        setConnectStatus("connect");
      });
    }
  };

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("connected");
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setConnectStatus("reconnecting");
      });
      client.on("message", (topic, message, packet) => {
        setPayload({ topic, message: message.toString() });
      });
    }
    console.log("Received message:", payload);
  }, [client, connectStatus]);

  return (
    <>
      <Connection
        deviceId={controllersIOT.id}
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
        setConnectStatus={setConnectStatus}
      />
      <QosOption.Provider value={qosOption}>
        {/* <Subscriber
          sub={mqttSub}
          unSub={mqttUnSub}
          showUnsub={isSubed}
          topic={controllersIOT.topic}
        /> */}
        {controllersIOT.type === "switch" ? (
          <Publisher
            publish={mqttPublish}
            type={controllersIOT.type}
            topic={controllersIOT.topic}
          />
        ) : null}
      </QosOption.Provider>
      {controllersIOT.type === "sensor" ? (
        <Receiver
          payload={payload}
          type={controllersIOT.type}
          topic={controllersIOT.topic}
        />
      ) : null}
    </>
  );
};

export default HookMqtt;
