import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  TextField,
  InputAdornment,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
  Button,
  CardActions,
  Rating,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ShoppingCart as ShoppingCartIcon,
  FavoriteBorder as FavoriteBorderIcon,
  CompareArrows as CompareArrowsIcon,
  AddShoppingCart as AddShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
  Store as StoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-hot-toast";
import agricultureProducts from "../../data/agricultureProducts";
import useTokenStore from "../../store/useTokenStore";
import MainLayout from "../../components/layouts/MainLayout";

const categories = [
  { id: "all", name: "All Products" },
  { id: "seeds", name: "Seeds" },
  { id: "fertilizers", name: "Fertilizers" },
  { id: "pesticides", name: "Pesticides" },
  { id: "tools", name: "Tools & Equipment" },
  { id: "irrigation", name: "Irrigation Systems" },
];

const Shop = () => {
  const navigate = useNavigate();
  const { token, userInfo } = useTokenStore((state) => state);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 8;

  // New state for rental and purchase options
  const [openPurchaseDialog, setOpenPurchaseDialog] = useState(false);
  const [openRentDialog, setOpenRentDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [purchaseOption, setPurchaseOption] = useState("standard");
  const [rentalDuration, setRentalDuration] = useState("daily");

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // For demonstration purposes, using the mock data
      // In a real app, this would be an API call
      let filteredProducts = [...agricultureProducts];

      // Filter by category if not "all"
      if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === selectedCategory
        );
      }

      // Filter by search term
      if (searchTerm) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.description &&
              product.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()))
        );
      }

      // Sort products
      if (sortBy === "priceAsc") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sortBy === "priceDesc") {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sortBy === "newest") {
        // In a real app, this would use createdAt
        filteredProducts.sort((a, b) => b.id - a.id);
      } else if (sortBy === "popularity") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
      }

      // Calculate pagination
      setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));

      // Get current page products
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );

      setProducts(currentProducts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // If exists, update quantity
      existingItem.quantity += 1;
    } else {
      // If not, add new item with quantity 1
      cart.push({
        ...product,
        quantity: 1,
        purchaseType: "buy", // Default to buy
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch event for cart update
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`${product.name} added to cart!`);
  };

  // New handlers for buy and rent actions
  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setOpenPurchaseDialog(true);
  };

  const handleRentClick = (product) => {
    setSelectedProduct(product);
    setOpenRentDialog(true);
  };

  const handlePurchaseSubmit = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add to cart with purchase option
    cart.push({
      ...selectedProduct,
      quantity: 1,
      purchaseType: "buy",
      purchaseOption: purchaseOption,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`${selectedProduct.name} added to cart for purchase!`);
    setOpenPurchaseDialog(false);

    // Redirect to checkout for immediate purchase
    navigate("/checkout");
  };

  const handleRentSubmit = () => {
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
      ...selectedProduct,
      quantity: 1,
      purchaseType: "rent",
      rentalDuration: rentalDuration,
      // Adjust price for rental
      originalPrice: selectedProduct.price,
      price: Math.round(selectedProduct.price * rentalPriceMultiplier),
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success(`${selectedProduct.name} added to cart for rental!`);
    setOpenRentDialog(false);

    // Redirect to checkout for immediate rental
    navigate("/checkout");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Shop Agricultural Products
        </Typography>

        {/* Search and Filter Section */}
        <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={5}>
              <form onSubmit={handleSearchSubmit}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button type="submit" sx={{ minWidth: "auto" }}>
                          Search
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                  <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                  <MenuItem value="popularity">Popularity</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        {/* Categories */}
        <Box sx={{ mb: 4, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => handleCategoryChange(category.id)}
              color={selectedCategory === category.id ? "primary" : "default"}
              variant={selectedCategory === category.id ? "filled" : "outlined"}
              sx={{ mb: 1 }}
            />
          ))}
        </Box>

        {/* Products Grid */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <CircularProgress />
          </Box>
        ) : products.length === 0 ? (
          <Box sx={{ textAlign: "center", my: 8 }}>
            <Typography variant="h6" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search or filter criteria
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image}
                        alt={product.name}
                        sx={{
                          objectFit: "contain",
                          bgcolor: "background.paper",
                          p: 2,
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                      {/* Category Badge */}
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 8,
                          textTransform: "capitalize",
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Typography
                        variant="h6"
                        component={Link}
                        to={`/product/${product.id}`}
                        sx={{
                          textDecoration: "none",
                          color: "inherit",
                          fontSize: "1rem",
                          fontWeight: "bold",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          height: "3rem",
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        {product.name}
                      </Typography>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <Rating
                          value={product.rating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({product.rating})
                        </Typography>
                      </Box>

                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ mt: 1, mb: 0.5, fontWeight: "bold" }}
                      >
                        {formatPrice(product.price)}
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{ ml: 1 }}
                        >
                          {product.unit}
                        </Typography>
                      </Typography>

                      <Typography
                        variant="body2"
                        color={product.inStock ? "success.main" : "error.main"}
                        sx={{ mb: 1 }}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Typography>
                    </CardContent>

                    <Divider />

                    <CardActions
                      sx={{ p: 1.5, justifyContent: "space-between" }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        startIcon={<AttachMoneyIcon />}
                        onClick={() => handleBuyClick(product)}
                        disabled={!product.inStock}
                        sx={{ flex: 1, mr: 0.5 }}
                      >
                        Buy
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="secondary"
                        startIcon={<StoreIcon />}
                        onClick={() => handleRentClick(product)}
                        disabled={!product.inStock}
                        sx={{ flex: 1, ml: 0.5 }}
                      >
                        Rent
                      </Button>

                      <Tooltip title="Add to Cart">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => addToCart(product)}
                          disabled={!product.inStock}
                          sx={{ ml: 1 }}
                        >
                          <AddShoppingCartIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}

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
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedProduct && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
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
                    <Typography variant="h6">{selectedProduct.name}</Typography>
                    <Typography
                      variant="body1"
                      color="primary"
                      fontWeight="bold"
                    >
                      {formatPrice(selectedProduct.price)}{" "}
                      {selectedProduct.unit}
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
                          Premium Purchase (+
                          {formatPrice(selectedProduct.price * 0.1)})
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
                          {formatPrice(selectedProduct.price / 6)} per month for
                          6 months
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
              disabled={!selectedProduct}
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
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {selectedProduct && (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
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
                    <Typography variant="h6">{selectedProduct.name}</Typography>
                    <Typography
                      variant="body1"
                      color="primary"
                      fontWeight="bold"
                    >
                      {formatPrice(selectedProduct.price)}{" "}
                      {selectedProduct.unit} (full price)
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
                          Daily Rental (
                          {formatPrice(selectedProduct.price * 0.1)}/day)
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
                          Weekly Rental (
                          {formatPrice(selectedProduct.price * 0.4)}/week)
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
                          Monthly Rental (
                          {formatPrice(selectedProduct.price * 0.7)}/month)
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
                    {formatPrice(selectedProduct.price * 0.3)} will be required
                    at checkout. Deposit will be refunded after the rental
                    period, subject to the condition of the equipment upon
                    return.
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
              disabled={!selectedProduct}
            >
              Proceed to Checkout
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
};

export default Shop;
