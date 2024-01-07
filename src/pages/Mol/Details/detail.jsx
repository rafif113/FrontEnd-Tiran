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
  Form,
  Table,
  Spinner,
} from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getComponentGroup as onGetComponentGroup,
  getMaterialType as onGetMaterialType,
  getCostCode as onGetCostCode,
  getDetailMol as onGetDetailMol,
} from "../../../slices/thunks";

import { clearDetailMol, clearSelectedPartRequest, setLoading, setSelectedPartRequest } from "../../../slices/mol/reducer";

import classnames from "classnames";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

const DetailMol = () => {
  document.title = "Detail MOL | PT Tiran";

  const dispatch = useDispatch();
  const history = useNavigate();

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
  const descArray = ["Urgent", "Sangat Urgent", "Biasa"];

  //   Data detail Mol
  const selectDetailMolData = createSelector(
    (state) => state.Mol.detailMol,
    (detailMol) => detailMol
  );
  const detailMol = useSelector(selectDetailMolData);
  const loading = useSelector((state) => state.Mol.loading);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_mol = url.searchParams.get("id");
    dispatch(setLoading(true));
    dispatch(clearDetailMol());
    dispatch(clearSelectedPartRequest());
    dispatch(onGetDetailMol({ id_mol })).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  // handle form input
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleButtonClick = (buttonType) => {
    if (selectedItems.length === 0) {
      alert("Please select items before proceeding.");
    } else {
      setSelectedButton(buttonType);
    }
  };

  const validation = useFormik({
    // enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: async () => {
      const selectedItemsData = detailMol.mol.partrequest.filter((row) => selectedItems.includes(row.id));
      await dispatch(setSelectedPartRequest(selectedItemsData));
      if (selectedButton === "pengeluaran") {
        console.log("Pengeluaran");
        history("/mol/pengeluaran/create");
      } else if (selectedButton === "fpb") {
        history("/fpb/create");
        console.log("FPB");
      }
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Detail MOL" pageTitle="Detail" />
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
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
                    <CardHeader>Specification Unit : </CardHeader>
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
                              readOnly
                              value={detailMol.mol.unit_name}
                            />
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
                              readOnly
                              value={detailMol.mol.engine_model}
                            />
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
                              readOnly
                              value={detailMol.mol.unit_code}
                            />
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
                              name="engine_serial"
                              placeholder="Enter Engine Serial No"
                              readOnly
                              value={detailMol.mol.engine_serial_no}
                            />
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
                              readOnly
                              value={detailMol.mol.hmkm}
                            />
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
                              readOnly
                              value={detailMol.mol.engine_number}
                            />
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
                              readOnly
                              value={detailMol.mol.time}
                            />
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
                              readOnly
                              value={detailMol.mol.transmisson_model}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="date">
                              Date
                            </label>
                            <Input
                              type="date"
                              className="form-control"
                              id="date"
                              name="date"
                              placeholder="Enter Date"
                              readOnly
                              value={detailMol.mol.date}
                            />
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
                              readOnly
                              value={detailMol.mol.transmisson_sn}
                            />
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
                              readOnly
                              value={detailMol.mol.location}
                            />
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
                              name="machine_serial"
                              placeholder="Enter Machine Serial No."
                              readOnly
                              value={detailMol.mol.machine_serial_no}
                            />
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
                              name="workshop_req"
                              placeholder="Enter Workshop Req No"
                              readOnly
                              value={detailMol.mol.workshop_req}
                            />
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
                              name="machine_type"
                              placeholder="Enter Machine Type No"
                              readOnly
                              value={detailMol.mol.machine_type_no}
                            />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>Part Request : </CardHeader>
                    <CardBody className="p-4">
                      <div className="table-responsive" style={{ overflowX: "auto" }}>
                        <Table className="mb-0" style={{ width: "100%" }}>
                          <thead className="align-middle">
                            <tr className="table-active">
                              <th scope="col" style={{ width: "50px" }}>
                                No.
                              </th>
                              <th scope="col">Part Number</th>
                              <th scope="col">Description</th>
                              <th scope="col">Qty</th>
                              <th scope="col">Unit</th>
                              <th scope="col">Group</th>
                              <th scope="col">Page Image</th>
                              <th scope="col">Page Desc</th>
                              <th scope="col">Remarks</th>
                              <th scope="col">Stock</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detailMol.mol.partrequest.map((row, index) => (
                              <tr key={row.id} className="product">
                                <th scope="row" className="product-id">
                                  {index + 1}
                                </th>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    placeholder="Part Number"
                                    name="part_number"
                                    value={row.part_number}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    placeholder="Description"
                                    name="description"
                                    value={row.desc}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="number"
                                    className="form-control form-control-sm bg-light border-0"
                                    placeholder="Quantity"
                                    name="qty"
                                    value={row.qty}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    placeholder="Unit"
                                    name="unit"
                                    value={row.unit}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    placeholder="Group"
                                    name="group"
                                    value={row.group}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="number"
                                    className="form-control form-control-sm bg-light border-0"
                                    placeholder="Page Image"
                                    name="page_image"
                                    value={row.page_image}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    placeholder="Page Desc"
                                    name="page_desc"
                                    value={row.page_desc}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    placeholder="Remarks"
                                    name="remarks"
                                    value={row.remarks}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    placeholder="Remarks"
                                    name="remarks"
                                    value={row.stock}
                                    readOnly
                                  />
                                </td>
                                <td className="product-removal">
                                  {/* <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={row.flag === "1" ? "" : row.id}
                                    onChange={() => handleCheckboxChange(row.id)}
                                    checked={row.flag === "1" || selectedItems.includes(row.id)}
                                  /> */}
                                  {row.flag !== "1" && (
                                    <Input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={row.id}
                                      onChange={() => handleCheckboxChange(row.id)}
                                      checked={selectedItems.includes(row.id)}
                                    />
                                  )}
                                </td>
                              </tr>
                            ))}
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
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({
                              active: customActiveTab === "5",
                            })}
                            onClick={() => {
                              toggleCustom("5");
                            }}
                          >
                            Keterangan
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </CardHeader>

                    <CardBody>
                      <TabContent activeTab={customActiveTab}>
                        {/* Tab PaneOrder For */}
                        <TabPane id="order-for" tabId="1">
                          <Row>
                            {detailMol && detailMol.mol && detailMol.mol.order_for
                              ? JSON.parse(detailMol.mol.order_for).map((item, key) => (
                                  <Col lg={4} md={4} key={key}>
                                    <div className="mb-3">
                                      <div className="form-check mb-2">
                                        <Input className="form-check-input" type="checkbox" checked readOnly value={item} />
                                        <Label className="form-check-label">{item}</Label>
                                      </div>
                                    </div>
                                  </Col>
                                ))
                              : null}
                          </Row>
                        </TabPane>

                        {/* Tab Pane Component Group */}
                        <TabPane id="component-group" tabId="2">
                          <Row>
                            {componentGroup.map((item, key) => {
                              const itemIDString = item.id.toString();
                              const isChecked = JSON.parse(detailMol.mol.id_componen_group).includes(itemIDString);
                              return (
                                <Col lg={4} md={4} key={key}>
                                  <div className="mb-3">
                                    <div className="form-check mb-2">
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={item.code}
                                        value={item.id}
                                        readOnly
                                        checked={isChecked}
                                      />
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

                        {/* Tab Pane Cost Code */}
                        <TabPane id="cost-code" tabId="3">
                          <Row>
                            {costCode.map((item, key) => {
                              const itemIDString = item.id.toString();
                              const isChecked = JSON.parse(detailMol.mol.id_cost_code).includes(itemIDString);
                              return (
                                <Col lg={4} md={4} key={key}>
                                  <div className="mb-3">
                                    <div className="form-check mb-2">
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={item.id}
                                        id={item.code}
                                        checked={isChecked}
                                        readOnly
                                      />
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
                              const itemIDString = item.id.toString();
                              const isChecked = JSON.parse(detailMol.mol.id_material_type).includes(itemIDString);
                              return (
                                <Col lg={4} md={4} key={key}>
                                  <div className="mb-3">
                                    <div className="form-check mb-2">
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={item.id}
                                        checked={isChecked}
                                        id={item.code}
                                        readOnly
                                      />
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

                        {/* Tab Pane Description */}
                        <TabPane id="material-type" tabId="5">
                          <Row>
                            {descArray.map((description, index) => (
                              <Col lg={4} md={4} key={index}>
                                <div className="mb-3">
                                  <div className="form-check mb-2">
                                    <Input
                                      className="form-check-input"
                                      type="radio"
                                      name="keterangan"
                                      value={description}
                                      id={`keterangan_${index}`}
                                      defaultChecked={description === detailMol.mol.keterangan}
                                      disabled
                                    />
                                    {console.log(detailMol.keterangan)}
                                    <Label className="form-check-label" for={`keterangan_${index}`}>
                                      {description}
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>

                  <div className="text-end mb-3">
                    <button type="submit" className="btn btn-primary w-sm me-2" onClick={() => handleButtonClick("pengeluaran")}>
                      Pengeluaran
                    </button>
                    <button type="submit" className="btn btn-success w-sm" onClick={() => handleButtonClick("fpb")}>
                      Create FPB
                    </button>
                  </div>
                </Form>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DetailMol;
