import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Lock as LockIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import MainLayout from "../../components/layouts/MainLayout";

// Tabs Panel Component
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  // Profile Information
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
  });

  // Password change states
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    // In a real app, fetch user data from API
    // For demo, use mock data
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock user data
        const userData = {
          name: "Amit Patel",
          email: "amit.patel@example.com",
          phone: "+91 9876543210",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        };

        setProfileData(userData);
        setEditFormData({
          name: userData.name,
          phone: userData.phone,
        });
      } catch (error) {
        toast.error("Failed to load profile data");
        // If not authenticated, redirect to login
        navigate("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle profile edit
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit, reset form data
      setEditFormData({
        name: profileData.name,
        phone: profileData.phone,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);

      // Validate form
      if (!editFormData.name.trim()) {
        toast.error("Name cannot be empty");
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Update local state
      setProfileData({
        ...profileData,
        name: editFormData.name,
        phone: editFormData.phone,
      });

      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });

    // Clear error when typing
    if (passwordError) setPasswordError("");
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password);
  };

  const handlePasswordUpdate = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    // Validate
    if (!currentPassword) {
      setPasswordError("Current password is required");
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters and contain at least one number"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setIsChangingPassword(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success("Password changed successfully");
    } catch (error) {
      setPasswordError("Failed to change password. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (loading && !profileData.name) {
    return (
      <MainLayout>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "60vh",
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
          {/* Profile Header */}
          <Box
            sx={{
              p: 4,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <Avatar
              src={profileData.avatar}
              alt={profileData.name}
              sx={{ width: 100, height: 100, border: "3px solid white" }}
            />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {profileData.name}
              </Typography>
              <Typography variant="body1">{profileData.email}</Typography>
            </Box>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile tabs"
              variant="fullWidth"
            >
              <Tab
                label="Profile Information"
                id="profile-tab-0"
                aria-controls="profile-tabpanel-0"
              />
              <Tab
                label="Change Password"
                id="profile-tab-1"
                aria-controls="profile-tabpanel-1"
              />
            </Tabs>
          </Box>

          {/* Profile Information Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ position: "relative" }}>
              <Button
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                color={isEditing ? "primary" : "secondary"}
                variant={isEditing ? "contained" : "outlined"}
                onClick={isEditing ? handleProfileUpdate : handleEditToggle}
                sx={{ position: "absolute", right: 0, top: 0 }}
                disabled={loading}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>

              {isEditing ? (
                <Box component="form" sx={{ mt: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditFormChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={profileData.email}
                        disabled
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailIcon />
                            </InputAdornment>
                          ),
                        }}
                        helperText="Email cannot be changed"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleEditFormChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 2,
                          mt: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={handleEditToggle}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleProfileUpdate}
                          disabled={loading}
                        >
                          {loading ? (
                            <CircularProgress size={24} />
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box sx={{ mt: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Full Name
                        </Typography>
                        <Typography variant="h6">{profileData.name}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Email Address
                        </Typography>
                        <Typography variant="h6">
                          {profileData.email}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Phone Number
                        </Typography>
                        <Typography variant="h6">
                          {profileData.phone}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Account Type
                        </Typography>
                        <Typography variant="h6">Standard User</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Account Security
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<LockIcon />}
                      onClick={() => setTabValue(1)}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </TabPanel>

          {/* Change Password Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>
              Change Your Password
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              To change your password, first enter your current password, then
              create a new password.
            </Typography>

            {passwordError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {passwordError}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          edge="end"
                        >
                          {showCurrentPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
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
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="text.secondary">
                  Password must be at least 8 characters long and contain at
                  least one number.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePasswordUpdate}
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default Profile;
