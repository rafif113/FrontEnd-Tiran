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

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getDetailFpb as onGetDetailFpb, addPq as onAddPq } from "../../../slices/thunks";

import { setLoadingDetail, clearDetailFpb, clearSelectedFpbList, setSelectedFpbList } from "../../../slices/fpb/reducer";
import { getReferensiPart as getReferensiPartApi } from "../../../helpers/backend_helper";

import classnames from "classnames";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { createSelector } from "reselect";
import { Link, useNavigate } from "react-router-dom";
import Modals from "./modals";

const DetailFpb = () => {
  document.title = "Detail FPB | PT Tiran";

  const dispatch = useDispatch();
  const history = useNavigate();

  //   Data detail Mol
  const selectDetailFpbData = createSelector(
    (state) => state.Fpb.detailFpb,
    (detailFpb) => detailFpb
  );
  const detailFpb = useSelector(selectDetailFpbData);
  const loading = useSelector((state) => state.Fpb.loadingDetail);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_fpb = url.searchParams.get("id");
    dispatch(setLoadingDetail(true));
    dispatch(clearDetailFpb());
    dispatch(clearSelectedFpbList());
    dispatch(onGetDetailFpb({ id_fpb })).then(() => {
      dispatch(setLoadingDetail(false));
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
          id: rowId,
          // price: prices[rowId],
        },
      ]);
    } else {
      setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== rowId));
    }
    // if (checked && prices[rowId]) {
    //   setSelectedItems((prevItems) => [
    //     ...prevItems,
    //     {
    //       id: rowId,
    //       price: prices[rowId],
    //     },
    //   ]);
    // } else {
    //   setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== rowId));
    // }
  };

  const validation = useFormik({
    // enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: async () => {
      const url = new URL(window.location.href);
      const id_fpb = url.searchParams.get("id");
      const selectedItemsData = detailFpb.mol.partrequest.filter((row) => selectedItems.some((item) => item.id === row.id));
      const idsOnly = selectedItemsData.map((item) => item.id);

      const newPq = {
        id_fpb,
        id_part_request: JSON.stringify(idsOnly),
      };

      if (idsOnly.length > 0) {
        await dispatch(onAddPq(newPq));
        window.location.reload();
      } else {
        alert("tidak terdapat part request yang dipilih");
      }
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [partPrice, setPartPrice] = useState(null);

  // handle active tab menu
  const [customActiveTab, setCustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  const handleCetakClick = (id) => {
    history(`/fpb/pq/cetak?id=${id}`);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Detail FPB" pageTitle="Detail" />
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Row>
              <Col lg={12}>
                <Card>
                  <CardHeader>Detail Fpb : </CardHeader>
                  <CardBody>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="site">
                            Site
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="site"
                            name="site"
                            placeholder="Enter site"
                            readOnly
                            value={detailFpb.mol.site}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="nomor">
                            Nomor
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="nomor"
                            name="nomor"
                            placeholder="Enter nomor"
                            readOnly
                            value={detailFpb.mol.nomor}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="pengajuan">
                            Pengajuan
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="pengajuan"
                            name="pengajuan"
                            placeholder="Enter pengajuan"
                            readOnly
                            value={detailFpb.mol.pengajuan}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="diajukan_oleh">
                            Diajukan
                          </label>
                          <Input
                            type="text"
                            className="form-control"
                            id="diajukan_oleh"
                            name="diajukan_oleh"
                            placeholder="Enter Diajukan Oleh"
                            readOnly
                            value={detailFpb.mol.diajukan_oleh}
                          />
                        </div>
                      </Col>

                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="title">
                            Tujuan
                          </label>
                          <textarea
                            className="form-control"
                            id="message-text"
                            rows="4"
                            name="tujuan"
                            value={detailFpb.mol.tujuan}
                            readOnly
                          ></textarea>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="title">
                            Note
                          </label>
                          <textarea
                            className="form-control"
                            id="message-text"
                            rows="4"
                            name="desc"
                            readOnly
                            value={detailFpb.mol.note}
                          ></textarea>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {detailFpb.mol.pq.length > 0 && (
                  <Row>
                    <Col lg="12" className="mb-3">
                      <Alert color="success">
                        {customActiveTab === "2"
                          ? "Kembali ke form part request."
                          : "Request PQ sudah terbuat, klik button dibawah ini untuk melihat detail."}
                      </Alert>
                      <button
                        className="btn btn-secondary mb-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          const newTab = customActiveTab === "2" ? "1" : "2";
                          toggleCustom(newTab);
                        }}
                      >
                        {customActiveTab === "2" ? "Form Part Request" : "List PQ"}
                      </button>
                    </Col>
                  </Row>
                )}

                <TabContent activeTab={customActiveTab}>
                  <TabPane id="form-part-request" tabId="1">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <Card>
                        <CardHeader>Part Request : </CardHeader>
                        <CardBody className="p-4">
                          <div className="table-responsive">
                            <Table className="invoice-table table-borderless table-nowrap mb-0">
                              <thead className="align-middle">
                                <tr className="table-active">
                                  <th scope="col" style={{ width: "50px" }}>
                                    No.
                                  </th>
                                  <th scope="col">Part Number</th>
                                  <th scope="col">Deskripsi / Nama Barang</th>
                                  <th scope="col">Merk / Type</th>
                                  <th scope="col">Qty</th>
                                  <th scope="col">Keterangan</th>
                                  <th scope="col">Stock</th>
                                  {/* <th scope="col">Action</th> */}
                                </tr>
                              </thead>
                              <tbody id="newlink">
                                {detailFpb.mol.partrequest.map((row, index) => (
                                  <tr key={row.id} className="product">
                                    <th scope="row" className="product-id">
                                      {index + 1}
                                    </th>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Product Name"
                                        name="product_name"
                                        readOnly
                                        value={row.part_number}
                                      />
                                    </td>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Product Name"
                                        name="product_name"
                                        readOnly
                                        value={row.desc}
                                      />
                                    </td>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Product Name"
                                        name="product_name"
                                        readOnly
                                        value={row.unit}
                                      />
                                    </td>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Product Name"
                                        name="product_name"
                                        readOnly
                                        value={row.qty}
                                      />
                                    </td>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Product Name"
                                        name="product_name"
                                        readOnly
                                        value={row.page_desc}
                                      />
                                    </td>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Stock"
                                        name="stock"
                                        readOnly
                                        value={row.stock}
                                      />
                                    </td>
                                    {/* <td className="text-start">
                                      {!row.id_pq && (
                                        <Input
                                          className="form-check-input"
                                          type="checkbox"
                                          value={row.id}
                                          checked={checkedRows[row.id] || false}
                                          onChange={(e) => handleCheckboxChange(e, row.id)}
                                        />
                                      )}
                                      {row.id_pq ? <Input className="form-check-input" type="checkbox" value checked /> : ""}
                                    </td> */}
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>

                      {/* <div className="text-end mb-3">
                        <button type="submit" className="btn btn-primary w-sm">
                          Create PQ
                        </button>
                      </div> */}
                    </Form>
                  </TabPane>

                  <TabPane id="detail-pq" tabId="2">
                    {detailFpb.pq.map((row, index) => (
                      <Card>
                        <CardHeader className="d-flex justify-content-between align-items-center">
                          <div>PQ : {index + 1}</div>
                          <button onClick={() => handleCetakClick(row.datapq.id)} className="btn btn-primary btn-sm w-sm">
                            <i className="ri-printer-line align-bottom me-1"></i> Print
                          </button>
                        </CardHeader>
                        <CardBody className="p-4">
                          <div className="table-responsive">
                            <Table className="invoice-table table-borderless table-nowrap mb-0">
                              <thead className="align-middle">
                                <tr className="table-active">
                                  <th scope="col" style={{ width: "50px" }}>
                                    No.
                                  </th>
                                  <th scope="col">Part Number</th>
                                  <th scope="col">Deskripsi / Nama Barang</th>
                                  <th scope="col">Merk / Type</th>
                                  <th scope="col">Qty</th>
                                  <th scope="col">Keterangan</th>
                                </tr>
                              </thead>
                              <tbody id="newlink">
                                {row.datapqpartrequest.map((rowPart, indexPart) => (
                                  <tr key={indexPart.id} className="product">
                                    <th scope="row" className="product-id">
                                      {indexPart + 1}
                                    </th>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Product Name"
                                        name="product_name"
                                        readOnly
                                        value={rowPart.part.part_number}
                                      />
                                    </td>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Product Name"
                                        name="product_name"
                                        readOnly
                                        value={rowPart.part.desc}
                                      />
                                    </td>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Product Name"
                                        name="product_name"
                                        readOnly
                                        value={rowPart.part.unit}
                                      />
                                    </td>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Product Name"
                                        name="product_name"
                                        readOnly
                                        value={rowPart.part.qty}
                                      />
                                    </td>
                                    <td className="text-start">
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id="productName-1"
                                        placeholder="Product Name"
                                        name="product_name"
                                        readOnly
                                        value={rowPart.part.page_desc}
                                      />
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      {/* {isModalOpen && <Modals isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} */}
      {isModalOpen && partPrice && <Modals data={partPrice} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </React.Fragment>
  );
};

export default DetailFpb;
