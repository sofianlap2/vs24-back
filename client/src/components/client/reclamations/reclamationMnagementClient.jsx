import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery, Stack, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import HeaderClient from "../outils/header/headerClient";
import SidebarClient from "../outils/sidebar/sidebarClient";
import { tokens } from "../../../theme";
import { format, isToday, parseISO } from "date-fns";

const ReclamationsManagementClient = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [reclamations, setReclamations] = useState([]);
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

  const handleButtonClick = () => {
    navigate(`/addReclamation/${window.btoa(email)}`);
  };

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await axios.get(`${appUrl}/reclamations/ReclamationsClient`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenValue}`,
          },
        });

        const reclamationsWithDetails = response.data.map((row) => ({
          ...row,
          id: row._id,
          cathegorieName: row.cathegorie?.nomCat || "",
        }));

        setReclamations(reclamationsWithDetails);
      } catch (error) {
        console.error("Failed to fetch reclamations:", error);
      }
    };

    if (email) {
      fetchReclamations();
    }
  }, [email, tokenValue, appUrl]);

  const renderDateRec = (params) => {
    const date = parseISO(params.value);
    return isToday(date) ? format(date, "HH:mm") : format(date, "dd/MM/yyyy");
  };

  const columns = [
    { field: "dateRec", headerName: "Date Reclamation", flex: 1, renderCell: renderDateRec },
    { field: "cathegorieName", headerName: "Catégorie", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "status", headerName: "Statut", flex: 1 },
    {
      field: "button",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (params) =>
        params.row.status === "en cours" && (
          <Stack direction="row" spacing={1} style={{ justifyContent: "center", fontSize: "small" }}>
            <Button
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/updateReclamation/${params.row._id}`);
              }}
              style={{ marginTop: "1vh", fontSize: "small" }}
            >
              Modifier
            </Button>
          </Stack>
        ),
    },
  ];

  return (
    <main id="reclamation" className="reclamation">
      {shouldShowHeader && (
        <HeaderClient
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
      )}

      <div style={{ display: "flex" }}>
        {shouldShowHeader && (
          <SidebarClient
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
        )}

        <div style={{ width: "100%" }}>
          <Box
            m="5vh 10vw 0 5vw"
            height="75vh"
            width="60vw"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
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
                style={{ fontFamily: "Constantia" }}
              />
            ) : (
              <Box>
                {reclamations.map((r) => (
                  <Box key={r.id} p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20} marginLeft={"10vw"}>
                    <Typography style={{ fontFamily: "Constantia" }}>
                      Date Reclamation: {renderDateRec({ value: r.dateRec })}
                    </Typography>
                    <Typography style={{ fontFamily: "Constantia" }}>
                      Catégorie: {r.cathegorieName}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/updateReclamation/${r._id}`);
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

            <Button
              style={{
                height: "40px",
                width: "25vh",
                justifyItems: "center",
                marginTop: "2vh",
                fontFamily: "Constantia",
                fontWeight: "bold",
              }}
              onClick={handleButtonClick}
              className="btn btn-success"
            >
              Add Reclamation
            </Button>
          </Box>
        </div>
      </div>
    </main>
  );
};

export default ReclamationsManagementClient;
