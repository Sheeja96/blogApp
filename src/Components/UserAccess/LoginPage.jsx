import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
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
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Box 
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xs"
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
          sx={{ color: "#000000", fontWeight: "bold" }}
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
                  style: { color: "#000000" },
                }}
                InputLabelProps={{
                  style: { color: "#000000" },
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
                  style: { color: "#000000" },
                }}
                InputLabelProps={{
                  style: { color: "#000000" },
                }}
                
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                color="primary"
                sx={{
                  mt: 2,
                 
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
          sx={{ mt: 2, color: "#000000", fontSize: "14px" }}
        >
         New User?{" "}
          < Typography component={Link} to='/register'
             
            sx={{ color:"blue", textDecoration: "none", cursor: "pointer" }}
          >
            Register
          </Typography>
        </Typography>
      </Container>
    </Box>
  );
}

export default LoginPage;
