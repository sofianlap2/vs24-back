import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate, Outlet } from "react-router-dom";
import { Box, Typography, useTheme, useMediaQuery, Container, Stack, Button } from "@mui/material";

import HeaderPub from '../header/headerPub';
import SidebarPub from '../sidebar/sidebarPub';

const DashboardPub = () => {
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
    const isRequestResetPasswordPage = location.pathname === "/requestResetPassword";
    const isResetPasswordPage = location.pathname.includes("/resetPassword/");
    const isLoginPage = location.pathname === "/signin";
  
    const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
  
    const theme = useTheme();
  return (
    <main>
        {shouldShowHeader && (
        <HeaderPub
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />
      )}
        <div style={{ display: "flex" }}>
        {shouldShowHeader && (
          <SidebarPub
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
        )}
    </div>
    </main>
    
  )
}

export default DashboardPub
