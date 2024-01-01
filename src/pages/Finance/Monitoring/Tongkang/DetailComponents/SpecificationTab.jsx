import React from "react";
import { Col, Form, FormFeedback, Input, Row } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFinanceTongkangPort as onAddFinanceTongkangPort } from "../../../../../slices/thunks";

const SpecificationTab = ({ detailTongkang }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const idTongkang = urlParams.get("id");

  const initialValues = {
    ni: "",
    fe: "",
    mc: "",
    s_mg: "",
    co: "",
    surveyor: "",
  };

  if (detailTongkang && detailTongkang.tongkang_sd_port) {
    initialValues.ni = detailTongkang.tongkang_sd_port.ni || "";
    initialValues.fe = detailTongkang.tongkang_sd_port.fe || "";
    initialValues.mc = detailTongkang.tongkang_sd_port.mc || "";
    initialValues.s_mg = detailTongkang.tongkang_sd_port.s_mg || "";
    initialValues.co = detailTongkang.tongkang_sd_port.co || "";
    initialValues.surveyor = detailTongkang.tongkang_sd_port.surveyor || "";
  }

  const validation = useFormik({
    // enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      ni: Yup.string().required("Please Enter a DP"),
      fe: Yup.string().required("Please Enter a DP"),
      mc: Yup.string().required("Please Enter a DP"),
      s_mg: Yup.string().required("Please Enter a DP"),
      co: Yup.string().required("Please Enter a DP"),
      surveyor: Yup.string().required("Please Enter a DP"),
    }),
    onSubmit: async (values) => {
      const newSdPort = {
        id_tongkang: idTongkang,
        ni: values.ni,
        fe: values.fe,
        mc: values.mc,
        s_mg: values.s_mg,
        co: values.co,
        surveyor: values.surveyor,
      };
      // console.log(newSdPort);
      await dispatch(onAddFinanceTongkangPort(newSdPort));
      window.location.reload(); // Reload the page upon successful dispatch
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
            <label className="form-label text-capitalize" htmlFor="ni">
              Ni
            </label>
            <Input
              type="text"
              className="form-control"
              id="ni"
              name="ni"
              placeholder="Enter Ni"
              value={validation.values.ni}
              readOnly={detailTongkang.tongkang_sd_port === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.ni && validation.touched.ni ? true : false}
            />
            {validation.errors.ni && validation.touched.ni ? (
              <FormFeedback type="invalid">{validation.errors.ni}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="fe">
              FE
            </label>
            <Input
              type="text"
              className="form-control"
              id="fe"
              name="fe"
              placeholder="Enter FE"
              value={validation.values.fe}
              readOnly={detailTongkang.tongkang_sd_port === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.fe && validation.touched.fe ? true : false}
            />
            {validation.errors.fe && validation.touched.fe ? (
              <FormFeedback type="invalid">{validation.errors.fe}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="mc">
              MC
            </label>
            <Input
              type="text"
              className="form-control"
              id="mc"
              name="mc"
              placeholder="Enter MC"
              value={validation.values.mc}
              readOnly={detailTongkang.tongkang_sd_port === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.mc && validation.touched.mc ? true : false}
            />
            {validation.errors.mc && validation.touched.mc ? (
              <FormFeedback type="invalid">{validation.errors.mc}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="s_mg">
              SiO2/MGO
            </label>
            <Input
              type="text"
              className="form-control"
              id="s_mg"
              name="s_mg"
              placeholder="Enter sio"
              value={validation.values.s_mg}
              readOnly={detailTongkang.tongkang_sd_port === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.s_mg && validation.touched.s_mg ? true : false}
            />
            {validation.errors.s_mg && validation.touched.s_mg ? (
              <FormFeedback type="invalid">{validation.errors.s_mg}</FormFeedback>
            ) : null}
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="co">
              Co
            </label>
            <Input
              type="text"
              className="form-control"
              id="co"
              name="co"
              placeholder="Enter Co"
              value={validation.values.co}
              readOnly={detailTongkang.tongkang_sd_port === null ? false : true}
              autoComplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.co && validation.touched.co ? true : false}
            />
            {validation.errors.co && validation.touched.co ? (
              <FormFeedback type="invalid">{validation.errors.co}</FormFeedback>
            ) : null}
          </div>
        </Col>

        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="surveyor">
              Surveyor
            </label>
            <Input
              type="text"
              className="form-control"
              id="surveyor"
              name="surveyor"
              placeholder="Enter Surveyor"
              value={validation.values.surveyor}
              readOnly={detailTongkang.tongkang_sd_port === null ? false : true}
              autosurveyormplete="off"
              onBlur={validation.handleBlur}
              onChange={validation.handleChange}
              invalid={validation.errors.surveyor && validation.touched.surveyor ? true : false}
            />
            {validation.errors.surveyor && validation.touched.surveyor ? (
              <FormFeedback type="invalid">{validation.errors.surveyor}</FormFeedback>
            ) : null}
          </div>
        </Col>
      </Row>
      {!detailTongkang.tongkang_sd_port ? (
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

export default SpecificationTab;
