import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data) => api.create(url.POST_FAKE_REGISTER, data);

// Login Method
export const postLogin = (data) => api.create(url.POST_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data) => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data) => api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data) => api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message = "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Login Method
export const postJwtLogin = (data) => api.create(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data) => api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// get Barang
export const getBarang = () => api.get(url.GET_BARANG);
export const getMasterBarang = () => api.get(url.GET_MASTER_BARANG);
export const getKategoriBarang = () => api.get(url.GET_KATEGORI_BARANG);

// post Barang
export const addBarang = (data) => api.create(url.ADD_BARANG, data);
export const addKategori = (data) => api.create(url.ADD_KATEGORI, data);

// get MOL
export const getMol = (data) => api.create(url.GET_MOL, data);
export const addMol = (data) => api.create(url.ADD_MOL, data);
export const getComponentGroup = () => api.get(url.GET_COMPONENT_GROUP);
export const getMaterialType = () => api.get(url.GET_MATERIAL_TYPE);
export const getCostCode = () => api.get(url.GET_COST_CODE);

export const getPengeluaran = (data) => api.create(url.GET_PENGELUARAN, data);
export const addPengeluaran = (data) => api.create(url.ADD_PENGELUARAN, data);

// post MOL
export const addComponentGroup = (data) => api.create(url.ADD_COMPONENT_GROUP, data);
export const addMaterialType = (data) => api.create(url.ADD_MATERIAL_TYPE, data);
export const addCostCode = (data) => api.create(url.ADD_COST_CODE, data);
export const addMolFuelTire = (data) => api.create(url.ADD_MOL_FUEL_TIRE, data);

// FPB
export const getFpb = (data) => api.create(url.GET_FPB, data);
export const addFpb = (data) => api.create(url.ADD_FPB, data);
export const addPq = (data) => api.create(url.ADD_PQ, data);
export const getPq = (data) => api.create(url.GET_PQ, data);
export const postSpb = (data) => api.create(url.POST_SPB, data);
export const postSpbSite = (data) => api.create(url.POST_SPB_SITE, data);

// PO
export const getPo = (data) => api.create(url.GET_PO, data);
export const addPo = (data) => api.create(url.ADD_PO, data);
export const getReferensiPart = (data) => api.create(url.REFERENSI_PART, data);
export const getProcurementList = (data) => api.create(url.GET_PROCUREMENT_LIST, data);
export const postProcurementList = (data) => api.create(url.POST_PROCUREMENT_LIST, data);
export const getCartProcurementList = (data) => api.create(url.GET_CART_PROCUREMENT_LIST, data);

// VENDOR
export const getVendor = () => api.get(url.GET_VENDOR);
// PENAWARAN
export const getPenawaran = (data) => api.create(url.GET_PENAWARAN, data);
export const addPenawaran = (data) => api.create(url.POST_PENAWARAN, data);
export const tambahPenawaran = (data) => api.create(url.TAMBAH_PENAWARAN, data);
export const tunjukPenawaran = (data) => api.create(url.TUNJUK_PENAWARAN, data);
export const postPricePenawaran = (data) => api.create(url.POST_PRICE_PENAWARAN, data);

export const addDo = (data) => api.create(url.ADD_DO, data);

export const getPenawaranPq = (data) => api.create(url.GET_PENAWARAN_PQ, data);
// FINANCE
export const getFinancePo = (data) => api.create(url.GET_FINANCE_PO, data);
export const getFinanceTongkang = (data) => api.create(url.GET_FINANCE_TONGKANG, data);

export const postFinanceTongkang = (data) => api.create(url.POST_FINANCE_TONGKANG, data);
export const postFinanceTongkangDown = (data) => api.create(url.POST_FINANCE_TONGKANG_DOWN, data);
export const postFinanceTongkangPayment = (data) => api.create(url.POST_FINANCE_TONGKANG_PAYMENT, data);
export const postFinanceTongkangPort = (data) => api.create(url.POST_FINANCE_TONGKANG_PORT, data);

export const postPaymentRequest = (data) => api.create(url.POST_PAYMENT_REQUEST, data);
export const postRecapCart = (data) => api.create(url.POST_RECAP_CART, data);

export const getFinancePiutang = (data) => api.create(url.GET_FINANCE_PIUTANG, data);
export const getFinanceRecap = (data) => api.create(url.GET_FINANCE_RECAP, data);
// REPORT
export const getReportUnit = () => api.get(url.GET_REPORT_UNIT);
export const getReportBarangIn = (data) => api.create(url.GET_REPORT_BARANG_IN, data);
export const getReportBarangOut = (data) => api.create(url.GET_REPORT_BARANG_OUT, data);

export const getPenawaranPemenang = (data) => api.create(url.GET_PENAWARAN_PEMENANG, data);
export const addPemenangInvoice = (data) => api.create(url.POST_PEMENANG_INVOICE, data);

// GCS
export const postGcs = (data) => api.create(url.POST_GCS, data);
export const postFileGcs = (data) => api.create(url.POST_FILE_GCS, data);

// KTT
export const getKttPo = (data) => api.create(url.GET_KTT_PO, data);
export const postKttApprove = (data) => api.create(url.APPROVE_KTT_PO, data);
// LOGISTIK
export const getPoLogistik = (data) => api.create(url.GET_PO_LOGISTIK, data);
// MASTER DATA
export const getMasterPart = () => api.get(url.GET_MASTER_PART);
export const getMasterAlat = () => api.get(url.GET_MASTER_ALAT);

// DELIVER
export const getVendorKendari = (data) => api.create(url.GET_VENDOR_KENDARI, data);
export const postCekVendorKendari = (data) => api.create(url.POST_CEK_VENDOR_KENDARI, data);
export const getVendorSite = (data) => api.create(url.GET_VENDOR_SITE, data);
export const postDeliveVendorSite = (data) => api.create(url.POST_DELIVE_VENDOR_SITE, data);
export const postCekVendorSite = (data) => api.create(url.POST_CEK_VENDOR_SITE, data);
export const postDeliveVendorParsial = (data) => api.create(url.POST_DELIVE_VENDOR_PARSIAL, data);

export const getPartSpb = (data) => api.create(url.GET_PART_SPB, data);
export const getListSpb = (data) => api.create(url.GET_LIST_SPB, data);
export const getListGrPo = (data) => api.create(url.GET_LIST_GR_PO, data);

// USER
export const getUser = (data) => api.create(url.GET_USER, data);
export const getRole = () => api.get(url.GET_ROLE);
export const postRegister = (data) => api.create(url.POST_REGISTER, data);
export const postUserRole = (data) => api.create(url.POST_USER_ROLE, data);
export const postRole = (data) => api.create(url.POST_ROLE, data);
