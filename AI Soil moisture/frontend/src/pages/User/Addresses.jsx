import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  Apartment as ApartmentIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import MainLayout from "../../components/layouts/MainLayout";
import { useUser } from "../../context/UserContext";

const addressTypes = [
  { value: "home", label: "Home", icon: <HomeIcon /> },
  { value: "work", label: "Work", icon: <BusinessIcon /> },
  { value: "other", label: "Other", icon: <ApartmentIcon /> },
];

const initialFormState = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  phone: "",
  type: "home",
  isDefault: false,
};

const Addresses = () => {
  const { isAuthenticated } = useUser();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // In a real app, fetch addresses from API
    // For demo, use mock data
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock addresses data
        const mockAddresses = [
          {
            id: "addr-1",
            fullName: "Amit Patel",
            addressLine1: "123, Green Avenue",
            addressLine2: "Near City Park",
            city: "Mumbai",
            state: "Maharashtra",
            postalCode: "400001",
            country: "India",
            phone: "+91 9876543210",
            type: "home",
            isDefault: true,
          },
          {
            id: "addr-2",
            fullName: "Amit Patel",
            addressLine1: "456, Tech Park, Building B",
            addressLine2: "Whitefield",
            city: "Bangalore",
            state: "Karnataka",
            postalCode: "560066",
            country: "India",
            phone: "+91 9876543210",
            type: "work",
            isDefault: false,
          },
        ];

        setAddresses(mockAddresses);
      } catch (error) {
        toast.error("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAddresses();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleOpenDialog = (address = null) => {
    if (address) {
      setFormData({ ...address });
      setEditingAddressId(address.id);
    } else {
      setFormData(initialFormState);
      setEditingAddressId(null);
    }
    setValidationErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      "fullName",
      "addressLine1",
      "city",
      "state",
      "postalCode",
      "country",
      "phone",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        errors[field] = "This field is required";
      }
    });

    // Validate postal code format (simple numeric check)
    if (formData.postalCode && !/^\d+$/.test(formData.postalCode)) {
      errors.postalCode = "Please enter a valid postal code";
    }

    // Validate phone format (simple check)
    if (formData.phone && !/^[+\d\s-]+$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // In a real app, this would be an API call
    if (editingAddressId) {
      // Update existing address
      const updatedAddresses = addresses.map((addr) =>
        addr.id === editingAddressId
          ? { ...formData, id: editingAddressId }
          : addr
      );

      // If this is being set as default, update other addresses
      if (formData.isDefault) {
        updatedAddresses.forEach((addr) => {
          if (addr.id !== editingAddressId) {
            addr.isDefault = false;
          }
        });
      }

      setAddresses(updatedAddresses);
      toast.success("Address updated successfully");
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: `addr-${Date.now()}`,
      };

      // If this is being set as default or it's the first address, update other addresses
      if (newAddress.isDefault || addresses.length === 0) {
        newAddress.isDefault = true;
        const updatedAddresses = addresses.map((addr) => ({
          ...addr,
          isDefault: false,
        }));
        setAddresses([...updatedAddresses, newAddress]);
      } else {
        setAddresses([...addresses, newAddress]);
      }

      toast.success("Address added successfully");
    }

    handleCloseDialog();
  };

  const handleSetDefault = (addressId) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));
    setAddresses(updatedAddresses);
    toast.success("Default address updated");
  };

  const handleDelete = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updatedAddresses = addresses.filter(
        (addr) => addr.id !== addressId
      );

      // If we deleted the default address and there are other addresses left,
      // make the first one the default
      if (
        addresses.find((addr) => addr.id === addressId)?.isDefault &&
        updatedAddresses.length > 0
      ) {
        updatedAddresses[0].isDefault = true;
      }

      setAddresses(updatedAddresses);
      toast.success("Address deleted successfully");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            My Addresses
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add New Address
          </Button>
        </Box>

        {addresses.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              You don't have any saved addresses yet.
            </Alert>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add Your First Address
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {addresses.map((address) => (
              <Grid item xs={12} md={6} key={address.id}>
                <Card
                  sx={{
                    height: "100%",
                    position: "relative",
                    border: address.isDefault ? "2px solid" : "1px solid",
                    borderColor: address.isDefault ? "primary.main" : "divider",
                  }}
                >
                  {address.isDefault && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "primary.main",
                        color: "white",
                        px: 1,
                        py: 0.5,
                        borderBottomLeftRadius: 4,
                      }}
                    >
                      <Typography variant="caption" fontWeight="bold">
                        Default
                      </Typography>
                    </Box>
                  )}

                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      {addressTypes.find((t) => t.value === address.type)?.icon}
                      <Typography
                        variant="subtitle1"
                        sx={{ ml: 1, fontWeight: "bold" }}
                      >
                        {
                          addressTypes.find((t) => t.value === address.type)
                            ?.label
                        }{" "}
                        Address
                      </Typography>
                    </Box>

                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontWeight: "medium" }}
                    >
                      {address.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {address.addressLine1}
                    </Typography>
                    {address.addressLine2 && (
                      <Typography variant="body2" color="text.secondary">
                        {address.addressLine2}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      {address.city}, {address.state} {address.postalCode}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {address.country}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      <strong>Phone:</strong> {address.phone}
                    </Typography>
                  </CardContent>

                  <Divider />

                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleOpenDialog(address)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(address.id)}
                    >
                      Delete
                    </Button>
                    {!address.isDefault && (
                      <Button
                        size="small"
                        sx={{ ml: "auto" }}
                        onClick={() => handleSetDefault(address.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Address Form Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {editingAddressId ? "Edit Address" : "Add New Address"}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="fullName"
                  label="Full Name"
                  fullWidth
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={!!validationErrors.fullName}
                  helperText={validationErrors.fullName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="addressLine1"
                  label="Address Line 1"
                  fullWidth
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  error={!!validationErrors.addressLine1}
                  helperText={validationErrors.addressLine1}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="addressLine2"
                  label="Address Line 2 (Optional)"
                  fullWidth
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  label="City"
                  fullWidth
                  value={formData.city}
                  onChange={handleInputChange}
                  error={!!validationErrors.city}
                  helperText={validationErrors.city}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="state"
                  label="State/Province"
                  fullWidth
                  value={formData.state}
                  onChange={handleInputChange}
                  error={!!validationErrors.state}
                  helperText={validationErrors.state}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="postalCode"
                  label="Postal Code"
                  fullWidth
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  error={!!validationErrors.postalCode}
                  helperText={validationErrors.postalCode}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="country"
                  label="Country"
                  fullWidth
                  value={formData.country}
                  onChange={handleInputChange}
                  error={!!validationErrors.country}
                  helperText={validationErrors.country}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={!!validationErrors.phone}
                  helperText={validationErrors.phone}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Address Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    label="Address Type"
                  >
                    {addressTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {type.icon}
                          <Typography sx={{ ml: 1 }}>{type.label}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    color={formData.isDefault ? "primary" : "inherit"}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        isDefault: !formData.isDefault,
                      })
                    }
                    startIcon={formData.isDefault ? <span>✓</span> : null}
                  >
                    Set as default address
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {editingAddressId ? "Update Address" : "Save Address"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
};

export default Addresses;
