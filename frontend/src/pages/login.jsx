import React, { useState, useContext } from 'react';
import { Container, TextField, Button, Typography, Box, useMediaQuery } from '@mui/material';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(formData);
      if (typeof login === 'function') {
        login(response.data.user, response.data.token);
      } else {
        console.warn("AuthContext.login is not defined");
      }
      navigate('/student_dashb');
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        if (data.detail) {
          setError(data.detail);
        } else if (typeof data === 'object') {
          const firstKey = Object.keys(data)[0];
          setError(data[firstKey]);
        } else {
          setError('Login failed');
        }
      } else {
        setError('Network error or server not reachable');
      }

      if (process.env.NODE_ENV === 'development') {
        console.error("Login error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      {/* 🎨 Blurred Circles */}
      <Box
        sx={{
          position: 'absolute',
          width: isMobile ? 350 : 500,
          height: isMobile ? 350 : 500,
          borderRadius: '50%',
          filter: isMobile ? 'blur(110px)' : 'blur(100px)',
          zIndex: -1,
          backgroundColor: '#39B027',
          top: isMobile ? -150 : -250,
          left: isMobile ? -150 : -250,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: isMobile ? 200 : 300,
          height: isMobile ? 200 : 300,
          borderRadius: '50%',
          filter: isMobile ? 'blur(80px)' : 'blur(100px)',
          zIndex: -1,
          backgroundColor: isMobile ? "#377531" : '#341566',
          top: isMobile ? 150 : -100,
          right: -100,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 340,
          height: 340,
          borderRadius: '50%',
          filter: 'blur(110px)',
          zIndex: -1,
          backgroundColor: '#853F9B',
          bottom: -120,
          left: 150,
          display: { xs: 'none', sm: 'none', md: 'block' }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: isMobile ? 300 : 500,
          height: isMobile ? 300 : 500,
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: -1,
          backgroundColor: isMobile ? '#853F9B' : '#377531',
          bottom: isMobile ? -100 : -200,
          right: isMobile ? -50 : -200,
        }}
      />

      {/* 🎨 Login Form */}
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          display: isMobile ? 'none' : 'flex',
          p: 6,
          mt: 20,
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: 10,
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

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            variant="standard"
            label="Email"
            name="email"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="standard"
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <Typography variant="body2" sx={{ mt: 3 }}>
            <Link to="/" style={{ textDecoration: "none" }}>Forgot Password?</Link>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 5, width: '100%', borderRadius: '30px', fontWeight: 700 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Don't have an account? <Link to="/register" style={{ textDecoration: "none" }}>Register</Link>
        </Typography>
      </Box>

      {/* 🎨 Mobile Login Form */}
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          display: isMobile ? 'flex' : 'none',
          p: 6,
          mt: 8,
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4"
          sx={{
            mt: 5,
            mb: 15,
            fontSize: '1.7rem',
          }}
        >
          <Box component="span" sx={{ fontWeight: 500, color: 'black' }}>
            THE{' '}
          </Box>
          <Box component="span" sx={{ fontWeight: 900, color: '#5900E7' }}>
            MATCHER
          </Box>
        </Typography>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            variant="standard"
            label="Email"
            name="email"
            fullWidth
            required
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="standard"
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <Typography variant="body2" sx={{ mt: 3 }}>
            <Link to="/" style={{ textDecoration: "none" }}>Forgot Password?</Link>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: "20%", width: '100%', borderRadius: '30px', fontWeight: 700 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 8, mb: 2 }}>
          Don't have an account? <Link to="/register" style={{ textDecoration: "none" }}>Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
