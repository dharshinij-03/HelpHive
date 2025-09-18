// src/components/Register.js

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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      );

      // Extract the necessary data from the response
      const { username, token, role } = response.data;

      // Use the login function to set the global user state and local storage
      login(username, token, role);

      alert("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.msg || "Registration failed. Please try again.");
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
            Create an Account
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="username"
              fullWidth
              margin="normal"
              required
              value={formData.username}
              onChange={handleChange}
            />
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
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              margin="normal"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">I am a...</InputLabel>
              <Select
                labelId="role-select-label"
                value={formData.role}
                label="I am a..."
                onChange={handleChange}
                name="role"
              >
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="helper">Helper</MenuItem>
              </Select>
            </FormControl>
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
              Register
            </Button>

            <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Login here
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}