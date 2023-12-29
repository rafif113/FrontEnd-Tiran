import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";
// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
// Barang
import BarangReducer from "./barang/reducer";
// MOL
import MolReducer from "./mol/reducer";
// FPB
import FpbReducer from "./fpb/reducer";
// PO
import PoReducer from "./po/reducer";
// VENDOR
import VendorReducer from "./vendor/reducer";
// PENAWARAN
import PenawaranReducer from "./penawaran/reducer";
// FINANCE
import FinanceReducer from "./finance/reducer";
import ReportReducer from "./report/reducer";
// KTT
import KttReducer from "./ktt/reducer";
// MASTER
import MasterReducer from "./master/reducer";
// DELIVER
import DeliverReducer from "./deliver/reducer";
// Dashboard Ecommerce
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Barang: BarangReducer,
  Mol: MolReducer,
  Fpb: FpbReducer,
  Po: PoReducer,
  Vendor: VendorReducer,
  Penawaran: PenawaranReducer,
  Finance: FinanceReducer,
  Report: ReportReducer,
  Ktt: KttReducer,
  Master: MasterReducer,
  Deliver: DeliverReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  DashboardEcommerce: DashboardEcommerceReducer,
});

export default rootReducer;
