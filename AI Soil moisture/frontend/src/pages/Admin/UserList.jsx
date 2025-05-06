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
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  ListItemIcon,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  AdminPanelSettings as AdminIcon,
  Person as PersonIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    role: "admin",
    status: "active",
    registeredDate: "2023-01-15T12:30:00",
    lastLogin: "2023-12-10T09:45:00",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "user",
    status: "active",
    registeredDate: "2023-02-20T10:15:00",
    lastLogin: "2023-12-09T14:20:00",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit@example.com",
    role: "user",
    status: "active",
    registeredDate: "2023-03-05T09:30:00",
    lastLogin: "2023-12-08T11:10:00",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Sunita Verma",
    email: "sunita@example.com",
    role: "user",
    status: "inactive",
    registeredDate: "2023-04-10T14:45:00",
    lastLogin: "2023-11-20T16:30:00",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram@example.com",
    role: "user",
    status: "active",
    registeredDate: "2023-05-15T11:00:00",
    lastLogin: "2023-12-07T10:25:00",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "6",
    name: "Neha Gupta",
    email: "neha@example.com",
    role: "admin",
    status: "active",
    registeredDate: "2023-06-22T13:15:00",
    lastLogin: "2023-12-08T09:40:00",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: "7",
    name: "Rahul Mishra",
    email: "rahul@example.com",
    role: "user",
    status: "blocked",
    registeredDate: "2023-07-30T16:20:00",
    lastLogin: "2023-10-15T14:00:00",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: "8",
    name: "Ananya Desai",
    email: "ananya@example.com",
    role: "user",
    status: "active",
    registeredDate: "2023-08-12T10:30:00",
    lastLogin: "2023-12-05T11:50:00",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "9",
    name: "Kiran Joshi",
    email: "kiran@example.com",
    role: "user",
    status: "active",
    registeredDate: "2023-09-05T09:00:00",
    lastLogin: "2023-12-04T15:30:00",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: "10",
    name: "Deepak Sharma",
    email: "deepak@example.com",
    role: "user",
    status: "active",
    registeredDate: "2023-10-18T14:10:00",
    lastLogin: "2023-12-01T12:20:00",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const openActionMenu = Boolean(actionMenuAnchorEl);

  useEffect(() => {
    // Simulate API fetch with a small delay
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter users based on search term and filters
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRoleFilter =
        roleFilter === "all" || user.role === roleFilter;
      const matchesStatusFilter =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRoleFilter && matchesStatusFilter;
    });

    setFilteredUsers(filtered);
    setPage(0); // Reset to first page when filters change
  }, [searchTerm, roleFilter, statusFilter, users]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
    handleCloseActionMenu();
  };

  const handleDeleteConfirm = () => {
    // In a real app, you would call an API here
    const updatedUsers = users.filter((u) => u.id !== userToDelete.id);
    setUsers(updatedUsers);
    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleOpenActionMenu = (event, user) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleCloseActionMenu = () => {
    setActionMenuAnchorEl(null);
  };

  const handleRoleChange = () => {
    setOpenRoleDialog(true);
    setNewRole(selectedUser.role);
    handleCloseActionMenu();
  };

  const handleStatusChange = () => {
    setOpenStatusDialog(true);
    setNewStatus(selectedUser.status);
    handleCloseActionMenu();
  };

  const handleRoleDialogClose = () => {
    setOpenRoleDialog(false);
  };

  const handleStatusDialogClose = () => {
    setOpenStatusDialog(false);
  };

  const handleRoleConfirm = () => {
    // In a real app, you would call an API here
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    setOpenRoleDialog(false);
  };

  const handleStatusConfirm = () => {
    // In a real app, you would call an API here
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    setOpenStatusDialog(false);
  };

  // Function to get status chip color
  const getStatusChipColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "default";
      case "blocked":
        return "error";
      default:
        return "default";
    }
  };

  // Function to get role chip color
  const getRoleChipColor = (role) => {
    switch (role) {
      case "admin":
        return "primary";
      case "user":
        return "info";
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

  // Get available role options for filter
  const roleOptions = ["all", ...new Set(users.map((user) => user.role))];
  const statusOptions = ["all", ...new Set(users.map((user) => user.status))];

  // Display loading state
  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <Typography>Loading users...</Typography>
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
          Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonIcon />}
          component={Link}
          to="/admin/users/add"
        >
          Add User
        </Button>
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
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: 300 } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="role-filter-label">Role</InputLabel>
            <Select
              labelId="role-filter-label"
              value={roleFilter}
              onChange={handleRoleFilterChange}
              label="Role"
              startAdornment={
                <InputAdornment position="start">
                  <FilterIcon fontSize="small" />
                </InputAdornment>
              }
            >
              {roleOptions.map((role) => (
                <MenuItem key={role} value={role}>
                  {role === "all"
                    ? "All Roles"
                    : role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label="Status"
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
        </Box>
      </Paper>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredUsers.length} users
      </Typography>

      {/* Users Table */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Registered</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          sx={{ mr: 2 }}
                        />
                        <Typography variant="body2" fontWeight="medium">
                          {user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        }
                        color={getRoleChipColor(user.role)}
                        size="small"
                        icon={
                          user.role === "admin" ? <AdminIcon /> : <PersonIcon />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)
                        }
                        color={getStatusChipColor(user.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatDate(user.registeredDate)}</TableCell>
                    <TableCell>{formatDate(user.lastLogin)}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        to={`/admin/users/edit/${user.id}`}
                        color="primary"
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="inherit"
                        aria-label="more"
                        id={`user-menu-${user.id}`}
                        aria-controls={openActionMenu ? "user-menu" : undefined}
                        aria-expanded={openActionMenu ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(event) => handleOpenActionMenu(event, user)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Action Menu */}
      <Menu
        id="user-menu"
        anchorEl={actionMenuAnchorEl}
        open={openActionMenu}
        onClose={handleCloseActionMenu}
        MenuListProps={{
          "aria-labelledby": "user-menu-button",
        }}
      >
        <MenuItem onClick={handleRoleChange}>
          <ListItemIcon>
            <AdminIcon fontSize="small" />
          </ListItemIcon>
          Change Role
        </MenuItem>
        <MenuItem onClick={handleStatusChange}>
          <ListItemIcon>
            {selectedUser?.status === "blocked" ? (
              <CheckCircleIcon fontSize="small" />
            ) : (
              <BlockIcon fontSize="small" />
            )}
          </ListItemIcon>
          Change Status
        </MenuItem>
        <MenuItem onClick={() => handleDeleteClick(selectedUser)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Delete User</Typography>
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user "{userToDelete?.name}"? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog open={openRoleDialog} onClose={handleRoleDialogClose}>
        <DialogTitle>Change User Role</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Change the role for user "{selectedUser?.name}".
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="new-role-label">Role</InputLabel>
            <Select
              labelId="new-role-label"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRoleDialogClose}>Cancel</Button>
          <Button
            onClick={handleRoleConfirm}
            color="primary"
            variant="contained"
          >
            Change Role
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Status Dialog */}
      <Dialog open={openStatusDialog} onClose={handleStatusDialogClose}>
        <DialogTitle>Change User Status</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Change the status for user "{selectedUser?.name}".
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="new-status-label">Status</InputLabel>
            <Select
              labelId="new-status-label"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStatusDialogClose}>Cancel</Button>
          <Button
            onClick={handleStatusConfirm}
            color="primary"
            variant="contained"
          >
            Change Status
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default UserList;
