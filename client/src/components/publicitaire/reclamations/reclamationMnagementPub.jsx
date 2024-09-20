import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery, Container, Stack, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {  useParams, useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { tokens } from "../../../theme";
import { format, isToday, parseISO } from "date-fns";
import HeaderPub from "../outils/header/headerPub";
import SidebarPub from "../outils/sidebar/sidebarPub";

const ReclamationsManagementPub = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [reclamations, setReclamations] = useState([]);
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [role, setUserRole] = useState("");

  const handleButtonClickk = () => {
    navigate(`/pub/addReclamationPub/${window.btoa(email)}`);
  };

 
  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/reclamations/ReclamationsClient`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          }
        );

        const reclamationsWithIds = response.data.map((row) => ({
          ...row,
          id: row._id,
        }));

        const reclamationsWithDetails = reclamationsWithIds.map((reclamation) => ({
          ...reclamation,
          cathegorieName: reclamation.cathegorie?.nomCat || "",
        }));
console.log(reclamationsWithDetails);
        setReclamations(reclamationsWithDetails);
      } catch (error) {
        console.error("Failed to fetch reclamations:", error);
      }
    };

    if (email) {
      fetchReclamations();
    }
  }, [email, tokenValue]);
  
  const renderDateRec = (params) => {
    const date = parseISO(params.value);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    return format(date, 'dd/MM/yyyy');
  };

  // Define base columns without the "Actions" column
  const baseColumns = [
    { field: "dateRec", headerName: "Date Reclamation", flex: 1, renderCell: renderDateRec },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "status", headerName: "Statut", flex: 1 },
  ];

  // Check if any row has a status of "en cours"
  const hasEnCoursStatus = reclamations.some((reclamation) => reclamation.status === "en cours");

  // Add the "Actions" column if there are any "en cours" status
  const columns = hasEnCoursStatus
    ? [
        ...baseColumns,
        {
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
                    navigate(`/pub/updateReclamationPub/${params.row._id}`);
                  }}
                  style={{ marginTop: "1vh", fontSize: "small" }}
                >
                  Modifier
                </Button>
              </Stack>
            )
          ),
        },
      ]
    : baseColumns;

  return (
    <main id="reclamation" className="reclamation">
  

      <div style={{ display: "flex" }}>
   
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
                  rows={reclamations}
                  columns={columns}
                  getRowId={(row) => row.id}
                      />
              ) : (
                <Box>
                  {reclamations.map((r) => (
                    <Box
                      key={r.id}
                      p={2}
                      mb={2}
                      bgcolor={"transparent"}
                      borderRadius="8px"
                      boxShadow={20}
                      marginLeft={"10vw"}
                    >
                      <Typography style={{ fontFamily: "Constantia" }}>
                        Date Reclamation: {renderDateRec({ value: r.dateRec })}
                      </Typography>
                     
                      <Typography style={{ fontFamily: "Constantia" }}>
                        Description: {r.description}
                      </Typography>
                      <Typography style={{ fontFamily: "Constantia" }}>
                        Statut: {r.status}
                      </Typography>
                      {r.status === "en cours" && (
                        <Stack direction="row" spacing={1} style={{ justifyContent: "center", fontSize: "small" }}>
                          <Button
                            variant="outlined"
                            class="btn btn-outline-info"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/updateReclamationPub/${r._id}`);
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

              <button
                style={{
                  height: "40px",
                  width: "25vh",
                  justifyItems: "center",
                  marginTop: "2vh",
                  fontFamily: "Constantia",
                  fontWeight: "bold",
                }}
                onClick={handleButtonClickk}
                className="btn btn-success"
              >
                Add Reclamation
              </button>
            </Box>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReclamationsManagementPub;