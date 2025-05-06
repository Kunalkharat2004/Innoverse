import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Divider,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import useTokenStore from "../../store/useTokenStore";
import MainLayout from "../../components/layouts/MainLayout";

const steps = ["Shipping Information", "Payment Method", "Place Order"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const { token, userInfo } = useTokenStore((state) => state);

  // Shipping details
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [phone, setPhone] = useState("");

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  // Order summary
  const [itemsPrice, setItemsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [securityDeposit, setSecurityDeposit] = useState(0);
  const [hasRentalItems, setHasRentalItems] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Please sign in to proceed with checkout");
      navigate("/auth/login");
      return;
    }

    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      navigate("/cart");
      return;
    }

    setCartItems(cart);

    // Check if any items are rentals
    const hasRentals = cart.some((item) => item.purchaseType === "rent");
    setHasRentalItems(hasRentals);

    // Calculate prices
    const itemsTotal = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    // Calculate deposit for rental items (30% of original price)
    const deposit = cart.reduce(
      (sum, item) =>
        sum +
        (item.purchaseType === "rent"
          ? item.originalPrice * 0.3 * (item.quantity || 1)
          : 0),
      0
    );

    const shipping = itemsTotal > 0 ? 100 : 0;
    const tax = itemsTotal * 0.18;
    const total = itemsTotal + shipping + tax + deposit;

    setItemsPrice(itemsTotal);
    setShippingPrice(shipping);
    setTaxPrice(tax);
    setSecurityDeposit(deposit);
    setOrderTotal(total);
    setTotalPrice(itemsTotal);

    setLoading(false);
  }, [token, navigate]);

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate shipping details
      if (!address || !city || !postalCode || !state || !country || !phone) {
        toast.error("Please fill all shipping details");
        return;
      }

      // Validate phone number
      if (!/^\d{10}$/.test(phone)) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }

      // Validate postal code
      if (!/^\d{6}$/.test(postalCode)) {
        toast.error("Please enter a valid 6-digit postal code");
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // If we're moving to order placement, scroll to top
    if (activeStep === 1) {
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const placeOrder = async () => {
    setSubmitting(true);

    try {
      const orderItems = cartItems.map((item) => ({
        product: item.id || item.product,
        name: item.name,
        qty: item.quantity || 1,
        image: item.image,
        price: item.price,
        purchaseType: item.purchaseType || "buy",
        purchaseOption: item.purchaseOption,
        rentalDuration: item.rentalDuration,
        originalPrice: item.originalPrice,
        securityDeposit:
          item.purchaseType === "rent"
            ? Math.round(item.originalPrice * 0.3)
            : 0,
      }));

      const shippingAddress = {
        address,
        city,
        postalCode,
        state,
        country,
        phone,
      };

      // For demo purposes, simulate API call and order creation
      // In a real app, this would be an actual API call
      setTimeout(() => {
        // Create a random order ID for demo purposes
        const mockOrderId = "ORD" + Math.floor(Math.random() * 1000000);

        // Clear cart
        localStorage.setItem("cart", JSON.stringify([]));
        window.dispatchEvent(new Event("cartUpdated"));

        // Store order ID and move to next step
        setOrderId(mockOrderId);
        setActiveStep(3);
        toast.success("Order placed successfully!");
        setSubmitting(false);
      }, 2000);

      /* In a real app with backend, the code would be:
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          securityDeposit,
          totalPrice: orderTotal,
        },
        config
      );

      // Clear cart
      localStorage.setItem("cart", JSON.stringify([]));
      window.dispatchEvent(new Event("cartUpdated"));

      // Store order ID and move to next step
      setOrderId(data._id);
      setActiveStep(3);
      toast.success("Order placed successfully!");
      */
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
      console.error("Error placing order:", error);
      setSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Shipping Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  fullWidth
                  required
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  fullWidth
                  required
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Postal Code"
                  fullWidth
                  required
                  variant="outlined"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  helperText="6-digit PIN code"
                  inputProps={{ maxLength: 6 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="State"
                  fullWidth
                  required
                  variant="outlined"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Country"
                  fullWidth
                  required
                  variant="outlined"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  fullWidth
                  required
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  helperText="10-digit mobile number"
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Payment Method
            </Typography>

            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <FormLabel component="legend">Select Payment Method</FormLabel>
              <RadioGroup
                aria-label="payment-method"
                name="payment-method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="PayPal"
                  control={<Radio />}
                  label="PayPal or Credit Card"
                />
                <FormControlLabel
                  value="Razorpay"
                  control={<Radio />}
                  label="Razorpay"
                />
                <FormControlLabel
                  value="Cash on Delivery"
                  control={<Radio />}
                  label="Cash on Delivery (COD)"
                />
              </RadioGroup>
            </FormControl>

            {hasRentalItems && (
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  <strong>Rental Information:</strong> For rental items, a
                  security deposit is required. This deposit will be refunded
                  after the rental period ends and the items are returned in
                  good condition.
                </Typography>
              </Alert>
            )}

            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                Note: For demonstration purposes, no actual payment will be
                processed. All payment methods will bypass actual payment
                processing.
              </Typography>
            </Alert>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Order Summary
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Shipping To:</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                {address}, {city}, {state} {postalCode}, {country}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phone: {phone}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Payment Method:</strong> {paymentMethod}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Order Items:</strong>
              </Typography>

              {cartItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    py: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "contain",
                        marginRight: 10,
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/50?text=No+Image";
                      }}
                    />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {item.name} x {item.quantity || 1}
                      </Typography>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                      >
                        <Chip
                          label={
                            item.purchaseType === "rent"
                              ? `Rental (${item.rentalDuration})`
                              : item.purchaseOption
                              ? `Purchase (${item.purchaseOption})`
                              : "Purchase"
                          }
                          size="small"
                          color={
                            item.purchaseType === "rent"
                              ? "secondary"
                              : "primary"
                          }
                          sx={{ fontSize: "0.7rem", height: 24 }}
                        />

                        {item.purchaseType === "rent" && (
                          <Typography
                            variant="caption"
                            sx={{ ml: 1, color: "text.secondary" }}
                          >
                            Deposit: {formatPrice(item.originalPrice * 0.3)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {formatPrice(item.price * (item.quantity || 1))}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mt: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Items Total:</Typography>
                <Typography variant="body1">
                  {formatPrice(itemsPrice)}
                </Typography>
              </Box>

              {securityDeposit > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body1">Security Deposit:</Typography>
                  <Typography variant="body1">
                    {formatPrice(securityDeposit)}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Shipping:</Typography>
                <Typography variant="body1">
                  {formatPrice(shippingPrice)}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Tax (18% GST):</Typography>
                <Typography variant="body1">{formatPrice(taxPrice)}</Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Typography variant="h6">Total:</Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {formatPrice(orderTotal)}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={placeOrder}
              disabled={submitting}
              sx={{ mt: 4, py: 1.5 }}
            >
              {submitting ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Alert severity="success" sx={{ mb: 4 }}>
              <Typography variant="h6">Order Placed Successfully!</Typography>
              <Typography variant="body1">
                Your order has been received and is being processed.
              </Typography>
            </Alert>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Order Number: {orderId}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Thank you for your purchase! You will receive an email
                confirmation shortly.
              </Typography>

              {hasRentalItems && (
                <Alert severity="info" sx={{ mt: 3, textAlign: "left" }}>
                  <Typography variant="body2">
                    Your order contains rental items. Please note the return
                    dates for each rental item to avoid additional charges. Your
                    security deposit will be refunded after all rental items are
                    returned in good condition.
                  </Typography>
                </Alert>
              )}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/order-history`)}
              >
                View Order Details
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading checkout...
          </Typography>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Checkout
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              {getStepContent(activeStep)}

              {activeStep < 3 && activeStep !== 2 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 4,
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    Back
                  </Button>
                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Place Order" : "Next"}
                  </Button>
                </Box>
              )}

              {activeStep === 2 && (
                <Box
                  sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}
                >
                  <Button onClick={handleBack} variant="outlined">
                    Back
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {activeStep < 3 && (
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  Order Summary
                </Typography>

                <Typography variant="body2" gutterBottom>
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                  in cart
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ maxHeight: "300px", overflowY: "auto", mb: 2 }}>
                  {cartItems.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        py: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "75%",
                        }}
                      >
                        <Typography variant="body2" noWrap>
                          {item.name} x {item.quantity || 1}
                        </Typography>
                        {item.purchaseType === "rent" && (
                          <Chip
                            label="Rental"
                            size="small"
                            color="secondary"
                            sx={{ ml: 1, height: 20, fontSize: "0.6rem" }}
                          />
                        )}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {formatPrice(item.price * (item.quantity || 1))}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Subtotal:</Typography>
                  <Typography variant="body2">
                    {formatPrice(itemsPrice)}
                  </Typography>
                </Box>

                {securityDeposit > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">Security Deposit:</Typography>
                    <Typography variant="body2">
                      {formatPrice(securityDeposit)}
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Shipping:</Typography>
                  <Typography variant="body2">
                    {formatPrice(shippingPrice)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Tax (18% GST):</Typography>
                  <Typography variant="body2">
                    {formatPrice(taxPrice)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Total:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    {formatPrice(orderTotal)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </MainLayout>
  );
};

export default Checkout;
