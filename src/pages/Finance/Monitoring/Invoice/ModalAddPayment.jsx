import React, { useState } from "react";
import { Col, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingModal from "../../../../Components/Common/LoadingModal";
import { postPaymentRequest as onPostPaymentRequest } from "../../../../slices/thunks";
import { useNavigate } from "react-router-dom";

const ModalAddPayment = ({ isOpen, toggle, selectedId, selectedPo }) => {
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();

  const validation = useFormik({
    initialValues: {
      termin_pembayaran: "",
      keterangan: "",
    },
    validationSchema: Yup.object({
      termin_pembayaran: Yup.string().required("Please Enter Termin"),
      keterangan: Yup.string().required("Please Enter a Description"),
    }),
    onSubmit: async (values) => {
      const pr = {
        id_pl: selectedId,
        termin_pembayaran: values.termin_pembayaran,
        keterangan: values.keterangan,
      };
      setLoading(true);
      await dispatch(onPostPaymentRequest(pr));
      setLoading(false);
      validation.resetForm();
      history("/finance/monitoring/payment-request");
    },
  });

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} id="event-modal" centered>
        <ModalHeader toggle={toggle} tag="h5" className="p-3 bg-info-subtle modal-title">
          Add Cart Payment Request
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
                  <Label className="form-label">Po No</Label>
                  <Input className={"form-control d-block"} placeholder="Enter bl no" type="text" disabled value={selectedPo} />
                </div>
              </Col>

              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Termin</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Termin..."
                    type="number"
                    name="termin_pembayaran"
                    value={validation.values.termin_pembayaran || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.termin_pembayaran && validation.touched.termin_pembayaran ? true : false}
                  />
                  {validation.errors.termin_pembayaran && validation.touched.termin_pembayaran ? (
                    <FormFeedback type="invalid">{validation.errors.termin_pembayaran}</FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col xs={12}>
                <div className="mb-3">
                  <Label className="form-label">Description</Label>
                  <Input
                    className={"form-control d-block"}
                    placeholder="Enter Description..."
                    type="text"
                    name="keterangan"
                    value={validation.values.keterangan || ""}
                    onBlur={validation.handleBlur}
                    onChange={validation.handleChange}
                    invalid={validation.errors.keterangan && validation.touched.keterangan ? true : false}
                  />
                  {validation.errors.keterangan && validation.touched.keterangan ? (
                    <FormFeedback type="invalid">{validation.errors.keterangan}</FormFeedback>
                  ) : null}
                </div>
              </Col>
            </Row>
            <div className="hstack gap-2 justify-content-end">
              <button type="submit" className="btn btn-primary" id="btn-save-event">
                Submit
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
      <LoadingModal show={loading} />
    </>
  );
};
export default ModalAddPayment;
