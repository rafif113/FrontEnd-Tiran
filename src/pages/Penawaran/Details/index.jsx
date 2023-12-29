import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Input,
  Form,
  Table,
  FormFeedback,
  Label,
  CardHeader,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { formatRupiah } from "../../../utils/utils";

import { Link } from "react-router-dom";
import {
  getDetailPenawaran as onGetDetailPenawaran,
  addPricePenawaran as onAddPricePenawaran,
  getVendor as onGetVendor,
} from "../../../slices/thunks";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import { clearDetailPenawaran, setLoadingDetail as setLoadingPenawaran } from "../../../slices/penawaran/reducer";
import SubmitModal from "../../../Components/Common/SubmitModal";
import ModalFileUpload from "./ModalFileUpload";
import ReactSelect from "react-select";

const DetailPenawaran = () => {
  document.title = "Detail Penawaran | PT Tiran";
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const selectDetailPenawaran = createSelector(
    (state) => state.Penawaran.detailPenawaran,
    (detailPenawaran) => detailPenawaran
  );
  const detailPenawaran = useSelector(selectDetailPenawaran);
  const loadingPenawaran = useSelector((state) => state.Penawaran.loadingDetail);
  const selectVendorData = createSelector(
    (state) => state.Vendor.vendor,
    (vendor) => vendor
  );
  const vendor = useSelector(selectVendorData);
  const loadingVendor = useSelector((state) => state.Vendor.loading);
  useEffect(() => {
    if (loadingVendor) {
      dispatch(onGetVendor());
    }
  }, [dispatch, loadingVendor]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_pq = url.searchParams.get("id");
    dispatch(setLoadingPenawaran(true));
    dispatch(clearDetailPenawaran());
    dispatch(onGetDetailPenawaran({ id_pq })).then(() => {
      dispatch(setLoadingPenawaran(false));
    });
  }, []);

  const vendorOptions = vendor.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const [inputValues, setInputValues] = useState([]);

  const handleInputChange = (indexPrice, price, qty, idPartRequest, idVendor, idPq) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [indexPrice]: {
        id_part_request: idPartRequest,
        price,
        id_vendor: idVendor,
        qty,
        id_pq: idPq,
      },
    }));
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      vendorSelected: "",
    },
    onSubmit: (values) => {
      const inputValuesArray = Object.values(inputValues).map((input) => ({
        ...input,
        id_vendor: values.vendorSelected,
      }));
      dispatch(onAddPricePenawaran({ data: inputValuesArray }));
      history("/penawaran");
    },
  });

  const [modal, setModal] = useState(false);

  const toggle = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

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
        <BreadCrumb title="Create Penawaran" pageTitle="Penawaran" />
        {loadingPenawaran ? (
          ""
        ) : (
          <Row>
            <Col lg={12}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  openSubmitModal();
                }}
              >
                <Card>
                  <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>Part Request</CardHeader>
                  <CardBody>
                    <div className="table-responsive">
                      <Table className="invoice-table table-borderless table-nowrap mb-0">
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
                          </tr>
                        </thead>
                        <tbody>
                          {detailPenawaran.partrequests.map((row, index) => (
                            <React.Fragment key={index}>
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
                              </tr>
                              <tr>
                                <td colSpan="3">
                                  <div className="d-flex">
                                    <Input
                                      type="text"
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          e.target.value,
                                          inputValues[index]?.qty || "",
                                          row.id,
                                          1,
                                          row.id_pq
                                        )
                                      }
                                      className="form-control me-2"
                                      name="price"
                                      placeholder="Enter price"
                                    />
                                    <Input
                                      type="text"
                                      onChange={(e) =>
                                        handleInputChange(
                                          index,
                                          inputValues[index]?.price || "",
                                          e.target.value,
                                          row.id,
                                          1,
                                          row.id_pq
                                        )
                                      }
                                      className="form-control"
                                      name="qty"
                                      placeholder="Enter qty"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <Row>
                      <div className="mb-3">
                        <label className="form-label">Select Vendor</label>
                      </div>

                      <ReactSelect
                        value={vendorOptions.find((option) => option.value === validation.values.vendorSelected)}
                        onChange={(selectedOption) => {
                          validation.setFieldValue("vendorSelected", selectedOption.value);
                        }}
                        options={vendorOptions}
                        name="choices-publish-visibility-input"
                        classNamePrefix="select2-selection form-select"
                      />
                    </Row>
                  </CardBody>
                </Card>

                {/* {detailPenawaran.map((rowPenawaran, indexPenawaran) => (
                  <Card key={indexPenawaran}>
                    <CardHeader>Penawaran {rowPenawaran.penawaran_ke}</CardHeader>
                    {rowPenawaran.detail_penawaran.map((rowDetail, indexDetail) => ( */}

                <div className="text-end mb-3">
                  <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                    {/* {detailPenawaran[0].detail_penawaran[0].flag == 1 ? (
                      <button type="button" className="btn btn-primary w-sm" onClick={toggle}>
                        Delivery Order
                      </button>
                    ) : ( */}
                    <button type="submit" className="btn btn-primary w-sm">
                      Create PO
                    </button>
                    {/*  )} */}
                  </div>
                </div>
              </Form>
            </Col>
            <ModalFileUpload isOpen={modal} toggle={toggle} id={1} />
          </Row>
        )}
        <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} />
      </Container>
    </div>
  );
};

export default DetailPenawaran;
