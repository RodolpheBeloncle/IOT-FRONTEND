import React, { useState, useEffect, useContext } from 'react';
import Spinner from '../../components/spinner/Spinner';
import './controllersIoT.css';
import { UserContext } from '../../context/UserContextProvider';
import axios from 'axios';
import securedApi from '../../services/axiosInterceptor';
import { Box, useTheme, Checkbox } from '@mui/material';
import { Button, message, Popconfirm, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import UpdateFormModal from '../../components/updateFormModal/UpdateFormModal';

import Header from '../../components/Header';

const ControllersIoT = () => {
  //!! SET USERINFO TO KNOW WHO CREATED OR UPDATD BY
  const { getCookie, isLoading, setIsLoading } = useContext(UserContext);
  const { isAuthenticated } = useContext(UserContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [gridRows, setGridRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 
  const text = 'Are you sure to delete this device?';
  const description = 'Delete this device';

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);

      const token = getCookie('token');
      const headers = { Authorization: `Bearer ${token}` };

      const response = await securedApi.delete(
        `${import.meta.env.VITE_API_AUTH_DEVICES}/${id}`,
        {
          headers: headers,
        }
      );
     
      notification.success({
        message: 'Controller deleted',
        description: response,
        placement: 'top',
      });

      const updatedRows = gridRows.filter((row) => row.id !== id);
      setGridRows(updatedRows);
      setSelectedRow(null);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.response.data,
        placement: 'top',
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const getDevices = async () => {
    await axios
      .get(import.meta.env.VITE_API_DEVICES)
      .then((res) => {
     
        const rows = res.data.map((row) => ({
          id: row._id, // assuming your MongoDB documents have an _id field
          ...row, // add any other fields from your document as needed
        }));
        setGridRows(rows);
      })
      .catch((error) => {
        notification.error({
          message: 'error',
          description: error.response.data,
          placement: 'top',
        });
      });
  };

  useEffect(() => {
    getDevices();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: 'checkbox',
      headerName: ' ',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Checkbox
          color="primary"
          checked={selectedRow === params.row.id}
          onChange={(event) => {
            if (event.target.checked) {
              setSelectedRow(params.row.id);
            } else {
              setSelectedRow(null);
            }
          }}
        />
      ),
    },

    {
      field: 'widgetName',
      headerName: 'Widget Name',
      cellClassName: 'name-column--cell',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Type',
      type: 'string',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },

    { field: 'topic', headerName: 'Topic', flex: 1 },
    { field: 'unit', headerName: 'Unit', flex: 1 },
    { field: 'initValue', headerName: 'init Value', flex: 1 },
    { field: 'maxValue', headerName: 'max Value', flex: 1 },
    { field: 'createdBy', headerName: 'Created By', flex: 1 },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <UpdateFormModal
          device={selectedRow}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          refreshData={getDevices}
        />
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Popconfirm
          placement="top"
          title={text}
          description={description}
          onConfirm={() => handleDelete(params.row.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button>
            <DeleteOutlined />
            <Spinner isLoading={isLoading} key={params.row.id} />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleModifyRow = (editedRow) => {
    const updatedRows = rows.map((row) => {
      if (row.id === editedRow.id) {
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
    <>
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
            onRowClick={(params) => setSelectedRow(params.row)}
            onEditCellChangeCommitted={(params) => handleModifyRow(params)}
            onDeleteRows={(params) =>
              params.rowIds.forEach((id) => handleDeleteRow(id))
            }
          />
        </Box>
      </Box>
    </>
  );
};

export default ControllersIoT;
