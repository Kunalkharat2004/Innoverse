import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  TablePagination,
  Alert,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import MainLayout from "../../components/layouts/MainLayout";

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to get chip color based on order status
const getStatusChipColor = (status) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "success";
    case "processing":
      return "info";
    case "shipped":
      return "primary";
    case "cancelled":
      return "error";
    default:
      return "default";
  }
};

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // In a real app, fetch orders from API
    // For demo, use mock data
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock orders data
        const mockOrders = [
          {
            id: "ORD-1001",
            date: "2023-06-15T14:30:00Z",
            status: "Delivered",
            total: 249.99,
            items: 3,
            payment: "Credit Card",
          },
          {
            id: "ORD-1002",
            date: "2023-07-22T09:15:00Z",
            status: "Processing",
            total: 124.5,
            items: 2,
            payment: "PayPal",
          },
          {
            id: "ORD-1003",
            date: "2023-08-05T16:45:00Z",
            status: "Shipped",
            total: 349.99,
            items: 4,
            payment: "Credit Card",
          },
          {
            id: "ORD-1004",
            date: "2023-09-10T11:20:00Z",
            status: "Delivered",
            total: 99.99,
            items: 1,
            payment: "Cash on Delivery",
          },
          {
            id: "ORD-1005",
            date: "2023-10-18T13:10:00Z",
            status: "Cancelled",
            total: 199.99,
            items: 2,
            payment: "Credit Card",
          },
          {
            id: "ORD-1006",
            date: "2023-11-02T10:30:00Z",
            status: "Processing",
            total: 174.5,
            items: 3,
            payment: "Razorpay",
          },
          {
            id: "ORD-1007",
            date: "2023-12-12T15:45:00Z",
            status: "Shipped",
            total: 449.99,
            items: 5,
            payment: "Credit Card",
          },
        ];

        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (error) {
        toast.error("Failed to load orders");
        // If not authenticated, redirect to login
        navigate("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // Search orders
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOrders(orders);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.status.toLowerCase().includes(term) ||
          order.payment.toLowerCase().includes(term)
      );
      setFilteredOrders(filtered);
    }
    setPage(0); // Reset to first page on search
  }, [searchTerm, orders]);

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" component="h1" fontWeight="bold">
              My Orders
            </Typography>
            <Button
              component={RouterLink}
              to="/shop"
              variant="contained"
              color="primary"
            >
              Continue Shopping
            </Button>
          </Box>

          {orders.length === 0 ? (
            <Alert severity="info" sx={{ my: 3 }}>
              You haven't placed any orders yet. Start shopping to see your
              orders here.
            </Alert>
          ) : (
            <>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Search by order ID, status, or payment method"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {filteredOrders.length === 0 ? (
                <Alert severity="info">
                  No orders found matching "{searchTerm}".
                </Alert>
              ) : (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow
                          sx={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
                        >
                          <TableCell>
                            <Typography fontWeight="bold">Order ID</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="bold">Date</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="bold">Status</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="bold">Total</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="bold">Items</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="bold">Payment</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography fontWeight="bold">Actions</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(rowsPerPage > 0
                          ? filteredOrders.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                          : filteredOrders
                        ).map((order) => (
                          <TableRow key={order.id} hover>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{formatDate(order.date)}</TableCell>
                            <TableCell>
                              <Chip
                                label={order.status}
                                color={getStatusChipColor(order.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>{order.payment}</TableCell>
                            <TableCell>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<VisibilityIcon />}
                                onClick={() => handleViewOrder(order.id)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredOrders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}
            </>
          )}
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default Orders;
