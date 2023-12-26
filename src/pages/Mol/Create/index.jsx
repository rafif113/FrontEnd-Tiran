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
import {
  getComponentGroup as onGetComponentGroup,
  getMaterialType as onGetMaterialType,
  getCostCode as onGetCostCode,
  addMol as onAddMol,
  getMasterAlat as onGetMasterAlat,
  getMasterPart as onGetMasterPart,
} from "../../../slices/thunks";

import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import Select from "react-select";
import { useEffect } from "react";
import { createSelector } from "reselect";
import SubmitModal from "../../../Components/Common/SubmitModal";

const Mol = () => {
  document.title = "Create Product | PT Tiran";

  const history = useNavigate();
  const dispatch = useDispatch();

  // handle active tab menu
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  // Data Order For

  const orderForList = [
    { code: "B/D", label: "Repair" },
    { code: "O/H", label: "Overhoule" },
    { code: "PM", label: "Maintenance" },
    { code: "UNSCHE", label: "Accidence" },
    { code: "ETC", label: "Others" },
  ];

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
  fetchDataIfNeeded((state) => state.Master.part, onGetMasterPart);
  fetchDataIfNeeded((state) => state.Master.alat, onGetMasterAlat);

  const componentGroup = useSelector((state) => state.Mol.componentGroup);
  const costCode = useSelector((state) => state.Mol.costCode);
  const materialType = useSelector((state) => state.Mol.materialType);
  const masterPart = useSelector((state) => state.Master.part);
  const masterAlat = useSelector((state) => state.Master.alat);
  // Handle new part barang request
  const [rows, setRows] = useState([
    {
      id: 1,
      part_number: "",
      description: "",
      qty: "",
      unit: "",
      group: "",
      page_image: "",
      page_desc: "",
      remarks: "",
    },
  ]);

  const handleAddItem = () => {
    let maxId = 0;
    if (rows.length > 0) {
      maxId = Math.max(...rows.map((row) => row.id));
    }
    const newRow = {
      id: maxId + 1,
      part_number: "",
      description: "",
      qty: "",
      unit: "",
      group: "",
      page_image: "",
      page_desc: "",
      remarks: "",
    };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (e, id, field) => {
    const updatedRows = [...rows];
    const index = updatedRows.findIndex((row) => row.id === id);
    if (index !== -1) {
      updatedRows[index][field] = e.target.value;
      setRows(updatedRows);
    }
  };

  const handleDeleteItem = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  // handle form input
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      // no_document: "",
      // mol_no: "",
      unit_name: "",
      engine_model: "",
      unit_code: "",
      engine_serial: "",
      hm_km: "",
      engine_number: "",
      time: getCurrentTime(),
      date: new Date().toISOString().split("T")[0],
      transmission_model: "",
      transmission_sn: "",
      location: "",
      machine_serial: "",
      workshop_req: "",
      machine_type: "",
      componentGroupSelected: [],
      costCodeSelected: [],
      materialTypeSelected: [],
      orderForSelected: [],
      keterangan: "",
    },
    validationSchema: Yup.object({
      unit_name: Yup.string().required("Please Enter a Unit Name"),
      engine_model: Yup.string().required("Please Enter a Engine Model"),
      unit_code: Yup.string().required("Please Enter a Unit Code"),
      engine_serial: Yup.string().required("Please Enter a Engine Serial"),
      hm_km: Yup.string().required("Please Enter a HM/KM"),
      engine_number: Yup.string().required("Please Enter a Engine Number"),
      time: Yup.string().required("Please Enter a Time"),
      date: Yup.string().required("Please Enter a Date"),
      transmission_model: Yup.string().required("Please Enter a Transmission Model"),
      transmission_sn: Yup.string().required("Please Enter a Transmission S/N"),
      keterangan: Yup.string().required("Please Enter a Keterangan"),
      location: Yup.string().required("Please Enter a Location"),
      machine_serial: Yup.string().required("Please Enter a Machine Serial"),
      workshop_req: Yup.string().required("Please Enter a Workshop Req"),
      machine_type: Yup.string().required("Please Enter a Machine Type"),
      componentGroupSelected: Yup.array().min(1, "Please select at least one item from Component Group").nullable(),
      costCodeSelected: Yup.array().min(1, "Please select at least one item from Cost Code").nullable(),
      materialTypeSelected: Yup.array().min(1, "Please select at least one item from Material Type").nullable(),
      orderForSelected: Yup.array().min(1, "Please select at least one item from Order For").nullable(),
      // rows: Yup.array().of(
      //   Yup.object().shape({
      //     part_number: Yup.string().required("Please Enter a Part Number"),
      //     description: Yup.string().required("Please Enter a Description"),
      //     qty: Yup.number().required("Please Enter a Quantity"),
      //     unit: Yup.string().required("Please Enter a Unit"),
      //     group: Yup.string().required("Please Enter a Group"),
      //     page_image: Yup.number().required("Please Enter a Page Image"),
      //     page_desc: Yup.string().required("Please Enter a Page Desc"),
      //     remarks: Yup.string().required("Please Enter Remarks"),
      //   })
      // ),
    }),
    onSubmit: (values) => {
      const newMol = {
        // no_document: values.no_document,
        // mol_no: values.mol_no,
        unit_name: values.unit_name,
        engine_model: values.engine_model,
        unit_code: values.unit_code,
        engine_serial: values.engine_serial,
        hm_km: values.hm_km,
        engine_number: values.engine_number,
        time: values.time,
        date: values.date,
        transmission_model: values.transmission_model,
        transmission_sn: values.transmission_sn,
        location: values.location,
        machine_serial: values.machine_serial,
        workshop_req: values.workshop_req,
        machine_type: values.machine_type,
        component_group: JSON.stringify(values.componentGroupSelected),
        cost_code: JSON.stringify(values.costCodeSelected),
        material_type: JSON.stringify(values.materialTypeSelected),
        order_for: JSON.stringify(values.orderForSelected),
        part_request: rows,
        // id_fpb: 0,
        keterangan: values.keterangan,
      };
      console.log(newMol);
      dispatch(onAddMol(newMol));
      history("/mol");
      validation.resetForm();
    },
  });

  const handleComponentGroupChange = (value) => {
    validation.setFieldValue("componentGroupSelected", value);
  };

  const handleCostCodeChange = (value) => {
    validation.setFieldValue("costCodeSelected", value);
  };

  const handleMaterialTypeChange = (value) => {
    validation.setFieldValue("materialTypeSelected", value);
  };

  const handleOrderForChange = (value) => {
    validation.setFieldValue("orderForSelected", value);
  };

  const openSubmitModal = () => {
    setShowSubmitModal(true);
  };

  const closeSubmitModal = () => {
    setShowSubmitModal(false);
  };

  const descArray = ["Urgent", "Sangat Urgent", "Biasa"];

  const handleDescription = (value) => {
    validation.setFieldValue("keterangan", value);
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            >
              <Card>
                <CardHeader>Specification Unit : </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="unit-code">
                          Unit Code
                        </label>
                        <Select
                          placeholder="Unit Code"
                          name="unit_code"
                          value={masterAlat.find((detail) => detail.id === validation.values.unit_code)}
                          options={masterAlat.map((detail) => ({
                            label: detail.new_plat_number,
                            value: detail.id,
                          }))}
                          onBlur={validation.handleBlur}
                          onChange={(selectedOption) => {
                            console.log(selectedOption.value);
                            validation.setFieldValue("unit_code", selectedOption.label);
                            const selectedDetail = masterAlat.find((detail) => detail.id === selectedOption.value);
                            if (selectedDetail) {
                              validation.setFieldValue("unit_name", selectedDetail.type);
                              validation.setFieldValue("engine_model", selectedDetail.model);
                              validation.setFieldValue("transmission_model", selectedDetail.brand);
                              validation.setFieldValue("location", selectedDetail.location);
                            }
                          }}
                          invalid={validation.errors.unit_code && validation.touched.unit_code ? true : false}
                        />

                        {validation.errors.unit_code && validation.touched.unit_code ? (
                          <FormFeedback type="invalid">{validation.errors.unit_code}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
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
                          value={validation.values.unit_name || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.unit_name && validation.touched.unit_name ? true : false}
                        />
                        {validation.errors.unit_name && validation.touched.unit_name ? (
                          <FormFeedback type="invalid">{validation.errors.unit_name}</FormFeedback>
                        ) : null}
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
                          value={validation.values.engine_model || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.engine_model && validation.touched.engine_model ? true : false}
                        />
                        {validation.errors.engine_model && validation.touched.engine_model ? (
                          <FormFeedback type="invalid">{validation.errors.engine_model}</FormFeedback>
                        ) : null}
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
                          value={validation.values.engine_serial || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.engine_serial && validation.touched.engine_serial ? true : false}
                        />
                        {validation.errors.engine_serial && validation.touched.engine_serial ? (
                          <FormFeedback type="invalid">{validation.errors.engine_serial}</FormFeedback>
                        ) : null}
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
                          value={validation.values.hm_km || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.hm_km && validation.touched.hm_km ? true : false}
                        />
                        {validation.errors.hm_km && validation.touched.hm_km ? (
                          <FormFeedback type="invalid">{validation.errors.hm_km}</FormFeedback>
                        ) : null}
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
                          value={validation.values.engine_number || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.engine_number && validation.touched.engine_number ? true : false}
                        />
                        {validation.errors.engine_number && validation.touched.engine_number ? (
                          <FormFeedback type="invalid">{validation.errors.engine_number}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="time">
                          Time
                        </label>
                        <Input
                          disabled
                          type="text"
                          className="form-control"
                          id="time"
                          name="time"
                          placeholder="Enter Time"
                          value={validation.values.time || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.time && validation.touched.time ? true : false}
                        />
                        {validation.errors.time && validation.touched.time ? (
                          <FormFeedback type="invalid">{validation.errors.time}</FormFeedback>
                        ) : null}
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
                          value={validation.values.transmission_model || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.transmission_model && validation.touched.transmission_model ? true : false}
                        />
                        {validation.errors.transmission_model && validation.touched.transmission_model ? (
                          <FormFeedback type="invalid">{validation.errors.transmission_model}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="date">
                          Date
                        </label>
                        <Input
                          disabled
                          type="date"
                          className="form-control"
                          id="date"
                          name="date"
                          placeholder="Enter Date"
                          value={validation.values.date || ""}
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
                        <label className="form-label" htmlFor="transmission-sn">
                          Transmission S/N
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="transmission-sn"
                          name="transmission_sn"
                          placeholder="Enter Transmission S/N"
                          value={validation.values.transmission_sn || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.transmission_sn && validation.touched.transmission_sn ? true : false}
                        />
                        {validation.errors.transmission_sn && validation.touched.transmission_sn ? (
                          <FormFeedback type="invalid">{validation.errors.transmission_sn}</FormFeedback>
                        ) : null}
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
                          value={validation.values.location || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.location && validation.touched.location ? true : false}
                        />
                        {validation.errors.location && validation.touched.location ? (
                          <FormFeedback type="invalid">{validation.errors.location}</FormFeedback>
                        ) : null}
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
                          value={validation.values.machine_serial || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.machine_serial && validation.touched.machine_serial ? true : false}
                        />
                        {validation.errors.machine_serial && validation.touched.machine_serial ? (
                          <FormFeedback type="invalid">{validation.errors.machine_serial}</FormFeedback>
                        ) : null}
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
                          value={validation.values.workshop_req || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.workshop_req && validation.touched.workshop_req ? true : false}
                        />
                        {validation.errors.workshop_req && validation.touched.workshop_req ? (
                          <FormFeedback type="invalid">{validation.errors.workshop_req}</FormFeedback>
                        ) : null}
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
                          value={validation.values.machine_type || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.machine_type && validation.touched.machine_type ? true : false}
                        />
                        {validation.errors.machine_type && validation.touched.machine_type ? (
                          <FormFeedback type="invalid">{validation.errors.machine_type}</FormFeedback>
                        ) : null}
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
                          <th scope="col" style={{ width: "100%" }}>
                            Part Number
                          </th>
                          <th scope="col">Description</th>
                          <th scope="col">Qty</th>
                          <th scope="col">Unit</th>
                          <th scope="col">Group</th>
                          <th scope="col">Page Image</th>
                          <th scope="col">Page Desc</th>
                          <th scope="col">Remarks</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row) => (
                          <tr key={row.id} className="product">
                            <th scope="row" className="product-id text-center">
                              <div className="pt-2">{row.id}</div>
                            </th>
                            <td className="text-start" style={{ minWidth: "200px" }}>
                              <Select
                                // className=" bg-light border-0"
                                placeholder="Part Number"
                                name="part_number"
                                value={masterPart.find((part) => part.value === row.part_number)}
                                options={masterPart.map((detail) => ({
                                  label: detail.part_number,
                                  value: detail.id,
                                }))}
                                isSearchable={true}
                                menuPlacement="auto"
                                onChange={(selectedOption) => {
                                  const selectedPart = masterPart.find((part) => part.id === selectedOption.value);
                                  handleInputChange({ target: { value: selectedPart.part_number } }, row.id, "part_number");
                                  handleInputChange({ target: { value: selectedPart.part_name } }, row.id, "description");
                                  handleInputChange({ target: { value: selectedPart.satuan } }, row.id, "unit");
                                }}
                              />
                            </td>
                            <td className="text-start" style={{ minWidth: "200px" }}>
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                name="description"
                                value={row.description}
                                onChange={(e) => handleInputChange(e, row.id, "description")}
                              />
                            </td>
                            <td className="text-start" style={{ minWidth: "200px" }}>
                              <Input
                                type="number"
                                className="form-control"
                                placeholder="Quantity"
                                name="qty"
                                value={row.qty}
                                onChange={(e) => handleInputChange(e, row.id, "qty")}
                              />
                            </td>
                            <td className="text-start" style={{ minWidth: "200px" }}>
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Unit"
                                name="unit"
                                value={row.unit}
                                onChange={(e) => handleInputChange(e, row.id, "unit")}
                              />
                            </td>
                            <td className="text-start" style={{ minWidth: "200px" }}>
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Group"
                                name="group"
                                value={row.group}
                                onChange={(e) => handleInputChange(e, row.id, "group")}
                              />
                            </td>
                            <td className="text-start" style={{ minWidth: "200px" }}>
                              <Input
                                type="number"
                                className="form-control"
                                placeholder="Page Image"
                                name="page_image"
                                value={row.page_image}
                                onChange={(e) => handleInputChange(e, row.id, "page_image")}
                              />
                            </td>
                            <td className="text-start" style={{ minWidth: "200px" }}>
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Page Desc"
                                name="page_desc"
                                value={row.page_desc}
                                onChange={(e) => handleInputChange(e, row.id, "page_desc")}
                              />
                            </td>
                            <td className="text-start" style={{ minWidth: "200px" }}>
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Remarks"
                                name="remarks"
                                value={row.remarks}
                                onChange={(e) => handleInputChange(e, row.id, "remarks")}
                              />
                            </td>

                            <td className="product-removal">
                              <Link to="#" className="btn btn-sm btn-danger" onClick={() => handleDeleteItem(row.id)}>
                                Delete
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tbody>
                        <tr>
                          <td colSpan="5">
                            <Link
                              to="#"
                              className="btn btn-sm btn-soft-secondary fw-medium"
                              id="add-item"
                              onClick={handleAddItem}
                            >
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
                        Description
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>

                <CardBody>
                  <TabContent activeTab={customActiveTab}>
                    {/* Tab PaneOrder For */}
                    <TabPane id="order-for" tabId="1">
                      <Row>
                        {orderForList.map((item, key) => {
                          return (
                            <Col lg={4} md={4} key={key}>
                              <div className="mb-3">
                                <div className="form-check mb-2">
                                  <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={`${item.label} (${item.code})`}
                                    onBlur={validation.handleBlur}
                                    id={item.code}
                                    onChange={(e) => {
                                      const selectedValues = [...validation.values.orderForSelected];
                                      if (e.target.checked) {
                                        selectedValues.push(e.target.value);
                                      } else {
                                        const index = selectedValues.indexOf(e.target.value);
                                        if (index !== -1) {
                                          selectedValues.splice(index, 1);
                                        }
                                      }
                                      handleOrderForChange(selectedValues);
                                    }}
                                  />
                                  <Label className="form-check-label" for={item.code}>
                                    {item.label} ({item.code})
                                  </Label>
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                      {validation.errors.orderForSelected && validation.touched.orderForSelected ? (
                        <div className="text-danger">{validation.errors.orderForSelected}</div>
                      ) : null}
                    </TabPane>

                    {/* Tab Pane Component Group */}
                    <TabPane id="component-group" tabId="2">
                      <Row>
                        {componentGroup.map((item, key) => {
                          return (
                            <Col lg={4} md={4} key={key}>
                              <div className="mb-3">
                                <div className="form-check mb-2">
                                  <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={item.code}
                                    value={item.id}
                                    onBlur={validation.handleBlur}
                                    onChange={(e) => {
                                      const selectedValues = [...validation.values.componentGroupSelected];
                                      if (e.target.checked) {
                                        selectedValues.push(e.target.value);
                                      } else {
                                        const index = selectedValues.indexOf(e.target.value);
                                        if (index !== -1) {
                                          selectedValues.splice(index, 1);
                                        }
                                      }
                                      handleComponentGroupChange(selectedValues);
                                    }}
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
                      {validation.errors.componentGroupSelected && validation.touched.componentGroupSelected ? (
                        <div className="text-danger">{validation.errors.componentGroupSelected}</div>
                      ) : null}
                    </TabPane>

                    {/* Tab Pane Cost Code */}
                    <TabPane id="cost-code" tabId="3">
                      <Row>
                        {costCode.map((item, key) => {
                          return (
                            <Col lg={4} md={4} key={key}>
                              <div className="mb-3">
                                <div className="form-check mb-2">
                                  <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={item.id}
                                    onBlur={validation.handleBlur}
                                    id={item.code}
                                    onChange={(e) => {
                                      const selectedValues = [...validation.values.costCodeSelected];
                                      if (e.target.checked) {
                                        selectedValues.push(e.target.value);
                                      } else {
                                        const index = selectedValues.indexOf(e.target.value);
                                        if (index !== -1) {
                                          selectedValues.splice(index, 1);
                                        }
                                      }
                                      handleCostCodeChange(selectedValues);
                                    }}
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
                      {validation.errors.costCodeSelected && validation.touched.costCodeSelected ? (
                        <div className="text-danger">{validation.errors.costCodeSelected}</div>
                      ) : null}
                    </TabPane>

                    {/* Tab Pane Material Type */}
                    <TabPane id="material-type" tabId="4">
                      <Row>
                        {materialType.map((item, key) => {
                          return (
                            <Col lg={4} md={4} key={key}>
                              <div className="mb-3">
                                <div className="form-check mb-2">
                                  <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={item.id}
                                    onBlur={validation.handleBlur}
                                    id={item.code}
                                    onChange={(e) => {
                                      const selectedValues = [...validation.values.materialTypeSelected];
                                      if (e.target.checked) {
                                        selectedValues.push(e.target.value);
                                      } else {
                                        const index = selectedValues.indexOf(e.target.value);
                                        if (index !== -1) {
                                          selectedValues.splice(index, 1);
                                        }
                                      }
                                      handleMaterialTypeChange(selectedValues);
                                    }}
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
                      {validation.errors.materialTypeSelected && validation.touched.materialTypeSelected ? (
                        <div className="text-danger">{validation.errors.materialTypeSelected}</div>
                      ) : null}
                    </TabPane>

                    {/* Tab Pane Keterangan */}
                    <TabPane id="keterangan" tabId="5">
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
                                  onBlur={validation.handleBlur}
                                  id={`keterangan_${index}`}
                                  onChange={(e) => handleDescription(e.target.value)}
                                />
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
