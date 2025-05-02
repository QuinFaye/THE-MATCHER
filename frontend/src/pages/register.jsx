import React, { useState } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Box, useMediaQuery } from '@mui/material';
import { registerUser } from '../services/api';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    title: '',
    matric_number: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

         // Makes a copy of the form data so we can tweak it
  const cleanedData = { ...formData };

  if (formData.role === 'student') {
    delete cleanedData.title; // not needed for students
  } else if (formData.role === 'supervisor') {
    delete cleanedData.matric_number; // not needed for supervisors
  }

  console.log("Sending cleaned data:", cleanedData);

    try {
      await registerUser(cleanedData);
      navigate('/student_dashb');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
      console.error("Backend error:", err.response?.data); // For debugging
    }
  };

  const isStudent = formData.role === 'student';
  const isSupervisor = formData.role === 'supervisor';

  return (
    
    <Container maxWidth="sm" sx={{ mt: 8 }}>

               {/* 🎨 Blurred Circles */}
                  <Box
                  //top left circle 
                    sx={{
                      position: 'absolute',
                      width: isMobile ? 350: 500, //first for mobile, 500 for desktop
                      height: isMobile ? 350: 500,
                      borderRadius: '50%',
                      filter: isMobile ? 'blur(110px)' : 'blur(100px)',
                      zIndex: -1,
                      backgroundColor: isMobile ? '#39B027' : '#39B027',
                      top: isMobile ? -150 : -250,
                      left: isMobile ? -150 :-250,
                    }}
                  />
                  <Box
                  //top right circle
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
                      display: { xs: 'block', sm: 'block', md: 'block' }
                    }}
                  />
                  <Box
                  //bottom left circle - hides in mobile
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
                  //bottom right circle - shows in mobile
                    sx={{
                      position: 'absolute',
                      width: isMobile ? 300 : 500,
                      height:  isMobile ? 300 : 500,
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
        sx={{
          p: 8,
          pt: 4,
          display: isMobile ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: 15,
        }}
      >

      <Typography variant="h5"
      sx={{ 
        fontWeight: 900,
        fontSize: '20px',
        mt: 4,
        mb: -2,
       }}
       gutterBottom>
        CREATE YOUR ACCOUNT</Typography>

      {error && <Typography color="error"> {error} </Typography>}
      
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
          label="First Name"
          name="first_name"
          fullWidth
          InputProps={{
            sx: {
              color: 'white',
            },
          }}
          required
          margin="normal"
          value={formData.first_name}
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Last Name"
          name="last_name"
          fullWidth
          required
          margin="normal"
          value={formData.last_name}
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          select
          label="Role"
          name="role"
          fullWidth
          required
          margin="normal"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="supervisor">Supervisor</MenuItem>
        </TextField>

        {isStudent && (
          <TextField
            variant="standard"
            label="Matric Number"
            name="matric_number"
            fullWidth
            required
            margin="normal"
            value={formData.matric_number}
            onChange={handleChange}
          />
        )}

        {isSupervisor && (
          <TextField
            select
            variant="standard"
            label="Title"
            name="title"
            fullWidth
            required
            margin="normal"
            value={formData.title}
            onChange={handleChange}
          >
            <MenuItem value="professor">Professor</MenuItem>
            <MenuItem value="doctor">Doctor</MenuItem>
            <MenuItem value="mr">Mr</MenuItem>
            <MenuItem value="mrs">Mrs</MenuItem>
          </TextField>
        )}

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

        <Button type="submit" variant="contained" color="primary" 
        sx={{ 
          mt: 7,
          width: '100%',
          borderRadius: '30px',
          fontWeight: 700,
          fontSize: '16px',
        }}>
          Sign Up
        </Button>
      </Box>
      <Typography variant="body2" 
        sx={{
           mt: 4,
           mb: -4,
       }}>
        Already have an account? <a href="/login">Login</a>
      </Typography>
      </Box>

      {/* 🎨 Mobile Login Form */}
      <Box
        sx={{
          p: 8,
          pt: 4,
          display: isMobile ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

      <Typography variant="h5"
      sx={{ 
        fontWeight: 900,
        fontSize: '20px',
        mt: -3,
        mb: 4,
       }}
       gutterBottom>
        CREATE YOUR ACCOUNT</Typography>

      {error && <Typography color="error"> {error} </Typography>}
      
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
          label="First Name"
          name="first_name"
          fullWidth
          InputProps={{
            sx: {
              color: 'white',
            },
          }}
          required
          margin="normal"
          value={formData.first_name}
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          label="Last Name"
          name="last_name"
          fullWidth
          required
          margin="normal"
          value={formData.last_name}
          onChange={handleChange}
        />
        <TextField
          variant="standard"
          select
          label="Role"
          name="role"
          fullWidth
          required
          margin="normal"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="supervisor">Supervisor</MenuItem>
        </TextField>

        {isStudent && (
          <TextField
            variant="standard"
            label="Matric Number"
            name="matric_number"
            fullWidth
            required
            margin="normal"
            value={formData.matric_number}
            onChange={handleChange}
          />
        )}

        {isSupervisor && (
          <TextField
            select
            variant="standard"
            label="Title"
            name="title"
            fullWidth
            required
            margin="normal"
            value={formData.title}
            onChange={handleChange}
          >
            <MenuItem value="professor">Professor</MenuItem>
            <MenuItem value="doctor">Doctor</MenuItem>
            <MenuItem value="mr">Mr</MenuItem>
            <MenuItem value="mrs">Mrs</MenuItem>
          </TextField>
        )}

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

        <Button type="submit" variant="contained" color="primary" 
        sx={{ 
          mt: 10,
          width: '100%',
          borderRadius: '30px',
          fontWeight: 700,
          fontSize: '16px',
        }}>
          Sign Up
        </Button>
      </Box>
      <Typography variant="body2" 
        sx={{
           mt: 5
       }}>
        Already have an account? <a href="/login" style={{ textDecoration: "none" }} >Login</a>
      </Typography>
      </Box>

    </Container>
  );
};

export default RegisterPage;
