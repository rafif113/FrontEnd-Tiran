import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, Label, Input, Row, Col, Button } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { postGcs as onPostGcs } from "../../../slices/thunks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalFileUpload = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      file: null, // Use null for the file value
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required("File is required"), // Add any other file validation rules
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("file", values.file);
        await dispatch(onPostGcs(formData));
        history("/penawaran");
      } catch (error) {
        console.error("An error occurred:", error);
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
          className={"needs-validation"}
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
                  className={"form-control d-block"}
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
