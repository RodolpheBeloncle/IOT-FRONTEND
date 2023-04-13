import React from 'react';
import { Card, Button } from 'antd';
import { connection_config } from './config/mqtt_config';

const Connection = ({
  connect,
  disconnect,
  connectBtn,
  deviceId,
}) => {
 
  const handleConnect = () => {
    // console.log(deviceId, url, options);
    const { options } = connection_config;
    // console.log(options);
    options.clientId = deviceId;
    connect(connection_config.url, connection_config.options);

  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <Card title="Connection" bordered={false}>
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
