import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isStudent = formData.role === 'student';
  const isSupervisor = formData.role === 'supervisor';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const parseErrors = (data) => {
    if (typeof data === 'string') return data;
    if (typeof data === 'object') {
      const messages = [];
      for (const key in data) {
        if (Array.isArray(data[key])) {
          messages.push(`${key}: ${data[key].join(' ')}`);
        } else {
          messages.push(`${key}: ${data[key]}`);
        }
      }
      return messages.join(' | ');
    }
    return 'Registration failed';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const cleanedData = { ...formData };
      if (isStudent) delete cleanedData.title;
      if (isSupervisor) delete cleanedData.matric_number;

      console.log('Sending cleaned data:', cleanedData);
      await registerUser(cleanedData);
      navigate('/student_dashb');
    } catch (err) {
      if (err.response) {
        setError(parseErrors(err.response.data));
        console.error('Backend error response:', err.response.data);
      } else if (err.request) {
        setError('No response from server. Please check your network.');
        console.error('No response received:', err.request);
      } else {
        setError('An unexpected error occurred: ' + err.message);
        console.error('Unexpected error:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
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
          backgroundColor: isMobile ? '#377531' : '#341566',
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
          display: { xs: 'none', sm: 'none', md: 'block' },
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

      {/* 🎨 Form (desktop & mobile share same content except styling) */}
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
        <Form
          formData={formData}
          isStudent={isStudent}
          isSupervisor={isSupervisor}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
          isMobile={false}
        />
      </Box>

      {/* 🎨 Mobile Form */}
      <Box
        sx={{
          p: 8,
          pt: 4,
          display: isMobile ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Form
          formData={formData}
          isStudent={isStudent}
          isSupervisor={isSupervisor}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          error={error}
          isMobile
        />
      </Box>
    </Container>
  );
};

const Form = ({
  formData,
  isStudent,
  isSupervisor,
  handleChange,
  handleSubmit,
  loading,
  error,
  isMobile,
}) => (
  <>
    <Typography
      variant="h5"
      sx={{
        fontWeight: 900,
        fontSize: '20px',
        mt: isMobile ? -3 : 4,
        mb: isMobile ? 4 : -2,
      }}
      gutterBottom
    >
      CREATE YOUR ACCOUNT
    </Typography>

    {error && (
      <Typography color="error" sx={{ mb: 2 }}>
        {error}
      </Typography>
    )}

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
          variant="standard"
          select
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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{
          mt: isMobile ? 10 : 7,
          width: '100%',
          borderRadius: '30px',
          fontWeight: 700,
          fontSize: '16px',
        }}
      >
        Sign Up
      </Button>
    </Box>

    <Typography variant="body2" sx={{ mt: isMobile ? 5 : 4 }}>
      Already have an account?{' '}
      <a href="/login" style={{ textDecoration: 'none' }}>
        Login
      </a>
    </Typography>
  </>
);

export default RegisterPage;
