import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, useTheme, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button, message, Popconfirm } from "antd";
import { UserContext } from "../../context/UserContextProvider";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const { isAuthenticated } = useContext(UserContext);
  const [selectedRow, setSelectedRow] = useState(null);
  const [gridRows, setGridRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  console.log("auth MANAGE TEAM ", isAuthenticated);

  const text = "Are you sure to delete this user?";
  const description = "Delete the user";

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8000/users" + `/${id}`)
      .then((res) => {
        console.log("users", res.data);
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
      .get("http://localhost:8000/users")
      .then((res) => {
        console.log("users", res.data);
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
      field: "username",
      headerName: "Name",
      width: 200,
      cellClassName: "name-column--cell",
    },
    {
      field: "isVerified",
      headerName: "isVerified",
      type: "boolean",
      headerAlign: "left",
      align: "left",
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "Role",
      headerName: "Role Llvel",
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
              role === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[800]
            }
            borderRadius="4px"
          >
            {role === "Admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "User" && <SecurityOutlinedIcon />}
            {role === "Guest" && <LockOpenOutlinedIcon />}
            {role === "" && <span>No rôle</span>}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            // onClick={() => handleEdit(params.row)}
            onClick={() => navigate(`/form/${params.row.id}`)}
          >
            Edit
          </Button>
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
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="TEAM" subtitle="welcome to your Team" />
      </Box>
      <Box
        m="8px 0 0 0"
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
