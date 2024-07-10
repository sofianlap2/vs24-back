import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Stack, Button, useMediaQuery, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "../outils/Header";
import Sidebarrr from "../outils/Sidebar";
import { tokens } from "../../../theme";
import Cookies from "js-cookie";

const ArchiveUsers = () => {
  const { email } = useParams();
  const tokenValue = Cookies.get("token");
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usersDeleted, setUsersDeleted] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setUserRole] = useState("");
  const [verified, setVerified] = useState();
  const [selectedUser, setSelectedUser] = useState(null);

  const isRequestResetPasswordPage = location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${appUrl}/users/${window.atob(email)}/userRole`, {
          headers: {
            Authorization: `${tokenValue}`,
          },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, [tokenValue]);

  useEffect(() => {
    const fetchVerified = async () => {
      try {
        const response = await axios.get(`${appUrl}/users/${window.atob(email)}/userVerified`, {
          headers: {
            Authorization: `${tokenValue}`,
          },
        });
        setVerified(response.data.verified);
      } catch (error) {
        console.error("Failed to fetch user verification status:", error);
      }
    };

    fetchVerified();
  }, [tokenValue]);

  useEffect(() => {
    fetchUsersWithRole();
  }, [selectedRole]);

  const fetchUsersWithRole = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `${appUrl}/usersDeleted/${window.atob(email)}/userDeletedManagement`,
        {
          params: {
            role: selectedRole,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      setUsersDeleted(response.data);
    } catch (error) {
      console.error("Error fetching users with role:", error);
    }
  };

  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/usersDeleted/${window.atob(email)}/userDeletedManagement`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          }
        );
        console.log("Fetched users:", response.data);
        setUsersDeleted(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    if (email) {
      fetchUsers();
    }
  }, [email, tokenValue]);

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
        setUsersDeleted(usersDeleted.filter((u) => u._id !== selectedUser._id));

        

        await axios.delete(`${appUrl}/usersDeleted/${selectedUser._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenValue}`,
          },
        });
        handleCloseDialog();
      } catch (error) {
        setErrorMessage("Failed to delete user. Please try again.");
      }
    }
  };




  const handleRestauration = async () => {
    if (selectedUser) {
      try {
        setUsersDeleted(usersDeleted.filter((u) => u._id !== selectedUser._id));

        
        await axios.post(`${appUrl}/usersDeleted/userRetaurer`, selectedUser, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          });
        await axios.delete(`${appUrl}/usersDeleted/${selectedUser._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenValue}`,
          },
        });
        handleCloseDialog();
      } catch (error) {
        setErrorMessage("Failed to delete user. Please try again.");
      }
    }
  };
  const shouldShowAddAdmin = (role, verified) => {
    return role === "SUPERADMIN" && verified === true;
  };

  const columns = [
    { field: "fullName", headerName: "FullName", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Téléphone", flex: 1 },
    { field: "phoneNumber2", headerName: "Téléphone 2", flex: 1 },
    { field: "nomEntreprise", headerName: "Entreprise", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
  ];

  if (shouldShowAddAdmin(role, verified)) {
    columns.push({
      field: "button",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} style={{ justifyContent: "center", fontSize: "small" }}>
          <Button
            variant="outlined"
            class="btn btn-outline-info"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDialog(params.row);
            }}
            style={{ marginTop: "1vh", fontSize: "small" }}
          >
            Restaurer
          </Button>
          <Button
            variant="outlined"
            class="btn btn-outline-danger"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDialog(params.row);
            }}
            style={{ marginTop: "1vh", fontSize: "small" }}
          >
            Supprimer
          </Button>
        </Stack>
      ),
    });
  }

  return (
    <main>
      {shouldShowHeader && <Header />}
      <div style={{ display: "flex" }}>
        {shouldShowHeader && <Sidebarrr />}
        <div className="row">
          <div style={{ width: "100%" }}>
            <Box
              m="11vh 10vw 0 25vw"
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
              {!isMobile ? (
                <DataGrid
                  rows={usersDeleted}
                  columns={columns}
                  checkboxSelection
                  style={{ fontFamily: "Constantia" }}
                  getRowId={(row) => row._id}
                />
              ) : (
                <Box>
                  <div>
                    <label style={{ fontFamily: "Constantia" }}>Role:</label>
                    <select
                      aria-label="Default select example"
                      onChange={(e) => {
                        setSelectedRole(e.target.value);
                      }}
                    >
                      <option style={{ fontFamily: "Constantia" }} value="">
                        All Role
                      </option>
                      <option style={{ fontFamily: "Constantia" }} value="SUPERADMIN">
                        Super Admin
                      </option>
                      <option style={{ fontFamily: "Constantia" }} value="USER">
                        User
                      </option>
                      <option style={{ fontFamily: "Constantia" }} value="CLIENT">
                        Client
                      </option>
                      <option style={{ fontFamily: "Constantia" }} value="PUBLICITAIRE">
                        Publicitaire
                      </option>
                    </select>
                  </div>
                    {usersDeleted.map((user, index) => (
                      <Box
                      key={user.id}
                      p={2}
                      mb={2}
                      bgcolor={"transparent"}
                      borderRadius="8px"
                      boxShadow={20}
                      marginTop={"2vh"}
                    >
                        <Typography style={{fontFamily: 'Constantia'}} variant="h6">{user.fullName}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Email: {user.email}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Téléphone: {user.phoneNumber}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Téléphone 2: {user.phoneNumber2}</Typography>

                       <Typography style={{fontFamily: 'Constantia'}}>Entreprise: {user.nomEntreprise}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Role: {user.role}</Typography>
                          <Stack direction="row" spacing={1} style={{ justifyContent: "center", fontSize: "small" }}>
                            <Button
                              variant="outlined"
                              class="btn btn-outline-info"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog(user);
                              }}
                              style={{ marginTop: "1vh", fontSize: "small" }}
                            >
                              Restaurer
                            </Button>
                            <Button
                              variant="outlined"
                              class="btn btn-outline-danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenDialog(user);
                              }}
                              style={{ marginTop: "1vh", fontSize: "small" }}
                            >
                              Supprimer
                            </Button>
                          </Stack>
                       </Box>
                    ))}
                  
                </Box>
              )}
             
            </Box>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
          </DialogContentText>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleConfirmReject} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmation de restauration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir restaurer cet utilisateur ?
          </DialogContentText>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleRestauration} color="error">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default ArchiveUsers;
