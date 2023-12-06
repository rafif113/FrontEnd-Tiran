import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../slices/auth/login/reducer";
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
  const [isPo, setIsPo] = useState(false);
  const [isPenawaran, setIsPenawaran] = useState(false);

  const [isFinance, setIsFinance] = useState(false);
  const [isFinanceMonitoring, setIsFinanceMonitoring] = useState(false);

  const [isReport, setIsReport] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

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
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Barang") {
      setIsBarang(false);
    }
    if (iscurrentState !== "Mol") {
      setIsMol(false);
    }
    if (iscurrentState !== "Fpb") {
      setIsFpb(false);
    }
    if (iscurrentState !== "Po") {
      setIsPo(false);
    }
    if (iscurrentState !== "Penawaran") {
      setIsPenawaran(false);
    }
    if (iscurrentState !== "Finance") {
      setIsFinance(false);
    }
    if (iscurrentState !== "Report") {
      setIsReport(false);
    }
  }, [history, iscurrentState, isDashboard, isBarang, isMol, isFpb, isPo, isPenawaran, isFinance, isReport]);

  const userLogin = getLoggedinUser();
  const userData = useSelector((state) => state.Login.role);
  const roleTes = useSelector((state) => state.Login.roleTes);
  console.log(roleTes);
  useEffect(() => {
    if (userLogin) {
      dispatch(loginSuccess(userLogin.data));
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
        setIscurrentState("Dashboard");
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
      label: "Master Barang",
      icon: "ri-layout-grid-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsBarang(!isBarang);
        setIscurrentState("Barang");
        updateIconSidebar(e);
      },
      stateVariables: isBarang,
      subItems: [
        { id: "listbarang", label: "List Barang", link: "/barang", parentId: "barang" },
        { id: "createbarang", label: "Create Barang", link: "/barang/create", parentId: "barang" },
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
        setIscurrentState("Mol");
        updateIconSidebar(e);
      },
      stateVariables: isMol,
      subItems: [
        { id: "listmol", label: "List Mol", link: "/mol", parentId: "mol" },
        { id: "createmol", label: "Create Mol", link: "/mol/create", parentId: "mol" },
        { id: "listpengeluaran", label: "List Pengeluaran", link: "/mol/pengeluaran", parentId: "mol" },
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
        setIscurrentState("Fpb");
        updateIconSidebar(e);
      },
      stateVariables: isFpb,

      subItems: [{ id: "listfpb", label: "List FPB", link: "/fpb", parentId: "fpb" }],
    },
    {
      id: "po",
      label: "PO",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPo(!isPo);
        setIscurrentState("Po");
        updateIconSidebar(e);
      },
      stateVariables: isPo,

      subItems: [{ id: "listpo", label: "List PO", link: "/po", parentId: "po" }],
    },
    {
      id: "penawaran",
      label: "Penawaran",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e) {
        e.preventDefault();
        setIsPenawaran(!isPenawaran);
        setIscurrentState("Penawaran");
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
        setIscurrentState("Finance");
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
            { id: 1, label: "List PO", link: "/finance/monitoring/po", parentId: "monitoringFinance" },
            { id: 1, label: "Invoice PO", link: "/finance/monitoring/invoice", parentId: "monitoringFinance" },
            { id: 2, label: "Tongkang", link: "/finance/monitoring/tongkang", parentId: "monitoringFinance" },
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
        setIscurrentState("Report");
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

  // const isVendor = userData.includes("vendor");
  // const filteredMenuItems = menuItems.filter((item) => {
  //   return isVendor && (item.id === "dashboard" || item.id === "penawaran");
  // });
  // return <React.Fragment>{filteredMenuItems}</React.Fragment>;

  // return <React.Fragment>{menuItems}</React.Fragment>;

  // const filteredMenuItems = menuItems.filter((item) => {
  //   return roleTes == "pengadaan" && item.id != "finance";
  // });
  // return <React.Fragment>{roleTes == "admin" ? menuItems : filteredMenuItems}</React.Fragment>;

  const filteredMenuItems = menuItems.filter((item) => {
    return roleTes === "pengadaan" && item.id !== "finance";
  });

  if (roleTes === "finance") {
    const financeItem = menuItems.find((item) => item.id === "finance");
    const dashboardItem = menuItems.find((item) => item.id === "dashboard");

    return <React.Fragment>{financeItem && dashboardItem ? [dashboardItem, financeItem] : null}</React.Fragment>;
  } else {
    return <React.Fragment>{roleTes === "admin" ? menuItems : filteredMenuItems}</React.Fragment>;
  }
};
export default Navdata;
