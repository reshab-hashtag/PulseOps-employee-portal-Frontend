import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import LoadingSpinner from "./components/common/LoadingSpinner";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));
const UserProfile = lazy(() => import("./pages/Users/UserProfile"));
const Login = lazy(() => import("./pages/Login"));

const Loading = () => <LoadingSpinner fullScreen />;

const router = createBrowserRouter([
  {
    path: "/",
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
        path: "users",
        element: (
          <Suspense fallback={<Loading />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "users/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UserProfile />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Page Under Construction
            </h2>
            <p className="text-foreground-secondary">
              This page is coming soon.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    path: "/login",
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
