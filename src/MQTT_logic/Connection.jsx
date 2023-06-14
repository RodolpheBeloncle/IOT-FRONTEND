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
    const { options } = connection_config;
    options.clientId = deviceId;
    connect(connection_config.url, connection_config.options);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  useEffect(() => {}, [connectBtn]);

  return (
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
