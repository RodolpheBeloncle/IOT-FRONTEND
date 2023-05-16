import React from 'react';
import './connectIndicator.css';

const ConnectIndicator = ({ connectStatus }) => {
  console.log(connectStatus);
  return (
    <div className="container">
      {connectStatus === 'connect' && (
        <div className="led-box">
          <div className="led-red"></div>
        </div>
      )}
      {connectStatus === 'connecting' && (
        <div className="led-box">
          <div className="led-yellow"></div>
        </div>
      )}
      {connectStatus === 'reconnecting' && (
        <div className="led-box">
          <div className="led-yellow"></div>
        </div>
      )}
      {connectStatus === 'connected' && (
        <div className="led-box">
          <div className="led-green"></div>
        </div>
      )}
    </div>
  );
};

export default ConnectIndicator;
