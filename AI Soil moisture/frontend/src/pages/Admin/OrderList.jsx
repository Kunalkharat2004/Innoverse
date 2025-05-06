import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

// Mock orders data
const mockOrders = [
  {
    id: "1001",
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh@example.com",
    date: "2023-12-01T12:30:00",
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "razorpay",
    total: 5890,
    items: 3,
  },
  {
    id: "1002",
    customerName: "Priya Sharma",
    customerEmail: "priya@example.com",
    date: "2023-12-02T14:45:00",
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "paypal",
    total: 3450,
    items: 2,
  },
  {
    id: "1003",
    customerName: "Amit Patel",
    customerEmail: "amit@example.com",
    date: "2023-12-03T09:15:00",
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "razorpay",
    total: 7200,
    items: 4,
  },
  {
    id: "1004",
    customerName: "Sunita Verma",
    customerEmail: "sunita@example.com",
    date: "2023-12-04T16:20:00",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "cod",
    total: 2100,
    items: 1,
  },
  {
    id: "1005",
    customerName: "Vikram Singh",
    customerEmail: "vikram@example.com",
    date: "2023-12-05T11:10:00",
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "paypal",
    total: 4950,
    items: 2,
  },
  {
    id: "1006",
    customerName: "Neha Gupta",
    customerEmail: "neha@example.com",
    date: "2023-12-06T13:40:00",
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "razorpay",
    total: 6300,
    items: 3,
  },
  {
    id: "1007",
    customerName: "Rahul Mishra",
    customerEmail: "rahul@example.com",
    date: "2023-12-07T10:25:00",
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "razorpay",
    total: 8150,
    items: 5,
  },
  {
    id: "1008",
    customerName: "Ananya Desai",
    customerEmail: "ananya@example.com",
    date: "2023-12-08T15:30:00",
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "paypal",
    total: 3890,
    items: 2,
  },
  {
    id: "1009",
    customerName: "Kiran Joshi",
    customerEmail: "kiran@example.com",
    date: "2023-12-09T09:50:00",
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "razorpay",
    total: 5400,
    items: 3,
  },
  {
    id: "1010",
    customerName: "Deepak Sharma",
    customerEmail: "deepak@example.com",
    date: "2023-12-10T12:15:00",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "cod",
    total: 2750,
    items: 1,
  },
  {
    id: "1011",
    customerName: "Meera Reddy",
    customerEmail: "meera@example.com",
    date: "2023-12-11T14:20:00",
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "paypal",
    total: 6950,
    items: 4,
  },
  {
    id: "1012",
    customerName: "Arjun Nair",
    customerEmail: "arjun@example.com",
    date: "2023-12-12T11:45:00",
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "razorpay",
    total: 4300,
    items: 2,
  },
];

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    // Simulate API fetch with a small delay
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter orders based on search term and filters
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatusFilter =
        statusFilter === "all" || order.status === statusFilter;
      const matchesPaymentStatusFilter =
        paymentStatusFilter === "all" ||
        order.paymentStatus === paymentStatusFilter;

      return matchesSearch && matchesStatusFilter && matchesPaymentStatusFilter;
    });

    setFilteredOrders(filtered);
    setPage(0); // Reset to first page when filters change
  }, [searchTerm, statusFilter, paymentStatusFilter, orders]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handlePaymentStatusFilterChange = (event) => {
    setPaymentStatusFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleActionClick = (order, type) => {
    setSelectedOrder(order);
    setActionType(type);
    setOpenActionDialog(true);
  };

  const handleActionConfirm = () => {
    // In a real app, you would call an API here
    let updatedOrders = [...orders];

    if (actionType === "ship") {
      updatedOrders = updatedOrders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: "shipped" } : order
      );
    } else if (actionType === "deliver") {
      updatedOrders = updatedOrders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: "delivered" }
          : order
      );
    } else if (actionType === "cancel") {
      updatedOrders = updatedOrders.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, status: "cancelled" }
          : order
      );
    }

    setOrders(updatedOrders);
    setOpenActionDialog(false);
  };

  const handleActionCancel = () => {
    setOpenActionDialog(false);
    setSelectedOrder(null);
    setActionType("");
  };

  // Function to get status chip color
  const getStatusChipColor = (status) => {
    switch (status) {
      case "delivered":
        return "success";
      case "shipped":
        return "info";
      case "processing":
        return "warning";
      case "pending":
        return "default";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  // Function to get payment status chip color
  const getPaymentStatusChipColor = (status) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "refunded":
        return "error";
      default:
        return "default";
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  // Get available status options for filter
  const statusOptions = [
    "all",
    ...new Set(orders.map((order) => order.status)),
  ];
  const paymentStatusOptions = [
    "all",
    ...new Set(orders.map((order) => order.paymentStatus)),
  ];

  // Display loading state
  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <Typography>Loading orders...</Typography>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Orders
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search orders by ID, customer name, or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: 350 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="status-filter-label">Order Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label="Order Status"
              startAdornment={
                <InputAdornment position="start">
                  <FilterIcon fontSize="small" />
                </InputAdornment>
              }
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="payment-status-filter-label">
              Payment Status
            </InputLabel>
            <Select
              labelId="payment-status-filter-label"
              value={paymentStatusFilter}
              onChange={handlePaymentStatusFilterChange}
              label="Payment Status"
              startAdornment={
                <InputAdornment position="start">
                  <FilterIcon fontSize="small" />
                </InputAdornment>
              }
            >
              {paymentStatusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status === "all"
                    ? "All Payment Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredOrders.length} orders
      </Typography>

      {/* Orders Table */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {order.customerName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.customerEmail}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        }
                        color={getStatusChipColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Chip
                          label={
                            order.paymentStatus.charAt(0).toUpperCase() +
                            order.paymentStatus.slice(1)
                          }
                          color={getPaymentStatusChipColor(order.paymentStatus)}
                          size="small"
                          sx={{ mb: 0.5 }}
                        />
                        <Typography variant="caption" display="block">
                          {order.paymentMethod === "paypal"
                            ? "PayPal"
                            : order.paymentMethod === "razorpay"
                            ? "Razorpay"
                            : order.paymentMethod === "cod"
                            ? "Cash on Delivery"
                            : order.paymentMethod}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>₹{order.total.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        to={`/admin/orders/${order.id}`}
                        color="primary"
                        size="small"
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton
                        size="small"
                        color="inherit"
                        aria-label="more"
                        id={`order-menu-${order.id}`}
                        onClick={() => {
                          // In this simplified example we'll just show the next logical action based on status
                          if (order.status === "pending") {
                            handleActionClick(order, "ship");
                          } else if (order.status === "processing") {
                            handleActionClick(order, "ship");
                          } else if (order.status === "shipped") {
                            handleActionClick(order, "deliver");
                          } else if (
                            ["pending", "processing", "shipped"].includes(
                              order.status
                            )
                          ) {
                            handleActionClick(order, "cancel");
                          }
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
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
      </Paper>

      {/* Action Confirmation Dialog */}
      <Dialog open={openActionDialog} onClose={handleActionCancel}>
        <DialogTitle>
          Confirm {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {actionType === "ship" &&
              `Are you sure you want to mark order #${selectedOrder?.id} as shipped?`}
            {actionType === "deliver" &&
              `Are you sure you want to mark order #${selectedOrder?.id} as delivered?`}
            {actionType === "cancel" &&
              `Are you sure you want to cancel order #${selectedOrder?.id}? This might trigger a refund process.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleActionCancel}>No, Cancel</Button>
          <Button
            onClick={handleActionConfirm}
            color={actionType === "cancel" ? "error" : "primary"}
            variant="contained"
          >
            Yes, {actionType.charAt(0).toUpperCase() + actionType.slice(1)}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default OrderList;
