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
import Mol from "../pages/Mol/List";
import CreateMol from "../pages/Mol/Create";
import CetakMol from "../pages/Mol/Details";
import DetailMol from "../pages/Mol/Details/detail";

// FPB
import CreateFpb from "../pages/Fpb/CreateFpb";

const authProtectedRoutes = [
  // User Profile
  { path: "/profile", component: <UserProfile /> },
  // Dashboard
  { path: "/dashboard", component: <DashboardEcommerce /> },
  { path: "/index", component: <DashboardEcommerce /> },
  // Master Barang
  { path: "/barang", component: <ListBarang /> },
  { path: "/barang/create", component: <CreateBarang /> },
  // MOL
  { path: "/mol", component: <Mol /> },
  { path: "/mol/create", component: <CreateMol /> },
  { path: "/mol/cetak", component: <CetakMol /> },
  { path: "/mol/detail", component: <DetailMol /> },
  // FPB
  { path: "/fpb/create", component: <CreateFpb /> },
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
