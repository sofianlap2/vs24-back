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
import { format, parseISO } from "date-fns";

const StationsManagement = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


  const [station, setStation] = useState([]);
  const location = useLocation();

  const isRequestResetPasswordPage = location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";

  const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [role, setUserRole] = useState("");
  const [verified, setVerified] = useState();
  const handleButtonClick = () => {
    navigate(`/addStation/${window.btoa(email)}`);
  };
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
      }
    };

    fetchVerified();
  }, [tokenValue]);
  useEffect(() => {
    const fetchStation = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/station/stationManagement`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          }
        );

        // Add id property to each station object
        const stationsWithIds = response.data.map((row) => ({
          ...row,
          id: row._id, // Assuming _id is the unique identifier
        }));

        // Transform data to include espacePublicS
        const stationsWithEspacePublic = stationsWithIds.map((station) => ({
          ...station,
          espacePublicS: station.espacePublic?.nomEspace || "",
          gouvernoratS: station.espacePublic?.gouvernorat || "",
          villeS: station.espacePublic?.ville || "",
          secteurActiviteS: station.espacePublic?.typeEspace || "",
        }));

        setStation(stationsWithEspacePublic);
      } catch (error) {
      }
    };

    if (email) {
      fetchStation();
    }
  }, [email, tokenValue]);
  const shouldShowAddAdmin = (role,verified) => {
    return (role === 'SUPERADMIN' || role === 'ADMINCLIENT') && verified === true ;
  };
  const  renderDate = (params) => {
    const date = parseISO(params.value);
   return format(date, 'dd/MM/yyyy');
    
  };
  const columns = [
    { field: "numero", headerName: "Reference", flex: 1 },
    { field: "espacePublicS", headerName: "Espace Public", flex: 1 },
    { field: "secteurActiviteS", headerName: "Secteur Activite", flex: 1 },
    { field: "gouvernoratS", headerName: "Gouvernorat", flex: 1 },
    { field: "villeS", headerName: "Ville", flex: 1 },
    { field: "modelStation", headerName: "Model", flex: 1 },
    { field: "dateFab", headerName: "Date fabrication", flex: 1, renderCell:  renderDate },
    { field: "dateEntretient", headerName: "Entretient", flex: 1 , renderCell:  renderDate},
    { field: "dateFinLoc", headerName: "Fin location", flex: 1 , renderCell:  renderDate},
    { field: "status", headerName: "Status", flex: 1 },
  ];

  return (
    <main id="station" className="station">
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
                  rows={station}
                  columns={columns}
                  getRowId={(row) => row.id}  style={{fontFamily: 'Constantia'}}
                />
              ) : (
                <Box>
                  {station.map((s) => (
                    <Box key={s.id}  p={2}
                    mb={2}
                    bgcolor={"transparent"}
                    borderRadius="8px"
                    boxShadow={20}>
                       <Typography style={{fontFamily: 'Constantia'}} variant="h6">{s.numero}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Espace Public: {s.espacePublicS}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Secteur Activite: {s.secteurActiviteS}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Gouvernorat: {s.gouvernoratS}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Ville: {s.villeS}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Model: {s.modelStation}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Date Fabrication: {renderDate({value:s.dateFab})}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Entretient: {renderDate({value:s.dateEntretient})}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Fin Location: {renderDate({value:s.dateFinLoc})}</Typography>
                       <Typography style={{fontFamily: 'Constantia'}}>Status: {s.status}</Typography>

                    </Box>
                  ))}
                </Box>
              )}
              {shouldShowAddAdmin(role,verified) && (
              <button
                style={{ height: "40px", width: "20vh", justifyItems: 'center', marginTop: '2vh',fontFamily: 'Constantia',fontWeight:"bold" }}
                onClick={handleButtonClick}
                className="btn btn-success"
              >
                Add Stations
              </button>)}
            </Box>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StationsManagement;
