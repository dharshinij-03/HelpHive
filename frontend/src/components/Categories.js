// src/pages/Categories.js
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ComputerIcon from "@mui/icons-material/Computer";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PetsIcon from "@mui/icons-material/Pets";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BrushIcon from "@mui/icons-material/Brush";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import SpaIcon from "@mui/icons-material/Spa";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EventIcon from "@mui/icons-material/Event";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import YardIcon from "@mui/icons-material/Yard";

const categories = [
  { title: "Home Repair", value: "home-repair", desc: "Fixes & repairs", icon: <HomeRepairServiceIcon fontSize="large" color="primary" /> },
  { title: "Plumbing", value: "plumbing", desc: "Pipes & leaks", icon: <BuildIcon fontSize="large" color="primary" /> },
  { title: "Electrical", value: "electrical", desc: "Electrical work", icon: <ElectricBoltIcon fontSize="large" color="primary" /> },
  { title: "Cleaning", value: "cleaning", desc: "Keep your space spotless", icon: <CleaningServicesIcon fontSize="large" color="primary" /> },
  { title: "Gardening", value: "gardening", desc: "Lawn & plants care", icon: <YardIcon fontSize="large" color="primary" /> },
  { title: "Pet Care", value: "pet-care", desc: "Care for your pets", icon: <PetsIcon fontSize="large" color="primary" /> },
  { title: "Tutor", value: "tutor", desc: "Learning help", icon: <MenuBookIcon fontSize="large" color="primary" /> },
  { title: "Moving & Packing", value: "moving", desc: "Relocation help", icon: <LocalShippingIcon fontSize="large" color="primary" /> },
  { title: "Painting", value: "painting", desc: "Wall & furniture painting", icon: <BrushIcon fontSize="large" color="primary" /> },
  { title: "Carpentry", value: "carpentry", desc: "Woodwork & furniture", icon: <CarpenterIcon fontSize="large" color="primary" /> },
  { title: "IT & Tech Support", value: "it-support", desc: "Computer & network help", icon: <ComputerIcon fontSize="large" color="primary" /> },
  { title: "Wellness & Massage", value: "massage", desc: "Relaxation & therapy", icon: <SpaIcon fontSize="large" color="primary" /> },
  { title: "Photography", value: "photography", desc: "Capture moments", icon: <CameraAltIcon fontSize="large" color="primary" /> },
  { title: "Event Planning", value: "event-planning", desc: "Plan your events", icon: <EventIcon fontSize="large" color="primary" /> },
  { title: "Delivery & Errands", value: "delivery", desc: "Quick deliveries", icon: <LocalShippingIcon fontSize="large" color="primary" /> },
  { title: "Other", value: "other", desc: "Miscellaneous services", icon: <DesignServicesIcon fontSize="large" color="primary" /> },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Service Categories
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Browse by category to find the right help for you.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categories.map((cat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minHeight: 180, textAlign: "center", p: 2 }}>
              <CardContent>
                <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                  {cat.icon}
                </div>
                <Typography variant="h6" gutterBottom>
                  {cat.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {cat.desc}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#f9b233",
                    "&:hover": { backgroundColor: "#e0a020" },
                    mt: 2,
                  }}
                  onClick={() => navigate(`/services/${cat.value}`)} // ✅ link to category services
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
