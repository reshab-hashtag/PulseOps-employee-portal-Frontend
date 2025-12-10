import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} HRM System. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
