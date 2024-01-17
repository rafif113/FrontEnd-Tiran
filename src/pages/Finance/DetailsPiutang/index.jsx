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
import { getDetailVendorSite as onGetDetailVendorSite, postSpbSite as onPostSpbSite } from "../../../slices/thunks";

import { clearDetailVendorSite, setLoadingDetailVendorSite } from "../../../slices/deliver/reducer";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { createSelector } from "reselect";
import { Link, useNavigate } from "react-router-dom";

const DetailPiutang = () => {
  document.title = "Detail Site Vendor | PT Tiran";

  const dispatch = useDispatch();
  const history = useNavigate();

  //   Data detail Mol
  const detailVendorSiteData = createSelector(
    (state) => state.Deliver.detailVendorSite,
    (detailVendorSite) => detailVendorSite
  );
  const detailVendorSite = useSelector(detailVendorSiteData);
  const loading = useSelector((state) => state.Deliver.loadingDetailVendorSite);
  const userLogin = useSelector((state) => state.Login.userData);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_spb = url.searchParams.get("id");
    dispatch(setLoadingDetailVendorSite(true));
    dispatch(clearDetailVendorSite());
    dispatch(onGetDetailVendorSite({ id_spb })).then(() => {
      dispatch(setLoadingDetailVendorSite(false));
    });
  }, []);

  const [expandedRowsTabTwo, setExpandedRowsTabTwo] = useState({});

  const toggleRowExpandTabTwo = (rowId) => {
    setExpandedRowsTabTwo((prevExpandedRows) => {
      const isExpanded = prevExpandedRows[rowId] || false;
      return { ...prevExpandedRows, [rowId]: !isExpanded };
    });
  };

  const [checkedRows, setCheckedRows] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleRow = (rowId, checked) => {
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [rowId]: checked,
    }));

    if (checked) {
      setSelectedItems((prevItems) => [
        ...prevItems,
        {
          id: rowId,
        },
      ]);
    } else {
      setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== rowId));
    }
  };

  const handleCheckboxChange = (e, rowId) => {
    const { checked } = e.target;
    toggleRow(rowId, checked);
  };

  const handleSubmitBtn = async () => {
    if (selectedItems.length == 0) {
      alert("Data tidak ada yang dipilih");
    } else {
      const id_part_request = selectedItems.map((item) => item.id);
      const data = {
        id_part: JSON.stringify(id_part_request),
        id_user: userLogin.id,
      };
      await dispatch(onPostSpbSite(data));
      window.location.reload();
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Deliver Site" pageTitle="Deliver" />
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>Detail SPB :</CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="site">
                          No. SPB
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="site"
                          name="site"
                          readOnly
                          value={detailVendorSite.dataspb.no_spb}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="site">
                          Pengirim
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="site"
                          name="site"
                          readOnly
                          value={detailVendorSite.dataspb.pengirim}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor">
                          Penerima
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor"
                          name="nomor"
                          readOnly
                          value={detailVendorSite.dataspb.penerima}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor">
                          Penerima 2
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor"
                          name="nomor"
                          readOnly
                          value={detailVendorSite.dataspb.penerima_2}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor">
                          Driver
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor"
                          name="nomor"
                          readOnly
                          value={detailVendorSite.dataspb.driver}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor">
                          Keterangan
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor"
                          name="nomor"
                          readOnly
                          value={detailVendorSite.dataspb.keterangan}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor">
                          Tanggal Dikirim
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor"
                          name="nomor"
                          readOnly
                          value={detailVendorSite.dataspb.date}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="nomor">
                          Jam Dikirim
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="nomor"
                          name="nomor"
                          readOnly
                          value={detailVendorSite.dataspb.dikirim_jam}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>Part Request :</CardHeader>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0" style={{ backgroundColor: "#f8f4f4" }}>
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
                        {detailVendorSite.datapart.map((row, index) => (
                          <>
                            <tr
                              key={row.id}
                              className="product cursor-pointer bg-white"
                              onClick={() => toggleRowExpandTabTwo(row.id)}
                            >
                              <th scope="row" className="product-id">
                                {index + 1}
                              </th>
                              <td className="text-start">
                                <Input
                                  style={{ minWidth: "100px" }}
                                  type="text"
                                  className="form-control form-control-sm bg-light border-0"
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
                                  name="remarks"
                                  value={row.remarks}
                                  readOnly
                                />
                              </td>
                            </tr>
                            {expandedRowsTabTwo[row.id] && (
                              <React.Fragment>
                                <tr>
                                  <td className="text-end" style={{ fontSize: "0.7rem" }}>
                                    No.
                                  </td>
                                  <td colSpan="1" style={{ fontSize: "0.7rem" }}>
                                    Qty
                                  </td>
                                  <td colSpan="2" style={{ fontSize: "0.7rem" }}>
                                    Keterangan
                                  </td>
                                  <td style={{ fontSize: "0.7rem" }}>Action</td>
                                </tr>
                                {row.partdevendorkendari.map((rowIn, indexIn) => (
                                  <tr key={indexIn}>
                                    <td className="text-end">{indexIn + 1}.</td>
                                    <td colSpan="1">
                                      <div className="d-flex">
                                        <Input
                                          type="text"
                                          className="form-control form-control-sm"
                                          name="qty"
                                          autoComplete="off"
                                          disabled
                                          value={rowIn.qty}
                                        />
                                      </div>
                                    </td>
                                    <td colSpan="2">
                                      <div className="d-flex">
                                        <Input
                                          type="text"
                                          className="form-control form-control-sm"
                                          name="qty"
                                          autoComplete="off"
                                          disabled
                                          value={rowIn.keterangan}
                                        />
                                      </div>
                                    </td>
                                    <td colSpan="2">
                                      <div className="d-flex">
                                        {rowIn.user_cek == null || rowIn.user_cek == "" ? (
                                          <Input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={checkedRows[rowIn.id] || false}
                                            onChange={(e) => handleCheckboxChange(e, rowIn.id)}
                                          />
                                        ) : (
                                          <Input className="form-check-input" type="checkbox" checked={true} disabled />
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            )}
                          </>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <span className="mt-2" style={{ fontSize: "0.8rem", color: "#999" }}>
                    *klik pada row tertentu untuk melihat detail qty
                  </span>
                </CardBody>
              </Card>

              <div className="text-end mb-3">
                <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                  <button type="button" onClick={handleSubmitBtn} className="btn btn-primary w-sm">
                    Submit
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        )}
        {/* <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} /> */}
      </Container>
    </div>
  );
};

export default DetailPiutang;
