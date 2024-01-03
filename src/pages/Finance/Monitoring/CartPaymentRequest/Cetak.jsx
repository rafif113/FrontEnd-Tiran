import React from "react";
import { CardBody, Row, Col, Card, Container } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import "./styles.css";

const CetakPr = () => {
  const printInvoice = () => {
    window.print();
  };

  return (
    <>
      {false ? (
        <div></div>
      ) : (
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Payment Request" pageTitle="PR" />
            <Row className="justify-content-center">
              <Col>
                <Card>
                  <Row>
                    <Col lg={12}>
                      <div id="head_Content_sik">
                        <div id="dvContents_sik" className="result">
                          <table border="1" width="100%" cellSpacing="10">
                            <tbody>
                              <tr>
                                <td width="100%" style={{ fontSize: "32px", border: "0px solid black" }}>
                                  <center>
                                    <strong></strong>
                                  </center>
                                </td>
                              </tr>

                              <tr>
                                <td style={{ border: "0px solid black" }}>
                                  <hr />
                                  <span style={{ fontSize: "24px" }}>PERSETUJUAN RENCANA PEMBAYARAN TIRAN GROUP</span>
                                  <br />
                                  <span style={{ fontSize: "14px" }}>{new Date().toISOString().split("T")[0]}</span>
                                  <br />
                                  <br />
                                  <span style={{ fontSize: "18px" }}>PT TIRAN INDONESIA</span>
                                  <table
                                    width="100%"
                                    style={{
                                      border: "1px solid black",
                                      borderCollapse: "collapse",
                                      fontSize: "12px",
                                      marginTop: "4px",
                                    }}
                                    border="0"
                                  >
                                    <thead className="head_table" style={{ backgroundColor: "#8585FF" }}>
                                      <tr>
                                        <th style={{ width: "5%" }}>No Ajuan</th>
                                        <th style={{ width: "10%" }}>Vendor</th>
                                        <th style={{ width: "10%" }}>Kategori</th>
                                        <th style={{ width: "10%" }}>Deskripsi</th>
                                        <th style={{ width: "10%" }}>Nominal Ajuan</th>
                                        <th style={{ width: "10%" }}>Rencana Pembayaran</th>
                                        <th style={{ width: "10%" }}>Keterangan</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr style={{ backgroundColor: "#E0E0E0" }}>
                                        <td>PO 483 ANG</td>
                                        <td>ANAMIA NDOLASOLO GROUP</td>
                                        <td>SPAREPART</td>
                                        <td>TAHAP I SOLAR INDUSTRI 100 KL PO 483/PO/PTTI-ANG/XI/2023</td>
                                        <td>Rp 1,888,610,159</td>
                                        <td>Rp 944,305,079</td>
                                        <td></td>
                                      </tr>
                                      <tr style={{ backgroundColor: "#ffffff" }}>
                                        <td>TI23 3133 </td>
                                        <td>PT CANNE BERNIAGA BERKAH</td>
                                        <td>SPAREPART</td>
                                        <td>PERMINTAAN KEBUTUHAN ALL UNIT DT HINO 500 FM 280JD</td>
                                        <td>Rp 38,250,000</td>
                                        <td>Rp 38,250,000</td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>SUB TOTAL</td>
                                        <td>
                                          <b>Rp. 982,555,079</b>
                                        </td>
                                        <td></td>
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
                          <button type="button" onClick={printInvoice} className="btn btn-primary">
                            <i className="ri-printer-line align-bottom me-1"></i> Print
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
    </>
  );
};

export default CetakPr;
