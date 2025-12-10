import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';

const Dashboard: React.FC = () => {
    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 200 }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Total Employees
                        </Typography>
                        <Typography variant="h3">
                            156
                        </Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 200 }}>
                        <Typography variant="h6" color="secondary" gutterBottom>
                            Attendance Today
                        </Typography>
                        <Typography variant="h3">
                            142
                        </Typography>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 200 }}>
                        <Typography variant="h6" color="warning.main" gutterBottom>
                            Pending Leaves
                        </Typography>
                        <Typography variant="h3">
                            8
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
