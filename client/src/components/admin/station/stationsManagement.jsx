import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Stack, useMediaQuery, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { tokens } from "../../../theme";
import Cookies from "js-cookie";
import { format, parseISO } from "date-fns";

const StationsManagement = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [station, setStation] = useState([]);

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

        const stationsWithIds = response.data.map((row) => ({
          ...row,
          id: row._id,
        }));

        const stationsWithEspacePublic = stationsWithIds.map((station) => ({
          ...station,
          espacePublicS: station.espacePublic?.nomEspace || "",
          gouvernoratS: station.espacePublic?.gouvernorat || "",
          villeS: station.espacePublic?.ville || "",
          secteurActiviteS: station.espacePublic?.typeEspace || "",
        }));

        setStation(stationsWithEspacePublic);
      } catch (error) {
        console.error("Error fetching station data:", error);
      }
    };

    fetchStation();
  }, [appUrl, tokenValue]);

  const handleButtonClick = () => {
    navigate(`/admin/addStation/${window.btoa(email)}`);
  };
  const shouldShowAddStation = () => {
    return (role === 'SUPERADMIN' || role === 'ADMINCLIENT')  ;
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
  if (shouldShowAddStation()) {
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
              navigate( `/admin/updateStation/${params.row._id}`);
            }}
            style={{ marginTop: "1vh", fontSize: "small" }}
          >
            Modifier
          </Button>
         
        </Stack>
      ),
    });
  }

  return (
    <main id="station" className="station">
      <div style={{ display: 'flex' }}>
        <div className="row">
          <div style={{ width: "100%" }}>
            <Box
              m="10vh 10vw 0 10vw"
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
                       <Typography >Model: {s.modelStation}</Typography>
                       <Typography >Date Fabrication: {renderDate({value:s.dateFab})}</Typography>
                       <Typography >Entretient: {renderDate({value:s.dateEntretient})}</Typography>
                       <Typography >Fin Location: {renderDate({value:s.dateFinLoc})}</Typography>
                       <Typography >Status: {s.status}</Typography>
                       { shouldShowAddStation() && (<Stack direction="row" spacing={1} style={{ justifyContent: "center", fontSize: "small" }}>
                      <Button
                        variant="outlined"
                        class="btn btn-outline-info"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate( `/updateStation/${station._id}`);
                        }}
                        style={{ marginTop: "1vh", fontSize: "small" }}
                      >
                        Modifier
                      </Button>
                      
                    </Stack>)}
                    </Box>
                  ))}
                </Box>
              )}
              {shouldShowAddStation() && (
              <button
                style={{ height: "40px", width: "20vh", justifyItems: 'center', marginTop: '2vh',fontWeight:"bold" }}
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