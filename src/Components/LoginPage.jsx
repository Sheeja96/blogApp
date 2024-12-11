import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Img from './assets/b4.jpg'
function LoginPage() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username should be at least 3 characters")
      .max(15, "Maximum of 15 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password should be at least 3 characters")
      .max(15, "Maximum of 15 characters"),
  });

  const handleLogin = (values) => {
    const { username, password } = values;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/add");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${Img})`, 
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          p: 4,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#ffffff", fontWeight: "bold" }}
        >
          Login
        </Typography>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ touched, errors }) => (
            <Form>
              <Field
                as={TextField}
                name="username"
                label="Username"
                fullWidth
                variant="outlined"
                margin="normal"
                helperText={<ErrorMessage name="username" />}
                error={touched.username && Boolean(errors.username)}
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
                variant="outlined"
                margin="normal"
                helperText={<ErrorMessage name="password" />}
                error={touched.password && Boolean(errors.password)}
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
                sx={{
                  mt: 2,
                  backgroundColor: "#151414",
                  "&:hover": {
                    backgroundColor: "#0b57e4",
                  },
                  fontWeight: "bold",
                }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <Typography
          align="center"
          sx={{ mt: 2, color: "#ffffff", fontSize: "14px" }}
        >
         New User?{" "}
          < Typography component={Link} to='/'
             
            sx={{ color: "#a8dadc", textDecoration: "none", cursor: "pointer" }}
          >
            Register
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
}

export default LoginPage;
