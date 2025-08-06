import React, { useContext } from 'react';
import { Box, Drawer, Avatar, Typography, Divider, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../context/AuthContext'; // import AuthContext

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle, isMobile }) => {
  const { user, logout } = useContext(AuthContext); // get user and logout from context

  const drawerContent = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ backgroundColor: '#1f1f1fff', color: '#fff' }}
    >
      {/* Collapse button for mobile */}
      {isMobile && (
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}

      {/* SECTION 1: Profile Info */}
      <Box
        sx={{
          display: 'flex',
          mt: 3.5,
          alignItems: 'center',
          justifyContent: isMobile ? 'flex-start' : 'center',
          flexDirection: isMobile ? 'row' : 'column',
          textAlign: isMobile ? 'left' : 'center',
          gap: isMobile ? 2 : 0,
          mb: -2,
        }}
      >
        <Avatar sx={{ width: 70, height: 70, m: 1.8 }} />
        <Box sx={{ mb: 0.5 }}>
          <Typography fontWeight={600}>
            {user?.name
              ? user.name
              : 'George Bush' /* Fallback to previous static name */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.role
              ? user.role
              : 'Student' /* Fallback to previous static role */}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 0.5, mt: -5, color: '#737373ff' }} />

      {/* SECTION 2: Main Nav */}
      <Box sx={{ mt: -9.5, mb: 8 }}>
        <List>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Resources" />
          </ListItemButton>
        </List>
      </Box>

      <Divider sx={{ my: 2, mb: -5 }} />

      {/* SECTION 3: Settings & Support */}
      <Box sx={{ mt: -4, mb: -9 }}>
        <List>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>
        </List>
      </Box>

      <Divider sx={{ mb: -5 }} />

      {/* SECTION 4: Logout */}
      <Box sx={{ mt: -5 }}>
        <List>
          <ListItemButton onClick={logout} sx={{ cursor: 'pointer' }}>
            <ListItemIcon sx={{ color: 'inherit' }}>
              <LogoutIcon sx={{ fontWeight: 'bold' }} />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ fontWeight: 'bold' }}
            />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: '100%',
              height: '100%',
              backgroundColor: '#fff',
              color: '#000',
              p: 2,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
