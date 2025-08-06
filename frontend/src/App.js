import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing_pg';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import StudentDashboard from './pages/student_dashb';
import SupervisorDashboard from './pages/superv_dashb';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#341566',
    },
    secondary: {
      main: '#5900E7',
    },
    background: {
      default: '#262626ff',
      paper: 'rgba(255,255,255,0.3)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#6B6B6B',
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
    },
  },

  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: 'white', //the text colour
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: 'white', //the default underline
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: 'white', //hover underline
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white', //active underline, like while the person is texting and stuff
          },
          '& label': {
            color: 'white',
          },
          '& label.Mui-focused': {
            color: 'white', //focused label
          }
        }
      }
    }
  }

});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        'html, body, #root': {
          margin: 0,
          padding: 0,
          overflowX: 'hidden', // 🛑 this line hides sideways scroll
          overflowY: 'hidden', // 🛑 this line hides vertical scroll
          height: '100%', // optional but good
          width: '100%',
        },
      }} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/student_dashb" element={<StudentDashboard />} />
          <Route path="/superv_dashb" element={<SupervisorDashboard />} />
        </Routes>
       </BrowserRouter> 
    </ThemeProvider>
  );
}

export default App;
