import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  LockReset as LockResetIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [tokenValid, setTokenValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would verify the token validity with the server
    // For this demo, we'll simulate a token check
    const checkToken = async () => {
      setIsLoading(true);
      try {
        // Simulate API call to verify token
        await new Promise((resolve) => setTimeout(resolve, 500));

        // For demo purposes, we'll consider the token valid if it's at least 10 chars
        const isValid = token && token.length >= 10;
        setTokenValid(isValid);
      } catch (err) {
        setTokenValid(false);
        toast.error("Invalid or expired reset token");
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [token]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (error) setError("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one number
    return password.length >= 8 && /\d/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one number"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // In a real app, this would call your API
      // const response = await fetch(`/api/auth/reset-password/${token}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ password }),
      // });

      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, we'll just simulate a successful response
      // if (!response.ok) throw new Error('Failed to reset password');

      setIsSuccess(true);
      toast.success("Password has been successfully reset");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
      toast.error("Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!tokenValid) {
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
            <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5" gutterBottom>
              Invalid Reset Link
            </Typography>
            <Alert severity="error" sx={{ width: "100%", mt: 2, mb: 2 }}>
              This password reset link is invalid or has expired.
            </Alert>
            <Button
              component={Link}
              to="/auth/forgot-password"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Request New Reset Link
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

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
            Reset Password
          </Typography>

          {!isSuccess ? (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 1, mb: 3 }}
              >
                Enter your new password below.
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
                  name="password"
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!error}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!error}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={toggleShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  Password must be at least 8 characters long and contain at
                  least one number.
                </Typography>
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
                    "Reset Password"
                  )}
                </Button>
              </Box>
            </>
          ) : (
            <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
              Your password has been successfully reset. You will be redirected
              to the login page shortly.
            </Alert>
          )}

          <Box sx={{ mt: 2 }}>
            <Link to="/auth/login" style={{ textDecoration: "none" }}>
              <Button variant="text">Back to Login</Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPasswordPage;
