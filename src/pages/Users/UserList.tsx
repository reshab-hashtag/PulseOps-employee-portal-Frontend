import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    IconButton,
    TextField,
    InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import type { User, UserStatus } from '../../types/user.types';
import UserForm from './UserForm';
import { Pagination } from '@mui/material';
import { usePagination } from '../../hooks/usePagination';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';

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

    const { currentData, currentPage, maxPage, jump } = usePagination(filteredUsers, 5);

    const columns = [
        {
            id: 'name',
            label: 'Name',
            format: (_: unknown, row: User) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => navigate(`/users/${row.id}`)}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'primary.main' }}>
                        {row.firstName} {row.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {row.email}
                    </Typography>
                </Box>
            )
        },
        {
            id: 'role',
            label: 'Role',
            format: (value: unknown) => (
                <Chip
                    label={(value as string).toUpperCase()}
                    size="small"
                    color="primary"
                    variant="outlined"
                />
            )
        },
        { id: 'department', label: 'Department' },
        {
            id: 'status',
            label: 'Status',
            format: (value: unknown) => (
                <Chip
                    label={(value as string).replace('_', ' ').toUpperCase()}
                    size="small"
                    color={getStatusColor(value as UserStatus)}
                />
            )
        },
        { id: 'joinDate', label: 'Join Date' },
        {
            id: 'actions',
            label: 'Actions',
            align: 'right' as const,
            format: (_: unknown, row: User) => (
                <Box>
                    <IconButton size="small" onClick={() => navigate(`/users/${row.id}`)} title="View Profile">
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={() => handleEditUser(row)} title="Edit">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteUser(row.id)} title="Delete">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            )
        }
    ];

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

            <Table
                columns={columns}
                rows={currentData()}
            />

            {/* Pagination Controls */}
            {maxPage > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                        count={maxPage}
                        page={currentPage}
                        onChange={(_, page) => jump(page)}
                        color="primary"
                    />
                </Box>
            )}

            <Modal
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                title={selectedUser ? 'Edit User' : 'Add New User'}
                maxWidth="md"
            >
                <Box sx={{ mt: 1 }}>
                    <UserForm
                        initialValues={selectedUser}
                        onSubmit={handleSaveUser}
                        onCancel={() => setOpenDialog(false)}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default UserList;
