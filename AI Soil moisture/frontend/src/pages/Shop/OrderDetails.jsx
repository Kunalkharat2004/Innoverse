import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Divider,
  Alert,
  Chip,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  ArrowBack,
  LocalShipping,
  Payment,
  CheckCircleOutline,
  CancelOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import useTokenStore from "../../store/useTokenStore";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useTokenStore((state) => state);

  useEffect(() => {
    if (!token) {
      toast.error("Please sign in to view order details");
      navigate("/auth/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
          config
        );

        setOrder(data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch order details"
        );
        setLoading(false);
        toast.error("Failed to load order details");
      }
    };

    fetchOrder();
  }, [id, token, navigate]);

  const handlePayment = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // For demo purposes, we'll just mark the order as paid
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}/pay`,
        {
          id: "DEMO_PAYMENT_ID",
          status: "COMPLETED",
          update_time: new Date().toISOString(),
          payer: { email_address: "customer@example.com" },
        },
        config
      );

      setOrder(data);
      toast.success("Payment processed successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment processing failed");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading order details...
        </Typography>
      </Container>
    );
  }

  if (error || !order) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error">{error || "Order not found"}</Alert>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" onClick={() => navigate("/shop")}>
            Back to Shop
          </Button>
        </Box>
      </Container>
    );
  }

  return (
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
          Order Details
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* Order Info */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Order #{order._id}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
              <Chip
                icon={
                  order.isPaid ? <CheckCircleOutline /> : <CancelOutlined />
                }
                label={order.isPaid ? "Paid" : "Not Paid"}
                color={order.isPaid ? "success" : "error"}
                variant="outlined"
              />
              <Chip
                icon={
                  order.isDelivered ? <CheckCircleOutline /> : <LocalShipping />
                }
                label={order.isDelivered ? "Delivered" : "Not Delivered"}
                color={order.isDelivered ? "success" : "info"}
                variant="outlined"
              />
              <Chip
                icon={<Payment />}
                label={`Payment Method: ${order.paymentMethod}`}
                color="primary"
                variant="outlined"
              />
            </Box>

            {!order.isPaid && (
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePayment}
                  sx={{ mb: 2 }}
                >
                  Process Payment (Demo)
                </Button>
                <Alert severity="info">
                  <Typography variant="body2">
                    This is a demo payment button. In a real application, this
                    would redirect to the payment provider.
                  </Typography>
                </Alert>
              </Box>
            )}
          </Paper>

          {/* Shipping */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Shipping Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {order.shippingAddress.phone}
              </Typography>
            </Box>

            {order.isDelivered ? (
              <Alert severity="success">
                Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
              </Alert>
            ) : (
              <Alert severity="info">Not yet delivered</Alert>
            )}
          </Paper>

          {/* Payment */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Payment Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Method:</strong> {order.paymentMethod}
            </Typography>

            {order.isPaid ? (
              <Alert severity="success">
                Paid on {new Date(order.paidAt).toLocaleDateString()}
              </Alert>
            ) : (
              <Alert severity="warning">Not yet paid</Alert>
            )}
          </Paper>

          {/* Order Items */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Order Items
            </Typography>

            {order.orderItems.map((item, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    py: 2,
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      mr: 2,
                      borderRadius: 1,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/product/${item.product}`)}
                  />

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        "&:hover": { color: "primary.main" },
                      }}
                      onClick={() => navigate(`/product/${item.product}`)}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.qty} x ₹{item.price.toFixed(2)} = ₹
                      {(item.qty * item.price).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                {index < order.orderItems.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: "sticky", top: 20 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Order Summary
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
            >
              <Typography variant="body1">Items</Typography>
              <Typography variant="body1">
                ₹
                {order.itemsPrice
                  ? order.itemsPrice.toFixed(2)
                  : (
                      order.totalPrice -
                      order.shippingPrice -
                      order.taxPrice
                    ).toFixed(2)}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
            >
              <Typography variant="body1">Shipping</Typography>
              <Typography variant="body1">
                ₹{order.shippingPrice.toFixed(2)}
              </Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
            >
              <Typography variant="body1">Tax</Typography>
              <Typography variant="body1">
                ₹{order.taxPrice.toFixed(2)}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                ₹{order.totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/shop")}
                sx={{ mb: 2 }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetails;
