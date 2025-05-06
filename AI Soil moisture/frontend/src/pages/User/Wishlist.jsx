import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Rating,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import MainLayout from "../../components/layouts/MainLayout";
import { useUser } from "../../context/UserContext";

const Wishlist = () => {
  const { isAuthenticated } = useUser();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch wishlist from API
    // For demo, use mock data
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock wishlist data
        const mockWishlistItems = [
          {
            id: "prod-1",
            name: "Organic Fertilizer - All Purpose",
            price: 299.99,
            image: "/images/products/fertilizer1.jpg",
            rating: 4.5,
            inStock: true,
          },
          {
            id: "prod-2",
            name: "Smart Irrigation Controller",
            price: 1499.99,
            image: "/images/products/irrigation1.jpg",
            rating: 5,
            inStock: true,
          },
          {
            id: "prod-3",
            name: "Premium Vegetable Seeds Pack",
            price: 199.99,
            image: "/images/products/seeds1.jpg",
            rating: 4,
            inStock: false,
          },
        ];

        setWishlistItems(mockWishlistItems);
      } catch (error) {
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const handleRemoveFromWishlist = (productId) => {
    // In real app, call API to remove from wishlist
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== productId
    );
    setWishlistItems(updatedWishlist);
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (product) => {
    // In real app, call API to add to cart
    toast.success(`${product.name} added to cart`);
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
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          My Wishlist
        </Typography>

        {wishlistItems.length === 0 ? (
          <Box sx={{ mt: 4 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Your wishlist is empty. Browse our products and add items to your
              wishlist!
            </Alert>
            <Button
              variant="contained"
              component={Link}
              to="/shop"
              size="large"
              sx={{ mt: 2 }}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {wishlistItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = "/images/product-placeholder.png";
                    }}
                    sx={{
                      objectFit: "contain",
                      p: 2,
                      bgcolor: "background.paper",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      component={Link}
                      to={`/product/${item.id}`}
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <Rating
                        value={item.rating}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({item.rating})
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ mt: 1, fontWeight: "bold" }}
                    >
                      ₹{item.price.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={item.inStock ? "success.main" : "error.main"}
                      sx={{ mt: 1 }}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </Typography>
                  </CardContent>

                  <Divider />

                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      sx={{ flex: 1 }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      aria-label="remove from wishlist"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </MainLayout>
  );
};

export default Wishlist;
