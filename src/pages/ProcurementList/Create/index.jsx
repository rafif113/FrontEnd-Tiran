import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import SubmitModal from "../../../Components/Common/SubmitModal";
import { Card, CardBody, Col, Container, Row, Input, Form, Table, FormFeedback, CardHeader } from "reactstrap";

import { Link } from "react-router-dom";
import {
  getPo as onGetPo,
  postProcurementList as onPostProcurementList,
  getDetailPo as onGetDetailPo,
} from "../../../slices/thunks";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import LoadingModal from "../../../Components/Common/LoadingModal";
import { formatRupiah } from "../../../utils/utils";

const CreateProcurement = () => {
  document.title = "Create Procurement | PT Tiran";
  const history = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const fetchDataIfNeeded = (selector, action) => {
    const data = useSelector(selector);

    useEffect(() => {
      if (data && !data.length) {
        dispatch(action());
      }
    }, [dispatch, data]);
  };
  fetchDataIfNeeded((state) => state.Po.po, onGetPo);
  const po = useSelector((state) => state.Po.po);

  // handle form input
  const validation = useFormik({
    initialValues: {
      id_po: "",
      no_pr: "",
      date: "",
      spesial_intruksi: "",
      note: "",
      file: null, // Add file field to initialValues
    },
    // validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("id_po", values.id_po);
      formData.append("keterangan", values.note);
      formData.append("file_invo", values.file);
      setLoading(true);
      await dispatch(onPostProcurementList(formData));
      // setLoading(false);
      history("/procurement-list");
      validation.resetForm();
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

  const [partRequestData, setPartRequestData] = useState([]);
  const changeIdPo = (id_po) => {
    console.log(id_po);
    dispatch(onGetDetailPo({ id_po })).then((response) => {
      setPartRequestData(response.payload.data.partrequest || []);
    });
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Procurement" pageTitle="Procurement" />

          <Row>
            <Col lg={12}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  openSubmitModal();
                }}
              >
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="id_po">
                            No. Po
                          </label>
                          <Select
                            placeholder="Po Number"
                            name="id_po"
                            value={po.find((detail) => detail.po.id.toString() === validation.values.id_po)}
                            options={po.map((detail) => ({
                              label: detail.po.nomor_po,
                              value: detail.po.id,
                            }))}
                            onBlur={validation.handleBlur}
                            onChange={(selectedOption) => {
                              validation.setFieldValue("id_po", selectedOption.value);
                              const selectedDetail = po.find((detail) => detail.po.id === selectedOption.value);
                              validation.setFieldValue("no_pr", selectedDetail.po.nomor_pr);
                              validation.setFieldValue("date", selectedDetail.po.date);
                              validation.setFieldValue("spesial_intruksi", selectedDetail.po.spesial_intruksi);
                              changeIdPo(selectedOption.value);
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="no_pr">
                            No. PR
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="no_pr"
                            name="no_pr"
                            placeholder="PR Number"
                            disabled
                            value={validation.values.no_pr || ""}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="date">
                            Process Date
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="date"
                            name="date"
                            disabled
                            value={validation.values.date || ""}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="spesial_intruksi">
                            Special Instruction
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="spesial_intruksi"
                            name="spesial_intruksi"
                            disabled
                            value={validation.values.spesial_intruksi || ""}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="title">
                            File
                          </label>
                          <Input
                            type="file"
                            className="form-control"
                            id="file"
                            name="file"
                            onChange={(event) => validation.setFieldValue("file", event.currentTarget.files[0])}
                            placeholder="File Invoice"
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="title">
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            id="message-text"
                            rows="1"
                            name="note"
                            value={validation.values.note || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={validation.errors.note && validation.touched.note ? true : false}
                          ></textarea>
                          {validation.errors.note && validation.touched.note ? (
                            <FormFeedback type="invalid">{validation.errors.note}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {partRequestData.length != 0 && (
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
                            {partRequestData.map((row, index) => (
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
                )}

                <div className="text-end mb-3">
                  <button type="submit" className="btn btn-primary w-sm">
                    Submit
                  </button>
                </div>
              </Form>
              <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} />
            </Col>
          </Row>
        </Container>
      </div>
      <LoadingModal show={loading} />
    </>
  );
};

export default CreateProcurement;
