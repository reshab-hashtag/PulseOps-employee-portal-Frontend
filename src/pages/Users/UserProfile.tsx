import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Avatar,
    Divider,
    Button,
    Chip,
    CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';
// import { userService } from '../../services/userService';
import type { User } from '../../types/user.types';

const UserProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            try {
                // For now, simulate API call or use service if mock backend existed
                // const data = await userService.getById(id);
                // setUser(data);

                // Simulating response for demo
                setTimeout(() => {
                    setUser({
                        id: '1',
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'john.doe@example.com',
                        role: 'admin',
                        department: 'IT',
                        designation: 'Senior Developer',
                        status: 'active',
                        joinDate: '2023-01-15',
                        phoneNumber: '+1 234 567 8900'
                    });
                    setLoading(false);
                }, 1000);

            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return <Typography>User not found</Typography>;
    }

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/users')}
                sx={{ mb: 3 }}
            >
                Back to Users
            </Button>

            <Paper sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar
                            sx={{ width: 120, height: 120, mb: 2, fontSize: '3rem', bgcolor: 'primary.main' }}
                        >
                            {user.firstName[0]}
                        </Avatar>
                        <Typography variant="h5" fontWeight="600">
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            {user.designation}
                        </Typography>
                        <Chip
                            label={user.status.toUpperCase()}
                            color={user.status === 'active' ? 'success' : 'default'}
                            sx={{ mt: 1 }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="h6" gutterBottom>
                            Personal Information
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <EmailIcon color="action" sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Email</Typography>
                                        <Typography variant="body1">{user.email}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <PhoneIcon color="action" sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Phone</Typography>
                                        <Typography variant="body1">{user.phoneNumber || 'N/A'}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <BusinessIcon color="action" sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Department</Typography>
                                        <Typography variant="body1">{user.department}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <BadgeIcon color="action" sx={{ mr: 2 }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Role</Typography>
                                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{user.role}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default UserProfile;
