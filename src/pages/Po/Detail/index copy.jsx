import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Input, Form, Table, CardHeader, Spinner } from "reactstrap";

import { Link } from "react-router-dom";
import { getDetailPo as onGetDetailPo, addDo as onAddDo } from "../../../slices/thunks";
//formik
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import { clearDetailPo, setLoadingDetail as setLoadingPoDetail } from "../../../slices/po/reducer";
import SubmitModal from "../../../Components/Common/SubmitModal";
import { formatRupiah } from "../../../utils/utils";

const DetailPo = () => {
  document.title = "Detail PO | PT Tiran";
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const selectDetailPo = createSelector(
    (state) => state.Po.detailPo,
    (detailPo) => detailPo
  );
  const detailPo = useSelector(selectDetailPo);
  const loadingPo = useSelector((state) => state.Po.loadingDetail);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_po = url.searchParams.get("id");
    dispatch(setLoadingPoDetail(true));
    dispatch(clearDetailPo());
    dispatch(onGetDetailPo({ id_po })).then(() => {
      dispatch(setLoadingPoDetail(false));
    });
  }, []);

  const validation = useFormik({
    enableReinitialize: true,
    onSubmit: (values) => {
      // dispatch(onAddDo({ id_penawaran_vendor: idPenawaranVendor }));
      // history("/po");
    },
  });

  const openSubmitModal = () => {
    setShowSubmitModal(true);
  };

  const closeSubmitModal = () => {
    setShowSubmitModal(false);
  };

  const onSubmitClick = () => {
    validation.handleSubmit();
    closeSubmitModal();
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Detail Po" pageTitle="Po" />

        {loadingPo ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            <Col lg={12}>
              {/* Start Detail PO */}
              <Card>
                <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>Detail PO</CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor_po">
                          Nomor PO
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor_po"
                          name="nomor_po"
                          placeholder="Enter No PO"
                          readOnly
                          value={detailPo.po.nomor_po}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor_pr">
                          Nomor PR
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor_pr"
                          name="nomor_pr"
                          placeholder="Enter No PR"
                          readOnly
                          value={detailPo.po.nomor_pr}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="spesial_intruksi">
                          Spesial Intruksi
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="spesial_intruksi"
                          name="spesial_intruksi"
                          placeholder="Enter Special Instruction"
                          readOnly
                          value={detailPo.po.spesial_intruksi}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="st_name">
                          Serah Terima Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="st_name"
                          name="st_name"
                          placeholder="Enter Serah Terima"
                          readOnly
                          value={detailPo.po.st_name}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {/* End Detail PO */}

              {/* Start Part Request */}
              <Card>
                <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>List Part Request</CardHeader>
                <CardBody className="p-4">
                  <div className="table-responsive" style={{ overflowX: "auto" }}>
                    <Table className="mb-0" style={{ width: "100%" }}>
                      <thead className="align-middle">
                        <tr className="table-active">
                          <th scope="col" style={{ width: "50px" }}>
                            No.
                          </th>
                          <th scope="col">Part Number</th>
                          <th scope="col">Description</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Unit</th>
                          <th scope="col">Group</th>
                          <th scope="col">Page Image</th>
                          <th scope="col">Page Desc</th>
                          <th scope="col">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailPo.partrequest.map((row, index) => (
                          <tr key={row.id} className="product">
                            <th scope="row" className="product-id">
                              {index + 1}
                            </th>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                placeholder="Part Number"
                                name="part_number"
                                value={row.part_number}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                placeholder="Description"
                                name="description"
                                value={row.desc}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="number"
                                className="form-control form-control-sm bg-light border-0"
                                placeholder="Quantity"
                                name="qty"
                                value={row.qty}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                placeholder="Unit"
                                name="unit"
                                value={row.unit}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                placeholder="Group"
                                name="group"
                                value={row.group}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="number"
                                className="form-control form-control-sm bg-light border-0"
                                placeholder="Page Image"
                                name="page_image"
                                value={row.page_image}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                placeholder="Page Desc"
                                name="page_desc"
                                value={row.page_desc}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                placeholder="Remarks"
                                name="remarks"
                                value={row.remarks}
                                readOnly
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
              {/* End Part Request */}

              {detailPo.detail.map((rowPenawaran, indexPenawaran) => (
                <Card key={indexPenawaran}>
                  <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>
                    Penawaran Ke-{rowPenawaran.penawaran_ke}
                  </CardHeader>
                  {rowPenawaran.detail_penawaran.map((rowDetail, indexDetail) => {
                    return (
                      <CardBody key={indexDetail}>
                        <CardHeader style={{ backgroundColor: rowDetail.flag == 1 ? "lightgrey" : "inherit" }}>
                          Vendor : {rowDetail.vendor} {rowDetail.flag == 1 ? "(Pemenang)" : ""}
                        </CardHeader>
                        <div className="table-responsive">
                          <Table className="invoice-table table-borderless table-nowrap mb-0">
                            <thead className="align-middle">
                              <tr className="table-active">
                                <th scope="col" style={{ width: "50px" }}>
                                  No.
                                </th>
                                <th scope="col">Description and Specification</th>
                                {/* <th scope="col">Qty</th> */}
                                <th scope="col">Price</th>
                                {/* <th scope="col">Total</th> */}
                              </tr>
                            </thead>
                            <tbody id="newlink">
                              {rowDetail.detail_price.map((rowPrice, indexPrice) => (
                                <tr key={rowPrice.id} className="product">
                                  <th scope="row" className="product-id">
                                    {indexPrice + 1}
                                  </th>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Part Name"
                                      name="product_name"
                                      readOnly
                                      value={rowPrice.part_request}
                                    />
                                  </td>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Price"
                                      name="product_name"
                                      readOnly
                                      value={formatRupiah(rowPrice.price)}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </CardBody>
                    );
                  })}
                </Card>
              ))}

              <Form
                onSubmit={(e) => {
                  e.preventDefault();

                  let idPenawaranVendor = null;

                  detailPo.detail.forEach((rowPenawaran) => {
                    rowPenawaran.detail_penawaran.forEach((rowDetail) => {
                      if (rowDetail.flag == 1) {
                        idPenawaranVendor = rowDetail.id_detail;
                      }
                    });
                  });

                  if (idPenawaranVendor !== null) {
                    dispatch(onAddDo({ id_penawaran_vendor: idPenawaranVendor }));
                    alert("berhasil");
                  } else {
                    console.error("Tidak dapat menemukan id_detail saat flag == 1");
                  }
                }}
              >
                <div className="text-end mb-3">
                  <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                    <button type="submit" name="penawaran" className="btn btn-primary w-sm">
                      Request DO
                    </button>
                    {/* <button type="submit" name="submit" className="btn btn-success w-sm">
                      Cek Kesesuaian
                    </button> */}
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        )}
        <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} />
      </Container>
    </div>
  );
};

export default DetailPo;
