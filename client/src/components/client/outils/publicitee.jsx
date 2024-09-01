import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { format, parseISO } from "date-fns";
import { tokens } from "../../../theme";
import SidebarClient from "../outils/sidebar/sidebarClient";
import HeaderClient from "../outils/header/headerClient";

const Publicitee = () => {
  const { email } = useParams();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [publicites, setPublicites] = useState([]);
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



  useEffect(() => {
    const fetchPublicites = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/espacePublic/ClientespacePubliciteManagemenet`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        console.log("Response data:", response.data); // Ajoutez ce log pour inspecter la réponse

        const publicitesWithIds = response.data.map((row) => ({
          ...row,
          id: row._id, // Assuming _id is the unique identifier
        }));
        const publicitesWithDetails = publicitesWithIds.map((publicite) => ({
            ...publicite,
            user: publicite.user && publicite.user.email ? publicite.user.email : "No User",
          }));
        setPublicites(publicitesWithDetails);
      } catch (error) {
        console.error("Failed to fetch publicites:", error);
      }
    };

    if (email) {
      fetchPublicites();
    }
  }, [email, tokenValue, appUrl]);

  const renderDateRec = (params) => {
    const date = parseISO(params.value);
    return format(date, 'dd/MM/yyyy');
  };

  const columns = [
    { field: "dateDebPub", headerName: "Date début", flex: 1, renderCell: renderDateRec },
    { field: "dateFinPub", headerName: "Date fin", flex: 1, renderCell: renderDateRec },
    { field: "user", headerName: "Publicitaire", flex: 1 },
  ];

  return (
    <main id="publicite" className="publicite">
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
                  rows={publicites}
                  columns={columns}
                  getRowId={(row) => row.id}
                  style={{ fontFamily: 'Constantia' }}
                />
              ) : (
                <Box>
                  {publicites.map((p) => (
                    <Box key={p.id} p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20} marginLeft={"10vw"}>
                      <Typography style={{ fontFamily: 'Constantia' }}>Date Début: {renderDateRec({ value: p.dateDebPub })}</Typography>
                      <Typography style={{ fontFamily: 'Constantia' }}>Date Fin: {renderDateRec({ value: p.dateFinPub })}</Typography>
                      <Typography style={{fontFamily: 'Constantia' ,wordWrap: 'break-word',overflow: 'hidden',textOverflow: 'ellipsis',}}>User: {p.user}</Typography>
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

export default Publicitee;