import React, { useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Input, Form, Table, FormFeedback } from "reactstrap";

import { Link } from "react-router-dom";
import { addPo as onAddPo } from "../../../slices/thunks";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubmitModal from "../../../Components/Common/SubmitModal";

const CreateFpb = () => {
  document.title = "Create PO | PT Tiran";
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const selectedFpbList = useSelector((state) => state.Fpb.selectedFpbList);
  const selectedFpbData = selectedFpbList.map((item) => ({ id: item.id, price: item.price }));
  // handle form input
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      nomor_po: "",
      nomor_pr: "",
      spesial_intruksi: "",
      st_name: "",
    },
    validationSchema: Yup.object({
      nomor_po: Yup.string().required("Please Enter a Nomor PO"),
      nomor_pr: Yup.string().required("Please Enter a Nomor PR"),
      spesial_intruksi: Yup.string().required("Please Enter a Special Instruction"),
      st_name: Yup.string().required("Please Enter a Staff Name"),
    }),
    onSubmit: (values) => {
      const newPo = {
        nomor_po: values.nomor_po,
        nomor_pr: values.nomor_pr,
        spesial_intruksi: values.spesial_intruksi,
        st_name: values.st_name,
        id_part_request: selectedFpbData,
      };
      console.log(newPo);
      dispatch(onAddPo(newPo));
      history("/po");
      //   validation.resetForm();
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
        <BreadCrumb title="Create PO" pageTitle="PO" />

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
                        <label className="form-label" htmlFor="nomor_po">
                          Nomor PO
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor_po"
                          name="nomor_po"
                          placeholder="Enter No PO"
                          value={validation.values.nomor_po || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.nomor_po && validation.touched.nomor_po ? true : false}
                        />
                        {validation.errors.nomor_po && validation.touched.nomor_po ? (
                          <FormFeedback type="invalid">{validation.errors.nomor_po}</FormFeedback>
                        ) : null}
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
                          value={validation.values.nomor_pr || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.nomor_pr && validation.touched.nomor_pr ? true : false}
                        />
                        {validation.errors.nomor_pr && validation.touched.nomor_pr ? (
                          <FormFeedback type="invalid">{validation.errors.nomor_pr}</FormFeedback>
                        ) : null}
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
                          value={validation.values.spesial_intruksi || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.spesial_intruksi && validation.touched.spesial_intruksi ? true : false}
                        />
                        {validation.errors.spesial_intruksi && validation.touched.spesial_intruksi ? (
                          <FormFeedback type="invalid">{validation.errors.spesial_intruksi}</FormFeedback>
                        ) : null}
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
                          value={validation.values.st_name || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.st_name && validation.touched.st_name ? true : false}
                        />
                        {validation.errors.st_name && validation.touched.st_name ? (
                          <FormFeedback type="invalid">{validation.errors.st_name}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="title">
                          Vendor
                        </label>
                        <textarea
                          className="form-control"
                          id="message-text"
                          rows="4"
                          name="tujuan"
                          value={validation.values.tujuan || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.tujuan && validation.touched.tujuan ? true : false}
                        ></textarea>
                        {validation.errors.tujuan && validation.touched.tujuan ? (
                          <FormFeedback type="invalid">{validation.errors.tujuan}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="title">
                          Ship to
                        </label>
                        <textarea
                          className="form-control"
                          id="message-text"
                          rows="4"
                          name="desc"
                          value={validation.values.desc || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.desc && validation.touched.desc ? true : false}
                        ></textarea>
                        {validation.errors.desc && validation.touched.desc ? (
                          <FormFeedback type="invalid">{validation.errors.desc}</FormFeedback>
                        ) : null}
                      </div>
                    </Col> */}
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-4">
                  <div className="table-responsive">
                    <Table className="invoice-table table-borderless table-nowrap mb-0">
                      <thead className="align-middle">
                        <tr className="table-active">
                          <th scope="col" style={{ width: "50px" }}>
                            No.
                          </th>
                          <th scope="col">Description and Specification</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Price</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody id="newlink">
                        {selectedFpbList.map((row, index) => (
                          <tr key={row.id} className="product">
                            <th scope="row" className="product-id">
                              {index + 1}
                            </th>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                                readOnly
                                value={row.part_number}
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                                readOnly
                                value={row.qty}
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                                readOnly
                                value={row.price}
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                                readOnly
                                value={row.qty * row.price}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

              <div className="text-end mb-3">
                <button type="submit" className="btn btn-success w-sm">
                  Submit
                </button>
              </div>
            </Form>
            <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateFpb;
