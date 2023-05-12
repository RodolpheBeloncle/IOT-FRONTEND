import React from 'react';
import './connectIndicator.css';

const ConnectIndicator = ({ connectStatus }) => {
  console.log(connectStatus);
  return (
    <div class="container">
      {connectStatus === 'connect' && (
        <div class="led-box">
          <div class="led-red"></div>
        </div>
      )}
      {connectStatus === 'connecting' && (
        <div class="led-box">
          <div class="led-yellow"></div>
        </div>
      )}
      {connectStatus === 'connected' && (
        <div class="led-box">
          <div class="led-green"></div>
        </div>
      )}
    </div>
  );
};

export default ConnectIndicator;
