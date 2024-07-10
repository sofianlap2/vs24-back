import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Stack, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Button } from "../../accueil/ButtonElement";
import Header from "../outils/Header";
import Sidebarrr from "../outils/Sidebar";
import { tokens } from "../../../theme";
import Cookies from "js-cookie";
const CassierManagement = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  
  const [cassier, setCassier] = useState([]);
  const location = useLocation();

  const isRequestResetPasswordPage = location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const fetchCassier = async () => {
      try {
        const response = await axios.get(`${appUrl}/cassiers/cassierManagement`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenValue}`,
          },
        });
  
        const cassiersWithEspacePublic = response.data.map((cassier) => {
          // Assuming espacePublic is now an object with properties after being populated
          return {
            ...cassier,
            id: cassier._id,
            stationS: cassier.station_ref?.numero || "",
            espacePublicS: cassier.station_ref?.espacePublic?.nomEspace || "",
            gouvernoratS: cassier.station_ref?.espacePublic?.gouvernorat || "",
            villeS: cassier.station_ref?.espacePublic?.ville || "",
            secteurActiviteS: cassier.station_ref?.espacePublic?.typeEspace || "",
          };
        });
  
        setCassier(cassiersWithEspacePublic);
      } catch (error) {
      }
    };
  
    if (email) {
      fetchCassier();
    }
  }, [email, tokenValue]);
  
  const columns = [
    { field: "locker_number", headerName: "Locker", flex: 1 },
    { field: "stationS", headerName: "Reference", flex: 1 },
    { field: "espacePublicS", headerName: "Espace Public", flex: 1 },
    { field: "secteurActiviteS", headerName: "Secteur Activite", flex: 1 },
    { field: "gouvernoratS", headerName: "Gouvernorat", flex: 1 },
    { field: "villeS", headerName: "Ville", flex: 1 },
  ];
  
  return (
    <main id="cassier" className="cassier">
      {shouldShowHeader && <Header />}
      <div style={{ display: 'flex' }}>
        {shouldShowHeader && <Sidebarrr />}
        <div className="row">
          <div style={{ width: "100%" }}>
            <Box
              m="11vh 10vw 0 25vw"
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
                  rows={cassier}
                  columns={columns}
                  getRowId={(row) => row.id} style={{fontFamily: 'Constantia'}}
                />
              ) : (
                <Box>
                  {cassier.map((c) => (
                    <Box key={c.id} p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20}>
                      <Typography style={{fontFamily: 'Constantia'}} variant="h6">{c.locker_number}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Espace Public: {c.espacePublicS}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Secteur Activite: {c.secteurActiviteS}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Gouvernorat: {c.gouvernoratS}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Ville: {c.villeS}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </div>
        </div>
      </div>
    </main>
  );
  
  
};

export default CassierManagement;
