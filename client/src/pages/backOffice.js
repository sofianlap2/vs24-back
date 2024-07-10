// BackOffice.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "../components/backOffice/global/Topbar";
import Sidebarr from "../components/backOffice/global/Sidebara";

import Dashboard from "../components/backOffice/dashboard/index";
import Sidebar from "../components/outils/Sidebar";

const BackOffice = () => {
  const [theme, colorMode] = useMode();
 

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="backOffice">
       
          <Headers />
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default BackOffice;
