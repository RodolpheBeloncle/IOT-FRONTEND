import React, { useState, useEffect } from 'react';
import Gauge from '../gauge/Gauge';
import { useTheme } from '@mui/material';
import './progressCircle.css';

import { tokens } from '../../theme';
const ProgressCircle = ({
  progress = '0.70',
  size = '120',
  data,
  controller,
}) => {
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
    if (newTemperature >= 0 && newTemperature <= 15) {
      setTemperatureColor('cold');
    }
  };
  // !! test width real temp
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;

  useEffect(() => {
    if (data.message < '15') {
      setTemperatureColor('cold');
    } else if (data.message >= '15' && data.message < '25') {
      setTemperatureColor('tempered');
    } else if (data.message >= '25') {
      setTemperatureColor('hot');
    }
  }, []);
  return (
    <>
      <div
        className="sensor-display-container"
        style={{
          height: '80px',
          marginTop: '5px',
          boxShadow: '10px 10px 38px 0px rgba(0, 0, 0, 0.75)',
        }}
      >
        <div className={`sensor-display ${temperatureColor}`}>
          {
            <>
              {/* <span>
                {data.message} {controller.unit}
              </span> */}
              <Gauge
                value={parseInt(
                  data?.message ? parseInt(data?.message) : controller.initValue
                )}
                min={controller.initValue}
                max={controller.maxValue}
                label={'label'}
                unit={controller.unit && controller.unit}
              />
            </>
          }
        </div>
      </div>
      {/* <div className="button-container">
            <button onClick={increaseTemperature}>+</button>
            <button onClick={decreaseTemperature}>-</button>
          </div> */}
      {/* </div> */}
      {/* </Box> */}
    </>
  );
};

export default ProgressCircle;
