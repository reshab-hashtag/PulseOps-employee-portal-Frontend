import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { CircularProgress, Box } from '@mui/material';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Users = lazy(() => import('./pages/Users'));
const UserProfile = lazy(() => import('./pages/Users/UserProfile'));
const Login = lazy(() => import('./pages/Login'));

const Loading = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: 'users',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Users />
                    </Suspense>
                ),
            },
            {
                path: 'users/:id',
                element: (
                    <Suspense fallback={<Loading />}>
                        <UserProfile />
                    </Suspense>
                ),
            },
            {
                path: '*',
                element: (
                    <Box sx={{ p: 4 }}>Page Under Construction</Box>
                )
            }
        ],
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<Loading />}>
                <Login />
            </Suspense>
        ),
    },
]);

const AppRoutes: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
