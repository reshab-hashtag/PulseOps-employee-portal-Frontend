import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    TextField,
    Button,
    MenuItem,
    Grid
} from '@mui/material';
import type { User, UserRole } from '../../types/user.types';

interface UserFormProps {
    initialValues?: Partial<User>;
    onSubmit: (data: Partial<User>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const validationSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().oneOf(['admin', 'hr', 'employee', 'manager']).required('Role is required'),
    department: yup.string().required('Department is required'),
    designation: yup.string().required('Designation is required'),
    phoneNumber: yup.string(),
});

const UserForm: React.FC<UserFormProps> = ({ initialValues, onSubmit, onCancel, isLoading }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            role: 'employee' as UserRole,
            department: '',
            designation: '',
            phoneNumber: '',
            ...initialValues,
        },
    });

    useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="First Name"
                                fullWidth
                                error={!!errors.firstName}
                                helperText={errors.firstName?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Last Name"
                                fullWidth
                                error={!!errors.lastName}
                                helperText={errors.lastName?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email Address"
                                fullWidth
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                select
                                label="Role"
                                fullWidth
                                error={!!errors.role}
                                helperText={errors.role?.message}
                            >
                                <MenuItem value="employee">Employee</MenuItem>
                                <MenuItem value="manager">Manager</MenuItem>
                                <MenuItem value="hr">HR</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </TextField>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                        name="department"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Department"
                                fullWidth
                                error={!!errors.department}
                                helperText={errors.department?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                        name="designation"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Designation"
                                fullWidth
                                error={!!errors.designation}
                                helperText={errors.designation?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Phone Number"
                                fullWidth
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                <Button onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save User'}
                </Button>
            </Box>
        </form>
    );
};

export default UserForm;
