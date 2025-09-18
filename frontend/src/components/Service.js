// src/components/Service.js
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ import auth context

export default function Service() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // ✅ get logged in user
  const navigate = useNavigate();

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Book a service (only for customers)
  const handleBookService = async (serviceId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book a service.");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/services/book/${serviceId}`,
        {},
        { headers: { "x-auth-token": token } }
      );
      alert("Service booked successfully!");
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      alert("Failed to book service.");
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h6">Loading services...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Available Services
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Choose from a variety of trusted helpers at your fingertips.
        </Typography>
      </Box>

      {/* Services Grid */}
      <Grid container spacing={4} justifyContent="center">
        {services.length > 0 ? (
          services.map((service) => (
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
                    <strong>Posted by:</strong> {service.user?.username || "Unknown"}
                  </Typography>
                </CardContent>

                {/* Show BOOK NOW only if user is a customer */}
                {user?.role === "customer" && (
                  <CardActions sx={{ justifyContent: "center", mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#f9b233",
                        "&:hover": { backgroundColor: "#e0a020" },
                        fontWeight: "bold",
                        width: "100%",
                      }}
                      onClick={() => handleBookService(service._id)}
                    >
                      BOOK NOW
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mt: 4, width: "100%", textAlign: "center" }}
          >
            No services available at the moment.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
