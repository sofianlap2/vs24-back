import { Box, Drawer } from '@mui/material';
import SidebarItems from './SidebarItems';
import React, { useState, useEffect } from 'react';

const SidebarClient = (props) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1280); // Change 1280 to your desired width for large screens

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1280); // Change 1280 to your desired width for large screens
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sidebarWidth = '270px';

  if (isLargeScreen) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Box px={3}></Box>
            <Box >
              <SidebarItems />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box px={2}>
      </Box>
      <SidebarItems />
    </Drawer>
  );
};

export default SidebarClient;
