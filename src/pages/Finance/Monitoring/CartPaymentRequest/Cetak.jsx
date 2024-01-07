import React from "react";
import { CardBody, Row, Col, Card, Container } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import "./styles.css";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { formatRupiah } from "../../../../utils/utils";

const CetakPr = () => {
  const printInvoice = () => {
    window.print();
  };

  const recapCartData = createSelector(
    (state) => state.Finance.recapCart,
    (recapCart) => recapCart
  );
  const recapCart = useSelector(recapCartData);
  console.log(recapCart);

  const calculateSubtotal = () => {
    let subtotal = 0;
    recapCart.forEach((row) => {
      subtotal += parseInt(row.rencana_pembayaran);
    });
    return subtotal;
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
                                      {recapCart.map((row, index) => (
                                        <tr key={index} style={{ backgroundColor: "#E0E0E0" }}>
                                          <td>{row.no_po}</td>
                                          <td>{row.nama_vendor}</td>
                                          <td>{row.kategori}</td>
                                          <td>{row.desc}</td>
                                          <td>{formatRupiah(row.nominal_ajuan)}</td>
                                          <td>{formatRupiah(row.rencana_pembayaran)}</td>
                                          <td>{row.desc}</td>
                                        </tr>
                                      ))}

                                      <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>SUB TOTAL</td>
                                        <td>
                                          <b>{formatRupiah(calculateSubtotal())}</b>
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
