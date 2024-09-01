import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery,Container ,Stack ,Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate ,Outlet} from "react-router-dom";
import Cookies from "js-cookie";

import { tokens } from "../../../theme";
import { format, isToday, parseISO } from "date-fns";
import HeaderPub from "../outils/header/headerPub";
import SidebarPub from "../outils/sidebar/sidebarPub";

const PublicitesManagementPub = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [openDialog, setOpenDialog] = useState(false);

  const [publicites, setPublicites] = useState([]);
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isRequestResetPasswordPage = location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";
  const [selectedPub, setSelectedPub] = useState(null);

  const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
  const [errorMessage, setErrorMessage] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 
  const handleButtonClickk = () => {
    navigate(`/addPublicite/${window.btoa(email)}`);
  };
  

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
    const fetchPublicites = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/publicites/publiciteManagementPub`,
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
                }));

        setPublicites(publicitesWithDetails);
      } catch (error) {
        console.error("Failed to fetch publicites:", error);
      }
    };

    if (email) {
      fetchPublicites();
    }
  }, []);



  const renderDateRec = (params) => {
    const date = parseISO(params.value);
   
    return format(date, 'dd/MM/yyyy');
  };

  const columns = [
    { field: "dateDebPub", headerName: "Date début", flex: 1, renderCell: renderDateRec },
    { field: "dateFinPub", headerName: "Date fin", flex: 1, renderCell: renderDateRec },

    { field: "status", headerName: "Status", flex: 1 },
    {
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
              navigate(`/updatePublicite/${params.row._id}`);
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
    }
  ];

  return (
    <main id="publicite" className="publicite">
{      shouldShowHeader &&  <HeaderPub toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
}        
        
        <div style={{ display: 'flex' }}>
     {shouldShowHeader&& <SidebarPub isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)} />}
        
        <div className="row">
          <div style={{ width: "100%" }}>
            <Box
              m="11vh 10vw 0 5vw"
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
                  getRowId={(row) => row.id} style={{fontFamily: 'Constantia'}}
                />
              ) : (
                <Box>
                  {publicites.map((p) => (
                    <Box key={p.id} p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20}marginLeft={"10vw"}>
                     
                      <Typography style={{fontFamily: 'Constantia'}}>Date Début: {renderDateRec({ value: p.dateDebPub })}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Date Fin: {renderDateRec({ value: p.dateFinPub })}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Status: {p.status}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
             
              <button
                style={{ height: "40px", width: "25vh", justifyItems: 'center', marginTop: '2vh' ,fontFamily: 'Constantia',fontWeight:"bold"}}
                onClick={handleButtonClickk}
                className="btn btn-success"
              >
                Ajouter Publicité
              </button>
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

export default PublicitesManagementPub;