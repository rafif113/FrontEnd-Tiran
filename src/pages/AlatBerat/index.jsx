import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { PaginationTable } from "./PaginationTable";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addAlatBerat } from "../../slices/thunks";

const ListAlatBerat = () => {
  document.title = "List Alat Berat | PT Tiran";
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const validation = useFormik({
    initialValues: {
      type: "",
      brand: "",
      model: "",
      nopol: "",
      new_plat_number: "",
      serial_number: "",
      engine_number: "",
      sn_radio_momunikasi: "",
      keterangan: "",
      location: "",
      masuk: "",
      cat: "",
      sub_cat: "",
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Please Enter a type"),
      brand: Yup.string().required("Please Enter a brand"),
      model: Yup.string().required("Please Enter a model"),
      nopol: Yup.string().required("Please Enter a nopol"),
      new_plat_number: Yup.string().required("Please Enter a new_plat_number"),
      serial_number: Yup.string().required("Please Enter a serial_number"),
      engine_number: Yup.string().required("Please Enter a engine_number"),
      sn_radio_momunikasi: Yup.string().required("Please Enter a sn_radio_momunikasi"),
      keterangan: Yup.string().required("Please Enter a keterangan"),
      location: Yup.string().required("Please Enter a location"),
      masuk: Yup.string().required("Please Enter a masuk"),
      cat: Yup.string().required("Please Enter a cat"),
      sub_cat: Yup.string().required("Please Enter a sub_cat"),
    }),
    onSubmit: async (values) => {
      const newData = {
        type: values.type,
        brand: values.brand,
        model: values.model,
        nopol: values.nopol,
        new_plat_number: values.new_plat_number,
        serial_number: values.serial_number,
        engine_number: values.engine_number,
        sn_radio_momunikasi: values.sn_radio_momunikasi,
        keterangan: values.keterangan,
        location: values.location,
        masuk: values.masuk,
        cat: values.cat,
        sub_cat: values.sub_cat,
      };
      await dispatch(addAlatBerat(newData));
      window.location.reload();
      validation.resetForm();
    },
  });
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">List Alat Berat</h5>
                  <button className="btn btn-sm btn-primary" id="btn-new-event" onClick={toggle}>
                    <i className="mdi mdi-plus"></i> Create Alat Berat
                  </button>
                </CardHeader>
                <CardBody>
                  <PaginationTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal isOpen={modal} id="event-modal" centered>
        <ModalHeader toggle={toggle} tag="h5" className="p-3 bg-info-subtle modal-title">
          Add Alat Berat
        </ModalHeader>
        <ModalBody>
          <Form
            className={"needs-validation"}
            name="event-form"
            id="form-event"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
            }}
          >
            <Row className="event-form">
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Type</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Type"
                    type="text"
                    name="type"
                    id="type"
                    value={validation.values.type || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.type && validation.touched.type ? true : false}
                  />
                  {validation.touched.type && validation.errors.type ? (
                    <FormFeedback type="invalid">{validation.errors.type}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Brand</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Brand"
                    type="text"
                    name="brand"
                    id="brand"
                    value={validation.values.brand || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.brand && validation.touched.brand ? true : false}
                  />
                  {validation.touched.brand && validation.errors.brand ? (
                    <FormFeedback type="invalid">{validation.errors.brand}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Model</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter model"
                    type="text"
                    name="model"
                    id="model"
                    value={validation.values.model || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.model && validation.touched.model ? true : false}
                  />
                  {validation.touched.model && validation.errors.model ? (
                    <FormFeedback type="invalid">{validation.errors.model}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Nopol</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Nopol"
                    type="text"
                    name="nopol"
                    id="nopol"
                    value={validation.values.nopol || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.nopol && validation.touched.nopol ? true : false}
                  />
                  {validation.touched.nopol && validation.errors.nopol ? (
                    <FormFeedback type="invalid">{validation.errors.nopol}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">New Plat Number</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter New Plat Number"
                    type="text"
                    name="new_plat_number"
                    id="new_plat_number"
                    value={validation.values.new_plat_number || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.new_plat_number && validation.touched.new_plat_number ? true : false}
                  />
                  {validation.touched.new_plat_number && validation.errors.new_plat_number ? (
                    <FormFeedback type="invalid">{validation.errors.new_plat_number}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Serial Number</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Serial Number"
                    type="text"
                    name="serial_number"
                    id="serial_number"
                    value={validation.values.serial_number || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.serial_number && validation.touched.serial_number ? true : false}
                  />
                  {validation.touched.serial_number && validation.errors.serial_number ? (
                    <FormFeedback type="invalid">{validation.errors.serial_number}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Engine Number</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Engine Number"
                    type="text"
                    name="engine_number"
                    id="engine_number"
                    value={validation.values.engine_number || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.engine_number && validation.touched.engine_number ? true : false}
                  />
                  {validation.touched.engine_number && validation.errors.engine_number ? (
                    <FormFeedback type="invalid">{validation.errors.engine_number}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">SN Radio</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter SN Radio"
                    type="text"
                    name="sn_radio_momunikasi"
                    id="sn_radio_momunikasi"
                    value={validation.values.sn_radio_momunikasi || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.sn_radio_momunikasi && validation.touched.sn_radio_momunikasi ? true : false}
                  />
                  {validation.touched.sn_radio_momunikasi && validation.errors.sn_radio_momunikasi ? (
                    <FormFeedback type="invalid">{validation.errors.sn_radio_momunikasi}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Keterangan</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Keterangan"
                    type="text"
                    name="keterangan"
                    id="keterangan"
                    value={validation.values.keterangan || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.keterangan && validation.touched.keterangan ? true : false}
                  />
                  {validation.touched.keterangan && validation.errors.keterangan ? (
                    <FormFeedback type="invalid">{validation.errors.keterangan}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Location</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Location"
                    type="text"
                    name="location"
                    id="location"
                    value={validation.values.location || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.location && validation.touched.location ? true : false}
                  />
                  {validation.touched.location && validation.errors.location ? (
                    <FormFeedback type="invalid">{validation.errors.location}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Masuk</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Masuk"
                    type="text"
                    name="masuk"
                    id="masuk"
                    value={validation.values.masuk || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.masuk && validation.touched.masuk ? true : false}
                  />
                  {validation.touched.masuk && validation.errors.masuk ? (
                    <FormFeedback type="invalid">{validation.errors.masuk}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Cat</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Cat"
                    type="text"
                    name="cat"
                    id="cat"
                    value={validation.values.cat || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.cat && validation.touched.cat ? true : false}
                  />
                  {validation.touched.cat && validation.errors.cat ? (
                    <FormFeedback type="invalid">{validation.errors.cat}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Sub Cat</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Sub Cat"
                    type="text"
                    name="sub_cat"
                    id="sub_cat"
                    value={validation.values.sub_cat || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.sub_cat && validation.touched.sub_cat ? true : false}
                  />
                  {validation.touched.sub_cat && validation.errors.sub_cat ? (
                    <FormFeedback type="invalid">{validation.errors.sub_cat}</FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <div className="hstack gap-2 justify-content-end">
              <button type="submit" className="btn btn-success" id="btn-save-event">
                Submit
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default ListAlatBerat;
