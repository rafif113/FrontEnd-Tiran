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
import { formatRupiah } from "../../../utils/utils";

// Redux
import { useDispatch, useSelector } from "react-redux";
// import { getDetailMol as onGetDetailMol } from "../../../slices/thunks";
import {
  getPenawaranPemenang as onGetPenawaranPemenang,
  addPemenangInvoice as onAddPemenangInvoice,
} from "../../../slices/thunks";

// import { clearDetailMol, clearSelectedPartRequest, setLoading, setSelectedPartRequest } from "../../../slices/mol/reducer";
import { clearDetailPenawaranPemenang, setLoading } from "../../../slices/penawaran/reducer";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect } from "react";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import SubmitModal from "../../../Components/Common/SubmitModal";

const Pemenang = () => {
  document.title = "Detail Pemenang | PT Tiran";

  const dispatch = useDispatch();
  const history = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  //   Data detail Mol
  const selectDetailPenawaranData = createSelector(
    (state) => state.Penawaran.detailPenawaranPemenang,
    (detailPenawaranPemenang) => detailPenawaranPemenang
  );
  const detailPenawaranPemenang = useSelector(selectDetailPenawaranData);
  const loading = useSelector((state) => state.Penawaran.loading);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_po = url.searchParams.get("id");
    dispatch(setLoading(true));
    dispatch(clearDetailPenawaranPemenang());
    dispatch(onGetPenawaranPemenang({ id_po })).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  // handle form input
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const validation = useFormik({
    // enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: async () => {
      const data = {
        id_detail: selectedItems,
      };
      console.log(data);
      dispatch(onAddPemenangInvoice(data));
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
    <React.Fragment>
      {loading ? (
        <div></div>
      ) : (
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Detail Pemenang" pageTitle="Detail" />

            <Row>
              <Col lg={12}>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    openSubmitModal();
                  }}
                >
                  <Card>
                    <CardHeader>Data Vendor : </CardHeader>
                    <CardBody>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="unit-name">
                              Email
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="unit-name"
                              name="unit_name"
                              placeholder="Enter unit name"
                              readOnly
                              value={detailPenawaranPemenang[0].vendor.email}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="engine-model">
                              Name
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="engine-model"
                              name="engine_model"
                              placeholder="Enter Engine Model"
                              readOnly
                              value={detailPenawaranPemenang[0].vendor.name}
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
                              <th scope="col">Part Request</th>
                              <th scope="col">Price</th>
                              <th scope="col">Qty</th>
                              <th scope="col">Total</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detailPenawaranPemenang[0].detail_harga.map((row, index) => (
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
                                    value={row.nama_part_request}
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
                                    value={formatRupiah(row.price)}
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
                                    value={formatRupiah(row.qty * row.price)}
                                    readOnly
                                  />
                                </td>
                                <td className="product-removal">
                                  <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={row.id}
                                    onChange={() => handleCheckboxChange(row.id)}
                                    checked={selectedItems.includes(row.id)}
                                  />
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
                      Create Invoice
                    </button>
                  </div>
                </Form>
                <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default Pemenang;
