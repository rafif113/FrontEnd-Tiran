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
import { TongkangFinanceTable } from "./ReactTable";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addFinanceTongkang as onAddFinanceTongkang } from "../../../../slices/thunks";
import { useDispatch } from "react-redux";

const ReactTable = () => {
  document.title = "Tongkang | PT Tiran";
  const dispatch = useDispatch();
  const history = useNavigate();

  const [modal, setModal] = useState(false);

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const validation = useFormik({
    // enableReinitialize: true,
    initialValues: {
      bl_no: "",
      bl_date: "",
      si_no: "",
      carrier: "",
      buyer: "",
      category: "",
    },
    validationSchema: Yup.object({
      bl_no: Yup.string().required("Please Enter a BL No"),
      bl_date: Yup.string().required("Please Enter a BL Date"),
      si_no: Yup.string().required("Please Enter a SI No"),
      carrier: Yup.string().required("Please Enter a Carrier"),
      buyer: Yup.string().required("Please Enter a Buyer"),
      category: Yup.string().required("Please Enter a Category"),
    }),
    onSubmit: async (values) => {
      const newTongkang = {
        bl_no: values.bl_no,
        bl_date: values.bl_date,
        si_no: values.si_no,
        carrier: values.carrier,
        buyer: values.buyer,
        category: values.category,
      };
      await dispatch(onAddFinanceTongkang(newTongkang));
      // history("/finance/monitoring/tongkang");
      window.location.reload(); // Reload the page upon successful dispatch

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
                  <h5 className="card-title mb-0">Tongkang</h5>
                  {/* <Button color="primary">Add Tongkang</Button> */}
                  <button className="btn btn-primary" id="btn-new-event" onClick={toggle}>
                    <i className="mdi mdi-plus"></i> Create Tongkang
                  </button>
                </CardHeader>
                <CardBody>
                  <TongkangFinanceTable />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal isOpen={modal} id="event-modal" centered>
        <ModalHeader toggle={toggle} tag="h5" className="p-3 bg-info-subtle modal-title">
          Add Tongkang
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
            <div className="event-details">
              <div className="d-flex mb-2">
                <div className="flex-grow-1 d-flex align-items-center">
                  <div className="flex-shrink-0 me-3">
                    <i className="ri-calendar-event-line text-muted fs-16"></i>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="d-block fw-semibold mb-0" id="event-start-date-tag">
                      {event ? event.datetag : ""}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div className="flex-shrink-0 me-3">
                  <i className="ri-map-pin-line text-muted fs-16"></i>
                </div>
                <div className="flex-grow-1">
                  <h6 className="d-block fw-semibold mb-0">
                    {" "}
                    <span id="event-location-tag">{event && event.location !== undefined ? event.location : "No Location"}</span>
                  </h6>
                </div>
              </div>
              <div className="d-flex mb-3">
                <div className="flex-shrink-0 me-3">
                  <i className="ri-discuss-line text-muted fs-16"></i>
                </div>
                <div className="flex-grow-1">
                  <p className="d-block text-muted mb-0" id="event-description-tag">
                    {event && event.description !== undefined ? event.description : "No Description"}
                  </p>
                </div>
              </div>
            </div>
            <Row className="event-form">
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">BL No</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter bl no"
                    type="text"
                    name="bl_no"
                    id="event-bl-no"
                    value={validation.values.bl_no || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.bl_no && validation.touched.bl_no ? true : false}
                  />
                  {validation.touched.bl_no && validation.errors.bl_no ? (
                    <FormFeedback type="invalid">{validation.errors.bl_no}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Date</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter date"
                    type="date"
                    name="bl_date"
                    id="event-date"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.bl_date || ""}
                    invalid={validation.errors.bl_date && validation.touched.bl_date ? true : false}
                  />
                  {validation.touched.bl_date && validation.errors.bl_date ? (
                    <FormFeedback type="invalid">{validation.errors.bl_date}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">SI No</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter SI No"
                    type="text"
                    name="si_no"
                    id="event-si-no"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.si_no || ""}
                    invalid={validation.errors.si_no && validation.touched.si_no ? true : false}
                  />
                  {validation.touched.si_no && validation.errors.si_no ? (
                    <FormFeedback type="invalid">{validation.errors.si_no}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Carrier</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Carrier"
                    type="text"
                    name="carrier"
                    id="event-si-no"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.carrier || ""}
                    invalid={validation.errors.carrier && validation.touched.carrier ? true : false}
                  />
                  {validation.touched.carrier && validation.errors.carrier ? (
                    <FormFeedback type="invalid">{validation.errors.carrier}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Buyer</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Buyer"
                    type="text"
                    name="buyer"
                    id="event-si-no"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.buyer || ""}
                    invalid={validation.errors.buyer && validation.touched.buyer ? true : false}
                  />
                  {validation.touched.buyer && validation.errors.buyer ? (
                    <FormFeedback type="invalid">{validation.errors.buyer}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Category</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Category"
                    type="text"
                    name="category"
                    id="event-si-no"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.category || ""}
                    invalid={validation.errors.category && validation.touched.category ? true : false}
                  />
                  {validation.touched.category && validation.errors.category ? (
                    <FormFeedback type="invalid">{validation.errors.category}</FormFeedback>
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

export default ReactTable;
