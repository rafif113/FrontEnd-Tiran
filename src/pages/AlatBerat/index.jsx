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
import { postRole } from "../../slices/thunks";

const ListAlatBerat = () => {
  document.title = "List Role | PT Tiran";
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
      name: "",
      keterangan: "",
      // group: "",
    },
    validationSchema: Yup.object({
      nama_role: Yup.string().required("Please Enter a nama_role"),
      keterangan: Yup.string().required("Please Enter a keterangan"),
      // group: Yup.string().required("Please Enter a group"),
    }),
    onSubmit: async (values) => {
      const newData = {
        nama_role: values.nama_role,
        keterangan: values.keterangan,
        // group: values.group,
      };
      await dispatch(postRole(newData));
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
                  <h5 className="card-title mb-0">List Role</h5>
                  <button className="btn btn-sm btn-primary" id="btn-new-event" onClick={toggle}>
                    <i className="mdi mdi-plus"></i> Create Role
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
          Add Role
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
                  <Label className="form-label">Nama Role</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Name"
                    type="text"
                    name="nama_role"
                    id="event-bl-no"
                    value={validation.values.nama_role || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.nama_role && validation.touched.nama_role ? true : false}
                  />
                  {validation.touched.nama_role && validation.errors.nama_role ? (
                    <FormFeedback type="invalid">{validation.errors.nama_role}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Keterangan</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter keterangan"
                    type="text"
                    name="keterangan"
                    id="event-keterangan"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.keterangan || ""}
                    invalid={validation.errors.keterangan && validation.touched.keterangan ? true : false}
                  />
                  {validation.touched.keterangan && validation.errors.keterangan ? (
                    <FormFeedback type="invalid">{validation.errors.keterangan}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              {/* <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">group</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter group"
                    type="text"
                    name="group"
                    id="event-si-no"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.group || ""}
                    invalid={validation.errors.group && validation.touched.group ? true : false}
                  />
                  {validation.touched.group && validation.errors.group ? (
                    <FormFeedback type="invalid">{validation.errors.group}</FormFeedback>
                  ) : null}
                </div>
              </Col> */}
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
