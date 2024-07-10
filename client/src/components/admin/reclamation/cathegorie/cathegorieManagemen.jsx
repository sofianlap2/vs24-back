import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams,useNavigate } from "react-router-dom";

import { tokens } from "../../../../theme";
import Cookies from "js-cookie";
import Header from "../../outils/Header";
import Sidebarrr from "../../outils/Sidebar";
const CathegorieManagement = () => {
  const { email } = useParams();
  const tokenValue = Cookies.get("token");
  const [cathegories, setCathegories] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setUserRole] = useState("");
  const [verified, setVerified] = useState();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


  const isRequestResetPasswordPage =
    location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";

  const shouldShowHeader =
    !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
  }, [tokenValue]);
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
  }, [tokenValue]);


 
  const handleButtonClick = () => {
    navigate(`/addCathegorie/${window.btoa(email)}`);
  };
  useEffect(() => {
    const fetchCathegories = async () => {
      try {
        const response = await axios.get(
          `${appUrl}/cathegories/${window.atob(
            email
          )}/cathegorieManagement`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          }
        );
        setCathegories(response.data);
      } catch (error) {
      }
    };

    if (email) {
      fetchCathegories();
    }
  }, [email, tokenValue]);
  const shouldShowAddAdmin = (role,verified) => {
    return role === 'SUPERADMIN' && verified === true ;
  };
  const columns = [
    { field: "name", headerName: "Cathégorie", flex: 1 },
   

  ];

  return (
    <main id="cathegories" className="cathegories">
      {shouldShowHeader && <Header />}
      <div style={{ display: 'flex' }}>
        {shouldShowHeader && <Sidebarrr />}
        <div className="row">
          <div style={{ width: "100%" }}>
            <Box
              m="11vh 10vw 0 25vw"
              height="80vh"
              width="60vw"
              sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .name-column--cell": { color: colors.greenAccent[300] },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
              }}
            >
              {!isMobile ? (
                <DataGrid
                  rows={cathegories}
                  columns={columns}
                  checkboxSelection
                  getRowId={(row) => row.name}  style={{fontFamily: 'Constantia'}}
                />
              ) : (
                <Box>
                  

                  {cathegories.map((cathegorie) => (
                    <Box
                      key={cathegorie.id}
                      p={2}
                      mb={2}
                      bgcolor={"transparent"}
                      borderRadius="8px"
                      boxShadow={20}
                      marginTop={"2vh"}
                    >
                      <Typography  style={{fontFamily: 'Constantia'}} variant="h6">{cathegorie.name}</Typography>

                    </Box>
                  ))}
                </Box>
              )}
               {shouldShowAddAdmin(role,verified) && (
                <button
                style={{ height: "40px", width: "20vh", justifyItems: 'center', marginTop: '2vh' }}
                onClick={handleButtonClick}
                className="btn btn-success"
              >
                Add Cathégorie
              </button>)
}
            </Box>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CathegorieManagement;
