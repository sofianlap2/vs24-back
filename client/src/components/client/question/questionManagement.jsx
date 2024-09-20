import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { tokens } from "../../../theme";

const QuestionManagementClient = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const appUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const [questions, setQuestions] = useState([]);
  const location = useLocation();
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const tokenValue = Cookies.get("token");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleButtonClickk = () => {
    navigate(`/client/addQuestion/${window.btoa(email)}`);
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
       

        
          const response = await axios.get(`${appUrl}/questions/questionManagement`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${tokenValue}`,
            },
          });

          const questionWithIds = response.data.map((row) => ({
            ...row,
            id: row._id, // Assuming _id is the unique identifier
          }));

          setQuestions(questionWithIds);
        
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (email) {
      fetchQuestions();
    }
  }, []);

  const columns = [
    { field: "question", headerName: "Question", flex: 1 },
    { field: "typeQ", headerName: "Type", flex: 1 },
    { field: "limitRep", headerName: "Limite", flex: 1 },
  ];

  return (
    <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     
      <div style={{ display: 'flex' }}>
    
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
                  rows={questions}
                  columns={columns}
                  getRowId={(row) => row.id}
                  style={{ fontFamily: 'Constantia' }}
                />
              ) : (
                <Box>
                  {questions.map((e) => (
                    <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: '20px' }} key={e.id}>
                      <Box p={2} mb={2} bgcolor={"transparent"} borderRadius="8px" boxShadow={20} marginLeft={"10vw"}>
                        <Typography style={{ fontFamily: 'Constantia' }}>Question: {e.question}</Typography>
                        <Typography style={{ fontFamily: 'Constantia' }}>Type: {e.typeQ}</Typography>
                        <Typography style={{ fontFamily: 'Constantia' }}>Limite: {e.limiteRep}</Typography>
                        <Typography style={{ fontFamily: 'Constantia' }}>Type espace: {e.typeEspace}</Typography>
                      </Box>
                    </div>
                  ))}
                </Box>
              )}
               <button
                style={{
                  height: "40px",
                  width: "25vh",
                  justifyItems: "center",
                  marginTop: "2vh",
                    fontWeight: "bold",
                }}
                onClick={handleButtonClickk}
                className="btn btn-success"
              >
                Add Question
              </button>
            </Box>
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuestionManagementClient;
