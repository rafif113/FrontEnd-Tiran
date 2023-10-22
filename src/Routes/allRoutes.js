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

import CreatePengeluaran from "../pages/Mol/Pengeluaran/create";
import ListPengeluaran from "../pages/Mol/Pengeluaran/list";
import CetakPengeluaran from "../pages/Mol/Pengeluaran/cetak";

// FPB
import Fpb from "../pages/Fpb/List";
import DetailFpb from "../pages/Fpb/Details";
import CreateFpb from "../pages/Fpb/Create";
import CetakFpb from "../pages/Fpb/Cetak";
// PO
import Po from "../pages/Po/List";
import CreatePo from "../pages/Po/Create";
import CetakPo from "../pages/Po/Cetak";
// import Fpb from "../pages/Fpb/List";

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

  { path: "/mol/pengeluaran", component: <ListPengeluaran /> },
  { path: "/mol/pengeluaran/create", component: <CreatePengeluaran /> },
  { path: "/mol/pengeluaran/cetak", component: <CetakPengeluaran /> },
  // FPB
  { path: "/fpb", component: <Fpb /> },
  { path: "/fpb/detail", component: <DetailFpb /> },
  { path: "/fpb/create", component: <CreateFpb /> },
  { path: "/fpb/cetak", component: <CetakFpb /> },
  // PO
  { path: "/po", component: <Po /> },
  { path: "/po/create", component: <CreatePo /> },
  { path: "/po/cetak", component: <CetakPo /> },

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
