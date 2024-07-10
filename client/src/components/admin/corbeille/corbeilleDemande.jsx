import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, Stack, useMediaQuery, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "../outils/Header";
import Sidebarrr from "../outils/Sidebar";
import { tokens } from "../../../theme";
import Cookies from "js-cookie";

function CorbeilleDemande() {
    const { email } = useParams();
    const navigate = useNavigate();
    const tokenValue = Cookies.get("token");
    const [demandesRejet, setDemandes] = useState([]);
    const [filteredDemandes, setFilteredDemandes] = useState([]);
    const [selectedType, setSelectedType] = useState("CLIENT");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDemande, setSelectedDemande] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const isRequestResetPasswordPage = location.pathname === "/requestResetPassword";
    const isResetPasswordPage = location.pathname.includes("/resetPassword/");
    const isLoginPage = location.pathname === "/signin";
    const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [role, setRole] = useState("");
    const [verified, setVerified] = useState();
    const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


    useEffect(() => {
      const fetchRole = async () => {
        try {
          const response = await axios.get(`${appUrl}/users/${window.atob(email)}/userRole`, {
            headers: {
              Authorization: `${tokenValue}`,
            },
          });
          setRole(response.data.role);
        } catch (error) {
        }
      };
  
      fetchRole();
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
        }
      };
  
      fetchVerified();
    }, [tokenValue]);
  
    useEffect(() => {
      const fetchDemandes = async () => {
        try {
          const response = await axios.get(
            `${appUrl}/demandeRejet/${window.atob(email)}/demandesRejetManagement`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${tokenValue}`,
              },
            }
          );
          const demandeRejetWithIds = response.data.map((row) => ({
            ...row,
            id: row._id,
          }));
          const demandesRejetWithEspacePublic = demandeRejetWithIds.map((demandeRejet) => ({
            ...demandeRejet,
            espacePublicD: demandeRejet.espacePublic?.length,
          }));
          setDemandes(demandesRejetWithEspacePublic);
        } catch (error) {
        }
      };
  
      if (email) {
        fetchDemandes();
      }
    }, [email, tokenValue]);
  
    useEffect(() => {
      const filtered = demandesRejet.filter((demandeRejet) => demandeRejet.typeDemande === selectedType);
      setFilteredDemandes(filtered);
    }, [selectedType, demandesRejet]);
  
    const handleOpenDialog = (demandeRejet) => {
      setSelectedDemande(demandeRejet);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedDemande(null);
      setErrorMessage("");
    };
  
    const handleConfirmReject = async () => {
      if (selectedDemande) {
        try {
          // Add to demandeRejet
         
  
          // Delete from demandesRejet
          await axios.delete(`${appUrl}/demandeRejet/${selectedDemande._id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          });
  
          // Update state
          setDemandes(demandesRejet.filter((d) => d._id !== selectedDemande._id));
  
          // Close dialog
          handleCloseDialog();
  
          // Reload the page after 2 seconds
         
        } catch (error) {
          setErrorMessage("Failed to reject demande. Please try again.");
        }
      }
    };
    const shouldShowActionsColumn = (role, verified) => {
      return (role === 'SUPERADMIN' || role === 'ADMINDEMANDE') && verified === true;
    };
    const columnsClient = [
      { field: "fullName", headerName: "Full Name", flex: 0.6 },
      { field: "metier", headerName: "Metier", flex: 0.4 },
      { field: "email", headerName: "Email", flex: 0.7 },
      { field: "phoneNumber", headerName: "Téléphone", flex: 0.6 },
      { field: "phoneNumber2", headerName: "Téléphone 2", flex: 0.6 },

      { field: "gouvernorat", headerName: "Gouvernorat", flex: 0.6 },
      { field: "ville", headerName: "Ville", flex: 0.5 },
      { field: "typeDemande", headerName: "Type Demande", flex: 0.7 },
      { field: "nomEntreprise", headerName: "Entreprise", flex: 0.5 },
      { field: "messageDemande", headerName: "Message", flex: 0.5 },
      
    ];
  
    const columnsPublicitaire = [
      { field: "fullName", headerName: "Full Name", flex: 0.6 },
      { field: "email", headerName: "Email", flex: 0.7 },
      { field: "phoneNumber", headerName: "Téléphone", flex: 0.6 },
      { field: "phoneNumber2", headerName: "Téléphone 2", flex: 0.6 },
      { field: "gouvernorat", headerName: "Gouvernorat", flex: 0.6 },
      { field: "ville", headerName: "Ville", flex: 0.5 },
      { field: "typeDemande", headerName: "Type Demande", flex: 0.7 },
      { field: "typeEspace", headerName: "Type Espace", flex: 0.6 },
      { field: "nomEntreprise", headerName: "Entreprise", flex: 0.5 },
      { field: "espacePublicD", headerName: "Espace", flex: 0.5 },
      { field: "messageDemande", headerName: "Message", flex: 0.4 },
      
    ];
    if (shouldShowActionsColumn(role, verified)) {
      columnsClient.push({
        field: "button",
        headerName: "Actions",
        flex: 1,
        renderCell: (params) => (
          <Stack direction="row" spacing={1} style={{ justifyContent: 'center', fontSize: 'small' }}>
            
            <Button
              variant="outlined" class="btn btn-outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDialog(params.row);
              }}
              style={{ marginTop: '1vh', fontSize: 'small' }}
            >
              Supprimer
            </Button>
          </Stack>
        ),
      
      });
  
      columnsPublicitaire.push({
        field: "button",
        headerName: "Actions",
        flex: 1,
        renderCell: (params) => (
          <Stack direction="row" spacing={1} style={{ justifyContent: 'center', fontSize: 'small' }}>
            
            <Button
              variant="outlined" class="btn btn-outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDialog(params.row);
              }}
              style={{ marginTop: '1vh', fontSize: 'small' }}
            >
              Supprimer
            </Button>
          </Stack>
        ),
      
      });
    }
    return (
      <main id="clients" className="clients">
        {shouldShowHeader && <Header />}
        <div style={{ display: 'flex' }}>
          {shouldShowHeader && <Sidebarrr />}
          <div className="row" style={{ marginLeft: "20vw" }}>
            <div style={{ width: "80vw" }}>
              <Stack direction="row" spacing={2} style={{ justifyContent: "center" }} m="8vh 0vw 0vw 0vw">
                <Button variant="btn btn-outline-info" onClick={() => setSelectedType("CLIENT")}>
                  Type Client
                </Button>
                <Button variant="btn btn-outline-info" onClick={() => setSelectedType("PUBLICITAIRE")}>
                  Type Publicitaire
                </Button>
              </Stack>
              <div style={{ width: "100%" }}>
              <Box
                m="2vh 0vw 0 2.5vw"
                height="75vh"
                width="85%"
                sx={{
                  "& .MuiDataGrid-root": { border: "none" },
                  "& .MuiDataGrid-cell": { borderBottom: "none" },
                  "& .name-column--cell": { color: colors.greenAccent[300] },
                  "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                  "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                  "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] ,fontFamily:'Constan'},
                  "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
                }}
              >
                  {!isMobile ? (
                    <DataGrid
                      rows={filteredDemandes}
                      columns={selectedType === "CLIENT" ? columnsClient : columnsPublicitaire}
                      style={{ justifyItems: "center",fontFamily: 'Constantia' }}
                      getRowId={(row) => row.email} 
                    />
                  ) : (
                    <Box>
                      {filteredDemandes.map((demandeRejet) => (
                        <Box
                          key={demandeRejet.id}
                          p={2}
                          mb={2}
                          bgcolor={"transparent"}
                          borderRadius="8px"
                          boxShadow={3}
                        >
                          <Typography variant="h6">{demandeRejet.fullName}</Typography>
                          <Typography>Email: {demandeRejet.email}</Typography>
                          <Typography>Téléphone: {demandeRejet.phoneNumber}</Typography>
                          <Typography>Téléphone 2: {demandeRejet.phoneNumber2}</Typography>
                          <Typography>Gouvernorat: {demandeRejet.gouvernorat}</Typography>
                          <Typography>Ville: {demandeRejet.ville}</Typography>
                          <Typography>Type Demande: {demandeRejet.typeDemande}</Typography>
                          {demandeRejet.typeDemande === "CLIENT" ? (
                            <>
                              <Typography>Metier: {demandeRejet.metier}</Typography>
                              <Typography>Entreprise: {demandeRejet.nomEntreprise}</Typography>
                              <Typography>Message: {demandeRejet.messageDemande}</Typography>
                            </>
                          ) : (
                            <>
                              <Typography>Type Espace: {demandeRejet.typeEspace}</Typography>
                              <Typography>Espace: {demandeRejet.espacePublicD}</Typography>
                              <Typography>Message: {demandeRejet.messageDemande}</Typography>
                            </>
                          )}
                          <Stack direction="row" spacing={1} style={{ justifyContent: 'center', fontSize: 'small' }}>
                            
                            <Button
                             variant="outlined" class="btn btn-outline-danger" 
                              onClick={() => handleOpenDialog(demandeRejet)}
                              style={{ marginTop: '1vh', fontSize: 'small' }}
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
        </div>
  
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Confirmer le Rejet"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Êtes-vous sûr de vouloir rejeter cette demande?
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
      </main>
    );
  };

export default CorbeilleDemande
