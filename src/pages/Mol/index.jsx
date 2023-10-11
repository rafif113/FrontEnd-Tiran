import React, { useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
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
import {
  getComponentGroup as onGetComponentGroup,
  getMaterialType as onGetMaterialType,
  getCostCode as onGetCostCode,
  addComponentGroup as onAddComponentGroup,
  addMaterialType as onAddMaterialType,
  addCostCode as onAddCostCode,
} from "../../slices/thunks";

import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import Select from "react-select";
import { useEffect } from "react";
import { createSelector } from "reselect";

const Mol = () => {
  document.title = "Create Product | Velzon - React Admin & Dashboard Template";

  const history = useNavigate();
  const dispatch = useDispatch();

  // handle active tab menu
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  // Handle redux MOL
  const fetchDataIfNeeded = (selector, action) => {
    const data = useSelector(selector);
    const dispatch = useDispatch();

    useEffect(() => {
      if (data && !data.length) {
        dispatch(action());
      }
    }, [dispatch, data]);
  };

  // Handle redux MOL
  fetchDataIfNeeded((state) => state.Mol.componentGroup, onGetComponentGroup);
  fetchDataIfNeeded((state) => state.Mol.costCode, onGetCostCode);
  fetchDataIfNeeded((state) => state.Mol.materialType, onGetMaterialType);

  const componentGroup = useSelector((state) => state.Mol.componentGroup);
  const costCode = useSelector((state) => state.Mol.costCode);
  const materialType = useSelector((state) => state.Mol.materialType);

  // Handle new part barang request
  const [rows, setRows] = useState([
    {
      id: 1,
      productName: "",
      // tambahkan properti lain sesuai kebutuhan
    },
  ]);

  const handleAddItem = () => {
    const newRow = {
      id: rows.length + 1,
      productName: "",
      // tambahkan properti lain sesuai kebutuhan
    };
    setRows([...rows, newRow]);
  };

  // handle form input
  const validation = useFormik({
    enableReinitialize: true,
    // initialValues,
    initialValues: {
      id: "",
      part_number: "",
      keterangan: "",
      qty: "",
      price: "",
      merktype: "",
      desc_barang: "",
      id_kategori: "",
    },
    validationSchema: Yup.object({
      keterangan: Yup.string().required("Please Enter a Keterangan"),
      qty: Yup.string().required("Please Enter a Barang stock"),
      price: Yup.string().required("Please Enter a Barang price"),
      merktype: Yup.string().required("Please Enter a Barang Type"),
    }),
    onSubmit: (values) => {
      const newBarang = {
        id: values.id,
        part_number: values.part_number,
        keterangan: values.keterangan,
        qty: values.qty,
        price: values.price,
        merktype: values.merktype,
        desc_barang: values.desc_barang,
        id_kategori: values.id_kategori,
      };
      console.log(newBarang);
      //   history("/create-barang");
      //   validation.resetForm();
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create MOL" pageTitle="MOL" />

        <Row>
          <Col lg={12}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="unit-name">
                          Unit Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="unit-name"
                          name="unit_name"
                          placeholder="Enter unit name"
                          //   value={validation.values.manufacturer_name || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_name && validation.touched.manufacturer_name ? true : false}
                        />
                        {/* {validation.errors.manufacturer_name && validation.touched.manufacturer_name ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_name}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="engine-model">
                          Engine Model
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="engine-model"
                          name="engine_model"
                          placeholder="Enter Engine Model"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="unit-code">
                          Unit Code
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="unit-code"
                          name="unit_code"
                          placeholder="Enter Unit Code"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="engine-serial-no">
                          Engine Serial No
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="engine-serial-no"
                          name="engine_serial_no"
                          placeholder="Enter Engine Serial No"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="hm-km">
                          HM / KM
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="hm-km"
                          name="hm_km"
                          placeholder="Enter HM / KM"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="engine-number">
                          Engine Number
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="engine-number"
                          name="engine_number"
                          placeholder="Enter Engine Number"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="time">
                          Time
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="time"
                          name="time"
                          placeholder="Enter Time"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="transmission-model">
                          Transmission Model
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="transmission-model"
                          name="transmission_model"
                          placeholder="Enter Transmission Model"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="date">
                          Date
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="date"
                          name="date"
                          placeholder="Enter Date"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="transmission-sn">
                          Transmission S/N
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="transmission-sn"
                          name="transmission_sn"
                          placeholder="Enter Transmission S/N"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="location">
                          Location
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="location"
                          name="location"
                          placeholder="Enter Location"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="machine-serial-no">
                          Machine Serial No.
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="machine-serial-no"
                          name="machine_serial_no"
                          placeholder="Enter Machine Serial No."
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="workshop-req-no">
                          Workshop Req No
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="workshop-req-no"
                          name="workshop_req_no"
                          placeholder="Enter Workshop Req No"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="machine-type-no">
                          Machine Type No
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="machine-type-no"
                          name="machine_type_no"
                          placeholder="Enter Machine Type No"
                          //   value={validation.values.manufacturer_brand || ""}
                          //   onBlur={validation.handleBlur}
                          //   onChange={validation.handleChange}
                          //   invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                        />
                        {/* {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                          <FormFeedback type="invalid">{validation.errors.manufacturer_brand}</FormFeedback>
                        ) : null} */}
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-4">
                  <div className="table-responsive">
                    <Table className="invoice-table table-borderless table-nowrap mb-0">
                      <thead className="align-middle">
                        <tr className="table-active">
                          <th scope="col" style={{ width: "50px" }}>
                            #
                          </th>
                          <th scope="col">Part Number</th>
                          <th scope="col">Description</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Unit</th>
                          <th scope="col">Group</th>
                          <th scope="col">Page Image</th>
                          <th scope="col">Page Desc</th>
                          <th scope="col">Remarks</th>
                        </tr>
                      </thead>
                      <tbody id="newlink">
                        {rows.map((row) => (
                          <tr key={row.id} className="product">
                            <th scope="row" className="product-id">
                              {row.id}
                            </th>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                id="productName-1"
                                placeholder="Product Name"
                                name="product_name"
                              />
                            </td>

                            {/* <td className="product-removal">
                            <Link to="#" className="btn btn-success">
                              Delete
                            </Link>
                          </td> */}
                          </tr>
                        ))}
                      </tbody>
                      <tbody>
                        <tr id="newForm" style={{ display: "none" }}>
                          <td className="d-none" colSpan="5">
                            <p>Add New Form</p>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="5">
                            <Link to="#" className="btn btn-soft-secondary fw-medium" id="add-item" onClick={handleAddItem}>
                              <i className="ri-add-fill me-1 align-bottom"></i> Add Item
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>

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
                        Order For
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "2",
                        })}
                        onClick={() => {
                          toggleCustom("2");
                        }}
                      >
                        Component Group
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "3",
                        })}
                        onClick={() => {
                          toggleCustom("3");
                        }}
                      >
                        Cost Code
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "4",
                        })}
                        onClick={() => {
                          toggleCustom("4");
                        }}
                      >
                        Material Type
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>

                <CardBody>
                  <TabContent activeTab={customActiveTab}>
                    {/* Tab PaneOrder For */}
                    <TabPane id="order-for" tabId="1">
                      <Row>
                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck1" />
                              <Label className="form-check-label" for="formCheck1">
                                Repair (B/D)
                              </Label>
                            </div>
                          </div>
                        </Col>

                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck2" />
                              <Label className="form-check-label" for="formCheck2">
                                Overhoule (O/H)
                              </Label>
                            </div>
                          </div>
                        </Col>

                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck3" />
                              <Label className="form-check-label" for="formCheck3">
                                Maintenance (PM)
                              </Label>
                            </div>
                          </div>
                        </Col>

                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck4" />
                              <Label className="form-check-label" for="formCheck4">
                                Accident (UNSCHE)
                              </Label>
                            </div>
                          </div>
                        </Col>

                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck5" />
                              <Label className="form-check-label" for="formCheck5">
                                Others (ETC)
                              </Label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>

                    {/* Tab Pane Component Group */}
                    <TabPane id="component-group" tabId="2">
                      <Row>
                        {componentGroup.map((item, key) => {
                          return (
                            <Col lg={4} md={4} key={key}>
                              <div className="mb-3">
                                <div className="form-check mb-2">
                                  <Input className="form-check-input" type="checkbox" id={item.code} />
                                  <Label className="form-check-label" for={item.code}>
                                    {item.code} {item.nama_componen}
                                  </Label>
                                </div>
                              </div>
                            </Col>
                          );
                        })}

                        {/* <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck1" />
                              <Label className="form-check-label" for="formCheck1">
                                B001 Engine & Accessories
                              </Label>
                            </div>
                          </div>
                        </Col>

                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck2" />
                              <Label className="form-check-label" for="formCheck2">
                                B002 Transmission & Torque Converter
                              </Label>
                            </div>
                          </div>
                        </Col>

                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck3" />
                              <Label className="form-check-label" for="formCheck3">
                                B003 Differential & Final drive
                              </Label>
                            </div>
                          </div>
                        </Col>

                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck4" />
                              <Label className="form-check-label" for="formCheck4">
                                B010 Gardan
                              </Label>
                            </div>
                          </div>
                        </Col>

                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck5" />
                              <Label className="form-check-label" for="formCheck5">
                                B004 Undercarriage / Tyre
                              </Label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck5" />
                              <Label className="form-check-label" for="formCheck5">
                                B005 Hydraulic System & Fuel System
                              </Label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck5" />
                              <Label className="form-check-label" for="formCheck5">
                                B006 Electric System
                              </Label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck5" />
                              <Label className="form-check-label" for="formCheck5">
                                B011 General (Attach, Chasis, Others)
                              </Label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck5" />
                              <Label className="form-check-label" for="formCheck5">
                                B007 Suspension / Chassis
                              </Label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck5" />
                              <Label className="form-check-label" for="formCheck5">
                                B008 Pheneumatic System
                              </Label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck5" />
                              <Label className="form-check-label" for="formCheck5">
                                B009 Tools
                              </Label>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4} md={4}>
                          <div className="mb-3">
                            <div className="form-check mb-2">
                              <Input className="form-check-input" type="checkbox" id="formCheck5" />
                              <Label className="form-check-label" for="formCheck5">
                                B012 Accident
                              </Label>
                            </div>
                          </div>
                        </Col> */}
                      </Row>
                    </TabPane>

                    {/* Tab Pane Cost Code */}
                    <TabPane id="cost-code" tabId="3">
                      <Row>
                        {costCode.map((item, key) => {
                          return (
                            <Col lg={4} md={4} key={key}>
                              <div className="mb-3">
                                <div className="form-check mb-2">
                                  <Input className="form-check-input" type="checkbox" id={item.code} />
                                  <Label className="form-check-label" for={item.code}>
                                    {item.code} {item.nama_componen}
                                  </Label>
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </TabPane>

                    {/* Tab Pane Material Type */}
                    <TabPane id="material-type" tabId="4">
                      <Row>
                        {materialType.map((item, key) => {
                          return (
                            <Col lg={4} md={4} key={key}>
                              <div className="mb-3">
                                <div className="form-check mb-2">
                                  <Input className="form-check-input" type="checkbox" id={item.code} />
                                  <Label className="form-check-label" for={item.code}>
                                    {item.code} {item.nama_componen}
                                  </Label>
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>

              <div className="text-end mb-3">
                {/* <button type="submit" className="btn btn-success w-sm">
                  Submit
                </button> */}
                <a
                  // href="file:///C:\Code\Tiran\tes.html"
                  href="http://127.0.0.1:5501/tes.html"
                  target="_tes.html"
                  // target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success w-sm"
                >
                  Submit
                </a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Mol;
