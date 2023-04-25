import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, useTheme, IconButton, Tooltip } from '@mui/material';
import { UserContext } from '../../context/UserContextProvider';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';

const Team = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [selectedRow, setSelectedRow] = useState(null);
  console.log('auth MANAGE TEAM ', isAuthenticated);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_API_USERS)
      .then((res) => {
        console.log('users', res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: 'id', headerName: 'Id' },
    {
      field: 'username',
      headerName: 'Name',
      width: 200,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'isVerified',
      headerName: 'isVerified',
      type: 'boolean',
      headerAlign: 'left',
      align: 'left',
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'Role',
      headerName: 'Role Llvel',
      width: 100,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === 'admin'
                ? colors.greenAccent[600]
                : colors.greenAccent[800]
            }
            borderRadius="4px"
          >
            {role === 'admin' && <AdminPanelSettingsOutlinedIcon />}
            {role === 'manager' && <SecurityOutlinedIcon />}
            {role === 'user' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                onClick={() => handleEdit(params.row)}
              >
                +
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(params.row.id)}
              >
                X
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const handleEdit = (row) => {
    setSelectedRow(row);
    // open a modal or dialog to edit the selected row
  };

  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleSave = (editedRow) => {
    const updatedRows = rows.map((row) => {
      if (row.id === editedRow.id) {
        return editedRow;
      } else {
        return row;
      }
    });
    setRows(updatedRows);
    setSelectedRow(null);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEAM" subtitle="welcome to your Team" />
      </Box>
      <Box
        m="8px 0 0 0"
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
        }}
      >
        <DataGrid rows={users} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
