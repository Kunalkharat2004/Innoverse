import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading, initialized } = useUser();
  const location = useLocation();

  // If authentication hasn't been checked yet, show loading
  if (loading || !initialized) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If admin route and user is not admin, redirect to home
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // If authenticated (and admin if required), render the outlet
  return <Outlet />;
};

export default ProtectedRoute;
