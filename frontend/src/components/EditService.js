// src/pages/EditService.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function EditService() {
  const { id } = useParams(); // service ID from URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:5000/api/services/${id}`,
          { headers: { "x-auth-token": token } }
        );
        setService(response.data);
      } catch (err) {
        console.error("Error fetching service:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/services/${id}`,
        service,
        { headers: { "x-auth-token": token } }
      );
      alert("Service updated successfully!");
      navigate("/my-services");
    } catch (err) {
      console.error("Error updating service:", err.response?.data || err.message);
      alert("Failed to update service.");
    }
  };

  if (loading) return <Typography>Loading service...</Typography>;
  if (!service) return <Typography>Service not found</Typography>;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Edit Service
      </Typography>
      <Box component="form" onSubmit={handleUpdate}>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={service.title}
          onChange={(e) => setService({ ...service, title: e.target.value })}
        />
        <TextField
          fullWidth
          label="Description"
          margin="normal"
          value={service.description}
          onChange={(e) =>
            setService({ ...service, description: e.target.value })
          }
        />
        <TextField
          fullWidth
          type="number"
          label="Price"
          margin="normal"
          value={service.price}
          onChange={(e) => setService({ ...service, price: e.target.value })}
        />
        <TextField
          fullWidth
          label="Category"
          margin="normal"
          value={service.category}
          onChange={(e) => setService({ ...service, category: e.target.value })}
        />
        <TextField
          fullWidth
          label="Location"
          margin="normal"
          value={service.location}
          onChange={(e) => setService({ ...service, location: e.target.value })}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}
