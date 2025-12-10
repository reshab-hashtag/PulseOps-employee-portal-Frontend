import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
    Dialog,
    DialogContent,
    DialogTitle
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import type { User, UserStatus } from '../../types/user.types';
import UserForm from './UserForm';

// Mock data for demonstration until API is ready
const INITIAL_USERS: User[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        department: 'IT',
        designation: 'Senior Developer',
        status: 'active',
        joinDate: '2023-01-15',
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'hr',
        department: 'Human Resources',
        designation: 'HR Manager',
        status: 'active',
        joinDate: '2023-03-10',
    },
    {
        id: '3',
        firstName: 'Robert',
        lastName: 'Brown',
        email: 'robert.brown@example.com',
        role: 'employee',
        department: 'Finance',
        designation: 'Accountant',
        status: 'on_leave',
        joinDate: '2023-06-20',
    },
];

const UserList: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>(INITIAL_USERS);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<Partial<User> | undefined>(undefined);

    const getStatusColor = (status: UserStatus) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'inactive':
                return 'default';
            case 'on_leave':
                return 'warning';
            default:
                return 'default';
        }
    };

    const handleAddUser = () => {
        setSelectedUser(undefined);
        setOpenDialog(true);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleDeleteUser = (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleSaveUser = (data: Partial<User>) => {
        if (selectedUser?.id) {
            // Edit
            setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...data } as User : u));
        } else {
            // Create
            const newUser: User = {
                ...data,
                id: Math.random().toString(36).substr(2, 9),
                status: 'active',
                joinDate: new Date().toISOString().split('T')[0],
            } as User;
            setUsers([...users, newUser]);
        }
        setOpenDialog(false);
    };

    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="600">
                    Users
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddUser}
                >
                    Add User
                </Button>
            </Box>

            <Paper sx={{ mb: 3, p: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 500 }}
                />
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Join Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id} hover>
                                <TableCell>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => navigate(`/users/${user.id}`)}>
                                        <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'primary.main' }}>
                                            {user.firstName} {user.lastName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {user.email}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role.toUpperCase()}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>{user.department}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.status.replace('_', ' ').toUpperCase()}
                                        size="small"
                                        color={getStatusColor(user.status)}
                                    />
                                </TableCell>
                                <TableCell>{user.joinDate}</TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" onClick={() => navigate(`/users/${user.id}`)} title="View Profile">
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="primary" onClick={() => handleEditUser(user)} title="Edit">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.id)} title="Delete">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                                    <Typography color="text.secondary">No users found</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>{selectedUser ? 'Edit User' : 'Add New User'}</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 1 }}>
                        <UserForm
                            initialValues={selectedUser}
                            onSubmit={handleSaveUser}
                            onCancel={() => setOpenDialog(false)}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default UserList;
