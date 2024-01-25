import React from "react";
import { CardBody, Row, Col, Card, Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import Ttd from "../../../assets/images/dummy/download.png";
// import "../styles.css";

import { useDispatch, useSelector } from "react-redux";
import { getDetailFpb as onGetDetailFpb, getDetailPengeluaran as onGetDetailPengeluaran } from "../../../slices/thunks";

import { setLoading, clearDetailPengeluaran } from "../../../slices/mol/reducer";

import { useEffect } from "react";
import { createSelector } from "reselect";

const CetakPengeluaran = () => {
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  const dispatch = useDispatch();
  //   Data detail Mol
  const selectDetailPengeluaran = createSelector(
    (state) => state.Mol.detailPengeluaran,
    (detailPengeluaran) => detailPengeluaran
  );
  const detailPengeluaran = useSelector(selectDetailPengeluaran);
  const loading = useSelector((state) => state.Mol.loading);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_pengeluaran = url.searchParams.get("id");
    dispatch(setLoading(true));
    dispatch(clearDetailPengeluaran());
    dispatch(onGetDetailPengeluaran({ id_pengeluaran })).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  console.log(detailPengeluaran);

  document.title = "FPB Cetak | PT Tiran";

  return (
    <React.Fragment>
      {loading ? (
        <div>1</div>
      ) : (
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="FPB Cetak" pageTitle="FPB" />
            <Row className="justify-content-center">
              <Col>
                <Card>
                  <Row>
                    <Col lg={12}>
                      <div id="head_Content_sik">
                        <div id="dvContents_sik" className="result">
                          <table border={1} width="100%" cellSpacing={10}>
                            <tbody>
                              <tr>
                                <td width="100%;" style={{ fontSize: 32, border: "0px solid black" }}>
                                  <center>
                                    <strong>FORM PENGELUARAN BARANG</strong>
                                  </center>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ border: "0px solid black" }}>
                                  <table width="100%">
                                    <tbody>
                                      <tr>
                                        <td style={{ width: "50%" }}>
                                          <table
                                            width="100%"
                                            style={{
                                              border: "0px solid black",
                                              borderCollapse: "collapse",
                                              fontSize: 12,
                                            }}
                                            cellPadding={5}
                                          >
                                            <tbody>
                                              <tr>
                                                <td width="100%" style={{ border: "0px solid black" }}>
                                                  <img
                                                    src="{{ asset('images/logo.png') }}"
                                                    alt="Deskripsi Gambar"
                                                    width={150}
                                                    height={100}
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td style={{ border: "0px solid black" }}>PT. TIRAN INDONESIA</td>
                                              </tr>
                                              <tr>
                                                <td>KENDARI - KONAWE UTARA</td>
                                              </tr>
                                              <tr>
                                                <td>PROCUREMENT DEPT</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                        <td style={{ width: "15%" }}></td>
                                        <td style={{ width: "50%" }}>
                                          <table
                                            width="100%"
                                            style={{
                                              border: "0px solid black",
                                              borderCollapse: "collapse",
                                              fontSize: 12,
                                            }}
                                            cellPadding={5}
                                            cellSpacing={5}
                                          >
                                            <tbody>
                                              <tr>
                                                <td />
                                              </tr>
                                              <tr>
                                                <td />
                                              </tr>
                                              <tr>
                                                <td />
                                              </tr>
                                              <tr>
                                                <td width="30%" style={{ border: "1px solid black" }}>
                                                  MOL NO
                                                </td>
                                                <td style={{ border: "1px solid black" }}>: {detailPengeluaran.mol.mol_no}</td>
                                              </tr>
                                              <tr>
                                                <td width="20%" style={{ border: "1px solid black" }}>
                                                  DATE
                                                </td>
                                                <td style={{ border: "1px solid black" }}>: {detailPengeluaran.mol.date}</td>
                                              </tr>
                                              <tr>
                                                <td style={{ border: "1px solid black" }}>HM</td>
                                                <td style={{ border: "1px solid black" }}>: {detailPengeluaran.mol.hm}</td>
                                              </tr>
                                              <tr>
                                                <td style={{ border: "1px solid black" }}>UNIT ID</td>
                                                <td style={{ border: "1px solid black" }}>: {detailPengeluaran.mol.unit_id}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ border: "0px solid black" }}>
                                  <table
                                    width="100%"
                                    style={{
                                      border: "1px solid black",
                                      borderCollapse: "collapse",
                                      fontSize: 12,
                                      marginTop: 4,
                                    }}
                                    border={1}
                                  >
                                    <thead className="head_table" style={{ backgroundColor: "#8585FF" }}>
                                      <tr>
                                        <th style={{ width: "5%" }}>NO</th>
                                        <th style={{ width: "30%" }}>PN</th>
                                        <th style={{ width: "30%" }}>DES</th>
                                        <th style={{ width: "10%" }} colSpan={2}>
                                          QTY
                                        </th>
                                        <th style={{ width: "10%" }}>REMARK</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {detailPengeluaran.mol.partrequest.map((row, index) => (
                                        <tr key={index} style={{ fontWeight: "bold" }}>
                                          <td>{index + 1}</td>
                                          <td>{row.part_number}</td>
                                          <td>{row.desc}</td>
                                          <td style={{ width: "5%" }}>{row.qty}</td>
                                          <td style={{ width: "5%" }}>EA</td>
                                          <td>{row.remarks}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ border: "0px solid black" }}>
                                  <table
                                    width="100%"
                                    border="1px"
                                    style={{
                                      borderCollapse: "collapse",
                                      width: "100%",
                                      fontSize: 14,
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                        >
                                          <center>
                                            <strong>
                                              <span>REQUEST BY</span>
                                            </strong>
                                          </center>
                                        </td>
                                        <td
                                          style={{
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                        >
                                          <center>
                                            <strong>APPROVED BY</strong>
                                          </center>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            width: "50%",
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                        >
                                          <center>
                                            <img src={Ttd} className="card-logo card-logo-dark" alt="logo dark" height="90" />
                                          </center>
                                        </td>
                                        <td
                                          style={{
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                        >
                                          <center>
                                            <img src={Ttd} className="card-logo card-logo-dark" alt="logo dark" height="90" />
                                          </center>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Col>
                    <Col lg={12}>
                      <CardBody className="p-4">
                        <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                          <Link to="#" onClick={printInvoice} className="btn btn-success">
                            <i className="ri-printer-line align-bottom me-1"></i> Print
                          </Link>
                          <Link to="#" className="btn btn-primary">
                            <i className="ri-download-2-line align-bottom me-1"></i> Download
                          </Link>
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

export default CetakPengeluaran;
