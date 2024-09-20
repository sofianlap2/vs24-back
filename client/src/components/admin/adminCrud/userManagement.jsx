import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Stack,
  Button,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Card,
  CardContent,
  CardActions,
  Grid,
  Fab,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Add, Edit, Delete, EditOutlined, DeleteOutline } from "@mui/icons-material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const UsersManagement = () => {
  const { email } = useParams();
  const tokenValue = Cookies.get("token");
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [role, setUserRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    if (tokenValue) {
      try {
        const decodedToken = jwtDecode(tokenValue);
        setUserRole(decodedToken.role);
        
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [tokenValue]);

  // useEffect(() => {
  //   const fetchUsersWithRole = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`${appUrl}/users/${email}/filterUserWithRole`, {
  //         params: { role: selectedRole },
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${tokenValue}`,
  //         },
  //       });
  //       setUsers(response.data);
  //     } catch (error) {
  //       console.error("Error fetching users with role:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (selectedRole) {
  //     fetchUsersWithRole();
  //   }
  // }, [selectedRole, tokenValue, email]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${appUrl}/users/${window.atob(email)}/usersManagement`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email && tokenValue) {
      fetchUsers();
    }
  }, [email, tokenValue]);

  const handleButtonClick = () => {
    navigate(`/admin/addAdmin/${window.btoa(email)}`);
  };

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setErrorMessage("");
  };

  const handleConfirmReject = async () => {
    if (selectedUser) {
      try {
        setUsers(users.filter((u) => u._id !== selectedUser._id));
        await axios.post(
          `${appUrl}/usersDeleted/addUserDeleted`,
          selectedUser,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        await axios.delete(`${appUrl}/users/${selectedUser.email}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
        });
        handleCloseDialog();
      } catch (error) {
        setErrorMessage(
          "N'a pas réussi à supprimer l'utilisateur. Veuillez réessayer."
        );
      }
    }
  };

  const shouldShowAddAdmin = () => {
    return role === "SUPERADMIN";
  };

  const columns = [
    { field: "fullName", headerName: "FullName", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Téléphone", flex: 1 },
    { field: "phoneNumber2", headerName: "Téléphone 2", flex: 1 },
    { field: "nomEntreprise", headerName: "Entreprise", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
  ];

  if (shouldShowAddAdmin()) {
    columns.push({
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Fab
            size="small"
            color="primary"
            onClick={() => navigate(`/admin/updateUser/${params.row._id}`)}
          >
            <EditOutlined />
          </Fab>
          <Fab
            size="small"
            color="error"
            onClick={() => handleOpenDialog(params.row)}
          >
            <DeleteOutline />
          </Fab>
        </Stack>
      ),
    });
  }

  return (
    <Box
      m="11vh 10vw 0 15vw"
      height="80vh"
      width="60vw"
      sx={{
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-cell": { borderBottom: "none" },
        "& .name-column--cell": { color: colors.greenAccent[300] },
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
      {" "}
      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
      </Box>
      {loading ? (
        <Stack alignItems="center" justifyContent="center" height="50vh">
          <CircularProgress />
        </Stack>
      ) : !isMobile ? (
        <Box sx={{ height: "75vh", width: "100%" }}>
          <DataGrid
            rows={users}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row._id}
          />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} key={user._id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{user.fullName}</Typography>
                  <Typography color="textSecondary">
                    Email: {user.email}
                  </Typography>
                  <Typography color="textSecondary">
                    Téléphone: {user.phoneNumber}
                  </Typography>
                  <Typography color="textSecondary">
                    Téléphone 2: {user.phoneNumber2}
                  </Typography>
                  <Typography color="textSecondary">
                    Entreprise: {user.nomEntreprise}
                  </Typography>
                  <Typography color="textSecondary">
                    Role: {user.role}
                  </Typography>
                </CardContent>
                {shouldShowAddAdmin() && (
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => navigate(`/admin/updateUser/${user._id}`)}
                    >
                      Modifier
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleOpenDialog(user)}
                    >
                      Supprimer
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <br />
      {shouldShowAddAdmin() && (
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={handleButtonClick}
        >
          Add Admin
        </Button>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmer le suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet utilisateur?
          </DialogContentText>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmReject} color="primary" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersManagement;
