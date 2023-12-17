import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Input, Form, Table, CardHeader } from "reactstrap";

import { Link } from "react-router-dom";
import { getDetailKttPo as onGetDetailKttPo, postKttApprove as postKttApprove } from "../../../../slices/thunks";
//formik
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import { setLoadingDetail, clearDetailKttPo } from "../../../../slices/ktt/reducer";
import SubmitModal from "../../../../Components/Common/SubmitModal";

const DetailKttPoRutin = () => {
  document.title = "Detail KTT PO Rutin | PT Tiran";
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const selectDetailKttPo = createSelector(
    (state) => state.Ktt.detailKttPo,
    (detailKttPo) => detailKttPo
  );
  const detailKttPo = useSelector(selectDetailKttPo);
  const loadingKttPo = useSelector((state) => state.Ktt.loadingDetail);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_po = url.searchParams.get("id");
    dispatch(setLoadingDetail(true));
    dispatch(clearDetailKttPo());
    dispatch(onGetDetailKttPo({ id_po })).then(() => {
      dispatch(setLoadingDetail(false));
    });
  }, []);

  const validation = useFormik({
    enableReinitialize: true,
    onSubmit: (values) => {
      // dispatch(postKttApprove({ id_penawaran_vendor: idPenawaranVendor }));
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
        <BreadCrumb title="Detail KTT PO Rutin" pageTitle="PO" />

        {loadingKttPo ? (
          ""
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
                          value={detailKttPo.po.nomor_po}
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
                          value={detailKttPo.po.nomor_pr}
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
                          value={detailKttPo.po.spesial_intruksi}
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
                          value={detailKttPo.po.st_name}
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
                        {detailKttPo.partrequest.map((row, index) => (
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

              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(postKttApprove({ id_po: detailKttPo.po.id }));
                  alert("berhasil");
                }}
              >
                <div className="text-end mb-3">
                  <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                    <button type="button" className="btn btn-danger w-sm">
                      Reject PO
                    </button>
                    <button type="submit" className="btn btn-primary w-sm">
                      Accept PO
                    </button>
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

export default DetailKttPoRutin;
