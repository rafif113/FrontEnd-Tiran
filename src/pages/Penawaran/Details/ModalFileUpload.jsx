import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { postGcs as onPostGcs } from "../../../slices/thunks";
import { useNavigate } from "react-router-dom";

const ModalFileUpload = ({ isOpen, toggle, id }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const validation = useFormik({
    // enableReinitialize: true,
    initialValues: {
      file: null,
      keterangan: "",
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required("File is required"),
      keterangan: Yup.string().required("Please Enter a Description"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("file", values.file);
        formData.append("id_penawaran_vendor", id);
        formData.append("keterangan", values.keterangan);
        await dispatch(onPostGcs(formData));
        history("/penawaran");
      } catch (error) {
        console.error("Error Server:", error);
      }
    },
  });

  return (
    <Modal isOpen={isOpen} id="event-modal" centered>
      <ModalHeader toggle={toggle} tag="h5" className="p-3 bg-info-subtle modal-title">
        Add File Upload
      </ModalHeader>
      <ModalBody>
        <Form
          encType="multipart/form-data"
          className="needs-validation"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          {/* ... your form content ... */}
          <Row className="event-form">
            <Col xs={12}>
              <div className="mb-3">
                <Label className="form-label">File Upload</Label>
                <Input
                  className="form-control d-block"
                  placeholder="Enter File Upload"
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => {
                    validation.setFieldValue("file", e.currentTarget.files[0]);
                  }}
                />
                {validation.touched.file && validation.errors.file && (
                  <div className="invalid-feedback d-block">{validation.errors.file}</div>
                )}
              </div>
            </Col>
            <Col xs={12}>
              <div className="mb-3">
                <Label className="form-label" htmlFor="description">
                  Description
                </Label>
                <Input
                  className="form-control d-block"
                  placeholder="Enter Description"
                  type="text"
                  name="keterangan"
                  id="keterangan"
                  autoComplete="off"
                  value={validation.values.keterangan || ""}
                  onBlur={validation.handleBlur}
                  onChange={validation.handleChange}
                  invalid={validation.errors.keterangan && validation.touched.keterangan ? true : false}
                />
                {validation.errors.keterangan && validation.touched.keterangan ? (
                  <FormFeedback type="invalid-feedback d-block">{validation.errors.keterangan}</FormFeedback>
                ) : null}
              </div>
            </Col>
          </Row>
          <div className="hstack gap-2 justify-content-end">
            <Button type="submit" className="btn btn-success" id="btn-save-event">
              Submit
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalFileUpload;
