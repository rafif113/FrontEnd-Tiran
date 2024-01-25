import React from "react";
import { Col, Form, FormFeedback, Input, Row } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFinanceTongkangDown as onAddFinanceTongkangDown } from "../../../../../slices/thunks";
const DownPaymentTab = ({ detailTongkang }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const idTongkang = urlParams.get("id");

  const initialValues = {
    dp: "",
    ppn_ex: "",
    dpp_ppn: "",
    pph22: "",
    total_dp: "",
    date: "",
  };

  if (detailTongkang && detailTongkang.tongkang_down_payment) {
    initialValues.dp = detailTongkang.tongkang_down_payment.dp || "";
    initialValues.ppn_ex = detailTongkang.tongkang_down_payment.ppn_ex || "";
    initialValues.dpp_ppn = detailTongkang.tongkang_down_payment.dpp_ppn || "";
    initialValues.pph22 = detailTongkang.tongkang_down_payment.pph22 || "";
    initialValues.total_dp = detailTongkang.tongkang_down_payment.total_dp || "";
    initialValues.date = detailTongkang.tongkang_down_payment.date || "";
  }

  const validation = useFormik({
    // enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      dp: Yup.string().required("Please Enter a DP"),
      ppn_ex: Yup.string().required("Please Enter a PPN"),
      dpp_ppn: Yup.string().required("Please Enter a DP PPN"),
      pph22: Yup.string().required("Please Enter a PPH22"),
      total_dp: Yup.string().required("Please Enter a Total Dp"),
      date: Yup.string().required("Please Enter a Date"),
    }),
    onSubmit: async (values) => {
      const newDpTab = {
        id_tongkang: idTongkang,
        dp: values.dp,
        ppn_ex: values.ppn_ex,
        dpp_ppn: values.dpp_ppn,
        pph22: values.pph22,
        total_dp: values.total_dp,
        date: values.date,
      };
      // console.log(newDpTab);
      await dispatch(onAddFinanceTongkangDown(newDpTab));
      window.location.reload(); // Reload the page upon successful dispatch

      // history("/monitoring/tongkang");
      // validation.resetForm();
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
            <label className="form-label" htmlFor="DP">
              DP
            </label>
            <Input
              type="text"
              className="form-control"
              id="DP"
              name="dp"
              placeholder="Enter DP"
              value={validation.values.dp}
              readOnly={detailTongkang.tongkang_down_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.dp && validation.touched.dp ? true : false}
            />
            {validation.errors.dp && validation.touched.dp ? (
              <FormFeedback type="invalid">{validation.errors.dp}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="PPN">
              PPN Excemption
            </label>
            <Input
              type="text"
              className="form-control"
              id="PPN"
              name="ppn_ex"
              placeholder="Enter PPN"
              value={validation.values.ppn_ex}
              readOnly={detailTongkang.tongkang_down_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.ppn_ex && validation.touched.ppn_ex ? true : false}
            />
            {validation.errors.ppn_ex && validation.touched.ppn_ex ? (
              <FormFeedback type="invalid">{validation.errors.ppn_ex}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="dpp_ppn">
              DPN/PPN
            </label>
            <Input
              type="text"
              className="form-control"
              id="dpp_ppn"
              name="dpp_ppn"
              placeholder="Enter DPN/PPN"
              value={validation.values.dpp_ppn}
              readOnly={detailTongkang.tongkang_down_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.dpp_ppn && validation.touched.dpp_ppn ? true : false}
            />
            {validation.errors.dpp_ppn && validation.touched.dpp_ppn ? (
              <FormFeedback type="invalid">{validation.errors.dpp_ppn}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="pph22">
              PPH 22
            </label>
            <Input
              type="text"
              className="form-control"
              id="pph22"
              name="pph22"
              placeholder="Enter pph22"
              value={validation.values.pph22}
              readOnly={detailTongkang.tongkang_down_payment === null ? false : true}
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
            <label className="form-label text-capitalize" htmlFor="total_dp">
              Total Dp
            </label>
            <Input
              type="text"
              className="form-control"
              id="total_dp"
              name="total_dp"
              placeholder="Enter Total Dp"
              value={validation.values.total_dp}
              readOnly={detailTongkang.tongkang_down_payment === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.total_dp && validation.touched.total_dp ? true : false}
            />
            {validation.errors.total_dp && validation.touched.total_dp ? (
              <FormFeedback type="invalid">{validation.errors.total_dp}</FormFeedback>
            ) : null}
          </div>
        </Col>

        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="date">
              Date
            </label>
            <Input
              type="date"
              className="form-control"
              id="date"
              name="date"
              placeholder="Enter Date"
              value={validation.values.date}
              readOnly={detailTongkang.tongkang_down_payment === null ? false : true}
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
      </Row>
      {!detailTongkang.tongkang_down_payment ? (
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

export default DownPaymentTab;
