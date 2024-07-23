import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery,Stack ,Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../outils/Header";
import Sidebarrr from "../outils/Sidebar";
import { tokens } from "../../../theme";
import { format, isToday, parseISO } from "date-fns";
const PublicitesManagement = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [publicites, setPublicites] = useState([]);
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
    const fetchPublicites = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/publicites/publicitesManagement`,
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
          user: publicite.user?.email || "",
          espacePublicD: publicite.espacePublic?.length,
        }));
console.log(" :" ,publicitesWithDetails)
        setPublicites(publicitesWithDetails);
      } catch (error) {
      }
    };

    if (email) {
      fetchPublicites();
    }
  }, [email, tokenValue]);

  const shouldShowActionsColumn = (role, verified) => {
    return (role === 'SUPERADMIN' || role === 'ADMINPUB') && verified;
  };

  const renderDateRec = (params) => {
    const date = parseISO(params.value);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    }
    return format(date, 'dd/MM/yyyy');
  };

  const columns = [
    { field: "user", headerName: "User", flex: 1 },
    { field: "dateDebPub", headerName: "Date début", flex: 1, renderCell: renderDateRec },
    { field: "dateFinPub", headerName: "Date fin", flex: 1, renderCell: renderDateRec },
    { field: "espacePublicD", headerName: "Espace", flex: 0.5 },

    { field: "status", headerName: "Status", flex: 1 },

  ];
  if (shouldShowActionsColumn(role, verified)) {


    columns.push({
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
              navigate(`/decisionPub/${params.row._id}`);
            }}
            style={{ marginTop: '1vh', fontSize: 'small' }}
          >
            Info
          </Button>
          
         
        </Stack>
      ),
    });
  }

  return (
    <main id="publicite" className="publicite">
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
                  rows={publicites}
                  columns={columns}
                  getRowId={(row) => row.id}  style={{fontFamily: 'Constantia'}}
                />
              ) : (
                <Box>
               {publicites.map((p) => (
                    <Box key={p.id} p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20}marginLeft={"10vw"}>
                     
                      <Typography style={{fontFamily: 'Constantia'}}>Date Début: {renderDateRec({ value: p.dateDebPub })}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Date Fin: {renderDateRec({ value: p.dateFinPub })}</Typography>
                      <Typography style={{fontFamily: 'Constantia'}}>Espace: {p.espacePublicD}</Typography>

                      <Typography style={{fontFamily: 'Constantia'}}>Status: {p.status}</Typography>
                      {shouldShowActionsColumn(role, verified) && (
      <Stack direction="row" spacing={1} style={{ justifyContent: 'center', fontSize: 'small' }}>
        <Button
          variant="outlined"
          class="btn btn-outline-info"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/decisionPub/${p.id}`);
        }}
          style={{ marginTop: '1vh', fontSize: 'small' }}
        >
          Info
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

export default PublicitesManagement;
