import React from 'react';
import type { ReactNode } from 'react';
import { Card as MuiCard, CardContent as MuiCardContent, Typography, Box } from '@mui/material';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    action?: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children, action }) => {
    return (
        <MuiCard elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {(title || action) && (
                <Box sx={{ p: 2, pb: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        {title && <Typography variant="h6" fontWeight="600">{title}</Typography>}
                        {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
                    </Box>
                    {action && <Box>{action}</Box>}
                </Box>
            )}
            <MuiCardContent sx={{ flexGrow: 1 }}>{children}</MuiCardContent>
        </MuiCard>
    );
};

export default Card;
