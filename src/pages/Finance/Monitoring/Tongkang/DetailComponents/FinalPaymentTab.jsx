import React from "react";
import { Col, Input, Row, Form, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFinanceTongkangPayment as onAddFinanceTongkangPayment } from "../../../../../slices/thunks";

const FinalPaymentTab = ({ detailTongkang }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const idTongkang = urlParams.get("id");

  const initialValues = {
    first_inv: "",
    final_inv: "",
    ppn2: "",
    amout_b_pph22: "",
    pph22: "",
    date: "",
    total_final_inv: "",
    payment_recive: "",
    // payment_recive: "",
  };

  if (detailTongkang && detailTongkang.tongkang_final_payment) {
    initialValues.first_inv = detailTongkang.tongkang_final_payment.first_inv || "";
    initialValues.final_inv = detailTongkang.tongkang_final_payment.final_inv || "";
    initialValues.ppn2 = detailTongkang.tongkang_final_payment.ppn2 || "";
    initialValues.amout_b_pph22 = detailTongkang.tongkang_final_payment.amout_b_pph22 || "";
    initialValues.pph22 = detailTongkang.tongkang_final_payment.pph22 || "";
    initialValues.date = detailTongkang.tongkang_final_payment.date || "";
    initialValues.total_final_inv = detailTongkang.tongkang_final_payment.total_final_inv || "";
    initialValues.payment_recive = detailTongkang.tongkang_final_payment.payment_recive || "";
    // initialValues.payment_recive = detailTongkang.tongkang_final_payment.payment_recive || "";
  }

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      first_inv: Yup.string().required("Please Enter a DP"),
      final_inv: Yup.string().required("Please Enter a DP"),
      ppn2: Yup.string().required("Please Enter a DP"),
      amout_b_pph22: Yup.string().required("Please Enter a DP"),
      pph22: Yup.string().required("Please Enter a DP"),
      date: Yup.string().required("Please Enter a DP"),
      total_final_inv: Yup.string().required("Please Enter a DP"),
      payment_recive: Yup.string().required("Please Enter a DP"),
    }),
    onSubmit: async (values) => {
      const newDpTab = {
        id_tongkang: idTongkang,
        first_inv: values.first_inv,
        final_inv: values.final_inv,
        ppn2: values.ppn2,
        amout_b_pph22: values.amout_b_pph22,
        pph22: values.pph22,
        date: values.date,
        total_final_inv: values.total_final_inv,
        payment_recive: values.payment_recive,
      };
      console.log(newDpTab);
      await dispatch(onAddFinanceTongkangPayment(newDpTab));
      window.location.reload(); // Reload the page upon successful dispatch

      // history("/monitoring/tongkang");
      // window.location.reload(); // Refresh the page
      validation.resetForm();
    },
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <Row>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="first_inv">
              First (INV)
            </label>
            <Input
              type="text"
              className="form-control"
              id="first_inv"
              name="first_inv"
              placeholder="Enter First"
              value={validation.values.first_inv}
              readOnly={detailTongkang.tongkang_final_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.first_inv && validation.touched.first_inv ? true : false}
            />
            {validation.errors.first_inv && validation.touched.first_inv ? (
              <FormFeedback type="invalid">{validation.errors.first_inv}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="final_inv">
              Final Inv
            </label>
            <Input
              type="text"
              className="form-control"
              id="final_inv"
              name="final_inv"
              placeholder="Enter Final"
              value={validation.values.final_inv}
              readOnly={detailTongkang.tongkang_final_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.final_inv && validation.touched.final_inv ? true : false}
            />
            {validation.errors.final_inv && validation.touched.final_inv ? (
              <FormFeedback type="invalid">{validation.errors.final_inv}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="ppn2">
              PPN2
            </label>
            <Input
              type="text"
              className="form-control"
              id="ppn2"
              name="ppn2"
              placeholder="Enter ppn2"
              value={validation.values.ppn2}
              readOnly={detailTongkang.tongkang_final_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.ppn2 && validation.touched.ppn2 ? true : false}
            />
            {validation.errors.ppn2 && validation.touched.ppn2 ? (
              <FormFeedback type="invalid">{validation.errors.ppn2}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="amout_b_pph22">
              Amount Before PPH 22
            </label>
            <Input
              type="text"
              className="form-control"
              id="amout_b_pph22"
              name="amout_b_pph22"
              placeholder="Enter beforePph22"
              value={validation.values.amout_b_pph22}
              readOnly={detailTongkang.tongkang_final_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.amout_b_pph22 && validation.touched.amout_b_pph22 ? true : false}
            />
            {validation.errors.amout_b_pph22 && validation.touched.amout_b_pph22 ? (
              <FormFeedback type="invalid">{validation.errors.amout_b_pph22}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="pph22">
              PPH22
            </label>
            <Input
              type="text"
              className="form-control"
              id="pph22"
              name="pph22"
              placeholder="Enter PPH22"
              value={validation.values.pph22}
              readOnly={detailTongkang.tongkang_final_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.pph22 && validation.touched.pph22 ? true : false}
            />
            {validation.errors.pph22 && validation.touched.pph22 ? (
              <FormFeedback type="invalid">{validation.errors.pph22}</FormFeedback>
            ) : null}
          </div>
        </Col>

        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="total_final_inv">
              Total Final Inv
            </label>
            <Input
              type="text"
              className="form-control"
              id="total_final_inv"
              name="total_final_inv"
              placeholder="Enter Total Final Inv"
              value={validation.values.total_final_inv}
              readOnly={detailTongkang.tongkang_final_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.total_final_inv && validation.touched.total_final_inv ? true : false}
            />
            {validation.errors.total_final_inv && validation.touched.total_final_inv ? (
              <FormFeedback type="invalid">{validation.errors.total_final_inv}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="date">
              Date2
            </label>
            <Input
              type="date"
              className="form-control"
              id="date"
              name="date"
              placeholder="Enter Date2"
              value={validation.values.date}
              readOnly={detailTongkang.tongkang_final_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.date && validation.touched.date ? true : false}
            />
            {validation.errors.date && validation.touched.date ? (
              <FormFeedback type="invalid">{validation.errors.date}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="payment_recive">
              Payment Received
            </label>
            <Input
              type="text"
              className="form-control"
              id="payment_recive"
              name="payment_recive"
              placeholder="Enter Payment Received"
              value={validation.values.payment_recive}
              readOnly={detailTongkang.tongkang_final_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.payment_recive && validation.touched.payment_recive ? true : false}
            />
            {validation.errors.payment_recive && validation.touched.payment_recive ? (
              <FormFeedback type="invalid">{validation.errors.payment_recive}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="Sisa Pembayaran">
              Sisa Pembayaran
            </label>
            <Input
              type="text"
              className="form-control"
              id="Sisa Pembayaran"
              name="Sisa Pembayaran"
              placeholder="Enter Sisa Pembayaran"
              value={""}
              readOnly={true}
              autoComplete="off"
            />
          </div>
        </Col>
      </Row>
      {!detailTongkang.tongkang_final_payment ? (
        <div className="text-end mb-3">
          <button type="submit" className="btn btn-primary w-sm">
            Submit
          </button>
        </div>
      ) : (
        ""
      )}
    </Form>
  );
};

export default FinalPaymentTab;
