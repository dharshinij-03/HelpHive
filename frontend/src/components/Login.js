// src/components/Login.js

import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      // Destructure the role from the response
      const { username, token, role } = response.data;

      // Pass the username, token, and role to the login function
      login(username, token, role);

      alert("Login successful!");
      navigate('/');
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.msg || "Login failed.");
    }
  };

  return (
    <Container sx={{ py: 8 }}>
      <Card sx={{ maxWidth: 450, mx: "auto", p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Login to Your Account
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "#f4c859ff",
                color: "#111827",
                "&:hover": { backgroundColor: "#d9a900" },
              }}
            >
              Login
            </Button>

            <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link href="/register" underline="hover">
                Register here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}