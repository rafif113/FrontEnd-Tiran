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
  document.title = "Detail Deliver Vendor | PT Tiran";

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
    // enableReinitialize: true,
    initialValues: {},
    onSubmit: async () => {
      await dispatch(onPostCekVendorKendari({ data: selectedItems }));
      window.location.reload();
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Deliver Vendor" pageTitle="Deliver" />
        {loading ? (
          ""
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
                                  value={formatRupiah(row.pricepartrequest.price)}
                                  readOnly
                                />
                              </td>
                              <td className="text-start">
                                {!row.pricepartrequest.flag && (
                                  <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={row.pricepartrequest.id_part_request}
                                    checked={checkedRows[row.pricepartrequest.id_part_request] || false}
                                    onChange={(e) => handleCheckboxChange(e, row.pricepartrequest.id_part_request)}
                                  />
                                )}
                                {row.pricepartrequest.flag ? (
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
                      Submit
                    </button>
                    {/*  )} */}
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
