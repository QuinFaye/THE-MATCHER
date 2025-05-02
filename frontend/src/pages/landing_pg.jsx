import React from 'react';
import { Button, Typography, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        px: 2, // for mobile padding
      }}
    >
      {/* Background Color Box BELOW everything */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          zIndex: -2,
        }}
      />

      {/* 🎨 Blurred Circles */}
      <Box
      //top left circle 
        sx={{
          position: 'absolute',
          width: isMobile ? 400: 500, //first for mobile, 500 for desktop
          height: isMobile ? 400: 500,
          borderRadius: '50%',
          filter: isMobile ? 'blur(110px)' : 'blur(100px)',
          zIndex: -1,
          backgroundColor: isMobile ? '#341566' : '#39B027',
          top: isMobile ? -150 : -250,
          left: isMobile ? -150 :-250,
        }}
      />
      <Box
      //top right circle
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: -1,
          backgroundColor: '#341566',
          top: -100,
          right: -100,
          display: { xs: 'none', sm: 'none', md: 'block' }
        }}
      />
      <Box
      //bottom left circle
        sx={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          filter: 'blur(110px)',
          zIndex: -1,
          backgroundColor: '#853F9B',
          bottom: -100,
          left: -50,
          display: { xs: 'none', sm: 'none', md: 'block' }
        }}
      />
      <Box
      //bottom right circle
        sx={{
          position: 'absolute',
          width: isMobile ? 300 : 500,
          height:  isMobile ? 300 : 500,
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: -1,
          backgroundColor: isMobile ? '#377531' : '#377531',
          bottom: isMobile ? -100 : -200,
          right: isMobile ? -100 : -200,
        }}
      />

      {/* 🎯 Main Content */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          px: 2,
        }}
      >
        {/* Left Side: THE MATCHER */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-end',
            mb: isMobile ? 4 : 0,
            pr: isMobile ? 0 : 4,
          }}
        >
          <Typography variant="h4"
            sx={{
              mt: isMobile ? '100%' : 0,
              fontSize: isMobile ? '1.7rem' : '2rem',
            }}
            >
            <Box component="span" sx={{ fontWeight: 500, color: 'black' }}>
              THE{' '}
            </Box>
            <Box component="span" sx={{ fontWeight: 900, color: '#5900E7' }}>
              MATCHER
            </Box>
          </Typography>

        </Box>

        {/* Middle Divider (desktop only) */}
        {!isMobile && (
          <Box
            sx={{
              width: '1px',
              height: '125px',
              backgroundColor: 'black',
              mx: 4,
            }}
          />
        )}

        {/* Right Side: Buttons */}
        <Box
          sx={{
            mb: isMobile ? 7 : 0,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/register')}
            sx={{ 
              mb: 3,
              height: '45px',
              width: isMobile ? '230%' : '60%',
              borderRadius: isMobile ? '25px' : '30px',
              alignSelf: isMobile ? 'center' : 'flex-start',
              ml: isMobile ? 0 : 3
            }}
          >
          <Typography
              sx={{
                fontWeight: 900,
                color: 'white',
                textTransform: 'none',
                fontSize: '20px',
              }}
          >
             Sign Up
          </Typography>
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ 
              height: '45px',
              width: isMobile ? '230%': '60%',
              borderRadius: isMobile ? '25px' : '30px',
              alignSelf: isMobile ? 'center' : 'flex-start',
              ml: isMobile ? 0 : 3
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                color: 'white',
                textTransform: 'none',
                fontSize: '20px',
              }}
            >
             Log In
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
