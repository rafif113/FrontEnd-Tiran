import React from "react";
import { Navigate } from "react-router-dom";

//Auth
import Login from "../pages/Authentication/Login";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
// User Profile
import UserProfile from "../pages/Authentication/user-profile";
//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";
// Master Barang
import CreateBarang from "../pages/Barang/CreateBarang";
import ListBarang from "../pages/Barang/ListBarang";
// MOL
import Mol from "../pages/Mol";

// FPB
import CreateFpb from "../pages/Fpb/CreateFpb";

const authProtectedRoutes = [
  // User Profile
  { path: "/profile", component: <UserProfile /> },
  // Dashboard
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },
  // Master Barang
  { path: "/create-barang", component: <CreateBarang /> },
  { path: "/list-barang", component: <ListBarang /> },
  // MOL
  { path: "/create-mol", component: <Mol /> },
  // FPB
  { path: "/create-fpb", component: <CreateFpb /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
