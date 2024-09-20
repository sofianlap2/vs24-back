import React, { useState, useEffect } from "react";
import { styled, Container, Box } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Sidebarrr from "./Sidebar";
import Header from "./Header";

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRequestResetPasswordPage = location.pathname === "/requestResetPassword";
  const isResetPasswordPage = location.pathname.includes("/resetPassword/");
  const isLoginPage = location.pathname === "/signin";
  
  const shouldShowHeader = !isLoginPage && !isRequestResetPasswordPage && !isResetPasswordPage;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get("token"); // Replace 'userCookie' with the name of your cookie
    if (!userCookie) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <MainWrapper
      className='mainwrapper'
    >
      {shouldShowHeader && <Sidebarrr
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />}
      
      <PageWrapper
        className="page-wrapper"
      >
        {shouldShowHeader && <Header
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />}
        
        <Container sx={{
          paddingTop: "20px",
          maxWidth: '1200px',
        }}>
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
