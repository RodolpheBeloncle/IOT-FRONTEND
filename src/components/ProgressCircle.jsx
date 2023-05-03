import React from 'react';
import { useTheme, Box } from '@mui/material';
import { tokens } from '../theme';
const ProgressCircle = ({ progress = '0.70', size = '120' }) => {
  // !! test width real temp
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${'#fff'} 55%, transparent 56%),
                conic-gradient(transparent 0deg ${angle}deg, ${
          colors.blueAccent[500]
        } ${angle}deg 360deg),
                ${colors.redAccent[500]}`,
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
