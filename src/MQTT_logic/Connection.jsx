import React, { useEffect } from 'react';
import { Card, Button, Row, Col } from 'antd';
import { Space, Spin, message } from 'antd';
import { connection_config } from './config/mqtt_config';

const Connection = ({
  connect,
  disconnect,
  connectBtn,
  deviceId,
  setConnectStatus,
  isLoading,
}) => {
  const handleConnect = () => {
    // console.log(deviceId, url, options);
    const { options } = connection_config;
    console.log(options);
    options.clientId = deviceId;
    console.log('handleconnect');
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
    // <Card title="Connection" bordered={false}>
    //   {/* <Button
    //     type="primary"
    //     onClick={() => getRandomProperty(connectionStatus)}
    //   ></Button> */}
    //   <Button type="primary" onClick={handleConnect}>
    //     {connectBtn}
    //   </Button>

    //   <Button danger onClick={handleDisconnect}>
    //     Disconnect
    //   </Button>
    // </Card>

    <Col justify="center">
      <Row justify="center">
        <Button type="primary" onClick={handleConnect}>
          {isLoading ? (
            <Spin tip="Loading" size="small">
              <div className="content" />
              {connectBtn}
            </Spin>
          ) : (
            connectBtn
          )}
        </Button>

        <Button danger onClick={handleDisconnect}>
          Disconnect
        </Button>
      </Row>
    </Col>
  );
};

export default Connection;
