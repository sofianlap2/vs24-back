import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery,Stack,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {  useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { tokens } from "../../../theme";
import { format, isToday, parseISO } from "date-fns";
const ReclamationsManagement = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [reclamations, setReclamations] = useState([]);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [role, setRole] = useState("");

  const handleButtonClick = () => {
    navigate(`/admin/cathegorieManagement/${window.btoa(email)}`);
  };
  const handleButtonClickk = () => {
    navigate(`/admin/addReclamation/${window.btoa(email)}`);
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
    const fetchReclamations = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/reclamations/reclamationManagement`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          }
        );

        const reclamationsWithIds = response.data.map((row) => ({
          ...row,
          id: row._id, // Assuming _id is the unique identifier
        }));

        const reclamationsWithDetails = reclamationsWithIds.map((reclamation) => ({
          ...reclamation,
          user: reclamation.user?.email || "",
          cathegorieName: reclamation.cathegorie?.nomCat || "", // Assuming 'name' is an attribute in the Cathegorie model
        }));

        setReclamations(reclamationsWithDetails);
      } catch (error) {
      }
    };

    if (email) {
      fetchReclamations();
    }
  }, [email, tokenValue]);

  const shouldShowAddAdmin = () => {
    return (role === 'SUPERADMIN' || role === 'ADMINCLIENT') ;
  };

  const renderDateRec = (params) => {
    const date = parseISO(params.value);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    return format(date, 'dd/MM/yyyy');
  };

  const columns = [
    { field: "dateRec", headerName: "Date Reclamation", flex: 1, renderCell: renderDateRec },
    { field: "user", headerName: "User", flex: 1 },
    { field: "cathegorieName", headerName: "Cathegorie", flex: 1 }, // Displaying the cathegorie name
    { field: "description", headerName: "Description", flex: 1 },
   
  ];
  if (shouldShowAddAdmin()) {
    columns.push({
    field: "button",
    headerName: "Actions",
    flex: 1.5,
    renderCell: (params) => (
      params.row.status === "en cours" && (
        <Stack direction="row" spacing={1} style={{ justifyContent: "center", fontSize: "small" }}>
          <Button
            variant="outlined"
            class="btn btn-outline-info"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/updateReclamationStat/${params.row._id}`);
            }}
            style={{ marginTop: "1vh", fontSize: "small" }}
          >
            Modifier
          </Button>
        </Stack>
      )
    ),
  })}
  return (
    <main id="reclamation" className="reclamation">
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
            ><div  style={{ marginBottom:"2vw" }}>

              {shouldShowAddAdmin() && (
                <button
                  style={{ height: "40px", width: "20vh", justifyItems: 'center', marginTop: '2vh' ,fontWeight:"bold"}}
                  onClick={handleButtonClick}
                  className="btn btn-success"
                >
                  Catégorie
                </button>
              
              )}
              
            </div>
                 <div>
                  
                 </div>
              {!isMobile ? (
                <DataGrid
                  rows={reclamations}
                  columns={columns}
                  getRowId={(row) => row.id}  
                />
              ) : (
                <Box>
                  {reclamations.map((r) => (
                    <Box key={r.id} p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20}>
                      <Typography style={{ wordBreak: 'break-word' }} variant="h6">User: {r.user}</Typography>
                      <Typography >Date Reclamation: {renderDateRec({ value: r.dateRec })}</Typography>
                      <Typography >Cathegorie: {r.cathegorieName}</Typography>
                      <Typography >Description: {r.description}</Typography>
                      {r.status === "en cours" && shouldShowAddAdmin() &&(
                        <Stack direction="row" spacing={1} style={{ justifyContent: "center", fontSize: "small" }}>
                          <Button
                            variant="outlined"
                            class="btn btn-outline-info"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/updateReclamationStat/${r._id}`);
                            }}
                            style={{ marginTop: "1vh", fontSize: "small" }}
                          >
                            Modifier
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
    </main>
  );
};

export default ReclamationsManagement;
