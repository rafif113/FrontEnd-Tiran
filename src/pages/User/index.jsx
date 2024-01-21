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
import { postRegister } from "../../slices/thunks";
import ReactSelect from "react-select";

const ListUser = () => {
  document.title = "List User | PT Tiran";
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
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Name"),
      email: Yup.string().required("Please Enter a Email"),
      password: Yup.string().required("Please Enter a Password"),
    }),
    onSubmit: async (values) => {
      const newData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      await dispatch(postRegister(newData));
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
                  <h5 className="card-title mb-0">List User</h5>
                  <button className="btn btn-sm btn-primary" id="btn-new-event" onClick={toggle}>
                    <i className="mdi mdi-plus"></i> Create User
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
          Add User
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
                  <Label className="form-label">Name</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Name"
                    type="text"
                    name="name"
                    id="event-bl-no"
                    value={validation.values.name || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.name && validation.touched.name ? true : false}
                  />
                  {validation.touched.name && validation.errors.name ? (
                    <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Email</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter email"
                    type="email"
                    name="email"
                    id="event-email"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.email || ""}
                    invalid={validation.errors.email && validation.touched.email ? true : false}
                  />
                  {validation.touched.email && validation.errors.email ? (
                    <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                  ) : null}
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Password</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Password"
                    type="password"
                    name="password"
                    id="event-si-no"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.password || ""}
                    invalid={validation.errors.password && validation.touched.password ? true : false}
                  />
                  {validation.touched.password && validation.errors.password ? (
                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
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

export default ListUser;
