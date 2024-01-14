import React from "react";
import { CardBody, Row, Col, Card, Container, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import Ttd from "../../../assets/images/dummy/download.png";
// import "./styles.css";

import { useDispatch, useSelector } from "react-redux";
import { getDetailSpb as onGetDetailSpb } from "../../../slices/thunks";

import { clearDetailSpb, setLoadingDetailSpb } from "../../../slices/deliver/reducer";

import { useEffect } from "react";
import { useState } from "react";
import logo from "../../../assets/images/tiran-logo.png";

const Cetak = () => {
  const printInvoice = () => {
    window.print();
  };

  const dispatch = useDispatch();

  const detailSpb = useSelector((state) => state.Deliver.detailSpb);
  const loading = useSelector((state) => state.Deliver.loadingDetailSpb);

  useEffect(() => {
    document.title = "SPB Cetak | PT Tiran";
    const url = new URL(window.location.href);
    const id_spb = url.searchParams.get("id");
    dispatch(setLoadingDetailSpb(true));
    dispatch(clearDetailSpb());
    dispatch(onGetDetailSpb({ id_spb })).then(() => {
      dispatch(setLoadingDetailSpb(false));
    });
  }, []);

  const [isHide, setIsHide] = useState(true);
  const handleApproveClick = () => {
    setIsHide(false); // Ketika tombol "Approve" diklik, atur isHide menjadi false
  };
  let rowNumber = 1; // Gunakan let atau var untuk menghindari "Assignment to constant variable"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="SPB Cetak" pageTitle="FPB" />
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
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
                                    <strong> SPB</strong>
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
                                                <td>
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
                                                        <td width="30%" style={{ border: "1px solid black" }}>
                                                          NO SPB
                                                        </td>
                                                        <td style={{ border: "1px solid black" }}>: 12345</td>
                                                      </tr>
                                                      <tr>
                                                        <td width="20%" style={{ border: "1px solid black" }}>
                                                          PENGIRIM
                                                        </td>
                                                        <td style={{ border: "1px solid black" }}>: SAYA</td>
                                                      </tr>
                                                      <tr>
                                                        <td style={{ border: "1px solid black" }}>PENERIMA</td>
                                                        <td style={{ border: "1px solid black" }}>: KAMI</td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
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
                                              {Array.from({ length: 12 }).map((_, index) => (
                                                <tr key={index}>
                                                  <td />
                                                </tr>
                                              ))}
                                              <tr>
                                                <td width="20%" style={{ border: "1px solid black" }}>
                                                  DATE
                                                </td>
                                                <td style={{ border: "1px solid black" }}>: 17/10/2023</td>
                                              </tr>
                                              <tr>
                                                <td style={{ border: "1px solid black" }}>BLOK</td>
                                                <td style={{ border: "1px solid black" }}>: BLOK 4</td>
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
                                        <th style={{ width: "20%" }}>NAMA BARANG</th>
                                        <th style={{ width: "20%" }}>NO.FPB</th>
                                        <th style={{ width: "20%" }}>KEBUTUHAN</th>
                                        <th style={{ width: "5%" }}>QTY</th>
                                        <th style={{ width: "5%" }}>SATUAN</th>
                                        <th style={{ width: "20%" }}>DEPT</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {Object.keys(detailSpb).map((key, outerIndex) =>
                                        detailSpb[key].map((item, innerIndex) => {
                                          // let no = outerIndex * Object.keys(detailSpb).length + innerIndex + 1;
                                          const no = rowNumber++;

                                          return (
                                            <tr key={no} style={{ fontWeight: "bold" }}>
                                              <td>{no}</td>
                                              <td>{item.nama_part}</td>
                                              <td>{item.no_fpb}</td>
                                              <td>{item.kebutuhan}</td>
                                              <td>{item.qty}</td>
                                              <td>{item.kebutuhan}</td>
                                              <td>{item.dept}</td>
                                            </tr>
                                          );
                                        })
                                      )}
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
                                            width: "30%", // Sesuaikan lebar kolom
                                          }}
                                        >
                                          <center>
                                            <strong>
                                              <span>Pengirim</span>
                                            </strong>
                                          </center>
                                        </td>
                                        <td
                                          style={{
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                            width: "30%", // Sesuaikan lebar kolom
                                          }}
                                        >
                                          <center>
                                            <strong>PENGANTAR / DRIVER</strong>
                                          </center>
                                        </td>
                                        <td
                                          style={{
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                            width: "30%", // Sesuaikan lebar kolom
                                          }}
                                        >
                                          <center>
                                            <strong>
                                              <span>Penerima / File Office Site</span>
                                            </strong>
                                          </center>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            width: "30%", // Sesuaikan lebar kolom
                                            textTransform: "uppercase",
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                        ></td>
                                        <td
                                          style={{
                                            width: "30%", // Sesuaikan lebar kolom
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                          className="kolom"
                                        >
                                          <h1>&nbsp;</h1>
                                          <h1>&nbsp;</h1>
                                        </td>
                                        <td
                                          style={{
                                            width: "30%", // Sesuaikan lebar kolom
                                            verticalAlign: "top",
                                            border: "1px solid black",
                                          }}
                                          className="kolom"
                                        >
                                          <h1>&nbsp;</h1>
                                          <h1>&nbsp;</h1>
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
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Cetak;
