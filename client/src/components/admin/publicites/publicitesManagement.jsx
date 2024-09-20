import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery,Stack ,Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {  useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { tokens } from "../../../theme";
import { jwtDecode } from "jwt-decode";
import { format, isToday, parseISO } from "date-fns";
const PublicitesManagement = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [publicites, setPublicites] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [role, setRole] = useState("");
  const [selectedPub, setSelectedPub] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

 

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPub(null);
    setErrorMessage("");
  };
  const handleOpenDialog = (publicite) => {
    setSelectedPub(publicite);
    setOpenDialog(true);
  };
  const handleConfirmReject = async () => {
    if (selectedPub) {
      try {
        setPublicites(publicites.filter((u) => u._id !== selectedPub._id));

        

        await axios.delete(`${appUrl}/publicites/${selectedPub._id}`, {
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

  useEffect(() => {
    const fetchPublicites = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/publicites/publicitesManagement`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          }
        );

        const publicitesWithIds = response.data.map((row) => ({
          ...row,
          id: row._id, // Assuming _id is the unique identifier
        }));

        const publicitesWithDetails = publicitesWithIds.map((publicite) => ({
          ...publicite,
          user: publicite.user?.email || "",
          espacePublicD: publicite.espacePublic?.length,
        }));
console.log(" :" ,publicitesWithDetails)
        setPublicites(publicitesWithDetails);
      } catch (error) {
      }
    };

    if (email) {
      fetchPublicites();
    }
  }, [email, tokenValue]);

  const shouldShowActionsColumn = () => {
    return (role === 'SUPERADMIN' || role === 'ADMINPUB');
  };

  const renderDateRec = (params) => {
    const date = parseISO(params.value);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    return format(date, 'dd/MM/yyyy');
  };

  const columns = [
    { field: "user", headerName: "User", flex: 1 },
    { field: "dateDebPub", headerName: "Date début", flex: 1, renderCell: renderDateRec },
    { field: "dateFinPub", headerName: "Date fin", flex: 1, renderCell: renderDateRec },
    { field: "espacePublicD", headerName: "Espace", flex: 0.5 },

    { field: "status", headerName: "Status", flex: 1 },

  ];
  if (shouldShowActionsColumn()) {


    columns.push({
      field: "button",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} style={{ justifyContent: 'center', fontSize: 'small' }}>
          <Button
            variant="outlined"
            class="btn btn-outline-info"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/decisionPub/${params.row._id}`);
            }}
            style={{ marginTop: '1vh', fontSize: 'small' }}
          >
            Info
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
    <main id="publicite" className="publicite">
      <div style={{ display: 'flex' }}>
        <div className="row">
          <div style={{ width: "100%" }}>
            <Box
              m="12vh 10vw 0 10vw"
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
                  rows={publicites}
                  columns={columns}
                  getRowId={(row) => row.id}  
                />
              ) : (
                <Box>
               {publicites.map((p) => (
                    <Box key={p.id} p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20}marginLeft={"10vw"}>
                     
                      <Typography >Date Début: {renderDateRec({ value: p.dateDebPub })}</Typography>
                      <Typography >Date Fin: {renderDateRec({ value: p.dateFinPub })}</Typography>
                      <Typography >Espace: {p.espacePublicD}</Typography>

                      <Typography >Status: {p.status}</Typography>
                      {shouldShowActionsColumn() && (
      <Stack direction="row" spacing={1} style={{ justifyContent: 'center', fontSize: 'small' }}>
        <Button
          variant="outlined"
          class="btn btn-outline-info"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/admin/decisionPub/${p.id}`);
        }}
          style={{ marginTop: '1vh', fontSize: 'small' }}
        >
          Info
        </Button>
        
        
      </Stack>
    )}
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
            Êtes-vous sûr de vouloir supprimer cet publicite ?
          </DialogContentText>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleConfirmReject} color="error">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default PublicitesManagement;
