import React, { useState, useEffect, useContext } from 'react';
import '../styles/team.css';
import { Box, Typography, useTheme, Checkbox } from '@mui/material';
import emptyProfil from '../../assets/profile.png';
import { useNavigate } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
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
  const [gridRows, setGridRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const text = 'Are you sure to delete this user?';
  const description = 'Delete the user';

  console.log('auth MANAGE TEAM ', isAuthenticated);

  const handleDelete = (id) => {
    axios
      .delete(import.meta.env.VITE_API_USERS + `/${id}`)
      .then((res) => {
        console.log('users', res.data);
      })
      .catch((err) => console.log(err));
    message.success('row deleted', 2);

    console.log('handledelete id :', id);
    const updatedRows = gridRows.filter((row) => row._id !== id);
    setGridRows(updatedRows);
    setSelectedRow(null);
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_USERS)
      .then((res) => {
        console.log('users', res.data);
        const rows = res.data.map((row) => ({
          id: row._id, // assuming your MongoDB documents have an _id field
          ...row, // add any other fields from your document as needed
        }));
        setGridRows(rows);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      field: 'checkbox',
      headerName: ' ',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Checkbox
          color="primary"
          checked={selectedRow === params.row._id}
          onChange={(event) => {
            if (event.target.checked) {
              setSelectedRow(params.row._id);
            } else {
              setSelectedRow(null);
            }
          }}
        />
      ),
    },
    {
      field: 'picture',
      headerName: 'user',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              src={params.row.picture ? params.row.picture : emptyProfil}
              alt="avatar"
            />
          </div>
        );
      },
    },

    {
      field: 'isVerified',
      flex: 1,
      headerName: 'isVerified',
      type: 'boolean',
      headerAlign: 'left',
      align: 'left',
    },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'Role',
      headerName: 'Role Llvel',
      flex: 2,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === 'Admin'
                ? colors.greenAccent[100]
                : colors.greenAccent[600]
            }
            borderRadius="4px"
          >
            {role === 'admin' && <AdminPanelSettingsOutlinedIcon />}
            {role === 'user' && <SecurityOutlinedIcon />}
            {role === 'guest' && <LockOpenOutlinedIcon />}
            {role === '' && <span>No rôle</span>}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate(`/form/user/${params.row._id}`)}
        >
          <EditFilled />
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <Popconfirm
            placement="top"
            title={text}
            description={description}
            onConfirm={() => handleDelete(params.row._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleModifyRow = (editedRow) => {
    console.log('handleModify id :', editedRow._id);
    const updatedRows = rows.map((row) => {
      if (row.id === editedRow._id) {
        return editedRow;
      } else {
        return row;
      }
    });
    setGridRows(updatedRows);
    setSelectedRow(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        <DataGrid
          rows={gridRows}
          columns={columns}
          rowsPerPage={rowsPerPage}
          count={gridRows.length}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onRowSelected={(row) => console.log(row)}
          onCellDoubleClick={(params) => console.log(params)}
          onCellClick={(params) => console.log(params)}
          onRowDoubleClick={(params) => console.log(params)}
          onRowClick={(params) => console.log(params)}
          onEditCellChangeCommitted={(params) => handleModifyRow(params)}
          onDeleteRows={(params) =>
            params.rowIds.forEach((id) => handleDeleteRow(id))
          }
        />
      </Box>
    </Box>
  );
};

export default Team;
