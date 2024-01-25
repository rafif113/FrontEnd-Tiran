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

  console.log(detailFpb);

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
                      <div className="invoice">
                        <div className="invoice-header">
                          {/* <img src="{{ asset('images/logo.png') }}" alt="Deskripsi Gambar" /> */}
                          <h1>Invoice</h1>
                        </div>
                        <br />
                        <div className="invoice-info">
                          <p>Invoice Number: INV123456</p>
                          <p>Invoice Date: October 26, 2023</p>
                          <p>Due Date: November 10, 2023</p>
                        </div>
                        <table className="invoice-table">
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>Quantity</th>
                              <th>Unit Price</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Product A</td>
                              <td>2</td>
                              <td>50.00</td>
                              <td>100.00</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="invoice-total">
                          <p>Subtotal: 270.00</p>
                          <p>Tax (10%): 27.00</p>
                          <p>Total: 297.00</p>
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

export default CetakFpb;
