//REGISTER
export const POST_FAKE_REGISTER = "/auth/signup";

//LOGIN
export const POST_LOGIN = "/login";
// export const POST_LOGIN = "/auth/signin";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/auth/forgot-password";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

// Barang
export const GET_BARANG = "/barang";
export const GET_MASTER_BARANG = "/master/barang";
export const ADD_BARANG = "/store/barang";

export const GET_KATEGORI_BARANG = "/barang_kategori";
export const ADD_KATEGORI = "/store/kategori";

// MOL
export const GET_MOL = "/get/mol";
export const ADD_MOL = "/store/mol";
export const GET_COMPONENT_GROUP = "/get/master/componen_group";
export const ADD_COMPONENT_GROUP = "/store/master/componen_group";
export const ADD_MOL_FUEL_TIRE = "/post/request/ar";

export const GET_PENGELUARAN = "/get/mol/pengeluaran";
export const ADD_PENGELUARAN = "/sote/mol/pengeluaran";
// FPB
export const GET_FPB = "/get/fpb";
export const ADD_FPB = "/store/fpb";
export const ADD_PQ = "/store/fpb/pq";
export const GET_PQ = "/get/detail/pq";

// PO
export const GET_PO = "/get/po";
export const ADD_PO = "/store/po";
export const GET_PROCUREMENT_LIST = "/get/procurementlist";
export const POST_PROCUREMENT_LIST = "/post/procurementlist";
export const GET_CART_PROCUREMENT_LIST = "/get/paymentrequestDetail";
export const REFERENSI_PART = "/referensi/part";

export const GET_MATERIAL_TYPE = "/get/master/material_type";
export const ADD_MATERIAL_TYPE = "/store/master/material_type";

export const GET_COST_CODE = "/get/master/cost_code";
export const ADD_COST_CODE = "/store/master/cost_code";

// VENDOR
export const GET_VENDOR = "/get/list/vendor";
export const ADD_DO = "/get/request/do";

// PENAWARAN
// '/get/fpb/pq
export const GET_PENAWARAN = "/get/fpb/pq";
// export const POST_PRICE_PQ = "/store/pq/price";
export const POST_PENAWARAN = "/store/penawaran";
export const TAMBAH_PENAWARAN = "/add/po/penawaran";
export const TUNJUK_PENAWARAN = "/tunjuk/po/penawaran";
// export const POST_PRICE_PENAWARAN = "/store/penawaran/venodr/price";
export const POST_PRICE_PENAWARAN = "/store/pq/price";
export const GET_PENAWARAN_PQ = "/get/list/penawaranpq";

// FINANCE
export const GET_FINANCE_PO = "/get/finance/po/validate";

export const GET_FINANCE_TONGKANG = "/get/finance/tongkang";
export const POST_FINANCE_TONGKANG = "/post/finance/tongkang";
export const POST_FINANCE_TONGKANG_DOWN = "/post/finance/tongkang/down_p";
export const POST_FINANCE_TONGKANG_PAYMENT = "/post/finance/tongkang/final_payment";
export const POST_FINANCE_TONGKANG_PORT = "/post/finance/tongkang/sd_port";
export const POST_PAYMENT_REQUEST = "/post/paymentrequest";
export const POST_RECAP_CART = "/get/recapcart";
export const GET_FINANCE_PIUTANG = "/get/piutang/po";

export const GET_FINANCE_RECAP = "/get/uploadrecapcart";

// REPORT
export const GET_REPORT_UNIT = "/get/report/unit";
export const GET_REPORT_BARANG_IN = "/get/barangmasuk";
export const GET_REPORT_BARANG_OUT = "/get/barangkeluar";

export const GET_PENAWARAN_PEMENANG = "/get/penawaran/pemenang";
export const POST_PEMENANG_INVOICE = "/store/pemenang/invoice";

// GCS
export const POST_GCS = "/post/do/vendor/gcs";
export const POST_FILE_GCS = "/post/file/gcs";

// KTT
export const GET_KTT_PO = "/post/ktt/po";
export const APPROVE_KTT_PO = "/post/ktt/approve";

// LOGISTIK
export const GET_PO_LOGISTIK = "/get/po/logistik";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/user";

// MASTER DATA
export const GET_MASTER_PART = "/get/master/part";
export const GET_MASTER_ALAT = "/get/master/alatberat";

// Deliver
export const GET_VENDOR_KENDARI = "/get/delive/vendorkendari";
export const POST_CEK_VENDOR_KENDARI = "/post/cek/vendorkendari";
export const GET_VENDOR_SITE = "/get/delive/site";
export const POST_DELIVE_VENDOR_SITE = "/post/delive/site";
export const POST_CEK_VENDOR_SITE = "/post/cek/site/barang";
export const POST_DELIVE_VENDOR_PARSIAL = "/post/delive/vendorkendari/parsial";
export const GET_PART_SPB = "/get/part/spb";
export const GET_LIST_SPB = "/get/spb";
export const POST_SPB = "/post/spb";
export const POST_SPB_SITE = "/post/spb/site";
export const GET_LIST_GR_PO = "/get/po/grpo";

// USER
export const GET_USER = "/all/user";
export const GET_ROLE = "/role";
export const POST_REGISTER = "/register";
export const POST_ROLE = "/user/role";
export const POST_USER_ROLE = "/user/add_role";
