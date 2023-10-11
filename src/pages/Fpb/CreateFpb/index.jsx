import React, { useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Input, Form, Table } from "reactstrap";

import { Link } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateFpb = () => {
  document.title = "Create Product | Velzon - React Admin & Dashboard Template";

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

  // handle form input
  const validation = useFormik({
    enableReinitialize: true,
    // initialValues,
    initialValues: {
      id: "",
      part_number: "",
      keterangan: "",
      qty: "",
      price: "",
      merktype: "",
      desc_barang: "",
      id_kategori: "",
    },
    validationSchema: Yup.object({
      keterangan: Yup.string().required("Please Enter a Keterangan"),
      qty: Yup.string().required("Please Enter a Barang stock"),
      price: Yup.string().required("Please Enter a Barang price"),
      merktype: Yup.string().required("Please Enter a Barang Type"),
    }),
    onSubmit: (values) => {
      const newBarang = {
        id: values.id,
        part_number: values.part_number,
        keterangan: values.keterangan,
        qty: values.qty,
        price: values.price,
        merktype: values.merktype,
        desc_barang: values.desc_barang,
        id_kategori: values.id_kategori,
      };
      console.log(newBarang);
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
                        <label className="form-label" htmlFor="title">
                          Title
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                          placeholder="Enter title"
                          //   value={validation.values.manufacturer_name || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_name && validation.touched.manufacturer_name ? true : false}
                        />
                        {/* {validation.errors.manufacturer_name && validation.touched.manufacturer_name ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_name}</FormFeedback>
                        ) : null} */}
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
                          //   value={validation.values.manufacturer_name || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_name && validation.touched.manufacturer_name ? true : false}
                        />
                        {/* {validation.errors.manufacturer_name && validation.touched.manufacturer_name ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_name}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="title">
                          Tujuan
                        </label>
                        <textarea className="form-control" id="message-text" rows="4"></textarea>
                        {/* {validation.errors.manufacturer_name && validation.touched.manufacturer_name ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_name}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="title">
                          Keterangan
                        </label>
                        <textarea className="form-control" id="message-text" rows="4"></textarea>
                        {/* {validation.errors.manufacturer_name && validation.touched.manufacturer_name ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_name}</FormFeedback>
                        ) : null} */}
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
                        {rows.map((row) => (
                          <tr key={row.id} className="product">
                            <th scope="row" className="product-id">
                              {row.id}
                            </th>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
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
                      <tbody>
                        <tr id="newForm" style={{ display: "none" }}>
                          <td className="d-none" colSpan="5">
                            <p>Add New Form</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5">
                            <Link to="#" className="btn btn-soft-secondary fw-medium" id="add-item" onClick={handleAddItem}>
                              <i className="ri-add-fill me-1 align-bottom"></i> Add Item
                            </Link>
                          </td>
                        </tr>
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
