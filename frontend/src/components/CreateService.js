import React, { useState, useContext } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function CreateService() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      await axios.post('http://localhost:5000/api/services/create', formData, config);
      alert('Service created successfully!');
      navigate('/services'); // Redirect to the services page
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('Failed to create service. Please try again.');
    }
  };

  // Ensure only helpers can see this form
  if (!user || user.role !== 'helper') {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error">
          You must be a helper to create a service.
        </Typography>
        <Button onClick={() => navigate('/login')}>Login as a Helper</Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Card sx={{ maxWidth: 600, mx: 'auto', p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
            Create a New Service
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              label="Service Title"
              name="title"
              fullWidth
              margin="normal"
              required
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              label="Service Description"
              name="description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              required
              value={formData.description}
              onChange={handleChange}
            />
            <TextField
              label="Price (in USD)"
              name="price"
              type="number"
              fullWidth
              margin="normal"
              required
              value={formData.price}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                label="Category"
                onChange={handleChange}
                required
              >
                 <MenuItem value="home-repair">Home Repair</MenuItem>
                 <MenuItem value="plumbing">Plumbing</MenuItem>
                 <MenuItem value="electrical">Electrical</MenuItem>
                 <MenuItem value="cleaning">Cleaning</MenuItem>
                 <MenuItem value="gardening">Gardening</MenuItem>
                 <MenuItem value="pet-care">Pet Care</MenuItem>
                <MenuItem value="tutor">Tutor</MenuItem>
                <MenuItem value="moving">Moving & Packing</MenuItem>
                <MenuItem value="painting">Painting</MenuItem>
                <MenuItem value="carpentry">Carpentry</MenuItem>
                <MenuItem value="it-support">IT & Tech Support</MenuItem>
                 <MenuItem value="massage">Wellness & Massage</MenuItem>
                 <MenuItem value="photography">Photography</MenuItem>
                 <MenuItem value="event-planning">Event Planning</MenuItem>
                 <MenuItem value="delivery">Delivery & Errands</MenuItem>
                 <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Location"
              name="location"
              fullWidth
              margin="normal"
              required
              value={formData.location}
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
              Post Service
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}