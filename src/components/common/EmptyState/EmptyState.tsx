import React from 'react';
import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: ReactNode;
    action?: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No Data Found',
    description = 'There are no items to display.',
    icon = <InboxIcon sx={{ fontSize: 60, color: 'text.disabled' }} />,
    action
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                textAlign: 'center',
                height: '100%',
                minHeight: 200
            }}
        >
            <Box sx={{ mb: 2 }}>{icon}</Box>
            <Typography variant="h6" fontWeight="600" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
                {description}
            </Typography>
            {action && <Box>{action}</Box>}
        </Box>
    );
};

export default EmptyState;
