import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isBarang, setIsBarang] = useState(false);
  const [isMol, setIsMol] = useState(false);
  const [isFpb, setIsFpb] = useState(false);
  const [isPo, setIsPo] = useState(false);
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
  }, [history, iscurrentState, isDashboard, isBarang, isMol, isFpb, isPo]);

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
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
