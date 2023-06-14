import React, { useState, useEffect } from 'react';
import HookMqtt from '../MQTT_logic';

const CardDevice = ({ controllersIOT}) => {
  const [connectStatus, setConnectStatus] = useState('connect');
  const [backgroundCol, setBackgroundCol] = useState('Red');

  useEffect(() => {
    const connectionStatus = {
      connect: 'connect',
      connecting: 'connecting',
      connected: 'connected',
      reconnecting: 'reconnecting',
    };

    setBackgroundCol(() =>
      connectStatus === connectionStatus.connected
        ? 'Green'
        : connectStatus === connectionStatus.connecting
        ? 'Orange'
        : 'Red'
    );

  }, [connectStatus, backgroundCol]);
  return (
    <div className="card">
      <div to={`/controller/${controllersIOT.id}`}>
        {/* <Col flex="1 0 25%" className={`column ${backgroundCol}`}> */}
        <HookMqtt
          controllersIOT={controllersIOT}
          connectStatus={connectStatus}
          setConnectStatus={setConnectStatus}
        />
        {/* </Col> */}
      </div>
    </div>
  );
};

export default CardDevice;
