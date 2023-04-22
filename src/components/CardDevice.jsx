import React, { useState, useEffect } from "react";
import HookMqtt from "../MQTT_logic";
import { Col } from "antd";

const CardDevice = ({ controllersIOT }) => {
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [backgroundCol, setBackgroundCol] = useState("Red");

  useEffect(() => {
    const connectionStatus = {
      connect: "connect",
      connecting: "connecting",
      connected: "connected",
      reconnecting: "reconnecting",
    };

    setBackgroundCol(() =>
      connectStatus === connectionStatus.connected
        ? "Green"
        : connectStatus === connectionStatus.connecting
        ? "Orange"
        : "Red"
    );
    // console.log("connectstatus from cardevice", connectStatus);
    // console.log("backgroundcol", backgroundCol);
  }, [connectStatus, backgroundCol]);
  return (
    <div className="card">
      <div to={`/controller/${controllersIOT.id}`}>
        <Col flex="1 0 25%" className={`column ${backgroundCol}`}>
          <HookMqtt
            controllersIOT={controllersIOT}
            connectStatus={connectStatus}
            setConnectStatus={setConnectStatus}
          />
        </Col>
      </div>
    </div>
  );
};

export default CardDevice;
