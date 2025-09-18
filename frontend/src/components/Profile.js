import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  Button,
  LinearProgress,
} from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [profileData, setProfileData] = useState(null); // <-- 'profileData' is declared here

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        try {
          const res = await axios.get(`http://localhost:5000/api/users/${user._id}`, {
            headers: { 'x-auth-token': localStorage.getItem('token') },
          });
          setProfileData(res.data); // <-- 'profileData' is assigned a value here
        } catch (error) {
          console.error('Error fetching profile data:', error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [user]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('profilePic', file);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/users/upload-profile-pic`,
        formData,
        {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      updateUser(res.data);
      setProfileData(res.data);
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error.response?.data || error.message);
      alert('Failed to upload profile picture.');
    } finally {
      setUploading(false);
      setFile(null);
    }
  };

  if (loading) {
    return <Typography>Loading profile...</Typography>;
  }

  // Use 'profileData' instead of 'user' to render information
  const displayedUser = profileData || user; 

  if (!displayedUser) {
    return <Typography>Please log in to view your profile.</Typography>;
  }

  return (
    <Container sx={{ py: 8 }}>
      <Card sx={{ maxWidth: 600, mx: 'auto', p: 3, boxShadow: 3 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {displayedUser.username}'s Profile
          </Typography>
          <Box sx={{ my: 3 }}>
            <Avatar
              alt={displayedUser.username}
              src={displayedUser.profilePic ? `http://localhost:5000${displayedUser.profilePic}` : 'https://via.placeholder.com/150'} // <-- Use `profileData.profilePic` here
              sx={{ width: 150, height: 150, mx: 'auto', border: '2px solid #fbbf24' }}
            />
          </Box>
          <Typography variant="h6">
            **Email:** {displayedUser.email}
          </Typography>
          <Typography variant="h6">
            **Role:** {displayedUser.role.charAt(0).toUpperCase() + displayedUser.role.slice(1)}
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Update Profile Picture
            </Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-pic-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="profile-pic-upload">
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: "#111827",
                  color: "#fbbf24",
                  "&:hover": { backgroundColor: "#D97706" }
                }}
              >
                Choose File
              </Button>
            </label>
            {file && <Typography sx={{ mt: 1 }}>{file.name}</Typography>}
            <Button
              variant="outlined"
              onClick={handleUpload}
              disabled={!file || uploading}
              sx={{ mt: 2, color: "#111827", borderColor: "#111827" }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
            {uploading && <LinearProgress sx={{ width: '100%', mt: 2 }} />}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}