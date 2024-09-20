import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Stack,
  useMediaQuery,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {  useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { tokens } from "../../../theme";
import Cookies from "js-cookie";

const EspacePublicManagement = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [espacePublic, setEspacePublic] = useState([]);
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [selectedEspace, setSelectedEspace] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [role, setRole] = useState("");

  useEffect(() => {
    if (tokenValue) {
      try {
        const decodedToken = jwtDecode(tokenValue);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [tokenValue]);

  
  const handleButtonClick = () => {
    navigate(`/admin/addEspacePublic/${email}`);
  };

  useEffect(() => {
    const fetchEspacePublic = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/espacePublic/espacePublicManagement`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          }
        );

        const espacePublicWithIds = response.data.map((row) => ({
          ...row,
          id: row._id,
        }));

        const espacePublicWithFirstName = espacePublicWithIds.map((espace) => ({
          ...espace,
          userEntreprise: espace.user?.fullName || "",
        }));

        setEspacePublic(espacePublicWithFirstName);
      } catch (error) {
      }
    };

    if (email) {
      fetchEspacePublic();
    }
  }, [email, tokenValue, appUrl]);

  const handleOpenDialog = (espacePublic) => {
    setSelectedEspace(espacePublic);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEspace(null);
    setErrorMessage("");
  };

  const handleConfirmReject = async () => {
    if (selectedEspace) {
      try {
        await axios.delete(`${appUrl}/espacePublic/${selectedEspace._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenValue}`,
          },
        });
  
        setEspacePublic(espacePublic.filter((e) => e._id !== selectedEspace._id));
        handleCloseDialog();
      } catch (error) {
        setErrorMessage("N'a pas réussi à supprimer l'espace public. Veuillez réessayer.");
      }
    } 
  };

  const shouldShowAction = () => {
    return (role === "SUPERADMIN" || role === "ADMINCLIENT") ;
  };

  const columns = [
    { field: "nomEspace", headerName: "Nom Espace", flex: 1 },
    { field: "gouvernorat", headerName: "Gouvernorat", flex: 1 },
    { field: "ville", headerName: "Ville", flex: 1 },
    { field: "typeEspace", headerName: "Secteur d'activité", flex: 1 },
    { field: "userEntreprise", headerName: "Client", flex: 1 },
  ];

  if (shouldShowAction()) {
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
              navigate( `/admin/updateEspacePublic/${params.row._id}`);
            }}
            style={{ marginTop: "1vh", fontSize: "small" }}
          >
            Modifier
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
    <main id="espacePublic" className="espacePublic">
      <div style={{ display: "flex" }}>
        <div className="row">
          <div style={{ width: "100%" }}>
            <Box
              m="11vh 10vw 0 10vw"
              height="75vh"
              width="60vw"
              sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .name-column--cell": { color: colors.greenAccent[300] },
                "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
                "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
                "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
              }}
            >
              {!isMobile ? (
                <DataGrid
                  rows={espacePublic}
                  columns={columns}
                  getRowId={(row) => row.id}  
                />
              ) : (
                <Box>
                  {espacePublic.map((espace) => (
                    <Box
                      key={espace.id}
                      p={2}
                      mb={2}
                      bgcolor={"transparent"}
                      borderRadius="8px"
                      boxShadow={20}
                    >
                      <Typography  variant="h6">{espace.nomEspace}</Typography>
                      <Typography >Gouvernorat: {espace.gouvernorat}</Typography>
                      <Typography >Ville: {espace.ville}</Typography>
                      <Typography >Secteur d'activité: {espace.typeEspace}</Typography>
                      <Typography >Client: {espace.userEntreprise}</Typography>
                      { shouldShowAction() && (<Stack direction="row" spacing={1} style={{ justifyContent: "center", fontSize: "small" }}>
                      <Button
                        variant="outlined"
                        class="btn btn-outline-info"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate( `/admin/updateEspacePublic/${espace._id}`);
                        }}
                        style={{ marginTop: "1vh", fontSize: "small" }}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="outlined"
                        class="btn btn-outline-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDialog(espace);
                        }}
                        style={{ marginTop: "1vh", fontSize: "small" }}
                      >
                        Supprimer
                      </Button>
                    </Stack>)}
                    </Box>
                   
                  ))}
                  
                </Box>
              )}
              {shouldShowAction() && (
                <button
                  style={{ height: "40px", width: "20vh", justifyItems: "center", marginTop: "2vh",fontWeight:'bold' }}
                  onClick={handleButtonClick}
                  className="btn btn-success"  
                >
                  Add Espace
                </button>
              )}
            </Box>
          </div>
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmer le suppression"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer cette espace public?
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

export default EspacePublicManagement;
