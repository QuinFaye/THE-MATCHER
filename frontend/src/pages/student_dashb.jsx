import React from 'react';
import { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Sidebar from '../components/Sidebar';


const drawerWidth = 240;

export default function StudentDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [mobileOpen, setMobileOpen] = useState(false); // react.UseState() if you dont wanna import useState from react

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
    
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#ffffff',
          color: '#000000',
        }}>

        <Toolbar 
          sx={{
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
          {isMobile && (
            // Menu Icon button for mobile view (at the left)
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon /> {/*Icon for the menu for mobile view*/}
            </IconButton>
          )}

          {/* Center (only on mobile) */}
          {isMobile && (
          <Typography variant="h6" fontWeight={700}>
            THE <Box component="span" color="#5900E7" fontWeight={900}>MATCHER</Box>
          </Typography>
           )}
          
          {/* Left: Logo or Title */}
            <Typography variant="h5" noWrap component="div" fontWeight={700} sx={{ display: { xs: 'none', sm: 'block' } }}>
               THE <Box component="span" color="#5900E7" fontWeight={900}>MATCHER</Box>
            </Typography>

          
          {/* Right: Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, }}>
          {isMobile ? (
            <IconButton color="inherit"> <AccountCircleIcon/> </IconButton>
              
          ) : (

            <>
              <IconButton color="inherit"> <NotificationsNoneIcon/> </IconButton>
              <IconButton color="inherit"> <DarkModeOutlinedIcon/> </IconButton>
            </>
          )}
        </Box>
        </Toolbar>

      </AppBar>

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />



      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: 8, // To offset the AppBar
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome, Student!
        </Typography>
        <Typography>
          Here’s your personalized dashboard. Start by selecting an option from the menu.
        </Typography>
      </Box>
    </Box>
  );
}

