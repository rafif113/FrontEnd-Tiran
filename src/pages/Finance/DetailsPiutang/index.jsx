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
import { getDetailFinancePiutang as onGetDetailFinancePiutang } from "../../../slices/thunks";

import { clearDetailPiutang, setLoadingDetailPiutang } from "../../../slices/finance/reducer";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { createSelector } from "reselect";
import { Link, useNavigate } from "react-router-dom";

const DetailPiutang = () => {
  document.title = "Detail Piutang | PT Tiran";

  const dispatch = useDispatch();
  const history = useNavigate();

  const detailPiutang = useSelector((state) => state.Finance.detailPiutang);
  const loading = useSelector((state) => state.Finance.loadingDetailPiutang);
  const userLogin = useSelector((state) => state.Login.userData);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_vendor = url.searchParams.get("id");
    dispatch(setLoadingDetailPiutang(true));
    dispatch(clearDetailPiutang());
    dispatch(onGetDetailFinancePiutang({ id_vendor })).then(() => {
      dispatch(setLoadingDetailPiutang(false));
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
      // await dispatch(onPostSpbSite(data));
      window.location.reload();
    }
  };

  console.log(detailPiutang);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Detail Piutang" pageTitle="Deliver" />
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>Detail Vendor :</CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="site">
                          Nama Vendor
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="site"
                          name="site"
                          readOnly
                          value={detailPiutang.vendor[0].vendor}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="site">
                          Alamat
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="site"
                          name="site"
                          readOnly
                          value={detailPiutang.vendor[0].alamat}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="site">
                          Keterangan
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="site"
                          name="site"
                          readOnly
                          value={detailPiutang.vendor[0].keterangan}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              {detailPiutang.po.map((row, index) => (
                <Card>
                  <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>Detail PO : {row.po_detail.nomor_po}</CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="site">
                            NO PR
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="site"
                            name="site"
                            readOnly
                            value={row.po_detail.nomor_pr}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="site">
                            Special Instruction
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="site"
                            name="site"
                            readOnly
                            value={row.po_detail.spesial_intruksi}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
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
                              <th scope="col">Price</th>
                              <th scope="col">Unit</th>
                              <th scope="col">Group</th>
                              <th scope="col">Page Image</th>
                              <th scope="col">Page Desc</th>
                              <th scope="col">Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.po_detail.pricepart.map((rowPart, indexPart) => (
                              <tr key={rowPart.partrequest.id} className="product cursor-pointer bg-white">
                                <th scope="rowPart.partrequest" className="product-id">
                                  {indexPart + 1}
                                </th>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    name="part_number"
                                    value={rowPart.partrequest.part_number}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    name="description"
                                    value={rowPart.partrequest.desc}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="number"
                                    className="form-control form-control-sm bg-light border-0"
                                    name="qty"
                                    value={rowPart.partrequest.qty}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    name="qty"
                                    value={formatRupiah(rowPart.price)}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    name="unit"
                                    value={rowPart.partrequest.unit}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    name="group"
                                    value={rowPart.partrequest.group}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="number"
                                    className="form-control form-control-sm bg-light border-0"
                                    name="page_image"
                                    value={rowPart.partrequest.page_image}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    name="page_desc"
                                    value={rowPart.partrequest.page_desc}
                                    readOnly
                                  />
                                </td>
                                <td className="text-start">
                                  <Input
                                    style={{ minWidth: "100px" }}
                                    type="text"
                                    className="form-control form-control-sm bg-light border-0"
                                    name="remarks"
                                    value={rowPart.partrequest.remarks}
                                    readOnly
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                      <table className="mt-4 mx-4">
                        <tbody>
                          <tr>
                            <td style={{ fontSize: "0.8rem", fontWeight: "bold", width: "15%" }}>Total Tagihan</td>
                            <td style={{ width: "1%" }}>:</td>
                            <td style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                              {formatRupiah(detailPiutang.po_keterangan_bayar[index].total_pembayaran)}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: "0.8rem", fontWeight: "bold", width: "15%" }}>Sudah Dibayar</td>
                            <td style={{ width: "1%" }}>:</td>
                            <td style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                              {formatRupiah(detailPiutang.po_keterangan_bayar[index].yang_sudah_dibayar)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Row>
                  </CardBody>
                </Card>
              ))}

              {/* <Card>
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
              </Card> */}

              <div className="text-end mb-3">
                <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                  {/* <button type="button" className="btn btn-primary w-sm">
                    Submit
                  </button> */}
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
