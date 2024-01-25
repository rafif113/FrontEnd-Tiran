import React, { useState } from "react";
import { CardBody, Row, Col, Card, Container, Button } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import Ttd from "../../../assets/images/dummy/download.png";

import { useDispatch, useSelector } from "react-redux";
import { getDetailMol as onGetDetailMol } from "../../../slices/thunks";

import { clearDetailMol, setLoading } from "../../../slices/mol/reducer";

import { useEffect } from "react";
import { createSelector } from "reselect";

const Details = () => {
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  const dispatch = useDispatch();
  //   Data detail Mol
  const selectDetailMolData = createSelector(
    (state) => state.Mol.detailMol,
    (detailMol) => detailMol
  );
  const detailMol = useSelector(selectDetailMolData);
  const loading = useSelector((state) => state.Mol.loading);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_mol = url.searchParams.get("id");
    dispatch(setLoading(true));
    dispatch(clearDetailMol());
    dispatch(onGetDetailMol({ id_mol })).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  const data = [
    { code: "B001", name: "Engine & Accessories" },
    { code: "B004", name: "Undercarriage / Tyre" },
    { code: "B007", name: "Suspension / Chassis" },
  ];

  function TableComponentGroup({ data }) {
    const tableRows = [];
    const maxColumns = 6;

    for (let i = 0; i < data.length; i += maxColumns) {
      const row = data.slice(i, i + maxColumns);
      const tableData = row.map((item, index) => (
        <>
          <td
            key={index}
            style={{
              borderTop: "1px solid #000000",
              borderBottom: "1px solid #000000",
              borderLeft: "1px solid #000000",
              borderRight: "1px solid #000000",
            }}
            colSpan={index === 1 ? 2 : 1} // Menyesuaikan colSpan sesuai dengan indeks
            align="center"
            valign="bottom"
          >
            {item.code}
          </td>
          <td
            key={`${index}_name`}
            style={{
              borderTop: "1px solid #000000",
              borderBottom: "1px solid #000000",
              borderLeft: "1px solid #000000",
              borderRight: "1px solid #000000",
            }}
            colSpan={4}
            align="left"
            valign="middle"
          >
            {item.name}
          </td>
        </>
      ));

      tableRows.push(<tr key={i}>{tableData}</tr>);
    }

    return tableRows;
  }

  const [isHide, setIsHide] = useState(true);
  const handleApproveClick = () => {
    setIsHide(false); // Ketika tombol "Approve" diklik, atur isHide menjadi false
  };
  document.title = "Mol Detail | PT Tiran";

  return (
    <React.Fragment>
      {loading ? (
        <div>1</div>
      ) : (
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Mol Detail" pageTitle="Invoices" />

            <Row className="justify-content-center">
              <Col>
                <Card>
                  <Row>
                    <Col lg={12}>
                      <table cellSpacing={0} border={1} className="my-3">
                        <colgroup width={42} />
                        <colgroup width={79} />
                        <colgroup width={20} />
                        <colgroup width={79} />
                        <colgroup width={113} />
                        <colgroup width={7} />
                        <colgroup width={64} />
                        <colgroup width={111} />
                        <colgroup width={20} />
                        <colgroup width={50} />
                        <colgroup width={69} />
                        <colgroup width={90} />
                        <colgroup width={63} />
                        <colgroup span={2} width={64} />
                        <colgroup width={69} />
                        <tbody>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                              }}
                              rowSpan={4}
                              height={67}
                              align="center"
                              valign="bottom"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="center"
                              valign="bottom"
                            >
                              <b> PT TIRAN INDONESIA</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={7}
                              rowSpan={4}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <font size={4}>MECHANIC ORDER LIST (M O L)</font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              No Doc.
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="center"
                              valign="middle"
                            >
                              <font size={1}>{detailMol.mol.no_documen}</font>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ borderRight: "1px solid #000000" }} colSpan={4} align="center" valign="bottom">
                              <b>
                                <font size={1}> Site Lameruru, Konawe</font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              Issue
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="center"
                              valign="middle"
                            >
                              <font size={1}>{detailMol.mol.issue}</font>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ borderRight: "1px solid #000000" }} colSpan={4} align="center" valign="bottom">
                              <b>
                                <font size={1}> Departemen Plant</font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              Revisi
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="center"
                              valign="middle"
                            >
                              <font size={1}>{detailMol.mol.revisi}</font>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ borderBottom: "1px solid #000000" }} colSpan={3} align="center" valign="bottom">
                              <b>
                                <font size={1}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="left"
                              valign="bottom"
                            >
                              <font size={4}>
                                <br />
                              </font>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              Page
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="center"
                              valign="middle"
                            >
                              <font size={1}>{detailMol.mol.page}</font>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ borderLeft: "1px solid #000000" }} height={14} align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="center" valign="bottom">
                              <b>
                                <font size={1}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td align="center" valign="bottom">
                              <b>
                                <font size={1}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td align="center" valign="bottom">
                              <b>
                                <font size={1}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              rowSpan={2}
                              align="center"
                              valign="middle"
                            >
                              <font size={3}>
                                <br />
                              </font>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              height={17}
                              align="left"
                              valign="middle"
                            >
                              <b>Specification Unit :</b>
                            </td>
                            <td align="center" valign="bottom">
                              <b>
                                <font size={1}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                              }}
                              height={11}
                              align="left"
                              valign="bottom"
                            >
                              <br />
                            </td>
                            <td style={{ borderBottom: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderBottom: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              height={24}
                              align="left"
                              valign="middle"
                            >
                              Unit Name
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.unit_name}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="left"
                              valign="middle"
                            >
                              Engine Model
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.engine_model}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="middle"
                            >
                              <b>MOL No :</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="middle"
                            >
                              <b>{detailMol.mol.mol_no}</b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              height={24}
                              align="left"
                              valign="middle"
                            >
                              Unit Code
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.unit_code}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="left"
                              valign="middle"
                            >
                              Engine Serial No
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.engine_serial_no}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="center"
                              valign="middle"
                            >
                              <b>Order for :</b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              height={24}
                              align="left"
                              valign="middle"
                            >
                              HM / KM
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.hmkm}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="left"
                              valign="middle"
                            >
                              Engine Number
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.engine_number}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              Repair (B/D)
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="bottom"
                            >
                              <font size={3}>
                                <br />
                              </font>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              height={24}
                              align="left"
                              valign="middle"
                            >
                              Time
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.time}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="left"
                              valign="middle"
                            >
                              Transmission Model
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.transmisson_model}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              Overhoule (O/H)
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="bottom"
                            >
                              <font size={3}>
                                <br />
                              </font>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              height={24}
                              align="left"
                              valign="middle"
                            >
                              Date
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                              sdnum="1033;0;M/D/YYYY"
                            >
                              {detailMol.mol.date}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="left"
                              valign="middle"
                            >
                              Transmission S/N
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.transmisson_sn}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              Maintenance (PM)
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="left"
                              valign="middle"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="bottom"
                            >
                              <font size={3}>
                                <br />
                              </font>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              height={24}
                              align="left"
                              valign="middle"
                            >
                              Location
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.location}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="left"
                              valign="middle"
                            >
                              Machine Serial No.
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.machine_serial_no}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              Accident (UNSCHE)
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="bottom"
                            >
                              <font size={3}>
                                <br />
                              </font>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              height={24}
                              align="left"
                              valign="middle"
                            >
                              Workshop Req No.
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.workshop_req}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="left"
                              valign="middle"
                            >
                              Machine Type No.
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>:</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              {detailMol.mol.machine_type_no}
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="left"
                              valign="middle"
                            >
                              Others (ETC)
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="bottom"
                            >
                              <font size={3}>
                                <br />
                              </font>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ borderLeft: "1px solid #000000" }} height={14} align="left" valign="middle">
                              <br />
                            </td>
                            <td align="left" valign="middle">
                              <br />
                            </td>
                            <td align="center" valign="middle">
                              <b>
                                <br />
                              </b>
                            </td>
                            <td align="left" valign="middle">
                              <br />
                            </td>
                            <td align="left" valign="middle">
                              <br />
                            </td>
                            <td align="left" valign="middle">
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={10}
                              rowSpan={2}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <font color="#FF0000">
                                  <br />
                                </font>
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              height={20}
                              align="left"
                              valign="middle"
                            >
                              <b>Part Request:</b>
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                              }}
                              height={11}
                              align="left"
                              valign="bottom"
                            >
                              <b>
                                <br />
                              </b>
                            </td>
                            <td style={{ borderBottom: "1px solid #000000" }} align="left" valign="bottom">
                              <b>
                                <br />
                              </b>
                            </td>
                            <td style={{ borderBottom: "1px solid #000000" }} align="left" valign="bottom">
                              <b>
                                <br />
                              </b>
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              height={36}
                              align="center"
                              valign="middle"
                            >
                              <b>NO</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="center"
                              valign="middle"
                            >
                              <b>PART NUMBER</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="center"
                              valign="middle"
                            >
                              <b>DESCRIPTION</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="middle"
                            >
                              <b>QTY</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>UNIT</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>GROUP</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>PAGE IMAGE</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>PAGE DESC</b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="middle"
                            >
                              <b>REMARKS</b>
                            </td>
                          </tr>
                          {detailMol.mol.partrequest.map((row, index) => (
                            <tr>
                              <td
                                style={{
                                  borderTop: "1px solid #000000",
                                  borderBottom: "1px solid #000000",
                                  borderLeft: "1px solid #000000",
                                  borderRight: "1px solid #000000",
                                }}
                                height={27}
                                align="center"
                                valign="middle"
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000000",
                                  borderBottom: "1px solid #000000",
                                  borderLeft: "1px solid #000000",
                                  borderRight: "1px solid #000000",
                                }}
                                colSpan={3}
                                align="center"
                                valign="middle"
                              >
                                {row.part_number}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000000",
                                  borderBottom: "1px solid #000000",
                                  borderLeft: "1px solid #000000",
                                  borderRight: "1px solid #000000",
                                }}
                                colSpan={4}
                                align="center"
                                valign="middle"
                              >
                                {row.desc}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000000",
                                  borderBottom: "1px solid #000000",
                                  borderLeft: "1px solid #000000",
                                  borderRight: "1px solid #000000",
                                }}
                                colSpan={2}
                                align="center"
                                valign="middle"
                              >
                                {row.qty}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000000",
                                  borderBottom: "1px solid #000000",
                                  borderRight: "1px solid #000000",
                                }}
                                align="center"
                                valign="middle"
                              >
                                {row.unit}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000000",
                                  borderBottom: "1px solid #000000",
                                  borderLeft: "1px solid #000000",
                                  borderRight: "1px solid #000000",
                                }}
                                align="center"
                                valign="middle"
                              >
                                {row.group}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000000",
                                  borderBottom: "1px solid #000000",
                                  borderLeft: "1px solid #000000",
                                  borderRight: "1px solid #000000",
                                }}
                                align="center"
                                valign="middle"
                              >
                                {row.page_image}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000000",
                                  borderBottom: "1px solid #000000",
                                  borderLeft: "1px solid #000000",
                                  borderRight: "1px solid #000000",
                                }}
                                align="center"
                                valign="middle"
                              >
                                {row.page_desc}
                              </td>
                              <td
                                style={{
                                  borderTop: "1px solid #000000",
                                  borderBottom: "1px solid #000000",
                                  borderLeft: "1px solid #000000",
                                  borderRight: "1px solid #000000",
                                }}
                                colSpan={2}
                                align="center"
                                valign="middle"
                              >
                                {row.remarks}
                              </td>
                            </tr>
                          ))}

                          <tr>
                            <td style={{ borderLeft: "1px solid #000000" }} height={14} align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderTop: "1px solid #000000" }} colSpan={4} align="left" valign="middle">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              height={17}
                              align="left"
                              valign="middle"
                            >
                              <b>Component Group :</b>
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                              }}
                              height={11}
                              align="left"
                              valign="bottom"
                            >
                              <b>
                                <br />
                              </b>
                            </td>
                            <td style={{ borderBottom: "1px solid #000000" }} align="left" valign="bottom">
                              <b>
                                <br />
                              </b>
                            </td>
                            <td style={{ borderBottom: "1px solid #000000" }} align="left" valign="bottom">
                              <b>
                                <br />
                              </b>
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          {/*  */}
                          <TableComponentGroup data={data} />
                          {/*  */}
                          <tr></tr>
                          <tr>
                            <td style={{ borderLeft: "1px solid #000000" }} height={14} align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              height={20}
                              align="left"
                              valign="middle"
                            >
                              <b>Cost Code :</b>
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                              }}
                              height={11}
                              align="left"
                              valign="bottom"
                            >
                              <b>
                                <br />
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                              }}
                              align="left"
                              valign="bottom"
                            >
                              <b>
                                <br />
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                              }}
                              align="left"
                              valign="bottom"
                            >
                              <b>
                                <br />
                              </b>
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              height={20}
                              align="center"
                              valign="bottom"
                            >
                              C001
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Overhoule / Recondition
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="bottom"
                            >
                              C005
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Tyre
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="bottom"
                            >
                              C009
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Missing / Hilang
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              height={20}
                              align="center"
                              valign="bottom"
                            >
                              C002
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Maintenance
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="bottom"
                            >
                              C006
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Accident
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="bottom"
                            >
                              C010
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Sub Kontrak . . . . . . . . . . .
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              height={20}
                              align="center"
                              valign="bottom"
                            >
                              C003
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Repair
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="bottom"
                            >
                              C007
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Consumable Goods
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="left"
                              valign="bottom"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="center"
                              valign="bottom"
                            >
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              height={20}
                              align="center"
                              valign="bottom"
                            >
                              C004
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Modification
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="bottom"
                            >
                              C008
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Production
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="left"
                              valign="bottom"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="center"
                              valign="bottom"
                            >
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ borderLeft: "1px solid #000000" }} height={14} align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              height={20}
                              align="left"
                              valign="middle"
                            >
                              <b>Material Type :</b>
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                              }}
                              height={11}
                              align="left"
                              valign="bottom"
                            >
                              <b>
                                <br />
                              </b>
                            </td>
                            <td style={{ borderTop: "1px solid #000000" }} align="left" valign="bottom">
                              <b>
                                <br />
                              </b>
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="center" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              height={20}
                              align="center"
                              valign="middle"
                              bgcolor="#FFFFFF"
                            >
                              <b>
                                <font size={3}>X</font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Spare Parts / Suku Cadang
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <font size={3}>
                                  <b>
                                    <font size={3}>X</font>
                                  </b>{" "}
                                </font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Tyre / Ban
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <font size={3}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="center"
                              valign="middle"
                            >
                              Others / Bahan Lain
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              height={20}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <font size={3}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Oil / Pelumas
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <font size={3}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Tools / Alat Kerja
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <font size={3}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="center"
                              valign="middle"
                            >
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              height={20}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <font size={3}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Grease / Gemuk
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <font size={3}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="left"
                              valign="middle"
                            >
                              Consumable Goods (COD)
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <font size={3}>
                                  <br />
                                </font>
                              </b>
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={4}
                              align="center"
                              valign="middle"
                            >
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ borderLeft: "1px solid #000000" }} height={14} align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td style={{ borderRight: "1px solid #000000" }} align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={5}
                              height={20}
                              align="center"
                              valign="middle"
                            >
                              Received by / Diterima oleh;
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={6}
                              align="center"
                              valign="middle"
                            >
                              Received by / Diterima oleh;
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={5}
                              align="center"
                              valign="middle"
                            >
                              Order By / Diminta Oleh;
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={5}
                              height={20}
                              align="center"
                              valign="middle"
                            >
                              Warehouse keeper,
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={6}
                              align="center"
                              valign="middle"
                            >
                              Administration Plant
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={5}
                              align="center"
                              valign="middle"
                            >
                              Spv/Foreman
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={5}
                              height={17}
                              align="center"
                              valign="middle"
                            >
                              <img
                                src={Ttd}
                                className="card-logo card-logo-dark"
                                alt="logo dark"
                                height="90"
                                style={{
                                  display: isHide ? "none" : "block",
                                }}
                              />
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={6}
                              align="center"
                              valign="middle"
                            >
                              {/* <img src={Ttd} className="card-logo card-logo-dark" alt="logo dark" height="90" /> */}
                            </td>
                            <td
                              style={{
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={5}
                              align="center"
                              valign="middle"
                            >
                              {/* <img src={Ttd} className="card-logo card-logo-dark" alt="logo dark" height="90" /> */}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={5}
                              height={20}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <u>________________________</u>
                              </b>
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={6}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <u>_________________________</u>
                              </b>
                            </td>
                            <td
                              style={{
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={5}
                              align="center"
                              valign="middle"
                            >
                              <b>
                                <u>______________________</u>
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              height={20}
                              align="center"
                              valign="middle"
                            >
                              Date / Tgl :
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="center"
                              valign="middle"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="center"
                              valign="middle"
                            >
                              Date / Tgl :
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={3}
                              align="center"
                              valign="middle"
                              sdnum="1033;1033;D-MMM-YYYY;@"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderLeft: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="middle"
                            >
                              Date / Tgl :
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                              }}
                              align="center"
                              valign="middle"
                            >
                              <br />
                            </td>
                            <td
                              style={{
                                borderTop: "1px solid #000000",
                                borderBottom: "1px solid #000000",
                                borderRight: "1px solid #000000",
                              }}
                              colSpan={2}
                              align="center"
                              valign="middle"
                              sdnum="1033;1033;D-MMM-YYYY;@"
                            >
                              <br />
                            </td>
                          </tr>
                          <tr>
                            <td height={17} align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                            <td align="left" valign="bottom">
                              <br />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                    <Col lg={12}>
                      <CardBody className="p-4">
                        <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                          <Link to="#" onClick={printInvoice} className="btn btn-success">
                            <i className="ri-printer-line align-bottom me-1"></i> Print
                          </Link>
                          <button className="btn btn-primary" onClick={handleApproveClick}>
                            <i className="ri-send-plane-fill align-bottom me-1"></i> Approve
                          </button>
                        </div>
                      </CardBody>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default Details;
