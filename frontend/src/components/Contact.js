import React from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";

export default function Contact() {
  return (
    <Container sx={{ py: 6 }}>
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        Contact Us
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        textAlign="center"
        sx={{ maxWidth: "700px", mx: "auto", mb: 4 }}
      >
        Have questions or need help? Get in touch with us, and we’ll respond as
        soon as possible.
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Send us a message
              </Typography>
              <form>
                <TextField
                  label="Your Name"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  required
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#f4c859ff",
                    color: "#111827",
                    "&:hover": { backgroundColor: "#d9a900" },
                  }}
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Our Contact Information
              </Typography>
              <Typography>
                📍 Address: 123 HelpHive Street, Chennai, India
              </Typography>
              <Typography>📞 Phone: +91 98765 43210</Typography>
              <Typography>✉️ Email: support@helphive.com</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
