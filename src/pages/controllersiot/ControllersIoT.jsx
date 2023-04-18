import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import axios from 'axios';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';

import Header from '../../components/Header';

const ControllersIoT = () => {
  const { isAuthenticated } = useContext(UserContext);
  console.log('auth MANAGE DEVICES ', isAuthenticated);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_API_DEVICES)
      .then((res) => {
        console.log('Manage devices : ', res.data);
        setDevices(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'device Id', width: 100 },
    {
      field: 'widgetName',
      headerName: 'Widget Name',
      cellClassName: 'name-column--cell',
      width: 200,
    },
    {
      field: 'type',
      headerName: 'Type',
      type: 'string',
      headerAlign: 'left',
      align: 'left',
      width: 100,
    },
    { field: 'topic', headerName: 'Topic', width: 100 },
    { field: 'unit', headerName: 'Unit', width: 100 },
    { field: 'initValue', headerName: 'init Value', width: 100 },
    { field: 'maxValue', headerName: 'max Value', width: 100 },
    { field: 'createdBy', headerName: 'Created By', width: 100 },
  ];
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Devices IOT" subtitle="welcome to your Devices" />
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={devices}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ControllersIoT;
