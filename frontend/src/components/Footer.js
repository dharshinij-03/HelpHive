import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0f1724", // dark navy
        color: "#E6EEF8",
        py: { xs: 6, md: 8 },
        borderTop: "4px solid #FBBF24", // honey accent top border
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Branding + short */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: ".12rem", color: "#FBBF24" }}
            >
              HelpHive
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#C9D6E6" }}>
              A community-driven local services directory connecting people to trusted helpers —
              plumbers, electricians, tutors and more.
            </Typography>

            <Box sx={{ mt: 2 }}>
              <IconButton
                aria-label="facebook"
                href="#"
                sx={{ color: "#E6EEF8" }}
                size="large"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="twitter" href="#" sx={{ color: "#E6EEF8" }} size="large">
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="instagram"
                href="#"
                sx={{ color: "#E6EEF8" }}
                size="large"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="linkedin"
                href="#"
                sx={{ color: "#E6EEF8" }}
                size="large"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              <Link href="#" underline="hover" sx={{ color: "#C9D6E6" }}>
                Home
              </Link>
              <Link href="#" underline="hover" sx={{ color: "#C9D6E6" }}>
                Services
              </Link>
              <Link href="#" underline="hover" sx={{ color: "#C9D6E6" }}>
                Categories
              </Link>
              <Link href="#" underline="hover" sx={{ color: "#C9D6E6" }}>
                About
              </Link>
              <Link href="#" underline="hover" sx={{ color: "#C9D6E6" }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Support / Legal */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
              <Link href="#" underline="hover" sx={{ color: "#C9D6E6" }}>
                Help Center
              </Link>
              <Link href="#" underline="hover" sx={{ color: "#C9D6E6" }}>
                Privacy Policy
              </Link>
              <Link href="#" underline="hover" sx={{ color: "#C9D6E6" }}>
                Terms of Service
              </Link>
            </Box>
          </Grid>

          {/* Newsletter / Contact */}
          <Grid item xs={12} sm={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Stay updated
            </Typography>
            <Typography variant="body2" sx={{ color: "#C9D6E6", mb: 1 }}>
              Subscribe for updates on new providers and seasonal offers.
            </Typography>

            <Box component="form" sx={{ display: "flex", gap: 1, mt: 1, maxWidth: 420 }}>
              <TextField
                placeholder="Your email"
                size="small"
                variant="filled"
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: "#475569" }} />,
                  disableUnderline: true,
                }}
                sx={{
                  backgroundColor: "#0b1220",
                  borderRadius: 1,
                  input: { color: "#E6EEF8" },
                  "& .MuiFilledInput-root": { backgroundColor: "#0b1220" },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FBBF24",
                  color: "#0f1724",
                  "&:hover": { backgroundColor: "#D97706" },
                }}
              >
                Subscribe
              </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ color: "#9fb0c8" }}>
                Contact us: <Link href="mailto:hello@helphive.app">hello@helphive.app</Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* bottom row */}
        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.06)", mt: 4, pt: 3 }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="caption" sx={{ color: "#9fb0c8" }}>
                © {new Date().getFullYear()} HelpHive. All rights reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" sx={{ color: "#9fb0c8" }}>
                Built with care • Privacy-first
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
