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
// postSocialLogin
export const postSocialLogin = (data) => api.create(url.SOCIAL_LOGIN, data);

// Calendar
// get Events
export const getEvents = () => api.get(url.GET_EVENTS);

// get Events
export const getCategories = () => api.get(url.GET_CATEGORIES);

// get Upcomming Events
export const getUpCommingEvent = () => api.get(url.GET_UPCOMMINGEVENT);

// add Events
export const addNewEvent = (event) => api.create(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = (event) => api.put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = (event) => api.delete(url.DELETE_EVENT, { headers: { event } });

// Chat
// get Contact
export const getDirectContact = () => api.get(url.GET_DIRECT_CONTACT);

// get Messages
export const getMessages = (roomId) => api.get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// add Message
export const addMessage = (message) => api.create(url.ADD_MESSAGE, message);

// add Message
export const deleteMessage = (message) => api.delete(url.DELETE_MESSAGE, { headers: { message } });

// get Channels
export const getChannels = () => api.get(url.GET_CHANNELS);

// MailBox
//get Mail
export const getMailDetails = () => api.get(url.GET_MAIL_DETAILS);

// delete Mail
export const deleteMail = (forId) => api.delete(url.DELETE_MAIL, { headers: { forId } });

// Ecommerce
// get Products
export const getProducts = () => api.get(url.GET_PRODUCTS);

// delete Product
export const deleteProducts = (product) => api.delete(url.DELETE_PRODUCT + "/" + product);

// add Products
export const addNewProduct = (product) => api.create(url.ADD_NEW_PRODUCT, product);

// update Products
export const updateProduct = (product) => api.update(url.UPDATE_PRODUCT + "/" + product._id, product);

// get Orders
export const getOrders = () => api.get(url.GET_ORDERS);

// add Order
export const addNewOrder = (order) => api.create(url.ADD_NEW_ORDER, order);

// update Order
export const updateOrder = (order) => api.update(url.UPDATE_ORDER + "/" + order._id, order);

// delete Order
export const deleteOrder = (order) => api.delete(url.DELETE_ORDER + "/" + order);

// get Customers
export const getCustomers = () => api.get(url.GET_CUSTOMERS);

// add Customers
export const addNewCustomer = (customer) => api.create(url.ADD_NEW_CUSTOMER, customer);

// update Customers
export const updateCustomer = (customer) => api.update(url.UPDATE_CUSTOMER + "/" + customer._id, customer);

// delete Customers
export const deleteCustomer = (customer) => api.delete(url.DELETE_CUSTOMER + "/" + customer);

// get Sellers
export const getSellers = () => api.get(url.GET_SELLERS);

// Project
// get Project list
export const getProjectList = () => api.get(url.GET_PROJECT_LIST);

// Tasks
// get Task
export const getTaskList = () => api.get(url.GET_TASK_LIST);

// add Task
export const addNewTask = (task) => api.create(url.ADD_NEW_TASK, task);

// update Task
export const updateTask = (task) => api.update(url.UPDATE_TASK + "/" + task._id, task);

// delete Task
export const deleteTask = (task) => api.delete(url.DELETE_TASK + "/" + task);

// CRM
// get Contacts
export const getContacts = () => api.get(url.GET_CONTACTS);

// add Contact
export const addNewContact = (contact) => api.create(url.ADD_NEW_CONTACT, contact);

// update Contact
export const updateContact = (contact) => api.update(url.UPDATE_CONTACT + "/" + contact._id, contact);

// delete Contact
export const deleteContact = (contact) => api.delete(url.DELETE_CONTACT + "/" + contact);

// get Companies
export const getCompanies = () => api.get(url.GET_COMPANIES);

// add Companies
export const addNewCompanies = (company) => api.create(url.ADD_NEW_COMPANIES, company);

// update Companies
export const updateCompanies = (company) => api.update(url.UPDATE_COMPANIES + "/" + company._id, company);

// delete Companies
export const deleteCompanies = (company) => api.delete(url.DELETE_COMPANIES + "/" + company);

// get Deals
export const getDeals = () => api.get(url.GET_DEALS);

// get Leads
export const getLeads = () => api.get(url.GET_LEADS);

// add Lead
export const addNewLead = (lead) => api.create(url.ADD_NEW_LEAD, lead);

// update Lead
export const updateLead = (lead) => api.update(url.UPDATE_LEAD + "/" + lead._id, lead);

// delete Lead
export const deleteLead = (lead) => api.delete(url.DELETE_LEAD + "/" + lead);

// Crypto
// Transation
export const getTransationList = () => api.get(url.GET_TRANSACTION_LIST);

// Order List
export const getOrderList = () => api.get(url.GET_ORDRER_LIST);

// Invoice
//get Invoice
export const getInvoices = () => api.get(url.GET_INVOICES);

// add Invoice
export const addNewInvoice = (invoice) => api.create(url.ADD_NEW_INVOICE, invoice);

// update Invoice
export const updateInvoice = (invoice) => api.update(url.UPDATE_INVOICE + "/" + invoice._id, invoice);

// delete Invoice
export const deleteInvoice = (invoice) => api.delete(url.DELETE_INVOICE + "/" + invoice);

// Support Tickets
// Tickets
export const getTicketsList = () => api.get(url.GET_TICKETS_LIST);

// add Tickets
export const addNewTicket = (ticket) => api.create(url.ADD_NEW_TICKET, ticket);

// update Tickets
export const updateTicket = (ticket) => api.update(url.UPDATE_TICKET + "/" + ticket._id, ticket);

// delete Tickets
export const deleteTicket = (ticket) => api.delete(url.DELETE_TICKET + "/" + ticket);

// Dashboard Analytics

// Sessions by Countries
export const getAllData = () => api.get(url.GET_ALL_DATA);
export const getHalfYearlyData = () => api.get(url.GET_HALFYEARLY_DATA);
export const getMonthlyData = () => api.get(url.GET_MONTHLY_DATA);

// Audiences Metrics
export const getAllAudiencesMetricsData = () => api.get(url.GET_ALLAUDIENCESMETRICS_DATA);
export const getMonthlyAudiencesMetricsData = () => api.get(url.GET_MONTHLYAUDIENCESMETRICS_DATA);
export const getHalfYearlyAudiencesMetricsData = () => api.get(url.GET_HALFYEARLYAUDIENCESMETRICS_DATA);
export const getYearlyAudiencesMetricsData = () => api.get(url.GET_YEARLYAUDIENCESMETRICS_DATA);

// Users by Device
export const getTodayDeviceData = () => api.get(url.GET_TODAYDEVICE_DATA);
export const getLastWeekDeviceData = () => api.get(url.GET_LASTWEEKDEVICE_DATA);
export const getLastMonthDeviceData = () => api.get(url.GET_LASTMONTHDEVICE_DATA);
export const getCurrentYearDeviceData = () => api.get(url.GET_CURRENTYEARDEVICE_DATA);

// Audiences Sessions by Country
export const getTodaySessionData = () => api.get(url.GET_TODAYSESSION_DATA);
export const getLastWeekSessionData = () => api.get(url.GET_LASTWEEKSESSION_DATA);
export const getLastMonthSessionData = () => api.get(url.GET_LASTMONTHSESSION_DATA);
export const getCurrentYearSessionData = () => api.get(url.GET_CURRENTYEARSESSION_DATA);

// Dashboard CRM

// Balance Overview
export const getTodayBalanceData = () => api.get(url.GET_TODAYBALANCE_DATA);
export const getLastWeekBalanceData = () => api.get(url.GET_LASTWEEKBALANCE_DATA);
export const getLastMonthBalanceData = () => api.get(url.GET_LASTMONTHBALANCE_DATA);
export const getCurrentYearBalanceData = () => api.get(url.GET_CURRENTYEARBALANCE_DATA);

// Dial Type
export const getTodayDealData = () => api.get(url.GET_TODAYDEAL_DATA);
export const getWeeklyDealData = () => api.get(url.GET_WEEKLYDEAL_DATA);
export const getMonthlyDealData = () => api.get(url.GET_MONTHLYDEAL_DATA);
export const getYearlyDealData = () => api.get(url.GET_YEARLYDEAL_DATA);

// Sales Forecast
export const getOctSalesData = () => api.get(url.GET_OCTSALES_DATA);
export const getNovSalesData = () => api.get(url.GET_NOVSALES_DATA);
export const getDecSalesData = () => api.get(url.GET_DECSALES_DATA);
export const getJanSalesData = () => api.get(url.GET_JANSALES_DATA);

// Dashboard Ecommerce
// Revenue
export const getAllRevenueData = () => api.get(url.GET_ALLREVENUE_DATA);
export const getMonthRevenueData = () => api.get(url.GET_MONTHREVENUE_DATA);
export const getHalfYearRevenueData = () => api.get(url.GET_HALFYEARREVENUE_DATA);
export const getYearRevenueData = () => api.get(url.GET_YEARREVENUE_DATA);

// Dashboard Crypto
// Portfolio
export const getBtcPortfolioData = () => api.get(url.GET_BTCPORTFOLIO_DATA);
export const getUsdPortfolioData = () => api.get(url.GET_USDPORTFOLIO_DATA);
export const getEuroPortfolioData = () => api.get(url.GET_EUROPORTFOLIO_DATA);

// Market Graph
export const getAllMarketData = () => api.get(url.GET_ALLMARKETDATA_DATA);
export const getYearMarketData = () => api.get(url.GET_YEARMARKET_DATA);
export const getMonthMarketData = () => api.get(url.GET_MONTHMARKET_DATA);
export const getWeekMarketData = () => api.get(url.GET_WEEKMARKET_DATA);
export const getHourMarketData = () => api.get(url.GET_HOURMARKET_DATA);

// Dashboard Project
// Project Overview
export const getAllProjectData = () => api.get(url.GET_ALLPROJECT_DATA);
export const getMonthProjectData = () => api.get(url.GET_MONTHPROJECT_DATA);
export const gethalfYearProjectData = () => api.get(url.GET_HALFYEARPROJECT_DATA);
export const getYearProjectData = () => api.get(url.GET_YEARPROJECT_DATA);

// Project Status
export const getAllProjectStatusData = () => api.get(url.GET_ALLPROJECTSTATUS_DATA);
export const getWeekProjectStatusData = () => api.get(url.GET_WEEKPROJECTSTATUS_DATA);
export const getMonthProjectStatusData = () => api.get(url.GET_MONTHPROJECTSTATUS_DATA);
export const getQuarterProjectStatusData = () => api.get(url.GET_QUARTERPROJECTSTATUS_DATA);

// Dashboard NFT
// Marketplace
export const getAllMarketplaceData = () => api.get(url.GET_ALLMARKETPLACE_DATA);
export const getMonthMarketplaceData = () => api.get(url.GET_MONTHMARKETPLACE_DATA);
export const gethalfYearMarketplaceData = () => api.get(url.GET_HALFYEARMARKETPLACE_DATA);
export const getYearMarketplaceData = () => api.get(url.GET_YEARMARKETPLACE_DATA);

// Project
export const addProjectList = (project) => api.create(url.ADD_NEW_PROJECT, project);
export const updateProjectList = (project) => api.put(url.UPDATE_PROJECT, project);
export const deleteProjectList = (project) => api.delete(url.DELETE_PROJECT, { headers: { project } });

// Pages > Team
export const getTeamData = (team) => api.get(url.GET_TEAMDATA, team);
export const deleteTeamData = (team) => api.delete(url.DELETE_TEAMDATA, { headers: { team } });
export const addTeamData = (team) => api.create(url.ADD_NEW_TEAMDATA, team);
export const updateTeamData = (team) => api.put(url.UPDATE_TEAMDATA, team);

// File Manager

// Folder
export const getFolders = (folder) => api.get(url.GET_FOLDERS, folder);
export const deleteFolder = (folder) => api.delete(url.DELETE_FOLDER, { headers: { folder } });
export const addNewFolder = (folder) => api.create(url.ADD_NEW_FOLDER, folder);
export const updateFolder = (folder) => api.put(url.UPDATE_FOLDER, folder);

// File
export const getFiles = (file) => api.get(url.GET_FILES, file);
export const deleteFile = (file) => api.delete(url.DELETE_FILE, { headers: { file } });
export const addNewFile = (file) => api.create(url.ADD_NEW_FILE, file);
export const updateFile = (file) => api.put(url.UPDATE_FILE, file);

// To Do
export const getTodos = (todo) => api.get(url.GET_TODOS, todo);
export const deleteTodo = (todo) => api.delete(url.DELETE_TODO, { headers: { todo } });
export const addNewTodo = (todo) => api.create(url.ADD_NEW_TODO, todo);
export const updateTodo = (todo) => api.put(url.UPDATE_TODO, todo);

// To do Project
export const getProjects = (project) => api.get(url.GET_PROJECTS, project);
export const addNewProject = (project) => api.create(url.ADD_NEW_TODO_PROJECT, project);

//Job Application
export const getJobApplicationList = () => api.get(url.GET_APPLICATION_LIST);

//API Key
export const getAPIKey = () => api.get(url.GET_API_KEY);
