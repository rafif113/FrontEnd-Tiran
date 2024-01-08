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

// REPORT
export const GET_REPORT_UNIT = "/get/report/unit";
export const GET_REPORT_BARANG_IN = "/get/barangmasuk";
export const GET_REPORT_BARANG_OUT = "/get/barangkeluar";

export const GET_PENAWARAN_PEMENANG = "/get/penawaran/pemenang";
export const POST_PEMENANG_INVOICE = "/store/pemenang/invoice";

// GCS
export const POST_GCS = "/post/do/vendor/gcs";

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

// Calendar
export const GET_EVENTS = "/events";
export const GET_CATEGORIES = "/categories";
export const GET_UPCOMMINGEVENT = "/upcommingevents";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";

// Chat
export const GET_DIRECT_CONTACT = "/chat";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "add/message";
export const GET_CHANNELS = "/channels";
export const DELETE_MESSAGE = "delete/message";

//Mailbox
export const GET_MAIL_DETAILS = "/mail";
export const DELETE_MAIL = "/delete/mail";

// Ecommerce
// Product
export const GET_PRODUCTS = "/apps/product";
export const DELETE_PRODUCT = "/apps/product";
export const ADD_NEW_PRODUCT = "/apps/product";
export const UPDATE_PRODUCT = "/apps/product";

// Orders
export const GET_ORDERS = "/apps/order";
export const ADD_NEW_ORDER = "/apps/order";
export const UPDATE_ORDER = "/apps/order";
export const DELETE_ORDER = "/apps/order";

// Customers
export const GET_CUSTOMERS = "/apps/customer";
export const ADD_NEW_CUSTOMER = "/apps/customer";
export const UPDATE_CUSTOMER = "/apps/customer";
export const DELETE_CUSTOMER = "/apps/customer";

// Sellers
export const GET_SELLERS = "/sellers";

// Project list
export const GET_PROJECT_LIST = "/project/list";

// Task
export const GET_TASK_LIST = "/apps/task";
export const ADD_NEW_TASK = "/apps/task";
export const UPDATE_TASK = "/apps/task";
export const DELETE_TASK = "/apps/task";

// CRM
// Conatct
export const GET_CONTACTS = "/apps/contact";
export const ADD_NEW_CONTACT = "/apps/contact";
export const UPDATE_CONTACT = "/apps/contact";
export const DELETE_CONTACT = "/apps/contact";

// Companies
export const GET_COMPANIES = "/apps/company";
export const ADD_NEW_COMPANIES = "/apps/company";
export const UPDATE_COMPANIES = "/apps/company";
export const DELETE_COMPANIES = "/apps/company";

// Lead
export const GET_LEADS = "/apps/lead";
export const ADD_NEW_LEAD = "/apps/lead";
export const UPDATE_LEAD = "/apps/lead";
export const DELETE_LEAD = "/apps/lead";

// Deals
export const GET_DEALS = "/deals";

// Crypto
export const GET_TRANSACTION_LIST = "/transaction-list";
export const GET_ORDRER_LIST = "/order-list";

// Invoice
export const GET_INVOICES = "/apps/invoice";
export const ADD_NEW_INVOICE = "/apps/invoice";
export const UPDATE_INVOICE = "/apps/invoice";
export const DELETE_INVOICE = "/apps/invoice";

// TicketsList
export const GET_TICKETS_LIST = "/apps/ticket";
export const ADD_NEW_TICKET = "/apps/ticket";
export const UPDATE_TICKET = "/apps/ticket";
export const DELETE_TICKET = "/apps/ticket";

// Dashboard Analytics

// Sessions by Countries
export const GET_ALL_DATA = "/all-data";
export const GET_HALFYEARLY_DATA = "/halfyearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";

// Audiences Metrics
export const GET_ALLAUDIENCESMETRICS_DATA = "/allAudiencesMetrics-data";
export const GET_MONTHLYAUDIENCESMETRICS_DATA = "/monthlyAudiencesMetrics-data";
export const GET_HALFYEARLYAUDIENCESMETRICS_DATA = "/halfyearlyAudiencesMetrics-data";
export const GET_YEARLYAUDIENCESMETRICS_DATA = "/yearlyAudiencesMetrics-data";

// Users by Device
export const GET_TODAYDEVICE_DATA = "/todayDevice-data";
export const GET_LASTWEEKDEVICE_DATA = "/lastWeekDevice-data";
export const GET_LASTMONTHDEVICE_DATA = "/lastMonthDevice-data";
export const GET_CURRENTYEARDEVICE_DATA = "/currentYearDevice-data";

// Audiences Sessions by Country
export const GET_TODAYSESSION_DATA = "/todaySession-data";
export const GET_LASTWEEKSESSION_DATA = "/lastWeekSession-data";
export const GET_LASTMONTHSESSION_DATA = "/lastMonthSession-data";
export const GET_CURRENTYEARSESSION_DATA = "/currentYearSession-data";

// Dashboard CRM

// Balance Overview
export const GET_TODAYBALANCE_DATA = "/todayBalance-data";
export const GET_LASTWEEKBALANCE_DATA = "/lastWeekBalance-data";
export const GET_LASTMONTHBALANCE_DATA = "/lastMonthBalance-data";
export const GET_CURRENTYEARBALANCE_DATA = "/currentYearBalance-data";

// Deal type
export const GET_TODAYDEAL_DATA = "/todayDeal-data";
export const GET_WEEKLYDEAL_DATA = "/weeklyDeal-data";
export const GET_MONTHLYDEAL_DATA = "/monthlyDeal-data";
export const GET_YEARLYDEAL_DATA = "/yearlyDeal-data";

// Sales Forecast

export const GET_OCTSALES_DATA = "/octSales-data";
export const GET_NOVSALES_DATA = "/novSales-data";
export const GET_DECSALES_DATA = "/decSales-data";
export const GET_JANSALES_DATA = "/janSales-data";

// Dashboard Ecommerce
// Revenue
export const GET_ALLREVENUE_DATA = "/allRevenue-data";
export const GET_MONTHREVENUE_DATA = "/monthRevenue-data";
export const GET_HALFYEARREVENUE_DATA = "/halfYearRevenue-data";
export const GET_YEARREVENUE_DATA = "/yearRevenue-data";

// Dashboard Crypto
// Portfolio
export const GET_BTCPORTFOLIO_DATA = "/btcPortfolio-data";
export const GET_USDPORTFOLIO_DATA = "/usdPortfolio-data";
export const GET_EUROPORTFOLIO_DATA = "/euroPortfolio-data";

// Market Graph
export const GET_ALLMARKETDATA_DATA = "/allMarket-data";
export const GET_YEARMARKET_DATA = "/yearMarket-data";
export const GET_MONTHMARKET_DATA = "/monthMarket-data";
export const GET_WEEKMARKET_DATA = "/weekMarket-data";
export const GET_HOURMARKET_DATA = "/hourMarket-data";

// Dashboard Crypto
// Project Overview
export const GET_ALLPROJECT_DATA = "/allProject-data";
export const GET_MONTHPROJECT_DATA = "/monthProject-data";
export const GET_HALFYEARPROJECT_DATA = "/halfYearProject-data";
export const GET_YEARPROJECT_DATA = "/yearProject-data";

// Project Status
export const GET_ALLPROJECTSTATUS_DATA = "/allProjectStatus-data";
export const GET_WEEKPROJECTSTATUS_DATA = "/weekProjectStatus-data";
export const GET_MONTHPROJECTSTATUS_DATA = "/monthProjectStatus-data";
export const GET_QUARTERPROJECTSTATUS_DATA = "/quarterProjectStatus-data";

// Dashboard NFT
// Marketplace
export const GET_ALLMARKETPLACE_DATA = "/allMarketplace-data";
export const GET_MONTHMARKETPLACE_DATA = "/monthMarketplace-data";
export const GET_HALFYEARMARKETPLACE_DATA = "/halfYearMarketplace-data";
export const GET_YEARMARKETPLACE_DATA = "/yearMarketplace-data";

// Project
export const ADD_NEW_PROJECT = "/add/project";
export const UPDATE_PROJECT = "/update/project";
export const DELETE_PROJECT = "/delete/project";

// Pages > Team
export const GET_TEAMDATA = "/teamData";
export const DELETE_TEAMDATA = "/delete/teamData";
export const ADD_NEW_TEAMDATA = "/add/teamData";
export const UPDATE_TEAMDATA = "/update/teamData";

// File Manager
// Folder
export const GET_FOLDERS = "/folder";
export const DELETE_FOLDER = "/delete/folder";
export const ADD_NEW_FOLDER = "/add/folder";
export const UPDATE_FOLDER = "/update/folder";

// File
export const GET_FILES = "/file";
export const DELETE_FILE = "/delete/file";
export const ADD_NEW_FILE = "/add/file";
export const UPDATE_FILE = "/update/file";

// To do
export const GET_TODOS = "/todo";
export const DELETE_TODO = "/delete/todo";
export const ADD_NEW_TODO = "/add/todo";
export const UPDATE_TODO = "/update/todo";

// To do Project
export const GET_PROJECTS = "/projects";
export const ADD_NEW_TODO_PROJECT = "/add/project";

//JOB APPLICATION
export const GET_APPLICATION_LIST = "/application-list";

//JOB APPLICATION
export const GET_API_KEY = "/api-key";
