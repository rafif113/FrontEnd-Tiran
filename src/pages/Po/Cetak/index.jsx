import React from "react";
import { CardBody, Row, Col, Card, Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import Ttd from "../../../assets/images/dummy/download.png";
// import "../styles.css";
import logo from "../../../assets/images/tiran-logo.png";

import { useDispatch, useSelector } from "react-redux";
import { getDetailPo as onGetDetailPo } from "../../../slices/thunks";

import { setLoadingCetak, clearDetailPo } from "../../../slices/po/reducer";

import { useEffect } from "react";
import { createSelector } from "reselect";
import { formatRupiah } from "../../../utils/utils";

const CetakPo = () => {
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  const dispatch = useDispatch();
  //   Data detail po
  const selectDetailPo = createSelector(
    (state) => state.Po.detailPo,
    (detailPo) => detailPo
  );
  const detailPo = useSelector(selectDetailPo);
  const loading = useSelector((state) => state.Po.loadingCetak);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_po = url.searchParams.get("id");
    dispatch(setLoadingCetak(true));
    dispatch(clearDetailPo());
    dispatch(onGetDetailPo({ id_po })).then(() => {
      dispatch(setLoadingCetak(false));
    });
  }, []);

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
                                                  <img src={logo} alt="Deskripsi Gambar" width={130} height={80} />
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
                                                <td style={{ border: "1px solid black" }}>: {detailPo.date}</td>
                                              </tr>
                                              <tr>
                                                <td>PO</td>
                                                <td style={{ border: "1px solid black" }}>: {detailPo.nomor_po}</td>
                                              </tr>
                                              <tr>
                                                <td>PR</td>
                                                <td style={{ border: "1px solid black" }}>: {detailPo.nomor_pr}</td>
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
                                          {detailPo.nama_vendor} <br />
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
                                      {detailPo.partrequest.map((row, index) => (
                                        <tr key={index} style={{ fontWeight: "bold" }}>
                                          <td>{index + 1}</td>
                                          <td>65-01903-B0003 GASKET TIMMING GEAR CASE</td>
                                          <td>{row.qty} EA</td>
                                          <td>{formatRupiah(row.price)}</td>
                                          <td style={{ textAlign: "right" }}>{formatRupiah(parseInt(row.qty) * row.price)}</td>
                                        </tr>
                                      ))}
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
                                            width: "50%", // Sesuaikan lebar kolom
                                          }}
                                        >
                                          <center>
                                            <strong>
                                              <span>SPECIAL INSTRUCTION</span>
                                            </strong>
                                          </center>
                                        </td>
                                        <td style={{ width: "5%" }} border={0} />
                                        <td
                                          style={{
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                            backgroundColor: "#8585FF",
                                            width: "50%", // Sesuaikan lebar kolom
                                          }}
                                        >
                                          <center>
                                            <strong>STAFF PENGADAAN</strong>
                                          </center>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                            width: "50%", // Sesuaikan lebar kolom
                                          }}
                                        >
                                          {detailPo.spesial_intruksi}
                                        </td>
                                        <td />
                                        <td
                                          style={{
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                            width: "50%", // Sesuaikan lebar kolom
                                          }}
                                          className="kolom"
                                        >
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
                          <button onClick={printInvoice} className="btn btn-success">
                            <i className="ri-printer-line align-bottom me-1"></i> Print
                          </button>
                          {/* <button className="btn btn-primary">
                            <i className="ri-download-2-line align-bottom me-1"></i> Download
                          </button> */}
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
