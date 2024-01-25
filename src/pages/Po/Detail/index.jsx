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

  console.log(detailPo);

  const validation = useFormik({
    // enableReinitialize: true,
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
                          readOnly
                          value={detailPo.nomor_po}
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
                          readOnly
                          value={detailPo.nomor_pr}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nama_vendor">
                          Nama Vendor
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nama_vendor"
                          name="nama_vendor"
                          readOnly
                          value={detailPo.nama_vendor}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="date">
                          Date
                        </label>
                        <Input type="text" className="form-control" id="date" name="date" readOnly value={detailPo.date} />
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
                          readOnly
                          value={detailPo.spesial_intruksi}
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
                          <th scope="col">Price</th>
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
                                name="part_number"
                                value={row.partrequest.part_number}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                name="description"
                                value={row.partrequest.desc}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="number"
                                className="form-control form-control-sm bg-light border-0"
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
                                name="price"
                                value={formatRupiah(row.price)}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                name="unit"
                                value={row.partrequest.unit}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                name="group"
                                value={row.partrequest.group}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="number"
                                className="form-control form-control-sm bg-light border-0"
                                name="page_image"
                                value={row.partrequest.page_image}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                name="page_desc"
                                value={row.partrequest.page_desc}
                                readOnly
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                style={{ minWidth: "100px" }}
                                type="text"
                                className="form-control form-control-sm bg-light border-0"
                                name="remarks"
                                value={row.partrequest.remarks}
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
            </Col>
          </Row>
        )}
        <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} />
      </Container>
    </div>
  );
};

export default DetailPo;
