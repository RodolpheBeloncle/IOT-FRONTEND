import React, { useEffect } from "react";
import { Card, Button } from "antd";
import { connection_config } from "./config/mqtt_config";

const Connection = ({
  connect,
  disconnect,
  connectBtn,
  deviceId,
  setConnectStatus,
}) => {
  const handleConnect = () => {
    // console.log(deviceId, url, options);
    const { options } = connection_config;
    console.log(options);
    options.clientId = deviceId;
    console.log("handleconnect");
    connect(connection_config.url, connection_config.options);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  //  === simulation connectstatus to change the background card ====

  // const connectionStatus = {
  //   connect: "connect",
  //   connecting: "connecting",
  //   connected: "connected",
  //   reconnecting: "reconnecting",
  // };

  // function getRandomProperty(connectionStatus) {
  //   const keys = Object.keys(connectionStatus);
  //   let changeConnectionStatus = keys[Math.floor(Math.random() * keys.length)];
  //   setConnectStatus(changeConnectionStatus);
  //   console.log("connectstatus", connectBtn);
  // }

  useEffect(() => {}, [connectBtn]);

  // ========

  return (
    <Card title="Connection" bordered={false}>
      {/* <Button
        type="primary"
        onClick={() => getRandomProperty(connectionStatus)}
      ></Button> */}
      <Button type="primary" onClick={handleConnect}>
        {connectBtn}
      </Button>

      <Button danger onClick={handleDisconnect}>
        Disconnect
      </Button>
    </Card>
  );
};

export default Connection;
