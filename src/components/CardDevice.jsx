import React from 'react';
import HookMqtt from '../MQTT_logic';
import { Col } from 'antd';

const CardDevice = ({ controllersIOT }) => {
  return (
    <div  className="card">
      <div to={`/controller/${controllersIOT.id}`}>
        <Col flex="1 0 25%" className="column Red">
          <HookMqtt controllersIOT={controllersIOT} />
        </Col>
      </div>
    </div>
  );
};

export default CardDevice;
