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
// Dashboard Ecommerce
import DashboardEcommerceReducer from "./dashboardEcommerce/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Barang: BarangReducer,
  Mol: MolReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  DashboardEcommerce: DashboardEcommerceReducer,
});

export default rootReducer;
