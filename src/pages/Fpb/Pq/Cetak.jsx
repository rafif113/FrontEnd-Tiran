import React from "react";
import { CardBody, Row, Col, Card, Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import "./styles.css";
import logo from "../../../assets/images/tiran-logo.png";

import { useDispatch, useSelector } from "react-redux";
import { getDetailPq as onGetDetailPq } from "../../../slices/thunks";

import { clearDetailPq, setLoadingPq } from "../../../slices/fpb/reducer";

import { useEffect } from "react";
import { createSelector } from "reselect";
const CetakPq = () => {
  const printInvoice = () => {
    window.print();
  };

  const dispatch = useDispatch();

  const selectDetailPq = createSelector(
    (state) => state.Fpb.detailPq,
    (detailPq) => detailPq
  );
  const detailPq = useSelector(selectDetailPq);
  const loading = useSelector((state) => state.Fpb.loadingPq);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_pq = url.searchParams.get("id");
    dispatch(setLoadingPq(true));
    dispatch(clearDetailPq());
    dispatch(onGetDetailPq({ id_pq })).then(() => {
      dispatch(setLoadingPq(false));
    });
  }, []);
  return (
    <>
      {loading ? (
        <div></div>
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
                          <table width="100%" cellSpacing="10">
                            <tr>
                              <td width="100%;" style={{ fontSize: "32px", border: "0px solid black" }}>
                                <center>
                                  <strong></strong>
                                </center>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ border: "0px solid black" }}>
                                <table width="100%">
                                  <tbody>
                                    <tr>
                                      <td style={{ width: "50%", border: "0px solid black" }}>
                                        <table
                                          width="100%"
                                          style={{ border: "0px solid black", borderCollapse: "collapse", fontSize: "12px" }}
                                          cellPadding="5"
                                        >
                                          <tbody>
                                            <tr>
                                              <td width="100%" style={{ border: "0px solid black" }}>
                                                <img src={logo} alt="Deskripsi Gambar" width={110} height={60} />
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
                                          style={{ border: "0px solid black", borderCollapse: "collapse", fontSize: "12px" }}
                                          cellPadding="5"
                                          cellSpacing="5"
                                        >
                                          <tbody>
                                            <tr>
                                              <td></td>
                                            </tr>
                                            <tr>
                                              <td></td>
                                            </tr>
                                            <tr>
                                              <td></td>
                                            </tr>
                                            <tr>
                                              <td></td>
                                            </tr>
                                            <tr>
                                              <td width="20%" style={{ fontWeight: "bold" }}>
                                                DATE
                                              </td>
                                              <td style={{ fontWeight: "bold" }}>: {new Date().toISOString().split("T")[0]}</td>
                                            </tr>
                                            <tr>
                                              <td style={{ fontWeight: "bold" }}>FPB</td>
                                              <td style={{ fontWeight: "bold" }}>: 2808 S2/BIP/TI/X/2023 NO FPB</td>
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
                                    fontSize: "10px",
                                    marginTop: "4px",
                                  }}
                                  border="1"
                                >
                                  <thead className="head_table" style={{ textAlign: "center" }}>
                                    <tr style={{ fontWeight: "bold" }}>
                                      <th style={{ width: "5%", borderRight: "1px solid black" }}>NO</th>
                                      <th style={{ width: "45%", borderRight: "1px solid black" }}>
                                        Description and Specification
                                      </th>
                                      <th style={{ width: "10%", borderRight: "1px solid black" }}>QTY</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {detailPq.partrequests.map((row, index) => (
                                      <tr key={index} style={{ fontWeight: "bold", border: "1px solid black" }}>
                                        <td
                                          style={{
                                            borderLeft: "1px solid black",
                                            borderRight: "1px solid black",
                                            textAlign: "center",
                                          }}
                                        >
                                          {index + 1}
                                        </td>
                                        <td style={{ borderRight: "1px solid black", textAlign: "center" }}>
                                          {row.part_number} {row.desc}
                                        </td>
                                        <td style={{ borderRight: "1px solid black", textAlign: "center" }}>
                                          {row.qty} {row.unit}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
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

export default CetakPq;
