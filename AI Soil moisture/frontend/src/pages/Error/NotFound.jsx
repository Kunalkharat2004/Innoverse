import React from "react";
import { Link } from "react-router-dom";
import { Container, Box, Typography, Button, Paper } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          mt: 10,
          p: 5,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h1"
            color="primary"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "6rem", md: "10rem" },
              lineHeight: 1,
            }}
          >
            404
          </Typography>

          <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
            Page Not Found
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Oops! The page you are looking for doesn't exist or has been moved.
          </Typography>

          <img
            src="/images/404.svg"
            alt="404 Illustration"
            style={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: "300px",
              marginBottom: "20px",
            }}
            onError={(e) => {
              // If image fails to load, don't show the image element
              e.target.style.display = "none";
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            size="large"
          >
            Go to Home
          </Button>

          <Button variant="outlined" component={Link} to="/shop" size="large">
            Browse Products
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;
