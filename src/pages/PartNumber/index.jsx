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
import { addPartNumber } from "../../slices/thunks";

const ListPartNumber = () => {
  document.title = "List Part Number | PT Tiran";
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
      part_number: "",
      part_name: "",
      satuan: "",
    },
    validationSchema: Yup.object({
      part_number: Yup.string().required("Please Enter a part number"),
      part_name: Yup.string().required("Please Enter a part_name"),
      satuan: Yup.string().required("Please Enter a satuan"),
    }),
    onSubmit: async (values) => {
      const newData = {
        part_number: values.part_number,
        part_name: values.part_name,
        satuan: values.satuan,
      };
      await dispatch(addPartNumber(newData));
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
                  <h5 className="card-title mb-0">List Part Number</h5>
                  <button className="btn btn-sm btn-primary" id="btn-new-event" onClick={toggle}>
                    <i className="mdi mdi-plus"></i> Create Part Number
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
          Add Part Number
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
                  <Label className="form-label">Part Number</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Part Number"
                    type="text"
                    name="part_number"
                    id="event-bl-no"
                    value={validation.values.part_number || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.part_number && validation.touched.part_number ? true : false}
                  />
                  {validation.touched.part_number && validation.errors.part_number ? (
                    <FormFeedback type="invalid">{validation.errors.part_number}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Part Name</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Part Name"
                    type="text"
                    name="part_name"
                    id="event-part_name"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.part_name || ""}
                    invalid={validation.errors.part_name && validation.touched.part_name ? true : false}
                  />
                  {validation.touched.part_name && validation.errors.part_name ? (
                    <FormFeedback type="invalid">{validation.errors.part_name}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Satuan</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter satuan"
                    type="text"
                    name="satuan"
                    id="event-si-no"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.satuan || ""}
                    invalid={validation.errors.satuan && validation.touched.satuan ? true : false}
                  />
                  {validation.touched.satuan && validation.errors.satuan ? (
                    <FormFeedback type="invalid">{validation.errors.satuan}</FormFeedback>
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

export default ListPartNumber;
