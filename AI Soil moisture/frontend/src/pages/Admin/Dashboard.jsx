import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
  ButtonGroup,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useTheme,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import {
  PeopleOutline,
  ShoppingBagOutlined,
  InventoryOutlined,
  DeleteOutline,
  EditOutlined,
  Add as AddIcon,
  Search as SearchIcon,
  SettingsOutlined,
  Category as CategoryIcon,
  TrendingUp,
  TrendingDown,
  People,
  LocalShipping,
  ShoppingCart,
  AttachMoney,
  Paid,
  ArrowUpward,
  ArrowDownward,
  MonetizationOn,
  Receipt,
  Star,
  MoreVert,
  Autorenew,
  CheckCircle,
  Schedule,
  Visibility,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import useTokenStore from "../../store/useTokenStore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import AdminLayout from "../../components/admin/AdminLayout";
// Import the hardcoded products data
import agricultureProducts from "../../data/agricultureProducts";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);

// Dashboard Tabs
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// Generate past dates for mock data
const getPastDates = (days) => {
  const dates = [];
  for (let i = days; i > 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );
  }
  return dates;
};

// Generate random sales data based on actual products
const generateSalesData = (days) => {
  return Array.from({ length: days }, () => {
    return Math.floor(Math.random() * 20000) + 5000;
  });
};

// Generate random order counts
const generateOrdersData = (days) => {
  return Array.from({ length: days }, () => {
    return Math.floor(Math.random() * 20) + 5;
  });
};

// Generate monthly data for the past 6 months
const getMonthlyLabels = () => {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    months.push(date.toLocaleDateString("en-US", { month: "short" }));
  }
  return months;
};

const Dashboard = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState(agricultureProducts);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    revenue: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [productFormData, setProductFormData] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    category: "",
    countInStock: "",
    description: "",
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [timeframe, setTimeframe] = useState("weekly");
  const [salesData, setSalesData] = useState(null);
  const [initialCategoryData, setCategoryData] = useState(null);
  const [productPerformance, setProductPerformance] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentCustomers, setRecentCustomers] = useState([]);

  const navigate = useNavigate();
  const { token, userInfo } = useTokenStore((state) => state);

  // Utility function for currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {
    // Calculate some demo stats based on hardcoded data
    const totalProducts = agricultureProducts.length;
    const totalSales = agricultureProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );

    // Update stats with hardcoded data
    setStats({
      totalSales: totalSales,
      totalOrders: 24, // Demo value
      totalProducts,
      totalUsers: 15, // Demo value
      pendingOrders: 8, // Demo value
      revenue: totalSales * 2.5, // Just a multiplier for demo
    });

    // No need to fetch data, as we're using hardcoded data
    setLoading(false);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString) => {
    return new Date(dateString || Date.now()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  // Product CRUD operations
  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductFormData({
      name: "",
      price: "",
      image: "",
      brand: "",
      category: "",
      countInStock: "",
      description: "",
    });
    setOpenProductDialog(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand || "",
      category: product.category,
      countInStock: product.countInStock || (product.inStock ? 10 : 0),
      description: product.description,
    });
    setOpenProductDialog(true);
  };

  const handleProductSubmit = async () => {
    try {
      if (selectedProduct) {
        // Update existing product (demo only with hardcoded data)
        const updatedProducts = products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...productFormData } : p
        );
        setProducts(updatedProducts);
        toast.success("Product updated successfully");
      } else {
        // Create new product (demo only with hardcoded data)
        const newProduct = {
          id: products.length + 1,
          ...productFormData,
          inStock: parseInt(productFormData.countInStock) > 0,
          rating: 4.0, // Default rating
        };
        setProducts([...products, newProduct]);
        toast.success("Product created successfully");
      }

      setOpenProductDialog(false);
    } catch (error) {
      toast.error("Failed to save product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Demo deletion with hardcoded data
        const updatedProducts = products.filter((p) => p.id !== productId);
        setProducts(updatedProducts);
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Product category distribution for pie chart
  const productCategoryDistribution = {
    labels: Array.from(
      new Set(agricultureProducts.map((product) => product.category))
    ),
    datasets: [
      {
        data: Array.from(
          new Set(agricultureProducts.map((product) => product.category))
        ).map(
          (category) =>
            agricultureProducts.filter(
              (product) => product.category === category
            ).length
        ),
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#f44336",
          "#9c27b0",
          "#3f51b5",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Price range distribution for products
  const priceRanges = [
    "₹0-500",
    "₹501-1000",
    "₹1001-2000",
    "₹2001-3000",
    "₹3001+",
  ];

  const priceDistribution = [
    agricultureProducts.filter((p) => p.price <= 500).length,
    agricultureProducts.filter((p) => p.price > 500 && p.price <= 1000).length,
    agricultureProducts.filter((p) => p.price > 1000 && p.price <= 2000).length,
    agricultureProducts.filter((p) => p.price > 2000 && p.price <= 3000).length,
    agricultureProducts.filter((p) => p.price > 3000).length,
  ];

  const priceRangeData = {
    labels: priceRanges,
    datasets: [
      {
        label: "Products by Price Range",
        data: priceDistribution,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Top rated products data
  const topRatedProducts = [...agricultureProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Time-based data
  const labels =
    timeframe === "weekly"
      ? getPastDates(7)
      : timeframe === "monthly"
      ? getPastDates(30)
      : getMonthlyLabels();

  const revenueData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: generateSalesData(labels.length),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const ordersData = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: generateOrdersData(labels.length),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
    ],
  };

  // Top selling categories (by number of products)
  const topCategoriesData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Number of Products",
        data: Object.values(categories),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(255, 205, 86, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Generate recent activity for display
  const recentActivity = [
    {
      id: 1,
      type: "order",
      title: "New order received",
      description: "Order #2458 from Raj Kumar",
      time: "5 minutes ago",
      icon: (
        <ShoppingCart
          sx={{
            color: "white",
            bgcolor: "primary.main",
            p: 1,
            borderRadius: 1,
          }}
        />
      ),
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received",
      description: "₹4,500 payment from order #2457",
      time: "30 minutes ago",
      icon: (
        <Paid
          sx={{
            color: "white",
            bgcolor: "success.main",
            p: 1,
            borderRadius: 1,
          }}
        />
      ),
    },
    {
      id: 3,
      type: "stock",
      title: "Low stock alert",
      description: "Organic Tomato Seeds (GS-12) is running low",
      time: "2 hours ago",
      icon: (
        <InventoryOutlined
          sx={{
            color: "white",
            bgcolor: "warning.main",
            p: 1,
            borderRadius: 1,
          }}
        />
      ),
    },
    {
      id: 4,
      type: "user",
      title: "New user registered",
      description: "Priya Sharma created an account",
      time: "5 hours ago",
      icon: (
        <People
          sx={{ color: "white", bgcolor: "info.main", p: 1, borderRadius: 1 }}
        />
      ),
    },
    {
      id: 5,
      type: "delivery",
      title: "Order delivered",
      description: "Order #2456 has been delivered",
      time: "1 day ago",
      icon: (
        <LocalShipping
          sx={{
            color: "white",
            bgcolor: "secondary.main",
            p: 1,
            borderRadius: 1,
          }}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Dashboard
        </Typography>

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Total Sales
                  </Typography>
                  <MonetizationOn />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: "bold" }}>
                  {formatCurrency(stats.totalSales)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ArrowUpward fontSize="small" />
                  <Typography variant="body2">
                    +18.2% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(45deg, #FF5722 30%, #FFC107 90%)",
                color: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Orders
                  </Typography>
                  <ShoppingBagOutlined />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: "bold" }}>
                  {stats.totalOrders}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ArrowUpward fontSize="small" />
                  <Typography variant="body2">
                    +12.5% from last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)",
                color: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Customers
                  </Typography>
                  <People />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: "bold" }}>
                  {stats.totalUsers}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ArrowUpward fontSize="small" />
                  <Typography variant="body2">+5.8% from last month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                background: "linear-gradient(45deg, #9C27B0 30%, #673AB7 90%)",
                color: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Products
                  </Typography>
                  <LocalShipping />
                </Box>
                <Typography variant="h4" sx={{ my: 1, fontWeight: "bold" }}>
                  {stats.totalProducts}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ArrowDownward fontSize="small" />
                  <Typography variant="body2">+3.2% from last month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Sales Overview
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <TrendingUp fontSize="small" color="primary" />
                  <Typography variant="body2" color="primary">
                    +23.4% Year over Year
                  </Typography>
                </Box>
              </Box>

              {salesData && (
                <Box sx={{ height: 300 }}>
                  <Line
                    data={salesData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              return `${
                                context.dataset.label
                              }: ${formatCurrency(context.parsed.y)}`;
                            },
                          },
                        },
                      },
                      scales: {
                        y: {
                          ticks: {
                            callback: function (value) {
                              return formatCurrency(value);
                            },
                          },
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                Sales by Category
              </Typography>

              {initialCategoryData && (
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Doughnut
                    data={initialCategoryData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Product Performance */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Top Performing Products
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/admin/products")}
                >
                  View All
                </Button>
              </Box>

              {productPerformance && (
                <Box sx={{ height: 250 }}>
                  <Bar
                    data={productPerformance}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              return `Sales: ${formatCurrency(
                                context.parsed.y
                              )}`;
                            },
                          },
                        },
                      },
                      scales: {
                        y: {
                          ticks: {
                            callback: function (value) {
                              return formatCurrency(value);
                            },
                          },
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Recent Orders
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/admin/orders")}
                >
                  View All
                </Button>
              </Box>

              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography fontWeight="bold">Order ID</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold">Date</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold">Customer</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold">Total</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold">Status</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="bold">Action</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id} hover>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{formatDate(order.date)}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{formatCurrency(order.total)}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {getStatusIcon(order.status)}
                            <Typography
                              sx={{ color: getStatusColor(order.status) }}
                            >
                              {order.status}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View Order">
                            <IconButton
                              size="small"
                              onClick={() => navigate(`/order/${order.id}`)}
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Recent Customers
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigate("/admin/users")}
                >
                  View All
                </Button>
              </Box>

              <List sx={{ pt: 0 }}>
                {recentCustomers.map((customer, index) => (
                  <React.Fragment key={customer.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar src={customer.avatar} alt={customer.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "medium" }}
                          >
                            {customer.name}
                          </Typography>
                        }
                        secondary={
                          <Box
                            component="span"
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              {customer.email}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Joined: {formatDate(customer.date)}
                            </Typography>
                          </Box>
                        }
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "medium" }}
                        >
                          {customer.orders}{" "}
                          {customer.orders === 1 ? "order" : "orders"}
                        </Typography>
                        <Tooltip title="View Customer">
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(`/admin/users/detail/${customer.id}`)
                            }
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </ListItem>
                    {index < recentCustomers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default Dashboard;
