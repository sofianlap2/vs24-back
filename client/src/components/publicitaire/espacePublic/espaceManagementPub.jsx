import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { tokens } from "../../../theme";


const EspacesManagementPub = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [espaces, setEspaces] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchEspaces = async () => {
      try {
       
          const response = await axios.get(`${appUrl}/espacePublic/espacePubliciteManagemenet`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          });

          const espacesWithIds = response.data.map((row) => ({
            ...row,
            id: row._id, // Assuming _id is the unique identifier
          }));

          setEspaces(espacesWithIds);
        
      } catch (error) {
        console.error("Error fetching espaces:", error);
      }
    };

   
      
    
    if (email) {
      fetchEspaces();
    }
  }, []);

  const columns = [
    { field: "nomEspace", headerName: "Nom espace", flex: 1 },
    { field: "gouvernorat", headerName: "Gouvernorat", flex: 1 },
    { field: "ville", headerName: "Ville", flex: 1 },
    { field: "typeEspace", headerName: "Type espace", flex: 1 },
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
                  rows={espaces}
                  columns={columns}
                  getRowId={(row) => row.id}
                  style={{ fontFamily: 'Constantia' }}
                />
              ) : (
                <Box>
                  {espaces.map((e) => (
                    <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: '20px' }} key={e.id}>
                      <Box p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20} marginLeft={"10vw"}>
                        <Typography style={{ fontFamily: 'Constantia' }}>Nom espace: {e.nomEspace}</Typography>
                        <Typography style={{ fontFamily: 'Constantia' }}>Gouvernorat: {e.gouvernorat}</Typography>
                        <Typography style={{ fontFamily: 'Constantia' }}>Ville: {e.ville}</Typography>
                        <Typography style={{ fontFamily: 'Constantia' }}>Type espace: {e.typeEspace}</Typography>
                      </Box>
                    </div>
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

export default EspacesManagementPub;
