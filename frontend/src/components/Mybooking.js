// src/components/MyBookings.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
} from '@mui/material';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scheduleDate, setScheduleDate] = useState(""); // store selected date
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        navigate('/login');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
          headers: {
            'x-auth-token': token,
          },
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, [navigate]);

  // Cancel booking
  const handleCancelBooking = async (bookingId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      alert('Booking cancelled successfully!');
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error('Error cancelling booking:', error.response?.data || error.message);
      alert('Failed to cancel booking.');
    }
  };

  // Schedule booking
  const handleSchedule = async (bookingId) => {
    const token = localStorage.getItem('token');
    if (!scheduleDate) {
      alert("Please select a date and time first!");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/schedule`,
        { date: scheduleDate },
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      alert('Booking scheduled successfully!');
      setBookings(
        bookings.map((b) => (b._id === bookingId ? response.data : b))
      );
    } catch (error) {
      console.error('Error scheduling booking:', error.response?.data || error.message);
      alert('Failed to schedule booking.');
    }
  };

  // Pay for booking
  const handlePayment = async (bookingId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}/pay`,
        {},
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      alert('Payment successful!');
      setBookings(
        bookings.map((b) => (b._id === bookingId ? response.data.booking : b))
      );
    } catch (error) {
      console.error('Error processing payment:', error.response?.data || error.message);
      alert('Payment failed.');
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Loading your bookings...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        My Booked Services
      </Typography>
      <Grid container spacing={3}>
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Grid item xs={12} key={booking._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{booking.service.title}</Typography>
                  <Typography color="text.secondary">
                    Helper: {booking.helper.username}
                  </Typography>
                  <Typography color="text.secondary">
                    Status: {booking.status}
                  </Typography>
                  <Typography color="text.secondary">
                    Scheduled Date:{" "}
                    {booking.scheduledDate
                      ? new Date(booking.scheduledDate).toLocaleString()
                      : "Not scheduled"}
                  </Typography>
                  <Typography color="text.secondary">
                    Payment Status: {booking.paymentStatus}
                  </Typography>

                  {/* DateTime Picker */}
                  <TextField
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    sx={{ mt: 2, mr: 2 }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2, mr: 2 }}
                    onClick={() => handleSchedule(booking._id)}
                  >
                    Schedule
                  </Button>

                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ mt: 2, mr: 2 }}
                    disabled={booking.paymentStatus === "paid"}
                    onClick={() => handlePayment(booking._id)}
                  >
                    {booking.paymentStatus === "paid" ? "Paid" : "Pay Now"}
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ mt: 2 }}
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    Cancel Booking
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 4, ml: 4 }}>
            You have no booked services.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
