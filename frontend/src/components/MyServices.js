// src/pages/MyServices.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';

export default function MyServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyServices = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/services/my-services', {
          headers: { 'x-auth-token': token },
        });
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error.response?.data || error.message);
        setErrorMsg("Failed to fetch your services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyServices();
  }, [navigate]);

  const handleDelete = async (serviceId) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/services/${serviceId}`, {
        headers: { 'x-auth-token': token },
      });
      setServices(services.filter(service => service._id !== serviceId));
      alert('Service deleted successfully!');
    } catch (error) {
      console.error('Error deleting service:', error.response?.data || error.message);
      alert('Failed to delete service.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Loading your services...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          My Posted Services
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage and update the services you’ve created.
        </Typography>
      </Box>

      {errorMsg && (
        <Typography color="error" textAlign="center" sx={{ mb: 4 }}>
          {errorMsg}
        </Typography>
      )}

      <Grid container spacing={3}>
        {services.length > 0 ? (
          services.map(service => (
            <Grid item xs={12} sm={6} md={4} key={service._id}>
              <Card
                sx={{
                  minHeight: 250,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="medium">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {service.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Price:</strong> ${service.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Location:</strong> {service.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {service.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Created At:</strong> {new Date(service.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/edit-service/${service._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 4, width: "100%", textAlign: "center" }}>
            You have not posted any services yet.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
