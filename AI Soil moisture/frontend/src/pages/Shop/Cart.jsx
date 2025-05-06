import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  IconButton,
  Divider,
  TextField,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  ArrowBack,
  ShoppingBag,
  Store as StoreIcon,
  AttachMoney as AttachMoneyIcon,
  Timer as TimerIcon,
  LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useTokenStore from "../../store/useTokenStore";
import MainLayout from "../../components/layouts/MainLayout";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [securityDeposit, setSecurityDeposit] = useState(0);
  const [hasRentalItems, setHasRentalItems] = useState(false);
  const navigate = useNavigate();
  const { token } = useTokenStore((state) => state);

  useEffect(() => {
    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);

    // Check if any items are rentals
    const hasRentals = cart.some((item) => item.purchaseType === "rent");
    setHasRentalItems(hasRentals);

    // Calculate deposit for rental items (30% of original price)
    const deposit = cart.reduce(
      (sum, item) =>
        sum +
        (item.purchaseType === "rent"
          ? item.originalPrice * 0.3 * (item.quantity || 1)
          : 0),
      0
    );
    setSecurityDeposit(deposit);

    // Calculate total price
    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(total);

    setLoading(false);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Check if any items are rentals
    const hasRentals = updatedCart.some((item) => item.purchaseType === "rent");
    setHasRentalItems(hasRentals);

    // Calculate deposit for rental items
    const deposit = updatedCart.reduce(
      (sum, item) =>
        sum +
        (item.purchaseType === "rent"
          ? item.originalPrice * 0.3 * (item.quantity || 1)
          : 0),
      0
    );
    setSecurityDeposit(deposit);

    // Recalculate total price
    const total = updatedCart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
    setTotalPrice(total);

    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (index) => {
    const updatedCart = [...cartItems];
    const maxQuantity = updatedCart[index].inStock || 10; // Default to 10 if not specified

    if ((updatedCart[index].quantity || 1) < maxQuantity) {
      updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
      updateCart(updatedCart);
    } else {
      toast.warning(`Maximum available quantity: ${maxQuantity}`);
    }
  };

  const decreaseQty = (index) => {
    const updatedCart = [...cartItems];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity = (updatedCart[index].quantity || 1) - 1;
      updateCart(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
    toast.success("Item removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
    setTotalPrice(0);
    setSecurityDeposit(0);
    setHasRentalItems(false);

    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Cart has been cleared");
  };

  const proceedToCheckout = () => {
    if (!token) {
      toast.error("Please sign in to proceed to checkout");
      navigate("/auth/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    navigate("/checkout");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);
  };

  const getRentalPeriodText = (duration) => {
    switch (duration) {
      case "daily":
        return "Daily Rental";
      case "weekly":
        return "Weekly Rental";
      case "monthly":
        return "Monthly Rental";
      default:
        return "Rental";
    }
  };

  const getPurchaseOptionText = (option) => {
    switch (option) {
      case "standard":
        return "Standard Purchase";
      case "premium":
        return "Premium Purchase";
      case "subscription":
        return "Subscription";
      default:
        return "Purchase";
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Typography variant="h5">Loading cart...</Typography>
          </Box>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <IconButton
            onClick={() => navigate("/shop")}
            color="primary"
            sx={{ mr: 1 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Shopping Cart
          </Typography>
        </Box>

        {cartItems.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <ShoppingBag
              sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Looks like you haven't added any farming products to your cart
              yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/shop"
              size="large"
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, mb: { xs: 4, md: 0 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Cart Items ({cartItems.length})
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </Box>

                <List sx={{ width: "100%" }}>
                  {cartItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          py: 3,
                          px: { xs: 1, sm: 2 },
                        }}
                      >
                        <ListItemAvatar sx={{ minWidth: { xs: 80, sm: 100 } }}>
                          <Avatar
                            variant="rounded"
                            src={item.image}
                            alt={item.name}
                            sx={{
                              width: { xs: 70, sm: 90 },
                              height: { xs: 70, sm: 90 },
                              cursor: "pointer",
                              objectFit: "contain",
                              bgcolor: "background.paper",
                              p: 1,
                            }}
                            onClick={() =>
                              navigate(`/product/${item.id || item.product}`)
                            }
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/90?text=No+Image";
                            }}
                          />
                        </ListItemAvatar>

                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  "&:hover": { color: "primary.main" },
                                }}
                                onClick={() =>
                                  navigate(
                                    `/product/${item.id || item.product}`
                                  )
                                }
                              >
                                {item.name}
                              </Typography>
                              <Chip
                                label={
                                  item.purchaseType === "rent"
                                    ? getRentalPeriodText(item.rentalDuration)
                                    : getPurchaseOptionText(item.purchaseOption)
                                }
                                size="small"
                                color={
                                  item.purchaseType === "rent"
                                    ? "secondary"
                                    : "primary"
                                }
                                icon={
                                  item.purchaseType === "rent" ? (
                                    <TimerIcon />
                                  ) : (
                                    <AttachMoneyIcon />
                                  )
                                }
                                sx={{ ml: 1, height: 24 }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                              >
                                Price: {formatPrice(item.price)} per unit
                                {item.purchaseType === "rent" && (
                                  <Tooltip title="Original price before rental discount">
                                    <Typography
                                      component="span"
                                      sx={{
                                        ml: 1,
                                        textDecoration: "line-through",
                                        fontSize: "0.8rem",
                                        color: "text.disabled",
                                      }}
                                    >
                                      {formatPrice(item.originalPrice)}
                                    </Typography>
                                  </Tooltip>
                                )}
                              </Typography>

                              {item.purchaseType === "rent" && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 1 }}
                                >
                                  Security Deposit:{" "}
                                  {formatPrice(item.originalPrice * 0.3)}
                                </Typography>
                              )}

                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => decreaseQty(index)}
                                  disabled={(item.quantity || 1) <= 1}
                                  sx={{ border: "1px solid #e0e0e0" }}
                                >
                                  <Remove fontSize="small" />
                                </IconButton>

                                <TextField
                                  value={item.quantity || 1}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    style: {
                                      textAlign: "center",
                                      width: "50px",
                                      padding: "2px",
                                    },
                                  }}
                                  sx={{ mx: 1 }}
                                />

                                <IconButton
                                  size="small"
                                  onClick={() => increaseQty(index)}
                                  disabled={
                                    (item.quantity || 1) >= (item.inStock || 10)
                                  }
                                  sx={{ border: "1px solid #e0e0e0" }}
                                >
                                  <Add fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          }
                        />

                        <ListItemSecondaryAction
                          sx={{ top: "auto", right: { xs: 0, sm: 16 } }}
                        >
                          <Box sx={{ textAlign: "right" }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold", mb: 1 }}
                            >
                              {formatPrice(item.price * (item.quantity || 1))}
                              {item.purchaseType === "rent" && (
                                <Typography
                                  variant="caption"
                                  display="block"
                                  color="text.secondary"
                                >
                                  + {formatPrice(item.originalPrice * 0.3)}{" "}
                                  deposit
                                </Typography>
                              )}
                            </Typography>

                            <IconButton
                              edge="end"
                              color="error"
                              onClick={() => removeItem(index)}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < cartItems.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>

                <Box
                  sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}
                >
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/shop"
                    startIcon={<ArrowBack />}
                  >
                    Continue Shopping
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, position: "sticky", top: 20 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                  Order Summary
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1">
                    Subtotal (
                    {cartItems.reduce(
                      (acc, item) => acc + (item.quantity || 1),
                      0
                    )}{" "}
                    items)
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {formatPrice(totalPrice)}
                  </Typography>
                </Box>

                {securityDeposit > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Tooltip title="This deposit is refundable upon return of rental items in good condition">
                      <Typography
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        Security Deposit
                      </Typography>
                    </Tooltip>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {formatPrice(securityDeposit)}
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LocalShippingIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Shipping
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {formatPrice(totalPrice > 0 ? 100 : 0)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1">Tax (18% GST)</Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {formatPrice(totalPrice * 0.18)}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    {formatPrice(
                      totalPrice +
                        (totalPrice > 0 ? 100 : 0) +
                        totalPrice * 0.18 +
                        securityDeposit
                    )}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={proceedToCheckout}
                  sx={{ py: 1.5 }}
                >
                  Proceed to Checkout
                </Button>

                {!token && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    You'll need to sign in before checkout.
                  </Alert>
                )}

                {hasRentalItems && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Your cart contains rental items. A security deposit is
                    required and will be refunded after the rental period.
                  </Alert>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </MainLayout>
  );
};

export default Cart;
