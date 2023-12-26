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
import CreateFuelTire from "../pages/Mol/CreateFuelTire";

import CreatePengeluaran from "../pages/Mol/Pengeluaran/create";
import ListPengeluaran from "../pages/Mol/Pengeluaran/list";
import CetakPengeluaran from "../pages/Mol/Pengeluaran/cetak";

// FPB
import Fpb from "../pages/Fpb/List";
import DetailFpb from "../pages/Fpb/Details";
import CreateFpb from "../pages/Fpb/Create";
import CetakFpb from "../pages/Fpb/Cetak";
import CetakPq from "../pages/Fpb/Pq/Cetak";
// PO
import Po from "../pages/Po/List";
import CreatePo from "../pages/Po/Create";
import CetakPo from "../pages/Po/Cetak";
import DetailPo from "../pages/Po/Detail";
import PoLogistik from "../pages/PoLogistik/List";
import DetailPoLogistik from "../pages/PoLogistik/Detail";
// PENAWARAN
import CreatePenawaran from "../pages/Penawaran/Create";
import ListPenawaran from "../pages/Penawaran/List";
import DetailPenawaran from "../pages/Penawaran/Details";
import DetailPenawaranPemenang from "../pages/Pemenang/Detail";
// Finance
import FinancePiutang from "../pages/Finance/Piutang";
import FinanceMonitoringInvoice from "../pages/Finance/Monitoring/Invoice";
import FinanceMonitoringDetailInvoice from "../pages/Finance/Monitoring/Invoice/Detail";
import FinanceMonitoringPo from "../pages/Finance/Monitoring/Po";
import FinanceMonitoringTongkang from "../pages/Finance/Monitoring/Tongkang";
import FinanceMonitoringDetailTongkang from "../pages/Finance/Monitoring/Tongkang/Detail";

// Report
import ReportUnit from "../pages/Report/Unit";
import ReportBarangOut from "../pages/Report/BarangKeluar";
import ReportBarangIn from "../pages/Report/BarangMasuk";

// Report
import Carrier from "../pages/Carrier";
import Buyer from "../pages/Buyer";
import Unit from "../pages/Unit";

// KTT
import KttPo from "../pages/Ktt/Po/List";
import KttPoDetail from "../pages/Ktt/Po/Detail";
import KttPoRutin from "../pages/Ktt/Rutin/List";
import KttPoDetailRutin from "../pages/Ktt/Rutin/Detail";

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
  { path: "/mol/fuel-tire", component: <CreateFuelTire /> },

  { path: "/mol/pengeluaran", component: <ListPengeluaran /> },
  { path: "/mol/pengeluaran/create", component: <CreatePengeluaran /> },
  { path: "/mol/pengeluaran/cetak", component: <CetakPengeluaran /> },
  // FPB
  { path: "/fpb", component: <Fpb /> },
  { path: "/fpb/detail", component: <DetailFpb /> },
  { path: "/fpb/create", component: <CreateFpb /> },
  { path: "/fpb/cetak", component: <CetakFpb /> },
  { path: "/fpb/pq/cetak", component: <CetakPq /> },
  // PO
  { path: "/po", component: <Po /> },
  { path: "/po/create", component: <CreatePo /> },
  { path: "/po/cetak", component: <CetakPo /> },
  { path: "/po/detail", component: <DetailPo /> },
  { path: "/po-logistik", component: <PoLogistik /> },
  { path: "/po-logistik/detail", component: <DetailPoLogistik /> },
  // PENAWARAN
  { path: "/penawaran", component: <ListPenawaran /> },
  { path: "/penawaran/create", component: <CreatePenawaran /> },
  { path: "/penawaran/detail", component: <DetailPenawaran /> },
  { path: "/penawaran/pemenang", component: <DetailPenawaranPemenang /> },
  // Finance
  { path: "/finance/piutang", component: <FinancePiutang /> },
  { path: "/finance/monitoring/po", component: <FinanceMonitoringPo /> },
  { path: "/finance/monitoring/invoice", component: <FinanceMonitoringInvoice /> },
  { path: "/finance/monitoring/invoice/detail", component: <FinanceMonitoringDetailInvoice /> },
  { path: "/finance/monitoring/tongkang", component: <FinanceMonitoringTongkang /> },
  { path: "/finance/monitoring/tongkang/detail", component: <FinanceMonitoringDetailTongkang /> },
  // Report
  { path: "/report/unit", component: <ReportUnit /> },
  { path: "/report/barang-keluar", component: <ReportBarangOut /> },
  { path: "/report/barang-masuk", component: <ReportBarangIn /> },
  // Master
  { path: "/carrier", component: <Carrier /> },
  { path: "/buyer", component: <Buyer /> },
  { path: "/unit", component: <Unit /> },
  // PO KTT
  { path: "/po-ktt", component: <KttPo /> },
  { path: "/po-ktt/detail", component: <KttPoDetail /> },
  { path: "/po-ktt-rutin", component: <KttPoRutin /> },
  { path: "/po-ktt-rutin/detail", component: <KttPoDetailRutin /> },

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
