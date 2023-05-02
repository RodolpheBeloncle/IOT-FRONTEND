import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import axios from "axios";
import { Box, useTheme, Checkbox } from "@mui/material";
import { Row, Button, message, Popconfirm } from "antd";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import UpdateFormModal from "../../components/UpdateFormModal";


import Header from "../../components/Header";

const ControllersIoT = () => {
  //!! SET USERINFO TO KNOW WHO CREATED OR UPDATD BY
  const { isAuthenticated } = useContext(UserContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [gridRows, setGridRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  console.log("auth MANAGE TEAM ", isAuthenticated);

  const text = "Are you sure to delete this device?";
  const description = "Delete this device";

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8000/devices" + `/${id}`)
      .then((res) => {
        console.log("devices", res.data);
      })
      .catch((err) => console.log(err));
    message.success("row deleted", 2);

    console.log("handledelete id :", id);
    const updatedRows = gridRows.filter((row) => row.id !== id);
    setGridRows(updatedRows);
    setSelectedRow(null);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/devices")
      .then((res) => {
        console.log("devices", res.data);
        setGridRows(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "checkbox",
      headerName: " ",
      width: 50,
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
    { field: "id", headerName: "Id" },

    {
      field: "widgetName",
      headerName: "Widget Name",
      cellClassName: "name-column--cell",
      width: 200,
    },
    {
      field: "type",
      headerName: "Type",
      type: "string",
      headerAlign: "left",
      align: "left",
      width: 100,
    },

    { field: "topic", headerName: "Topic", width: 100 },
    { field: "unit", headerName: "Unit", width: 100 },
    { field: "initValue", headerName: "init Value", width: 100 },
    { field: "maxValue", headerName: "max Value", width: 100 },
    { field: "createdBy", headerName: "Created By", width: 100 },
    // {
    //   field: "type",
    //   headerName: "type",
    //   width: 100,
    //   renderCell: ({ type: { type } }) => {
    //     return (
    //       <Box
    //         width="100%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           type === "sensor"
    //             ? colors.greenAccent[600]
    //             : colors.greenAccent[800]
    //         }
    //         borderRadius="4px"
    //       >
    //         {type === "switch" && <AdminPanelSettingsOutlinedIcon />}
    //         {type === "sensor" && <SecurityOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {type}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <>
          {selectedRow !== null && (
            <Row className="row" span={2}>
              <UpdateFormModal
                gridRows={gridRows}
                setGridRows={setGridRows}
                device={selectedRow}
                setDevice={setSelectedRow}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
              />
            </Row>
          )}
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              // handleDelete(params.row.id)
              if (selectedRow === params.row.id) {
                // Show popup validation
              } else {
                setSelectedRow(params.row.id);
              }
            }}
          >
            Delete
          </Button> */}

          <Popconfirm
            placement="top"
            title={text}
            description={description}
            onConfirm={() => handleDelete(params.row.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleEdit = (row) => {
    setSelectedRow(row);
    // open a modal or dialog to edit the selected row
  };

  const handleModifyRow = (editedRow) => {
    console.log("handleModify id :", editedRow.id);
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
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
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
            // checkboxSelection
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
