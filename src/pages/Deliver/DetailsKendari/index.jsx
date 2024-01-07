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
  Alert,
  Spinner,
} from "reactstrap";
import { formatRupiah } from "../../../utils/utils";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailVendorKendari as onGetDetailVendorKendari,
  postCekVendorKendari as onPostCekVendorKendari,
} from "../../../slices/thunks";

import { clearDetailVendorKendari, setLoadingDetailVendorKendari } from "../../../slices/deliver/reducer";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { createSelector } from "reselect";
import { Link, useNavigate } from "react-router-dom";

const DetailVendorKendari = () => {
  document.title = "Detail Deliver Kendari | PT Tiran";

  const dispatch = useDispatch();
  const history = useNavigate();

  //   Data detail Mol
  const detailVendorKendariData = createSelector(
    (state) => state.Deliver.detailVendorKendari,
    (detailVendorKendari) => detailVendorKendari
  );
  const detailVendorKendari = useSelector(detailVendorKendariData);
  const loading = useSelector((state) => state.Deliver.loadingDetailVendorKendari);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_pq = url.searchParams.get("id");
    dispatch(setLoadingDetailVendorKendari(true));
    dispatch(clearDetailVendorKendari());
    dispatch(onGetDetailVendorKendari({ id_pq })).then(() => {
      dispatch(setLoadingDetailVendorKendari(false));
    });
  }, []);

  const [checkedRows, setCheckedRows] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (e, rowId) => {
    const { checked } = e.target;
    toggleRow(rowId, checked);
  };

  const toggleRow = (rowId, checked) => {
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [rowId]: checked,
    }));

    if (checked) {
      setSelectedItems((prevItems) => [
        ...prevItems,
        {
          id_price_partrequest: rowId,
        },
      ]);
    } else {
      setSelectedItems((prevItems) => prevItems.filter((item) => item.id_price_partrequest !== rowId));
    }
  };

  const validation = useFormik({
    initialValues: {},
    onSubmit: async () => {
      try {
        const url = new URL(window.location.href);
        const id_pq = url.searchParams.get("id");
        const id_part_array = selectedItems.map((item) => String(item.id_price_partrequest));
        const transformedData = {
          id_pq,
          id_part: id_part_array,
        };
        await dispatch(onPostCekVendorKendari(transformedData));
        window.location.reload();
      } catch (error) {
        console.error("Error during dispatch:", error);
        alert("Error during dispatch. Please try again.");
      }
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Detail Deliver Kendari" pageTitle="Deliver" />
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>Detail FPB :</CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="site">
                          No. FPB
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="site"
                          name="site"
                          placeholder="Enter site"
                          readOnly
                          value={detailVendorKendari.no_fpb}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="site">
                          No. PO
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="site"
                          name="site"
                          placeholder="Enter site"
                          readOnly
                          value={detailVendorKendari.no_po}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor">
                          Total Part Request
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor"
                          name="nomor"
                          placeholder="Enter nomor"
                          readOnly
                          value={detailVendorKendari.jumlah_part_pq}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Card>
                  <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>Part Request :</CardHeader>
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
                            <th scope="col">Qty vendor</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detailVendorKendari.partrequests.map((row, index) => (
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
                                  value={row.pricepartrequest.qty}
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
                                  value={formatRupiah(row.pricepartrequest ? row.pricepartrequest.price : 0)}
                                  readOnly
                                />
                              </td>
                              <td className="text-start">
                                {row.pricepartrequest.status_deliver == null && (
                                  <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={row.pricepartrequest.id}
                                    checked={checkedRows[row.pricepartrequest.id] || false}
                                    onChange={(e) => handleCheckboxChange(e, row.pricepartrequest.id)}
                                  />
                                )}
                                {row.pricepartrequest.status_deliver != null ? (
                                  <Input className="form-check-input" type="checkbox" value checked />
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>

                <div className="text-end mb-3">
                  <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                    <button type="submit" className="btn btn-primary w-sm">
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        )}
        {/* <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} /> */}
      </Container>
    </div>
  );
};

export default DetailVendorKendari;
