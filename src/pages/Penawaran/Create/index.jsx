import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Input, Form, Table, FormFeedback, Label, CardHeader } from "reactstrap";
import Select from "react-select";
import { formatRupiah } from "../../../utils/utils";

import { Link } from "react-router-dom";
import {
  getVendor as onGetVendor,
  getDetailPo as onGetDetailPo,
  addPenawaran as onAddPenawaran,
  tunjukPenawaran as onTunjukPenawaran,
  tambahPenawaran as onTambahPenawaran,
} from "../../../slices/thunks";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import { clearDetailPo, setLoading as setLoadingPo } from "../../../slices/po/reducer";
import SubmitModal from "../../../Components/Common/SubmitModal";

const CreatePenawaran = () => {
  document.title = "Create Penawaran | PT Tiran";
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const selectDetailPo = createSelector(
    (state) => state.Po.detailPo,
    (detailPo) => detailPo
  );
  const detailPo = useSelector(selectDetailPo);
  const loadingPo = useSelector((state) => state.Po.loading);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_po = url.searchParams.get("id");
    dispatch(setLoadingPo(true));
    dispatch(clearDetailPo());
    dispatch(onGetDetailPo({ id_po })).then(() => {
      dispatch(setLoadingPo(false));
    });
  }, []);

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

  // handle form input

  const [selectedStatus, setSelectedStatus] = useState({ label: "Penawaran", value: true });
  const typeStatus = [
    {
      options: [
        { label: "Penawaran", value: true },
        { label: "Tunjuk Langsung", value: false },
      ],
    },
  ];

  const vendorOptions = vendor.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  function handleSelectStatus(selectedStatus) {
    setSelectedStatus(selectedStatus);
    validation.setFieldValue("vendorSelected", []);
  }

  const [submitButtonName, setSubmitButtonName] = useState(null);

  const validation = useFormik({
    // enableReinitialize: true,
    initialValues: {
      type: "",
      vendorSelected: [],
    },
    onSubmit: (values) => {
      const url = new URL(window.location.href);
      const id_po = url.searchParams.get("id");

      if (!detailPo.penawaran) {
        let id_vendor;
        if (selectedStatus.label === "Tunjuk Langsung") {
          id_vendor = [values.vendorSelected];
        } else {
          id_vendor = values.vendorSelected;
        }

        const newPenawaran = {
          id_po,
          type: selectedStatus.label,
          id_vendor: JSON.stringify(id_vendor),
        };
        dispatch(onAddPenawaran(newPenawaran));
      } else {
        if (submitButtonName === "penawaran") {
          dispatch(onTambahPenawaran({ id_po }));
        } else if (submitButtonName === "submit") {
          dispatch(onTunjukPenawaran({ id_detail: values.vendorSelected }));
        }
      }
      history("/po");
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
        <BreadCrumb title="Create Penawaran" pageTitle="Penawaran" />

        {loadingPo ? (
          ""
        ) : (
          <Row>
            <Col lg={12}>
              {/* Start Detail PO */}
              <Card>
                <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>Detail PO</CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor_po">
                          Nomor PO
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor_po"
                          name="nomor_po"
                          placeholder="Enter No PO"
                          readOnly
                          value={detailPo.po.nomor_po}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor_pr">
                          Nomor PR
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor_pr"
                          name="nomor_pr"
                          placeholder="Enter No PR"
                          readOnly
                          value={detailPo.po.nomor_pr}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="spesial_intruksi">
                          Spesial Intruksi
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="spesial_intruksi"
                          name="spesial_intruksi"
                          placeholder="Enter Special Instruction"
                          readOnly
                          value={detailPo.po.spesial_intruksi}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="st_name">
                          Serah Terima Name
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="st_name"
                          name="st_name"
                          placeholder="Enter Serah Terima"
                          readOnly
                          value={detailPo.po.st_name}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {/* End Detail PO */}

              {/* Start Part Request */}
              <Card>
                <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>List Part Request</CardHeader>
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
                        </tr>
                      </thead>
                      <tbody>
                        {detailPo.partrequest.map((row, index) => (
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
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
              {/* End Part Request */}

              {detailPo.penawaran != null ? (
                <>
                  {detailPo.detail.map((rowPenawaran, indexPenawaran) => (
                    <Card key={indexPenawaran}>
                      <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>
                        Penawaran Ke-{rowPenawaran.penawaran_ke}
                      </CardHeader>
                      {rowPenawaran.detail_penawaran.map((rowDetail, indexDetail) => (
                        <CardBody key={indexDetail}>
                          <CardHeader>Vendor : {rowDetail.vendor}</CardHeader>
                          <div className="table-responsive">
                            <Table className="invoice-table table-borderless table-nowrap mb-0">
                              <thead className="align-middle">
                                <tr className="table-active">
                                  <th scope="col" style={{ width: "50px" }}>
                                    No.
                                  </th>
                                  <th scope="col">Description and Specification</th>
                                  {/* <th scope="col">Qty</th> */}
                                  <th scope="col">Price</th>
                                  {/* <th scope="col">Total</th> */}
                                </tr>
                              </thead>
                              <tbody id="newlink">
                                {rowDetail.detail_price.map((rowPrice, indexPrice) => (
                                  <tr key={rowPrice.id} className="product">
                                    <th scope="row" className="product-id">
                                      {indexPrice + 1}
                                    </th>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Part Name"
                                        name="product_name"
                                        readOnly
                                        value={rowPrice.part_request}
                                      />
                                    </td>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Price"
                                        name="product_name"
                                        readOnly
                                        value={formatRupiah(rowPrice.price)}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      ))}
                    </Card>
                  ))}

                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitButtonName(e.nativeEvent.submitter.name);
                      openSubmitModal();
                    }}
                  >
                    <Card>
                      <CardBody>
                        <Row>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="nomor_po">
                              Select Vendor
                            </label>
                          </div>

                          <Select
                            value={vendorOptions.find((option) => option.value === validation.values.vendorSelected)}
                            onChange={(selectedOption) => {
                              validation.setFieldValue("vendorSelected", selectedOption.value);
                            }}
                            // options={detailPo.detail.flatMap((rowPenawaran, indexPenawaran) =>
                            //   rowPenawaran.detail_penawaran.map((rowDetail, indexDetail) => ({
                            //     label: rowDetail.vendor,
                            //     value: rowDetail.id_detail,
                            //   }))
                            // )}
                            options={detailPo.detail[detailPo.detail.length - 1].detail_penawaran.map(
                              (rowDetail, indexDetail) => ({
                                label: rowDetail.vendor,
                                value: rowDetail.id_detail,
                              })
                            )}
                            name="choices-publish-visibility-input"
                            classNamePrefix="select2-selection form-select"
                          />
                        </Row>
                      </CardBody>
                    </Card>
                    <div className="text-end mb-3">
                      <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                        <button type="submit" name="penawaran" className="btn btn-primary w-sm">
                          Penawaran
                        </button>
                        <button type="submit" name="submit" className="btn btn-success w-sm">
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                </>
              ) : (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (detailPo.status_ktt == null) {
                      alert("Po belum disetujui!");
                    } else {
                      openSubmitModal();
                    }
                  }}
                >
                  <Card>
                    <CardBody>
                      <Row>
                        <Col lg={12}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="nomor_po">
                              Select Type
                            </label>
                            <Select
                              value={selectedStatus}
                              onChange={handleSelectStatus}
                              options={typeStatus[0].options}
                              name="choices-publish-visibility-input"
                              classNamePrefix="select2-selection form-select"
                            />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <Row>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="nomor_po">
                            Select Vendor
                          </label>
                        </div>
                        {selectedStatus.value ? (
                          <Select
                            value={vendorOptions.find((option) => option.value === validation.values.vendorSelected)}
                            onChange={(selectedOptions) => {
                              const selectedValues = selectedOptions.map((option) => option.value);
                              validation.setFieldValue("vendorSelected", selectedValues);
                            }}
                            isMulti
                            name="colors"
                            options={vendorOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                        ) : (
                          <Select
                            value={vendorOptions.find((option) => option.value === validation.values.vendorSelected)}
                            onChange={(selectedOption) => {
                              validation.setFieldValue("vendorSelected", selectedOption.value);
                            }}
                            options={vendorOptions}
                            name="choices-publish-visibility-input"
                            classNamePrefix="select2-selection form-select"
                          />
                        )}
                      </Row>
                    </CardBody>
                  </Card>
                  <div className="text-end mb-3">
                    <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                      <button type="submit" className="btn btn-success w-sm">
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Col>
          </Row>
        )}
        <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} />
      </Container>
    </div>
  );
};

export default CreatePenawaran;
