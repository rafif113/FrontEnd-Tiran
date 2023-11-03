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
} from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getComponentGroup as onGetComponentGroup,
  getMaterialType as onGetMaterialType,
  getCostCode as onGetCostCode,
  getDetailMol as onGetDetailMol,
  getDetailFpb as onGetDetailFpb,
  // getReferensiPart as onGetReferensiPart,
} from "../../../slices/thunks";

import { setLoading, clearDetailFpb, clearSelectedFpbList, setSelectedFpbList } from "../../../slices/fpb/reducer";
import { getReferensiPart as getReferensiPartApi } from "../../../helpers/backend_helper";

import classnames from "classnames";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
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
  const loading = useSelector((state) => state.Fpb.loading);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_fpb = url.searchParams.get("id");
    dispatch(setLoading(true));
    dispatch(clearDetailFpb());
    dispatch(clearSelectedFpbList());
    dispatch(onGetDetailFpb({ id_fpb })).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  const [prices, setPrices] = useState({});
  const [checkedRows, setCheckedRows] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const handlePriceChange = (e, rowId) => {
    const { value } = e.target;
    setPrices((prevPrices) => ({
      ...prevPrices,
      [rowId]: value,
    }));

    if (value) {
      showCheckbox(rowId);
    } else {
      hideCheckbox(rowId);
    }
  };

  const handleCheckboxChange = (e, rowId) => {
    const { checked } = e.target;
    toggleRow(rowId, checked);
  };

  const showCheckbox = (rowId) => {
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [rowId]: false,
    }));
  };

  const hideCheckbox = (rowId) => {
    setCheckedRows((prevCheckedRows) => {
      const { [rowId]: deleted, ...newCheckedRows } = prevCheckedRows;
      return newCheckedRows;
    });
  };

  const toggleRow = (rowId, checked) => {
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [rowId]: checked,
    }));

    if (checked && prices[rowId]) {
      // Jika checkbox dicheck dan price diisi, tambahkan item ke state baru
      setSelectedItems((prevItems) => [
        ...prevItems,
        {
          id: rowId,
          price: prices[rowId],
        },
      ]);
    } else {
      // Jika checkbox tidak dicheck, hapus item dari state baru (jika ada)
      setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== rowId));
    }
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: async () => {
      const selectedItemsData = detailFpb.mol.partrequest.filter((row) => selectedItems.some((item) => item.id === row.id));
      const mergeData = selectedItemsData.map((row) => {
        const selectedItem = selectedItems.find((item) => item.id === row.id);
        if (selectedItem) {
          return {
            ...row,
            price: selectedItem.price,
          };
        }
        return row;
      });
      await dispatch(setSelectedFpbList(mergeData));
      history("/po/create");
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleModalOpen = (part_number) => {
  //   // dispatch(onGetReferensiPart({ part_number }));
  //   getReferensiPartApi({ part_number });
  //   // setIsModalOpen(true);
  // };

  const [partPrice, setPartPrice] = useState(null);

  const handleModalOpen = async (part_number) => {
    try {
      const response = await getReferensiPartApi({ part_number });
      const data = response.data;
      setPartPrice(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Terjadi kesalahan dalam mengambil data dari API", error);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <div></div>
      ) : (
        // <div></div>
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Detail FPB" pageTitle="Detail" />

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

                  <Card>
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
                              <th scope="col">Price</th>
                              <th scope="col">Ref Price</th>
                              <th scope="col">Action</th>
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
                                    type="number"
                                    className="form-control bg-light border-0"
                                    placeholder="Price"
                                    name={row.id}
                                    value={prices[row.id] || ""}
                                    onChange={(e) => handlePriceChange(e, row.id)}
                                  />
                                </td>
                                <td>
                                  <span className="link-primary" onClick={() => handleModalOpen(row.part_number)}>
                                    <i className="ri-eye-line cursor-pointer"></i>
                                  </span>
                                </td>
                                <td className="text-start">
                                  {prices[row.id] && (
                                    <Input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={row.id}
                                      checked={checkedRows[row.id] || false}
                                      onChange={(e) => handleCheckboxChange(e, row.id)}
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

                  <div className="text-end mb-3">
                    <button type="submit" className="btn btn-success w-sm">
                      Create PO
                    </button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      )}
      {/* {isModalOpen && <Modals isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} */}
      {isModalOpen && partPrice && <Modals data={partPrice} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </React.Fragment>
  );
};

export default DetailFpb;
