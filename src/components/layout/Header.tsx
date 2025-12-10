import React from 'react';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 260;

interface HeaderProps {
    handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleDrawerToggle }) => {
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                boxShadow: 'none',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                borderBottom: `1px solid ${theme.palette.divider}`
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar alt="User Name" src="/static/images/avatar/1.jpg" sx={{ bgcolor: theme.palette.secondary.main }}>U</Avatar>
                    <Typography variant="subtitle1" fontWeight={600} display={{ xs: 'none', sm: 'block' }}>Admin User</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
