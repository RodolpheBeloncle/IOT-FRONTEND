import React, { useState } from 'react';
import { useTheme, Box } from '@mui/material';
import './progressCircle.css';

import { tokens } from '../../theme';
const ProgressCircle = ({ progress = '0.70', size = '120' }) => {
  const [temperatureValue, setTemperatureValue] = useState(10);
  const [temperatureColor, setTemperatureColor] = useState('cold');

  const increaseTemperature = () => {
    const newTemperature = temperatureValue + 1;
    setTemperatureValue(newTemperature);

    if (newTemperature >= 15) {
      setTemperatureColor('hot');
    }
  };

  const decreaseTemperature = () => {
    const newTemperature = temperatureValue - 1;
    setTemperatureValue(newTemperature);
    if (newTemperature < 15) {
      setTemperatureColor('cold');
    }
  };
  // !! test width real temp
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  // const angle = (parseInt(progress) / 100) * 360;

  // console.log(parseInt(progress) / 100 || 0);
  return (
    <>
      {/* <Box
        sx={{
          background: `radial-gradient(${'#fff'} 55%, transparent 56%),
                conic-gradient(transparent 0deg ${angle}deg, ${
            colors.blueAccent[500]
          } ${angle}deg 360deg),
                ${colors.redAccent[500]}`,
          // background: `radial-gradient(to right, #6fcbb6, #9c64f4),  conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
          //          ${colors.redAccent[500]}`,
          borderRadius: '50%',
          width: `${size}px`,
          height: `${size}px`,
        }}
      /> */}
      <Box>
        <div className="app-container">
          <div className="temperature-display-container">
            <div className={`temperature-display ${temperatureColor}`}>
              {temperatureValue}°C
            </div>
          </div>
          <div className="button-container">
            <button onClick={increaseTemperature}>+</button>
            <button onClick={decreaseTemperature}>-</button>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProgressCircle;
