import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
    message?: string;
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, fullScreen = false }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: fullScreen ? '100vh' : '100%',
                width: '100%',
                minHeight: fullScreen ? 'auto' : 200,
                gap: 2
            }}
        >
            <CircularProgress />
            {message && <Typography color="text.secondary">{message}</Typography>}
        </Box>
    );
};

export default LoadingSpinner;
