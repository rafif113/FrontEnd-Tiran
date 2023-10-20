import React, { useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Input, Form, Table, FormFeedback } from "reactstrap";

import { Link } from "react-router-dom";
import { addFpb as onAddFpb } from "../../../slices/thunks";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

const CreateFpb = () => {
  document.title = "Create Product | PT Tiran";
  const dispatch = useDispatch();

  // Handle new part barang request
  const [rows, setRows] = useState([
    {
      id: 1,
      productName: "",
    },
  ]);

  const handleAddItem = () => {
    const newRow = {
      id: rows.length + 1,
      productName: "",
    };
    setRows([...rows, newRow]);
  };

  const selectedPartRequest = useSelector((state) => state.Mol.selectedPartRequest);
  const selectedPartRequestIds = selectedPartRequest.map((item) => ({ id: item.id }));
  // handle form input
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      site: "",
      nomor: "",
      pengajuan: "",
      diajukan_oleh: "",
      title: "",
      date: "",
      tujuan: "",
      desc: "",
    },
    validationSchema: Yup.object({
      site: Yup.string().required("Please Enter a site"),
      nomor: Yup.string().required("Please Enter a nomor"),
      pengajuan: Yup.string().required("Please Enter a pengajuan"),
      diajukan_oleh: Yup.string().required("Please Enter a diajukan"),
      title: Yup.string().required("Please Enter a title"),
      date: Yup.string().required("Please Enter a date"),
      tujuan: Yup.string().required("Please Enter a tujuan"),
      desc: Yup.string().required("Please Enter a desc"),
    }),
    onSubmit: (values) => {
      const newFpb = {
        site: values.site,
        nomor: values.nomor,
        pengajuan: values.pengajuan,
        diajukan_oleh: values.diajukan_oleh,
        title: values.title,
        date: values.date,
        tujuan: values.tujuan,
        desc: values.desc,
        id_mol: selectedPartRequest[0].id_mol,
        id_part_request: selectedPartRequestIds,
      };
      console.log(newFpb);
      dispatch(onAddFpb(newFpb));

      //   history("/create-barang");
      //   validation.resetForm();
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create FPB" pageTitle="FPB" />

        <Row>
          <Col lg={12}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="site">
                          Site
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="site"
                          name="site"
                          placeholder="Enter site"
                          value={validation.values.site || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.site && validation.touched.site ? true : false}
                        />
                        {validation.errors.site && validation.touched.site ? (
                          <FormFeedback type="invalid">{validation.errors.site}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor">
                          Nomor
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor"
                          name="nomor"
                          placeholder="Enter nomor"
                          value={validation.values.nomor || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.nomor && validation.touched.nomor ? true : false}
                        />
                        {validation.errors.nomor && validation.touched.nomor ? (
                          <FormFeedback type="invalid">{validation.errors.nomor}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="pengajuan">
                          Pengajuan
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="pengajuan"
                          name="pengajuan"
                          placeholder="Enter pengajuan"
                          value={validation.values.pengajuan || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.pengajuan && validation.touched.pengajuan ? true : false}
                        />
                        {validation.errors.pengajuan && validation.touched.pengajuan ? (
                          <FormFeedback type="invalid">{validation.errors.pengajuan}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="diajukan_oleh">
                          Diajukan
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="diajukan_oleh"
                          name="diajukan_oleh"
                          placeholder="Enter Diajukan Oleh"
                          value={validation.values.diajukan_oleh || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.diajukan_oleh && validation.touched.diajukan_oleh ? true : false}
                        />
                        {validation.errors.diajukan_oleh && validation.touched.diajukan_oleh ? (
                          <FormFeedback type="invalid">{validation.errors.diajukan_oleh}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="title">
                          Title
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          placeholder="Enter title"
                          value={validation.values.title || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.title && validation.touched.title ? true : false}
                        />
                        {validation.errors.title && validation.touched.title ? (
                          <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="date">
                          Date
                        </label>
                        <Input
                          type="date"
                          className="form-control"
                          id="date"
                          name="date"
                          placeholder="Enter date"
                          value={validation.values.date || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.date && validation.touched.date ? true : false}
                        />
                        {validation.errors.date && validation.touched.date ? (
                          <FormFeedback type="invalid">{validation.errors.date}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="title">
                          Tujuan
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
                          Keterangan
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
                    </Col>
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
                          <th scope="col">Part Number</th>
                          <th scope="col">Deskripsi / Nama Barang</th>
                          <th scope="col">Merk / Type</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody id="newlink">
                        {selectedPartRequest.map((row, index) => (
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
                                value={row.desc}
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
                                value={row.unit}
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
                                value={row.page_desc}
                              />
                            </td>

                            {/* <td className="product-removal">
                            <Link to="#" className="btn btn-success">
                              Delete
                            </Link>
                          </td> */}
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateFpb;
