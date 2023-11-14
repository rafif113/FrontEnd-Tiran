import React from "react";
import { CardBody, Row, Col, Card, Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import Ttd from "../../../assets/images/dummy/download.png";
import "./styles.css";

import { useDispatch, useSelector } from "react-redux";
import { getDetailFpb as onGetDetailFpb } from "../../../slices/thunks";

import { clearDetailFpb, setLoading } from "../../../slices/fpb/reducer";

import { useEffect } from "react";
import { createSelector } from "reselect";
import { useState } from "react";

const CetakFpb = () => {
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  const dispatch = useDispatch();
  //   Data detail Mol
  const selectDetailFpb = createSelector(
    (state) => state.Fpb.detailFpb,
    (detailFpb) => detailFpb
  );
  const detailFpb = useSelector(selectDetailFpb);
  const loading = useSelector((state) => state.Fpb.loading);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_fpb = url.searchParams.get("id");
    dispatch(setLoading(true));
    dispatch(clearDetailFpb());
    dispatch(onGetDetailFpb({ id_fpb })).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  const [isHide, setIsHide] = useState(true);
  const handleApproveClick = () => {
    setIsHide(false); // Ketika tombol "Approve" diklik, atur isHide menjadi false
  };
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
                                    <strong>FROM PERMINTAAN BARANG</strong>
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
                                                <td>Pengajuan Non Rutin / Khusus</td>
                                              </tr>
                                              <tr>
                                                <td>Site : {detailFpb.mol.site}</td>
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
                                                <td width="30%" style={{ border: "0px solid black" }}>
                                                  Tanggal
                                                </td>
                                                <td style={{ border: "0px solid black" }}>: 17/10/2023</td>
                                              </tr>
                                              <tr>
                                                <td width="20%" style={{ border: "0px solid black" }}>
                                                  Nomor
                                                </td>
                                                <td style={{ border: "0px solid black" }}>: {detailFpb.mol.nomor}</td>
                                              </tr>
                                              <tr>
                                                <td style={{ border: "0px solid black" }}>Sifat</td>
                                                <td style={{ border: "0px solid black" }}>: URGENT</td>
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
                                <td style={{ border: "1px solid black" }}>
                                  <h1>&nbsp;</h1>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ border: "0px solid black" }}>
                                  Diajukan Oleh : {detailFpb.mol.diajukan_oleh}
                                  <br />
                                  Departemen : {detailFpb.mol.department}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <h1>&nbsp;</h1>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ border: "0px solid black" }}>
                                  <b>TUJUAN</b>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ border: "1px solid black", height: "100px" }}>
                                  <h1>{detailFpb.mol.tujuan}</h1>
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
                                        <th style={{ width: "3%" }}>NO</th>
                                        <th style={{ width: "30%" }}>PART NUMBER</th>
                                        <th style={{ width: "25%" }}>DESKRIPSI / NAMA BARANG</th>
                                        <th style={{ width: "15%" }}> MERK/TYPE</th>
                                        <th style={{ width: "10%" }} colSpan={2}>
                                          QTY
                                        </th>
                                        <th style={{ width: "15%" }}>Keterangan</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {detailFpb.mol.partrequest.map((row, index) => (
                                        <tr style={{ fontWeight: "bold" }} key={index}>
                                          <td>{index + 1}</td>
                                          <td>{row.part_number}</td>
                                          <td>{row.desc}</td>
                                          <td style={{ width: "5%" }}>{row.unit}</td>
                                          <td style={{ width: "5%" }}>EA</td>
                                          <td>{row.qty}</td>
                                          <td>{row.remarks}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ border: "0px solid black" }}>Note :</td>
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
                                        <td
                                          style={{
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                        >
                                          <strong></strong>
                                          <center>
                                            <strong>APPROVED BY</strong>
                                          </center>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            width: "30%",
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                        >
                                          <center>
                                            <img
                                              src={Ttd}
                                              style={{
                                                display: isHide ? "none" : "block",
                                              }}
                                              className="card-logo card-logo-dark"
                                              alt="logo dark"
                                              height="90"
                                            />
                                          </center>
                                        </td>
                                        <td
                                          style={{
                                            width: "30%",
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                        >
                                          <center>
                                            {/* <img src={Ttd} className="card-logo card-logo-dark" alt="logo dark" height="90" /> */}
                                          </center>
                                        </td>
                                        <td
                                          style={{
                                            width: "30%",
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                        >
                                          <center>
                                            {/* <img src={Ttd} className="card-logo card-logo-dark" alt="logo dark" height="90" /> */}
                                          </center>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Tanggal :</td>
                                        <td>Tanggal :</td>
                                        <td>Tanggal :</td>
                                      </tr>
                                      <tr>
                                        <td>Nama :</td>
                                        <td>Nama :</td>
                                        <td>Nama :</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <center>
                                            <b>Officer Logistic</b>
                                          </center>
                                        </td>
                                        <td>
                                          <center>
                                            <b>Supervisor Logistic &amp; Purchasing</b>
                                          </center>
                                        </td>
                                        <td>
                                          <center>
                                            <b>Kepala Teknik Tambang</b>
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

export default CetakFpb;
