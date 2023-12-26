import React from "react";
import { CardBody, Row, Col, Card, Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import "./styles.css";

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
                          <table border="1" width="100%" cellSpacing="10">
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
                                                {/* <img src={require("images/logo.png").default} alt="Deskripsi Gambar" width="100" height="100" /> */}
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
                                              <td width="20%">DATE</td>
                                              <td style={{ border: "1px solid black" }}>: DATE NOW</td>
                                            </tr>
                                            <tr>
                                              <td>FPB</td>
                                              <td style={{ border: "1px solid black" }}>: 2808 S2/BIP/TI/X/2023 NO FPB</td>
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
                                    fontSize: "12px",
                                    marginTop: "4px",
                                  }}
                                  border="1"
                                >
                                  <thead className="head_table" style={{ backgroundColor: "#8585FF" }}>
                                    <tr>
                                      <th style={{ width: "5%" }}>NO</th>
                                      <th style={{ width: "45%" }}>Description and Specification</th>
                                      <th style={{ width: "10%" }}>QTY</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {detailPq.partrequests.map((row, index) => (
                                      <tr key={index} style={{ fontWeight: "bold" }}>
                                        <td>{index + 1}</td>
                                        <td>
                                          {row.part_number} {row.desc}
                                        </td>
                                        <td>
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
