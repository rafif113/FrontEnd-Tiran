import React from "react";
import { CardBody, Row, Col, Card, Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import Ttd from "../../../assets/images/dummy/download.png";
// import "../styles.css";

import { useDispatch, useSelector } from "react-redux";
import { getDetailPo as onGetDetailPo } from "../../../slices/thunks";

import { setLoading, clearDetailPo } from "../../../slices/po/reducer";

import { useEffect } from "react";
import { createSelector } from "reselect";

const CetakPo = () => {
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  const dispatch = useDispatch();
  //   Data detail Mol
  const selectDetailPo = createSelector(
    (state) => state.Po.detailPo,
    (detailPo) => detailPo
  );
  const detailPo = useSelector(selectDetailPo);
  const loading = useSelector((state) => state.Po.loading);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_po = url.searchParams.get("id");
    dispatch(setLoading(true));
    dispatch(clearDetailPo());
    dispatch(onGetDetailPo({ id_po })).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  console.log(detailPo);

  document.title = "PO Cetak | PT Tiran";

  return (
    <React.Fragment>
      {loading ? (
        <div></div>
      ) : (
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="PO Cetak" pageTitle="PO" />
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
                                    <strong>PURCHASE ORDER</strong>
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
                                                    width={100}
                                                    height={100}
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td style={{ border: "0px solid black" }}>PT. TIRAN INDONESIA</td>
                                              </tr>
                                              <tr>
                                                <td>KANTOR: AAS Building, JL. Urip Sumoharjo KM 5 No. 23, Makassar</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                        <td style={{ width: "20%" }}></td>
                                        <td style={{ width: "30%" }}>
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
                                                <td />
                                              </tr>
                                              <tr>
                                                <td width="20%">DATE</td>
                                                <td style={{ border: "1px solid black" }}>: 17/10/2023</td>
                                              </tr>
                                              <tr>
                                                <td>PO</td>
                                                <td style={{ border: "1px solid black" }}>: {detailPo.mol.nomor_po}</td>
                                              </tr>
                                              <tr>
                                                <td>PR</td>
                                                <td style={{ border: "1px solid black" }}>: {detailPo.mol.nomor_pr}</td>
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
                                    border="0px"
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
                                            width: "30%",
                                            border: "1px solid black",
                                            backgroundColor: "#8585FF",
                                          }}
                                        >
                                          <center>
                                            <strong>
                                              <span>VENDOR</span>
                                            </strong>
                                          </center>
                                        </td>
                                        <td style={{ width: "5%" }} />
                                        <td
                                          style={{
                                            border: "1px solid black",
                                            backgroundColor: "#8585FF",
                                          }}
                                        >
                                          <strong></strong>
                                          <center>
                                            <strong>SHIP TO</strong>
                                          </center>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{ width: "10%" }}>
                                          PT.BADAK INDO PERKASA <br />
                                          JL VETRAN UTARA NO 266 MAKASSAR <br />
                                          0822 7771 3338( PAK DEDY)
                                        </td>
                                        <td />
                                        <td style={{ width: "30%" }}>
                                          PT. Tiran Indonesia <br />
                                          Jl. Malaka Ruko Citraland F1 No. 16 Kel. Andounohu, Kec. Poasia, Kota Kendari
                                          <br />
                                          Att : ARDIANSYAH NUR ARIFIN <br />
                                          0822 7771 3338( PAK DEDY)
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
                                        <th style={{ width: "45%" }}>Description and Specification</th>
                                        <th style={{ width: "10%" }}>QTY</th>
                                        <th style={{ width: "15%" }}>PRICE</th>
                                        <th style={{ width: "25%" }}>TOTAL</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr style={{ fontWeight: "bold" }}>
                                        <td>1</td>
                                        <td>65-01903-B0003 GASKET TIMMING GEAR CASE</td>
                                        <td>1 EA</td>
                                        <td>250,000</td>
                                        <td style={{ textAlign: "right" }}>Rp 250,000</td>
                                      </tr>
                                    </tbody>
                                    <tfoot>
                                      <tr>
                                        <th colSpan={4} style={{ textAlign: "right" }}>
                                          Subtotal
                                        </th>
                                        <th style={{ textAlign: "right" }}>Rp 2,800,000</th>
                                      </tr>
                                      <tr>
                                        <th colSpan={4} style={{ textAlign: "right" }}>
                                          (DISC)
                                        </th>
                                        <th style={{ textAlign: "right" }}>Rp 2,800,000</th>
                                      </tr>
                                      <tr>
                                        <th colSpan={4} style={{ textAlign: "right" }}>
                                          SUBTOTAL
                                        </th>
                                        <th style={{ textAlign: "right" }}>Rp 2,800,000</th>
                                      </tr>
                                      <tr>
                                        <th colSpan={4} style={{ textAlign: "right" }}>
                                          PPn
                                        </th>
                                        <th style={{ textAlign: "right" }}>Rp 2,800,000</th>
                                      </tr>
                                      <tr>
                                        <th colSpan={4} style={{ textAlign: "right" }}>
                                          Total
                                        </th>
                                        <th style={{ textAlign: "right" }}>Rp 2,800,000</th>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ border: "0px solid black" }}>
                                  <table
                                    width="100%"
                                    border="0px"
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
                                            backgroundColor: "#8585FF",
                                          }}
                                        >
                                          <center>
                                            <strong>
                                              <span>SPECIAL INSTRUCTION</span>
                                            </strong>
                                          </center>
                                        </td>
                                        <td style={{ width: "5%" }} border={0} />
                                        <td>
                                          <strong></strong>
                                          <center>
                                            <strong>STAFF PENGADAAN</strong>
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
                                          {detailPo.mol.spesial_intruksi}
                                        </td>
                                        <td />
                                        <td style={{ width: "50%" }} className="kolom">
                                          <h1>&nbsp;</h1>
                                          <h1>&nbsp;</h1>
                                          <hr style={{ border: "1px solid black", margin: 0 }} />
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

export default CetakPo;
