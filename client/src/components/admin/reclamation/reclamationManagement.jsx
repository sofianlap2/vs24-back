import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../outils/Header";
import Sidebarrr from "../outils/Sidebar";
import { tokens } from "../../../theme";
import { format, isToday, parseISO } from "date-fns";
const ReclamationsManagement = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [reclamations, setReclamations] = useState([]);
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
  const [verified, setVerified] = useState(false);

  const handleButtonClick = () => {
    navigate(`/cathegorieManagement/${window.btoa(email)}`);
  };
  const handleButtonClickk = () => {
    navigate(`/addReclamation/${window.btoa(email)}`);
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
  }, [tokenValue, email]);

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
  }, [tokenValue, email]);

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
          cathegorieName: reclamation.cathegorie?.name || "", // Assuming 'name' is an attribute in the Cathegorie model
        }));

        setReclamations(reclamationsWithDetails);
      } catch (error) {
      }
    };

    if (email) {
      fetchReclamations();
    }
  }, [email, tokenValue]);

  const shouldShowAddAdmin = (role, verified) => {
    return (role === 'SUPERADMIN' || role === 'ADMINCLIENT') && verified;
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

  return (
    <main id="reclamation" className="reclamation">
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
                  rows={reclamations}
                  columns={columns}
                  getRowId={(row) => row.id}  style={{fontFamily: 'Constantia'}}
                />
              ) : (
                <Box>
                  {reclamations.map((r) => (
                    <Box key={r.id} p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20}>
                      <Typography style={{fontFamily: 'Constantia'}} variant="h6">User: {r.user}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Date Reclamation: {renderDateRec({ value: r.dateRec })}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Cathegorie: {r.cathegorieName}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Description: {r.description}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
              {shouldShowAddAdmin(role, verified) && (
                <button
                  style={{ height: "40px", width: "20vh", justifyItems: 'center', marginTop: '2vh' ,fontFamily: 'Constantia',fontWeight:"bold"}}
                  onClick={handleButtonClick}
                  className="btn btn-success"
                >
                  Cathegorie
                </button>
              )}
          
            </Box>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReclamationsManagement;
