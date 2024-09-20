import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery,Stack,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams,useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { tokens } from "../../../../theme";
import Cookies from "js-cookie";

const CathegorieManagement = () => {
  const { email } = useParams();
  const tokenValue = Cookies.get("token");
  const [cathegories, setCathegories] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

 
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

 
  const handleButtonClick = () => {
    navigate(`/admin/addCathegorie/${window.btoa(email)}`);
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
  const shouldShowAddAdmin = () => {
    return role === 'SUPERADMIN'  ;
  };
  const columns = [
    { field: "nomCat", headerName: "Catégorie", flex: 1 },
   

  ];
  if (shouldShowAddAdmin()) {
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
              navigate( `/admin/updateCategorie/${params.row._id}`);
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
    <main id="cathegories" className="cathegories">
      <div style={{ display: 'flex' }}>
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
                  getRowId={(row) => row.nomCat}  
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
                      <Typography   variant="h6">Catégorie: {cathegorie.nomCat}</Typography>
                      { shouldShowAddAdmin() && (<Stack direction="row" spacing={1} style={{ justifyContent: "center", fontSize: "small" }}>
                      <Button
                        variant="outlined"
                        class="btn btn-outline-info"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate( `/admin/updateCategorie/${cathegorie._id}`);
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
               {shouldShowAddAdmin() && (
                <button
                style={{  justifyItems: 'center', marginTop: '2vh' }}
                onClick={handleButtonClick}
                className="btn btn-success"
              >
                Ajouter Catégorie
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