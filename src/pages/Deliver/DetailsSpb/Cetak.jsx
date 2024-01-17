import React from "react";
import { CardBody, Row, Col, Card, Container, Spinner } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

import Ttd from "../../../assets/images/dummy/download.png";
// import "./styles.css";

import { useDispatch, useSelector } from "react-redux";
import { getDetailSpb as onGetDetailSpb, postFileGcs } from "../../../slices/thunks";

import { clearDetailSpb, setLoadingDetailSpb } from "../../../slices/deliver/reducer";
import jsPDF from "jspdf";

import { useEffect } from "react";
import { useState } from "react";
import logo from "../../../assets/images/tiran-logo.png";

const Cetak = () => {
  const dispatch = useDispatch();
  const detailSpb = useSelector((state) => state.Deliver.detailSpb);
  const loading = useSelector((state) => state.Deliver.loadingDetailSpb);

  const printInvoice = () => {
    window.print();
  };

  const sendSpb = () => {
    const pdf = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a1",
      putOnlyUsedFonts: true,
    });
    pdf.html(document.getElementById("head_Content_sik"), {
      // scale: 4,
      callback: async (pdf) => {
        const pdfDataUrl = pdf.output("dataurlstring");
        const downloadLink = document.createElement("a");
        downloadLink.href = pdfDataUrl;
        // downloadLink.download = "invoice.pdf";
        // downloadLink.click();

        const pdfData = pdf.output("blob");
        const formData = new FormData();
        formData.append("file", pdfData, "spb.pdf");
        formData.append("keterangan", "tes");
        alert("Menunggu pengiriman...");

        try {
          await dispatch(postFileGcs(formData));

          alert("Pengiriman berhasil!");
        } catch (error) {
          alert("Terjadi kesalahan saat pengiriman.");
        }
      },
    });
  };

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
                        <div id="dvContents_sik" className="result" style={{ margin: "20px" }}>
                          <table width="100%">
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
                                                  <img src={logo} alt="Deskripsi Gambar" width={110} height={60} />
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
                                                        <td width="30%" style={{ fontWeight: 600 }}>
                                                          NO SPB
                                                        </td>
                                                        <td style={{ fontWeight: 600 }}>: 12345</td>
                                                      </tr>
                                                      <tr>
                                                        <td width="20%" style={{ fontWeight: 600 }}>
                                                          PENGIRIM
                                                        </td>
                                                        <td style={{ fontWeight: 600 }}>: SAYA</td>
                                                      </tr>
                                                      <tr>
                                                        <td style={{ fontWeight: 600 }}>PENERIMA</td>
                                                        <td style={{ fontWeight: 600 }}>: KAMI</td>
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
                                              {/* {Array.from({ length: 12 }).map((_, index) => (
                                                <tr key={index}>
                                                  <td />
                                                </tr>
                                              ))} */}
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
                                                <td width="20%" style={{ fontWeight: 600 }}>
                                                  DATE
                                                </td>
                                                <td style={{ fontWeight: 600 }}>: {new Date().toISOString().split("T")[0]}</td>
                                              </tr>
                                              <tr>
                                                <td style={{ fontWeight: 600 }}>BLOK</td>
                                                <td style={{ fontWeight: 600 }}>: BLOK 4</td>
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
                                      fontSize: 10,
                                      marginTop: 4,
                                    }}
                                    border={1}
                                  >
                                    <thead className="head_table" style={{ textAlign: "center" }}>
                                      <tr style={{ fontWeight: "bold" }}>
                                        <th style={{ width: "5%", borderRight: "1px solid black" }}>NO</th>
                                        <th style={{ width: "20%", borderRight: "1px solid black" }}>NAMA BARANG</th>
                                        <th style={{ width: "20%", borderRight: "1px solid black" }}>NO.FPB</th>
                                        <th style={{ width: "20%", borderRight: "1px solid black" }}>KEBUTUHAN</th>
                                        <th style={{ width: "5%", borderRight: "1px solid black" }}>QTY</th>
                                        <th style={{ width: "5%", borderRight: "1px solid black" }}>SATUAN</th>
                                        <th style={{ width: "20%", borderRight: "1px solid black" }}>DEPT</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {Object.keys(detailSpb).map((key, outerIndex) =>
                                        detailSpb[key].map((item, innerIndex) => {
                                          // let no = outerIndex * Object.keys(detailSpb).length + innerIndex + 1;
                                          const no = rowNumber++;

                                          return (
                                            <tr key={no} style={{ fontWeight: "bold", border: "1px solid black" }}>
                                              <td
                                                style={{
                                                  borderLeft: "1px solid black",
                                                  borderRight: "1px solid black",
                                                  textAlign: "center",
                                                }}
                                              >
                                                {no}
                                              </td>
                                              <td style={{ borderRight: "1px solid black" }}>{item.nama_part}</td>
                                              <td style={{ borderRight: "1px solid black", textAlign: "center" }}>
                                                {item.no_fpb}
                                              </td>
                                              <td style={{ borderRight: "1px solid black", textAlign: "center" }}>
                                                {item.kebutuhan}
                                              </td>
                                              <td style={{ borderRight: "1px solid black", textAlign: "center" }}>{item.qty}</td>
                                              <td style={{ borderRight: "1px solid black", textAlign: "center" }}>
                                                {item.kebutuhan}
                                              </td>
                                              <td style={{ borderRight: "1px solid black" }}>{item.dept}</td>
                                            </tr>
                                          );
                                        })
                                      )}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <table
                                    width="100%"
                                    style={{
                                      // borderCollapse: "collapse",
                                      width: "100%",
                                      fontSize: 12,
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            width: "30%", // Sesuaikan lebar kolom
                                            // textTransform: "uppercase",
                                            verticalAlign: "top",
                                          }}
                                        ></td>
                                        <td
                                          style={{
                                            width: "30%", // Sesuaikan lebar kolom
                                            verticalAlign: "top",
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
                                          }}
                                          className="kolom"
                                        >
                                          <h1>&nbsp;</h1>
                                          <h1>&nbsp;</h1>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            verticalAlign: "top",
                                            width: "30%", // Sesuaikan lebar kolom
                                          }}
                                        >
                                          <center>
                                            <strong>
                                              <span>Pengirim</span>
                                              <br />
                                              <span style={{ fontSize: "10px" }}>Distribusi Form : Lembar 1 : Pengirim</span>
                                            </strong>
                                          </center>
                                        </td>
                                        <td
                                          style={{
                                            verticalAlign: "top",
                                            width: "30%", // Sesuaikan lebar kolom
                                          }}
                                        >
                                          <center>
                                            <strong>
                                              <span> Pengantar / Driver</span>
                                              <br />
                                              <span style={{ fontSize: "10px" }}>Lembar 2 : Pengantar / Driver</span>
                                            </strong>
                                          </center>
                                        </td>
                                        <td
                                          style={{
                                            verticalAlign: "top",
                                            width: "30%", // Sesuaikan lebar kolom
                                          }}
                                        >
                                          <center>
                                            <strong>
                                              <span> Penerima / File Office Site</span>
                                              <br />
                                              <span style={{ fontSize: "10px" }}>Lembar 3 : Penerima / File Office Site</span>
                                            </strong>
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
                          <button onClick={printInvoice} className="btn btn-success">
                            <i className="ri-printer-line align-bottom me-1"></i> Print
                          </button>
                          <button onClick={sendSpb} className="btn btn-info">
                            <i className="ri-printer-line align-bottom me-1"></i> Send
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
