import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import SubmitModal from "../../../Components/Common/SubmitModal";
import { Card, CardBody, Col, Container, Row, Input, Form, Table, FormFeedback } from "reactstrap";

import { Link } from "react-router-dom";
import { getPo as onGetPo, postProcurementList as onPostProcurementList } from "../../../slices/thunks";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import LoadingModal from "../../../Components/Common/LoadingModal";

const CreateProcurement = () => {
  document.title = "Create Procurement | PT Tiran";
  const history = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const fetchDataIfNeeded = (selector, action) => {
    const data = useSelector(selector);

    useEffect(() => {
      if (data && !data.length) {
        dispatch(action());
      }
    }, [dispatch, data]);
  };
  fetchDataIfNeeded((state) => state.Po.po, onGetPo);
  const po = useSelector((state) => state.Po.po);

  // handle form input
  const validation = useFormik({
    initialValues: {
      id_po: "",
      no_pr: "",
      note: "",
      file: null, // Add file field to initialValues
    },
    // validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("id_po", values.id_po);
      formData.append("keterangan", values.note);
      formData.append("file_invo", values.file);
      setLoading(true);
      await dispatch(onPostProcurementList(formData));
      setLoading(false);
      // history("/procurement-list");
      validation.resetForm();
    },
  });

  const openSubmitModal = () => {
    setShowSubmitModal(true);
  };

  const closeSubmitModal = () => {
    setShowSubmitModal(false);
  };

  const onSubmitClick = () => {
    validation.handleSubmit();
    closeSubmitModal();
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create Procurement" pageTitle="Procurement" />

          <Row>
            <Col lg={12}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  openSubmitModal();
                }}
              >
                <Card>
                  <CardBody>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="id_po">
                            No. Po
                          </label>
                          <Select
                            placeholder="Po Number"
                            name="id_po"
                            value={po.find((detail) => detail.po.id.toString() === validation.values.id_po)}
                            options={po.map((detail) => ({
                              label: detail.po.nomor_po,
                              value: detail.po.id,
                            }))}
                            onBlur={validation.handleBlur}
                            onChange={(selectedOption) => {
                              validation.setFieldValue("id_po", selectedOption.value);
                              const selectedDetail = po.find((detail) => detail.po.id === selectedOption.value);
                              validation.setFieldValue("no_pr", selectedDetail.po.nomor_pr);
                            }}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="no_pr">
                            No. PR
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="no_pr"
                            name="no_pr"
                            placeholder="PR Number"
                            disabled
                            value={validation.values.no_pr || ""}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="title">
                            File
                          </label>
                          <Input
                            type="file"
                            className="form-control"
                            id="file"
                            name="file"
                            onChange={(event) => validation.setFieldValue("file", event.currentTarget.files[0])}
                            placeholder="File Invoice"
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="title">
                            Keterangan
                          </label>
                          <textarea
                            className="form-control"
                            id="message-text"
                            rows="1"
                            name="note"
                            value={validation.values.note || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={validation.errors.note && validation.touched.note ? true : false}
                          ></textarea>
                          {validation.errors.note && validation.touched.note ? (
                            <FormFeedback type="invalid">{validation.errors.note}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <div className="text-end mb-3">
                  <button type="submit" className="btn btn-primary w-sm">
                    Submit
                  </button>
                </div>
              </Form>
              <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} />
            </Col>
          </Row>
        </Container>
      </div>
      <LoadingModal show={loading} />
    </>
  );
};

export default CreateProcurement;
