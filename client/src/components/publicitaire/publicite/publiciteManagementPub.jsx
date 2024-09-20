import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery,Container ,Stack ,Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {  useParams, useNavigate ,Outlet} from "react-router-dom";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

import { tokens } from "../../../theme";
import { format, isToday, parseISO } from "date-fns";
import { toast, ToastContainer } from "react-toastify";

const PublicitesManagementPub = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [publicites, setPublicites] = useState([]);
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 
  const handleButtonClickk = () => {
    navigate(`/pub/addPublicite/${window.btoa(email)}`);
  };
  const handleButtonStop = async (id) => {
    try {
      await axios.post(`${appUrl}/publicites/requestStop/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      toast.success('Demande de stop le publicité a envoyée.');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la demande de stop.');
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
  }, [email, tokenValue]);



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
              navigate(`/pub/updatePublicite/${params.row._id}`);
            }}
            style={{ marginTop: '1vh', fontSize: 'small' }}
          >
            Info
          </Button>
          {(params.row.status ==="Accepté" || params.row.status ==="En attente")&&(<Button
    variant="outlined"
    class="btn btn-outline-danger"
    onClick={(e) => {
      e.stopPropagation();
      handleButtonStop(params.row._id); // Pass the correct ID to handleButtonStop
    }}
    style={{ marginTop: '1vh', fontSize: 'small' }}
  >
    Stop
  </Button>)}
        </Stack>
      ),
    }
  ];

  return (
    <main id="publicite" className="publicite">
    
        
        <div style={{ display: 'flex' }}>
   
        <div className="row">
        <ToastContainer/>
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
                  getRowId={(row) => row.id} 
                />
              ) : (
                <Box>
                  {publicites.map((p) => (
                    <Box key={p.id} p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20}marginLeft={"10vw"}>
                     
                      <Typography >Date Début: {renderDateRec({ value: p.dateDebPub })}</Typography>
                      <Typography >Date Fin: {renderDateRec({ value: p.dateFinPub })}</Typography>
                      <Typography >Status: {p.status}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
             
              <button
                style={{ height: "40px", width: "25vh", justifyItems: 'center', marginTop: '2vh' ,fontWeight:"bold"}}
                onClick={handleButtonClickk}
                className="btn btn-success"
              >
                Ajouter Publicité
              </button>
            </Box>
          </div>
        </div>
      </div>
   
    </main>
  );
};

export default PublicitesManagementPub;