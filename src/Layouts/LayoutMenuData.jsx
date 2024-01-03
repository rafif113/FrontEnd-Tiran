import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuccess, changeRole } from "../slices/auth/login/reducer";
import { getLoggedinUser } from "../helpers/api_helper";
import { useDispatch, useSelector } from "react-redux";

const Navdata = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isBarang, setIsBarang] = useState(false);
  const [isMol, setIsMol] = useState(false);
  const [isFpb, setIsFpb] = useState(false);
  const [isDeliver, setIsDeliver] = useState(false);
  const [isPo, setIsPo] = useState(false);
  const [isPenawaran, setIsPenawaran] = useState(false);

  const [isFinance, setIsFinance] = useState(false);
  const [isFinanceMonitoring, setIsFinanceMonitoring] = useState(false);

  const [isReport, setIsReport] = useState(false);

  const [isKtt, setIsKtt] = useState(false);

  const [isCurrentState, setIsCurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id)) document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (isCurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (isCurrentState !== "Barang") {
      setIsBarang(false);
    }
    if (isCurrentState !== "Mol") {
      setIsMol(false);
    }
    if (isCurrentState !== "Fpb") {
      setIsFpb(false);
    }
    if (isCurrentState !== "Deliver") {
      setIsDeliver(false);
    }
    if (isCurrentState !== "Po") {
      setIsPo(false);
    }
    if (isCurrentState !== "Penawaran") {
      setIsPenawaran(false);
    }
    if (isCurrentState !== "Finance") {
      setIsFinance(false);
    }
    if (isCurrentState !== "Report") {
      setIsReport(false);
    }
    if (isCurrentState !== "Ktt") {
      setIsKtt(false);
    }
  }, [history, isCurrentState, isDashboard, isBarang, isMol, isFpb, isPo, isPenawaran, isFinance, isReport, isKtt, isDeliver]);

  const userLogin = getLoggedinUser();
  const role = useSelector((state) => state.Login.role);
  useEffect(() => {
    if (userLogin) {
      dispatch(loginSuccess(userLogin.data));
      dispatch(changeRole(userLogin.data.roles[0]));
    }
  }, [dispatch]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIsCurrentState("Dashboard");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "analytic",
          label: "Analytic",
          link: "/dashboard",
          parentId: "dashboard",
        },
      ],
    },
    {
      label: "Master Data",
      isHeader: true,
    },
    {
      id: "barang",
      label: "Master Data",
      icon: "ri-layout-grid-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsBarang(!isBarang);
        setIsCurrentState("Barang");
        updateIconSidebar(e);
      },
      stateVariables: isBarang,
      subItems: [
        { id: "listbarang", label: "List Barang", link: "/barang", parentId: "barang" },
        { id: "createbarang", label: "Create Barang", link: "/barang/create", parentId: "barang" },
        { id: "unit", label: "Unit", link: "/unit", parentId: "barang" },
        { id: "carrier", label: "Carrier", link: "/carrier", parentId: "barang" },
        { id: "buyer", label: "Buyer", link: "/buyer", parentId: "barang" },
      ],
    },
    {
      id: "mol",
      label: "MOL",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsMol(!isMol);
        setIsCurrentState("Mol");
        updateIconSidebar(e);
      },
      stateVariables: isMol,
      subItems: [
        { id: "listmol", label: "List Mol", link: "/mol", parentId: "mol" },
        { id: "createmol", label: "Create Mol", link: "/mol/create", parentId: "mol" },
        { id: "listpengeluaran", label: "List Pengeluaran", link: "/mol/pengeluaran", parentId: "mol" },
        { id: "fueltire", label: "Create Fuel / Tire", link: "/mol/fuel-tire", parentId: "mol" },
      ],
    },
    {
      id: "fpb",
      label: "FPB",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsFpb(!isFpb);
        setIsCurrentState("Fpb");
        updateIconSidebar(e);
      },
      stateVariables: isFpb,

      subItems: [{ id: "listfpb", label: "List FPB", link: "/fpb", parentId: "fpb" }],
    },
    {
      id: "deliver",
      label: "Deliver",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsDeliver(!isDeliver);
        setIsCurrentState("Deliver");
        updateIconSidebar(e);
      },
      stateVariables: isDeliver,

      subItems: [
        { id: "vendorkendari", label: "Vendor - Kendari", link: "/deliver/vendor", parentId: "deliver" },
        { id: "vendorsite", label: "Site - Kendari", link: "/deliver/site", parentId: "deliver" },
      ],
    },
    {
      id: "po",
      label: "PO",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPo(!isPo);
        setIsCurrentState("Po");
        updateIconSidebar(e);
      },
      stateVariables: isPo,

      subItems: [
        { id: "listpo", label: "List PO", link: "/po", parentId: "po" },
        { id: "listpologistik", label: "List PO Logistik", link: "/po-logistik", parentId: "po" },
        { id: "procurementlist", label: "Procurement List", link: "/procurement-list", parentId: "po" },
      ],
    },
    {
      id: "ktt",
      label: "KTT",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsKtt(!isKtt);
        setIsCurrentState("Ktt");
        updateIconSidebar(e);
      },
      stateVariables: isKtt,

      subItems: [
        { id: "listkttpo", label: "List PO", link: "/po-ktt", parentId: "ktt" },
        { id: "listkttporutin", label: "List Rutin", link: "/po-ktt-rutin", parentId: "ktt" },
      ],
    },
    {
      id: "penawaran",
      label: "Penawaran",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPenawaran(!isPenawaran);
        setIsCurrentState("Penawaran");
        updateIconSidebar(e);
      },
      stateVariables: isPenawaran,

      subItems: [{ id: "listpenawaran", label: "List Penawaran", link: "/penawaran", parentId: "penawaran" }],
    },
    {
      id: "finance",
      label: "Finance",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsFinance(!isFinance);
        setIsCurrentState("Finance");
        updateIconSidebar(e);
      },
      stateVariables: isFinance,

      subItems: [
        { id: "piutang", label: "Piutang", link: "/finance/piutang", parentId: "finance" },
        {
          id: "monitoringFinance",
          label: "Monitoring",
          link: "/#",
          isChildItem: true,
          click: function (e) {
            e.preventDefault();
            setIsFinanceMonitoring(!isFinanceMonitoring);
          },
          parentId: "finance",
          stateVariables: isFinanceMonitoring,
          childItems: [
            { id: 2, label: "Tongkang", link: "/finance/monitoring/tongkang", parentId: "monitoringFinance" },
            { id: 1, label: "Payment Request", link: "/finance/monitoring/payment-request", parentId: "monitoringFinance" },
            {
              id: 1,
              label: "Cart Payment Request",
              link: "/finance/monitoring/cart-payment-request",
              parentId: "monitoringFinance",
            },
          ],
        },
      ],
    },
    {
      id: "report",
      label: "Report",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsReport(!isReport);
        setIsCurrentState("Report");
        updateIconSidebar(e);
      },
      stateVariables: isReport,

      subItems: [
        { id: "unit", label: "Unit", link: "/report/unit", parentId: "report" },
        { id: "barangIn", label: "Barang Masuk", link: "/report/barang-masuk", parentId: "report" },
        { id: "out", label: "Barang Keluar", link: "/report/barang-keluar", parentId: "report" },
      ],
    },
  ];

  const dashboardItem = menuItems.find((item) => item.id === "dashboard");
  const financeItem = menuItems.find((item) => item.id === "finance");
  const vendorItem = menuItems.find((item) => item.id === "penawaran");

  const barangItem = menuItems.find((item) => item.id === "barang");
  const fbpItem = menuItems.find((item) => item.id === "fpb");
  const molItem = menuItems.find((item) => item.id === "mol");
  const poItem = menuItems.find((item) => item.id === "po");
  const reportItem = menuItems.find((item) => item.id === "report");

  if (role === "finance") {
    return <React.Fragment>{financeItem && dashboardItem ? [dashboardItem, financeItem] : null}</React.Fragment>;
  } else if (role == "vendor") {
    return <React.Fragment>{vendorItem && dashboardItem ? [dashboardItem, vendorItem] : null}</React.Fragment>;
  } else if (role == "pengadaan") {
    return (
      <React.Fragment>
        {barangItem && dashboardItem && fbpItem && molItem && poItem && reportItem
          ? [dashboardItem, barangItem, molItem, fbpItem, poItem, reportItem]
          : null}
      </React.Fragment>
    );
  } else {
    return <React.Fragment>{menuItems}</React.Fragment>;
  }
};
export default Navdata;
