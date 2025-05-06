import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { LockReset as LockResetIcon } from "@mui/icons-material";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // In a real app, this would call your API
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, we'll just simulate a successful response
      // if (!response.ok) throw new Error('Failed to send reset link');

      setIsSuccess(true);
      toast.success("Password reset link has been sent to your email");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
      toast.error("Failed to send reset link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            Forgot Password
          </Typography>

          {!isSuccess ? (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 1, mb: 3 }}
              >
                Enter your email address and we'll send you a link to reset your
                password.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, width: "100%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                  error={!!error}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </Box>
            </>
          ) : (
            <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
              We've sent a password reset link to {email}. Please check your
              inbox and follow the instructions to reset your password.
            </Alert>
          )}

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Link to="/auth/login" style={{ textDecoration: "none" }}>
              <Button variant="text">Back to Login</Button>
            </Link>
            <Link to="/auth/register" style={{ textDecoration: "none" }}>
              <Button variant="text">Create Account</Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;
