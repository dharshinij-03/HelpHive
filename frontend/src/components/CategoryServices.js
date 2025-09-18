// src/pages/CategoryServices.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

export default function CategoryServices() {
  const { category } = useParams(); // ✅ get category from URL
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchServices = async () => {
    try {
      // ✅ Call backend category API directly
      const res = await axios.get(
        `http://localhost:5000/api/services/category/${category}`
      );
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, [category]);


  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography>Loading {category} services...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        {category} Services
      </Typography>

      {services.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          No services found in this category.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service._id}>
              <Card sx={{ minHeight: 200, p: 2 }}>
                <CardContent>
                  <Typography variant="h6">{service.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {service.description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Price:</strong> ${service.price}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location:</strong> {service.location}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#f9b233",
                      "&:hover": { backgroundColor: "#e0a020" },
                    }}
                  >
                    Book
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
