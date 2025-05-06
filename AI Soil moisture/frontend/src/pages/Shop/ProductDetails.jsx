import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  TextField,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  Alert,
  Paper,
  Breadcrumbs,
  Link,
  IconButton,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  Radio,
  FormControlLabel,
  Tooltip,
  Tab,
  Tabs,
} from "@mui/material";
import {
  Add,
  Remove,
  ShoppingCart,
  ArrowBack,
  Favorite,
  FavoriteBorder,
  AttachMoney,
  Store,
  Close,
  Info,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-hot-toast";
import useTokenStore from "../../store/useTokenStore";
import MainLayout from "../../components/layouts/MainLayout";
import agricultureProducts from "../../data/agricultureProducts";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Buy/Rent state
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [openRentDialog, setOpenRentDialog] = useState(false);
  const [purchaseOption, setPurchaseOption] = useState("standard");
  const [rentalDuration, setRentalDuration] = useState("daily");

  const navigate = useNavigate();
  const { token } = useTokenStore((state) => state);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // For demo purposes, find the product in mock data instead of API call
        const foundProduct = agricultureProducts.find(
          (p) => p.id.toString() === id
        );

        if (foundProduct) {
          setProduct(foundProduct);
          setReviews(foundProduct.reviews || []);
        } else {
          setError("Product not found");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
        setLoading(false);
        toast.error("Failed to load product details. Please try again later.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= (product.inStock || 10)) {
      setQuantity(value);
    }
  };

  const increaseQuantity = () => {
    if (quantity < (product.inStock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // If exists, update quantity
      cart[existingItemIndex].quantity =
        (cart[existingItemIndex].quantity || 1) + quantity;
    } else {
      // If not, add new item
      cart.push({
        ...product,
        quantity,
        purchaseType: "buy", // Default to buy
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch event for cart update
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyClick = () => {
    setOpenPurchaseDialog(true);
  };

  const handleRentClick = () => {
    setOpenRentDialog(true);
  };

  const handlePurchaseSubmit = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add to cart with purchase option
    cart.push({
      ...product,
      quantity,
      purchaseType: "buy",
      purchaseOption: purchaseOption,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`${product.name} added to cart for purchase!`);
    setOpenPurchaseDialog(false);

    // Redirect to checkout for immediate purchase
    navigate("/checkout");
  };

  const handleRentSubmit = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Calculate rental price based on duration
    const rentalPriceMultiplier =
      rentalDuration === "daily"
        ? 0.1
        : rentalDuration === "weekly"
        ? 0.4
        : rentalDuration === "monthly"
        ? 0.7
        : 1;

    // Add to cart with rental details
    cart.push({
      ...product,
      quantity,
      purchaseType: "rent",
      rentalDuration: rentalDuration,
      // Adjust price for rental
      originalPrice: product.price,
      price: Math.round(product.price * rentalPriceMultiplier),
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`${product.name} added to cart for rental!`);
    setOpenRentDialog(false);

    // Redirect to checkout for immediate rental
    navigate("/checkout");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please sign in to review this product");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setSubmitting(true);

    try {
      // For demo, just simulate submitting a review
      setTimeout(() => {
        const newReview = {
          name: "John Doe",
          rating,
          comment,
          createdAt: new Date().toISOString(),
        };

        setReviews([newReview, ...reviews]);
        toast.success("Review submitted successfully");
        setRating(0);
        setComment("");
        setSubmitting(false);
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading product details...
          </Typography>
        </Container>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Alert severity="error">{error || "Product not found"}</Alert>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button variant="contained" onClick={() => navigate("/shop")}>
              Back to Shop
            </Button>
          </Box>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            component="button"
            onClick={() => navigate("/")}
            underline="hover"
            color="inherit"
          >
            Home
          </Link>
          <Link
            component="button"
            onClick={() => navigate("/shop")}
            underline="hover"
            color="inherit"
          >
            Shop
          </Link>
          <Link
            component="button"
            onClick={() => navigate(`/shop?category=${product.category}`)}
            underline="hover"
            color="inherit"
          >
            {product.category}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f8f9fa",
                borderRadius: 2,
                position: "relative",
              }}
            >
              <Chip
                label={product.category}
                size="small"
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  textTransform: "capitalize",
                }}
              />
              <img
                src={product.image}
                alt={product.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400?text=No+Image";
                }}
              />
            </Paper>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={6}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4" component="h1" gutterBottom>
                  {product.name}
                </Typography>
                <IconButton onClick={toggleFavorite} color="primary">
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={product.rating || 0} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({product.numReviews || 0} reviews)
                </Typography>
              </Box>

              <Typography
                variant="h5"
                color="primary"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                {formatPrice(product.price)}
                <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                  {product.unit}
                </Typography>
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body1" sx={{ mb: 3 }}>
                {product.description}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Availability:
                </Typography>
                <Chip
                  color={product.inStock ? "success" : "error"}
                  label={product.inStock ? "In Stock" : "Out of Stock"}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  Category:
                </Typography>
                <Chip
                  label={product.category}
                  variant="outlined"
                  onClick={() => navigate(`/shop?category=${product.category}`)}
                />
              </Box>

              {product.inStock && (
                <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Quantity:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="small"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      inputProps={{
                        min: 1,
                        max: product.inStock,
                        style: { textAlign: "center" },
                      }}
                      sx={{ width: "60px", mx: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={increaseQuantity}
                      disabled={quantity >= (product.inStock || 10)}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>
              )}

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    startIcon={<AttachMoney />}
                    onClick={handleBuyClick}
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    fullWidth
                    startIcon={<Store />}
                    onClick={handleRentClick}
                    disabled={!product.inStock}
                  >
                    Rent
                  </Button>
                </Grid>
              </Grid>

              <Button
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
                startIcon={<ShoppingCart />}
                onClick={addToCart}
                disabled={!product.inStock}
                sx={{ mb: 2 }}
              >
                Add to Cart
              </Button>

              <Button
                variant="text"
                startIcon={<ArrowBack />}
                onClick={() => navigate("/shop")}
                fullWidth
              >
                Continue Shopping
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Tabs for Product Details and Reviews */}
        <Box sx={{ mt: 6 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Product Details" />
            <Tab label="Reviews" />
          </Tabs>

          {/* Product Details Tab Content */}
          {activeTab === 0 && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      fontWeight="bold"
                    >
                      Product Specifications
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      <Box component="li" sx={{ mb: 1 }}>
                        Brand: {product.brand || "Generic"}
                      </Box>
                      <Box component="li" sx={{ mb: 1 }}>
                        Category: {product.category}
                      </Box>
                      <Box component="li" sx={{ mb: 1 }}>
                        Weight: {product.weight || "N/A"}
                      </Box>
                      <Box component="li" sx={{ mb: 1 }}>
                        Dimensions: {product.dimensions || "N/A"}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      fontWeight="bold"
                    >
                      Features
                    </Typography>
                    <Box component="ul" sx={{ pl: 2 }}>
                      {(
                        product.features || [
                          "Eco-friendly",
                          "High-quality materials",
                          "Durable design",
                        ]
                      ).map((feature, index) => (
                        <Box key={index} component="li" sx={{ mb: 1 }}>
                          {feature}
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* Continue with rental information */}
              <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Rental Information
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2" paragraph>
                    You can rent this product for daily, weekly, or monthly
                    terms. A security deposit of{" "}
                    {formatPrice(product.price * 0.3)} is required for all
                    rentals and will be refunded after the product is returned
                    in good condition.
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          Daily Rental
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {formatPrice(product.price * 0.1)}/day
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Best for short-term needs
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          Weekly Rental
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {formatPrice(product.price * 0.4)}/week
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          For medium-term projects
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: "background.paper",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold">
                          Monthly Rental
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {formatPrice(product.price * 0.7)}/month
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Best value for long-term use
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Box>
          )}

          {/* Reviews Tab Content */}
          {activeTab === 1 && (
            <Grid container spacing={4}>
              {/* Review List */}
              <Grid item xs={12} md={6}>
                {reviews.length === 0 ? (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    No reviews yet. Be the first to review this product!
                  </Alert>
                ) : (
                  <List>
                    {reviews.map((review, index) => (
                      <React.Fragment key={index}>
                        <ListItem
                          alignItems="flex-start"
                          sx={{ px: 0, flexDirection: "column" }}
                        >
                          <Box sx={{ width: "100%", mb: 1 }}>
                            <Typography
                              variant="subtitle1"
                              component="span"
                              sx={{ fontWeight: "bold" }}
                            >
                              {review.name}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                my: 1,
                              }}
                            >
                              <Rating
                                value={review.rating}
                                precision={0.5}
                                readOnly
                                size="small"
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ ml: 1 }}
                              >
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body1">
                            {review.comment}
                          </Typography>
                        </ListItem>
                        {index < reviews.length - 1 && (
                          <Divider variant="fullWidth" component="li" />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </Grid>

              {/* Write Review Form */}
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      Write a Review
                    </Typography>

                    {!token ? (
                      <Alert severity="info" sx={{ mb: 3 }}>
                        Please{" "}
                        <Link href="/auth/login" underline="hover">
                          sign in
                        </Link>{" "}
                        to write a review.
                      </Alert>
                    ) : (
                      <Box component="form" onSubmit={handleReviewSubmit}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Rating
                          </Typography>
                          <Rating
                            name="rating"
                            value={rating}
                            onChange={(e, newValue) => setRating(newValue)}
                            precision={0.5}
                          />
                        </Box>

                        <TextField
                          label="Your Review"
                          multiline
                          rows={4}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 3 }}
                          required
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={submitting}
                          fullWidth
                        >
                          {submitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>

        {/* Purchase Dialog */}
        <Dialog
          open={openPurchaseDialog}
          onClose={() => setOpenPurchaseDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Purchase Options
            <IconButton
              aria-label="close"
              onClick={() => setOpenPurchaseDialog(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {product && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "contain",
                      marginRight: 16,
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/80?text=No+Image";
                    }}
                  />
                  <Box>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography
                      variant="body1"
                      color="primary"
                      fontWeight="bold"
                    >
                      {formatPrice(product.price)} {product.unit}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Select a purchase option:
                </Typography>

                <RadioGroup
                  value={purchaseOption}
                  onChange={(e) => setPurchaseOption(e.target.value)}
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Standard Purchase
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          One-time payment with standard warranty
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="premium"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Premium Purchase (+{formatPrice(product.price * 0.1)})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Includes extended warranty and priority support
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="subscription"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Subscription (Pay monthly)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatPrice(product.price / 6)} per month for 6
                          months
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPurchaseDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handlePurchaseSubmit}
              disabled={!product}
            >
              Proceed to Checkout
            </Button>
          </DialogActions>
        </Dialog>

        {/* Rent Dialog */}
        <Dialog
          open={openRentDialog}
          onClose={() => setOpenRentDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            Rental Options
            <IconButton
              aria-label="close"
              onClick={() => setOpenRentDialog(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {product && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "contain",
                      marginRight: 16,
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/80?text=No+Image";
                    }}
                  />
                  <Box>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography
                      variant="body1"
                      color="primary"
                      fontWeight="bold"
                    >
                      {formatPrice(product.price)} {product.unit} (full price)
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Select a rental duration:
                </Typography>

                <RadioGroup
                  value={rentalDuration}
                  onChange={(e) => setRentalDuration(e.target.value)}
                >
                  <FormControlLabel
                    value="daily"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Daily Rental ({formatPrice(product.price * 0.1)}/day)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          For short-term projects under 7 days
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="weekly"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Weekly Rental ({formatPrice(product.price * 0.4)}
                          /week)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          For medium-term projects or seasonal needs
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="monthly"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Monthly Rental ({formatPrice(product.price * 0.7)}
                          /month)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          For longer-term projects with significant savings
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>

                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">
                    <strong>Note:</strong> A security deposit of{" "}
                    {formatPrice(product.price * 0.3)} will be required at
                    checkout. Deposit will be refunded after the rental period,
                    subject to the condition of the equipment upon return.
                  </Typography>
                </Box>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRentDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleRentSubmit}
              disabled={!product}
            >
              Proceed to Checkout
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
};

export default ProductDetails;
