import React, { useContext } from "react";
import { Button, Typography, Box, Grid, Card, CardContent, Avatar } from "@mui/material";
import banner from "../images/homebanner.png";
import { Link } from "react-router-dom";   // ✅ corrected import
import { AuthContext } from "../context/AuthContext";  // ✅ bring user info

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 8 },
          py: { xs: 6, md: 10 },
          backgroundColor: "white",
          boxShadow: 2,
        }}
      >
        {/* Left Content */}
        <Box sx={{ flex: 1, pr: { md: 6 } }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#111827", mb: 2 }}
          >
            Find Trusted Help with{" "}
            <span style={{ color: "#D97706" }}>HelpHive</span>
          </Typography>
          <Typography variant="h6" sx={{ color: "gray", mb: 4 }}>
            From tutors to electricians – get reliable services at your
            fingertips.
          </Typography>
          <Box>
            {/* Explore Services */}
            <Button
              component={Link}
              to="/services"
              variant="contained"
              sx={{
                mr: 2,
                backgroundColor: "#D97706",
                "&:hover": { backgroundColor: "#b45309" },
              }}
            >
              Explore Services
            </Button>

            {/* Join as Helper -> smart redirect */}
            <Button
              component={Link}
              to={
                user
                  ? user.role === "helper"
                    ? "/my-services"   // already helper
                    : "/profile"      // logged in but normal user
                  : "/login"          // not logged in
              }
              variant="outlined"
              sx={{
                color: "#D97706",
                borderColor: "#D97706",
                "&:hover": { borderColor: "#b45309", color: "#b45309" },
              }}
            >
              Join as a Helper
            </Button>
          </Box>
        </Box>

        {/* Right Image */}
        <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
          <img
            src={banner}
            alt="HelpHive Banner"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 8 }, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Why Choose HelpHive?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {[
            { title: "Trusted Helpers", desc: "Verified professionals for your peace of mind." },
            { title: "Easy to Use", desc: "Find and book services in just a few clicks." },
            { title: "Community Driven", desc: "Support local helpers and grow together." },
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card sx={{ p: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">{item.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Popular Services Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 8 }, backgroundColor: "white" }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Popular Services
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {["Tutoring", "Electrician", "Designer", "Plumber"].map((service, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ p: 3, textAlign: "center", boxShadow: 2 }}>
                <Typography variant="h6" fontWeight="bold">{service}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials */}
      <Box sx={{ py: 8, px: { xs: 2, md: 8 }, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {[
            { name: "Priya", text: "HelpHive made it so easy to find a tutor for my child." },
            { name: "Arjun", text: "Booked an electrician in minutes — highly recommend!" },
          ].map((review, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ p: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography>"{review.text}"</Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Avatar sx={{ bgcolor: "#D97706", mr: 1 }}>
                      {review.name[0]}
                    </Avatar>
                    <Typography fontWeight="bold">{review.name}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          py: 6,
          px: { xs: 2, md: 8 },
          textAlign: "center",
          backgroundColor: "#D97706",
          color: "white",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Ready to get started?
        </Typography>
        <Button
          component={Link}
          to={
            user
              ? user.role === "helper"
                ? "/create-service"  // helpers add new services
                : "/services"        // normal users browse services
              : "/register"          // not logged in -> register
          }
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "#D97706",
            "&:hover": { backgroundColor: "#f9fafb" },
          }}
        >
          Join Now
        </Button>
      </Box>
    </Box>
  );
}
