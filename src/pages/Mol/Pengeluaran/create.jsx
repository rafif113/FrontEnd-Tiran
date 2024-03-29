import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Input, Form, Table, FormFeedback } from "reactstrap";

import { Link } from "react-router-dom";
import { addPengeluaran as onAddPengeluaran } from "../../../slices/thunks";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubmitModal from "../../../Components/Common/SubmitModal";

const CreatePengeluaran = () => {
  document.title = "Create Pengeluaran | PT Tiran";
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const selectedPartRequest = useSelector((state) => state.Mol.selectedPartRequest);
  const selectedPartRequestIds = selectedPartRequest.map((item) => ({ id: item.id }));

  const [revisiQtyValues, setRevisiQtyValues] = useState(Array(selectedPartRequest.length).fill());

  const handleRevisiQtyChange = (e, index) => {
    const newValue = parseInt(e.target.value, 10) || null;
    setRevisiQtyValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValue;
      return newValues;
    });
  };
  const detailMol = useSelector((state) => state.Mol.detailMol);

  // handle form input
  const validation = useFormik({
    // enableReinitialize: true,
    initialValues: {
      mol_no: "",
      unit_id: "",
    },
    validationSchema: Yup.object({
      mol_no: Yup.string().required("Please Enter a mol_no"),
      unit_id: Yup.string().required("Please Enter a unit_id"),
    }),
    onSubmit: async (values) => {
      const newPengeluaran = {
        mol_no: values.mol_no,
        unit_id: values.unit_id,
        id_part_request: selectedPartRequestIds,
        qty_pengeluaran: revisiQtyValues,
        // qty_pengeluaran: revisiQtyValues.map((qty) => ({
        //   qty: qty,
        // })),
      };

      await dispatch(onAddPengeluaran(newPengeluaran));
      history("/mol/pengeluaran");
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

  useEffect(() => {
    validation.setValues({
      mol_no: detailMol.mol.mol_no,
      unit_id: detailMol.mol.unit_code,
    });
  }, []);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Pengeluaran" pageTitle="Pengeluaran" />

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
                        <label className="form-label" htmlFor="mol_no">
                          Mol No
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="mol_no"
                          name="mol_no"
                          placeholder="Enter Mol No"
                          value={validation.values.mol_no || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.mol_no && validation.touched.mol_no ? true : false}
                        />
                        {validation.errors.mol_no && validation.touched.mol_no ? (
                          <FormFeedback type="invalid">{validation.errors.mol_no}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="unit_id">
                          Unit
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="unit_id"
                          name="unit_id"
                          placeholder="Enter Unit"
                          value={validation.values.unit_id || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.unit_id && validation.touched.unit_id ? true : false}
                        />
                        {validation.errors.unit_id && validation.touched.unit_id ? (
                          <FormFeedback type="invalid">{validation.errors.unit_id}</FormFeedback>
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
                          <th scope="col">Stock</th>
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
                              <Input
                                type="number"
                                className="form-control bg-light border-0 mt-3"
                                id={`revisiQty-${index}`}
                                placeholder="Revisi Qty"
                                name="revisi_qty"
                                onChange={(e) => handleRevisiQtyChange(e, index)}
                                value={revisiQtyValues[index]}
                                max={row.stock}
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
                                value={row.stock}
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
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

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
  );
};

export default CreatePengeluaran;
