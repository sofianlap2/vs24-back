import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery,Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate ,Outlet} from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../../admin/outils/Header";
import Sidebarrr from "../../admin/outils/Sidebar";
import { tokens } from "../../../theme";
import { format, isToday, parseISO } from "date-fns";
import SidebarClient from "../outils/sidebar/sidebarClient";
import HeaderClient from "../outils/header/headerClient";

const StationsManagementClient = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [stations, setStations] = useState([]);
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isRequestResetPasswordPage = location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";

  const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [role, setUserRole] = useState("");


  useEffect(() => {
    const fetchEspaces = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/station/StationsClient`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          }
        );

        const stationsWithIds = response.data.map((row) => ({
          ...row,
          id: row._id, // Assuming _id is the unique identifier
        }));

        const stationsWithEspacePublic = stationsWithIds.map((station) => ({
          ...station,
          espacePublicS: station.espacePublic?.nomEspace || "",
          gouvernoratS: station.espacePublic?.gouvernorat || "",
          villeS: station.espacePublic?.ville || "",
          secteurActiviteS: station.espacePublic?.typeEspace || "",
        }));

        setStations(stationsWithEspacePublic);
      } catch (error) {
      }
    };

    if (email) {
      fetchEspaces();
    }
  }, [email, tokenValue]);

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
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
{      shouldShowHeader &&  <HeaderClient toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
}        
        
        <div style={{ display: 'flex' }}>
     {shouldShowHeader&& <SidebarClient isSidebarOpen={isSidebarOpen}
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
                  rows={stations}
                  columns={columns}
                  getRowId={(row) => row.id} style={{fontFamily: 'Constantia'}}
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
             
              
            </Box>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StationsManagementClient;
