import React from 'react';
import { Box, Button, Container, TextField, Typography, Link } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import BgImg from '../assets/regImg.jpg';

function RegisterPage() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(15, 'Username must be less than 15 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be less than 20 characters'),
  });

  const handleRegister = (values) => {
    const { username, password } = values;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      alert('User already registered');
    } else {
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful');
      navigate('/login');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${BgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            padding: 4,
            boxShadow: 3,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ touched, errors }) => (
              <Form>
                <Field
                  as={TextField}
                  name="username"
                  label="Username"
                  fullWidth
                  margin="normal"
                  error={touched.username && Boolean(errors.username)}
                  helperText={<ErrorMessage name="username" />}
                  InputProps={{
                    style: { color: "#ffffff" },
                  }}
                  InputLabelProps={{
                    style: { color: "#ffffff" },
                  }}
                />
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={touched.password && Boolean(errors.password)}
                  helperText={<ErrorMessage name="password" />}
                  InputProps={{
                    style: { color: "#ffffff" },
                  }}
                  InputLabelProps={{
                    style: { color: "#ffffff" },
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"

                  type="submit"
                  sx={{ mt: 2, backgroundColor: 'black' }}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already registered?{' '}
              <Link href="/login" sx={{ textDecoration: 'none', color: '#DFBE99' }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default RegisterPage;
