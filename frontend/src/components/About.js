import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

export default function About() {
  return (
    <Container sx={{ py: 6 }}>
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        About HelpHive
      </Typography>

      {/* Intro */}
      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        sx={{ maxWidth: "700px", mx: "auto", mb: 4 }}
      >
        HelpHive is a community-driven platform connecting people with trusted
        helpers for everyday needs — from tutors and designers to electricians
        and cleaners. Our mission is to make finding reliable help as easy as a
        few clicks.
      </Typography>

      {/* Mission & Vision */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, minHeight: 180 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Our Mission
              </Typography>
              <Typography color="text.secondary">
                To empower individuals by connecting them with skilled helpers,
                making services accessible, reliable, and community-driven.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, minHeight: 180 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Our Vision
              </Typography>
              <Typography color="text.secondary">
                To become the most trusted platform where people exchange skills
                and services, fostering collaboration and growth.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Team Section */}
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        Meet Our Team
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {[
          { name: "Dharshini", role: "Founder & Developer" },
          { name: "Rahul", role: "UI/UX Designer" },
          { name: "Ananya", role: "Community Manager" },
        ].map((member, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ textAlign: "center", p: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "#f9b233",
                }}
              >
                {member.name[0]}
              </Avatar>
              <Typography variant="h6">{member.name}</Typography>
              <Typography color="text.secondary">{member.role}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
