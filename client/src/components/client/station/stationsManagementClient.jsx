import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery,Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {  useParams, useNavigate ,Outlet} from "react-router-dom";
import Cookies from "js-cookie";

import { tokens } from "../../../theme";
import { format, isToday, parseISO } from "date-fns";

const StationsManagementClient = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [stations, setStations] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 


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
       
        
        <div style={{ display: 'flex' }}>
   
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
                  getRowId={(row) => row.id} 
                />
              ) : (
                <Box>
                  {station.map((s) => (
                    <Box key={s.id}  p={2}
                    mb={2}
                    bgcolor={"transparent"}
                    borderRadius="8px"
                    boxShadow={20}>
                       <Typography  variant="h6">{s.numero}</Typography>
                       <Typography >Espace Public: {s.espacePublicS}</Typography>
                       <Typography >Secteur Activite: {s.secteurActiviteS}</Typography>
                       <Typography >Gouvernorat: {s.gouvernoratS}</Typography>
                       <Typography >Ville: {s.villeS}</Typography>
                       <Typography >Model: {s.modelStation}</Typography>
                       <Typography >Date Fabrication: {renderDate({value:s.dateFab})}</Typography>
                       <Typography >Entretient: {renderDate({value:s.dateEntretient})}</Typography>
                       <Typography >Fin Location: {renderDate({value:s.dateFinLoc})}</Typography>
                       <Typography >Status: {s.status}</Typography>

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
