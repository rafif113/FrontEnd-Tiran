import React, { useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Input,
  Label,
  FormFeedback,
  Form,
  Table,
} from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addMolFuelTire as onAddMolFuelTire } from "../../../slices/thunks";

import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import SubmitModal from "../../../Components/Common/SubmitModal";
import FuelTab from "./Fuel";
import TireTab from "./Tire";

const Mol = () => {
  document.title = "Create Fuel / Tire | PT Tiran";

  const history = useNavigate();
  const dispatch = useDispatch();

  // handle active tab menu
  const [customActiveTab, setCustomActiveTab] = useState("1");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  // handle form input
  const validation = useFormik({
    // enableReinitialize: true,
    initialValues: {
      nama_barang: "",
      qty: "",
      volume: "",
      keterangan: "",
    },
    validationSchema: Yup.object({
      nama_barang: Yup.string().required("Please Enter a Product Name"),
      qty: Yup.string().required("Please Enter a Quantity"),
      volume: Yup.string().required("Please Enter a Volume"),
      keterangan: Yup.string().required("Please Enter a Description"),
    }),
    onSubmit: (values) => {
      const id_request_rutin = values.nama_barang === "fuel" ? 1 : 2;

      const newMol = {
        id_request_rutin,
        nama_barang: values.nama_barang,
        qty: values.qty,
        volume: values.volume,
        keterangan: values.keterangan,
      };
      dispatch(onAddMolFuelTire(newMol));
      history("/mol");
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
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create MOL" pageTitle="MOL" />

        <Row>
          <Col lg={12}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                openSubmitModal();
              }}
            >
              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "1",
                        })}
                        onClick={() => {
                          toggleCustom("1");
                        }}
                      >
                        Fuel / Tire
                      </NavLink>
                    </NavItem>
                    {/* <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "2",
                        })}
                        onClick={() => {
                          toggleCustom("2");
                        }}
                      >
                        Tire
                      </NavLink>
                    </NavItem> */}
                  </Nav>
                </CardHeader>

                <CardBody>
                  <TabContent activeTab={customActiveTab}>
                    <TabPane id="fuel-tab" tabId="1">
                      {/* <FuelTab /> */}
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label className="form-label text-capitalize" htmlFor="nama_barang">
                              Product Type
                            </label>
                            <select
                              className={`form-select ${
                                validation.errors.nama_barang && validation.touched.nama_barang ? "is-invalid" : ""
                              }`}
                              id="nama_barang"
                              name="nama_barang"
                              value={validation.values.nama_barang || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                            >
                              <option value="" disabled>
                                Select Product Type
                              </option>
                              <option value="fuel">Fuel</option>
                              <option value="ban">Ban</option>
                            </select>
                            {validation.errors.nama_barang && validation.touched.nama_barang ? (
                              <div className="invalid-feedback">{validation.errors.nama_barang}</div>
                            ) : null}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label className="form-label text-capitalize" htmlFor="volume">
                              Volume
                            </label>
                            <select
                              className={`form-select ${
                                validation.errors.volume && validation.touched.volume ? "is-invalid" : ""
                              }`}
                              id="volume"
                              name="volume"
                              value={validation.values.volume || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                            >
                              <option value="" disabled>
                                Select Volume Unit
                              </option>
                              <option value="unit">Unit</option>
                              <option value="kilo">Kilo</option>
                            </select>
                            {validation.errors.volume && validation.touched.volume ? (
                              <div className="invalid-feedback">{validation.errors.volume}</div>
                            ) : null}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label className="form-label text-capitalize" htmlFor="qty">
                              Quantity
                            </label>
                            <Input
                              type="number"
                              className="form-control"
                              id="qty"
                              name="qty"
                              placeholder="Enter Quantity"
                              value={validation.values.qty || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={validation.errors.qty && validation.touched.qty ? true : false}
                            />
                            {validation.errors.qty && validation.touched.qty ? (
                              <FormFeedback type="invalid">{validation.errors.qty}</FormFeedback>
                            ) : null}
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div className="mb-3">
                            <label className="form-label text-capitalize" htmlFor="keterangan">
                              Description
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="keterangan"
                              name="keterangan"
                              placeholder="Enter Description"
                              autoComplete="off"
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
                    </TabPane>

                    {/* <TabPane id="tire-tab" tabId="2">
                      <TireTab />
                    </TabPane> */}
                  </TabContent>
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
  );
};

export default Mol;
