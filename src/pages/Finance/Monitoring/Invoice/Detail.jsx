import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Input, Form, Table, CardHeader, Alert } from "reactstrap";

import { Link } from "react-router-dom";
//formik
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import SubmitModal from "../../../../Components/Common/SubmitModal";
import { formatRupiah } from "../../../../utils/utils";

import { getDetailFinancePo as onGetDetailFinancePo } from "../../../../slices/thunks";
import { clearDetailInvoicePo, setLoading } from "../../../../slices/finance/reducer";
const DetailInvoicePo = () => {
  document.title = "Detail Procurement List | PT Tiran";
  const dispatch = useDispatch();
  const history = useNavigate();

  const selectDetailInvoicePo = createSelector(
    (state) => state.Finance.detailInvoicePo,
    (detailInvoicePo) => detailInvoicePo
  );
  const detailInvoicePo = useSelector(selectDetailInvoicePo);
  const loading = useSelector((state) => state.Finance.loading);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_penawaran_vendor = url.searchParams.get("id");
    dispatch(setLoading(true));
    dispatch(clearDetailInvoicePo());
    dispatch(onGetDetailFinancePo({ id_penawaran_vendor })).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  console.log(detailInvoicePo);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Detail Po" pageTitle="Po" />

        {loading ? (
          ""
        ) : (
          <>
            {!detailInvoicePo.bastvendor ||
            !detailInvoicePo.bastvendor.length ||
            !detailInvoicePo.invoice ||
            !detailInvoicePo.invoice.length ||
            !detailInvoicePo.penawarandetail ||
            !detailInvoicePo.penawarandetail.length ? (
              // <div>Data tidak lengkap</div>
              <Row>
                <Col lg="12">
                  <Alert color="danger">
                    {detailInvoicePo.map((key, index) => (
                      <div key={index}>
                        {key}: {detailInvoicePo[key]}
                        <br />
                      </div>
                    ))}
                  </Alert>
                  Kembali Ke Halaman <Link to="/finance/monitoring/invoice">Procurement List</Link>
                </Col>
              </Row>
            ) : (
              <>
                <Row>
                  <Col lg={12}>
                    {detailInvoicePo.bastvendor.map((rowBast, indexBast) => (
                      <Card key={indexBast}>
                        <CardHeader>No Bast : {rowBast.no_bast_vendor}</CardHeader>
                      </Card>
                    ))}
                  </Col>
                </Row>

                <Row>
                  <Col lg={12}>
                    {detailInvoicePo.invoice.map((rowInvoice, indexInvoice) => (
                      <Card key={indexInvoice}>
                        <CardHeader>Invoice : {rowInvoice.no_invoice}</CardHeader>
                      </Card>
                    ))}
                  </Col>
                </Row>

                <Row>
                  <Col lg={12}>
                    {detailInvoicePo.penawarandetail.map((rowPenawaran, indexPenawaran) => (
                      <Card key={indexPenawaran}>
                        <CardHeader>Penawaran : {indexPenawaran + 1}</CardHeader>
                        <CardBody>
                          <CardHeader>Price : {formatRupiah(rowPenawaran.price)}</CardHeader>

                          <div className="table-responsive">
                            <Table className="invoice-table table-borderless table-nowrap mb-0">
                              <thead className="align-middle">
                                <tr className="table-active">
                                  <th scope="col" style={{ width: "50px" }}>
                                    No.
                                  </th>
                                  <th scope="col">Part Number</th>
                                  <th scope="col">Unit</th>
                                  <th scope="col">Page Desc</th>
                                  <th scope="col">Page Image</th>
                                  <th scope="col">Remarks</th>
                                  <th scope="col">Qty</th>
                                  <th scope="col">Desc</th>
                                </tr>
                              </thead>
                              <tbody id="newlink">
                                <tr className="product">
                                  <th scope="row" className="product-id">
                                    {1}
                                  </th>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Part Name"
                                      name="product_name"
                                      readOnly
                                      value={rowPenawaran.partrequest.part_number}
                                    />
                                  </td>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Part Name"
                                      name="product_name"
                                      readOnly
                                      value={rowPenawaran.partrequest.unit}
                                    />
                                  </td>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Page Desc"
                                      name="product_name"
                                      readOnly
                                      value={rowPenawaran.partrequest.page_desc}
                                    />
                                  </td>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Page Image"
                                      name="product_name"
                                      readOnly
                                      value={rowPenawaran.partrequest.page_image}
                                    />
                                  </td>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Remarks"
                                      name="product_name"
                                      readOnly
                                      value={rowPenawaran.partrequest.remarks}
                                    />
                                  </td>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Part Name"
                                      name="product_name"
                                      readOnly
                                      value={rowPenawaran.partrequest.qty}
                                    />
                                  </td>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Part Name"
                                      name="product_name"
                                      readOnly
                                      value={rowPenawaran.partrequest.desc}
                                    />
                                  </td>
                                </tr>

                                {/* {rowPenawaran.partrequest.map((rowPart, indexPart) => (
                              <tr key={indexPart} className="product">
                                <th scope="row" className="product-id">
                                  {indexPart + 1}
                                </th>
                                <td className="text-start">
                                  <Input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    id="productName-1"
                                    placeholder="Part Name"
                                    name="product_name"
                                    readOnly
                                    value={rowPart.part_number}
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    id="productName-1"
                                    placeholder="Part Name"
                                    name="product_name"
                                    readOnly
                                    value={rowPart.unit}
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    id="productName-1"
                                    placeholder="Part Name"
                                    name="product_name"
                                    readOnly
                                    value={rowPart.page_desc}
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    id="productName-1"
                                    placeholder="Part Name"
                                    name="product_name"
                                    readOnly
                                    value={rowPart.page_image}
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    id="productName-1"
                                    placeholder="Part Name"
                                    name="product_name"
                                    readOnly
                                    value={rowPart.remarks}
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    id="productName-1"
                                    placeholder="Part Name"
                                    name="product_name"
                                    readOnly
                                    value={rowPart.qty}
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    type="text"
                                    className="form-control bg-light border-0"
                                    id="productName-1"
                                    placeholder="Part Name"
                                    name="product_name"
                                    readOnly
                                    value={rowPart.desc}
                                  />
                                </td>
                              </tr>
                            ))} */}
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default DetailInvoicePo;
