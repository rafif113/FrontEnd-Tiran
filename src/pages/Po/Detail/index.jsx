import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Input, Form, Table, CardHeader } from "reactstrap";

import { Link } from "react-router-dom";
import { getDetailPo as onGetDetailPo } from "../../../slices/thunks";
//formik
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import { clearDetailPo, setLoading as setLoadingPo } from "../../../slices/po/reducer";
import SubmitModal from "../../../Components/Common/SubmitModal";

const DetailPo = () => {
  document.title = "Detail PO | PT Tiran";
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

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: "",
      vendorSelected: [],
    },
    onSubmit: (values) => {},
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
        <BreadCrumb title="Detail Po" pageTitle="Po" />

        {loadingPo ? (
          ""
        ) : (
          <Row>
            <Col lg={12}>
              <Card>
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

              {detailPo.detail.map((rowPenawaran, indexPenawaran) => (
                <Card key={indexPenawaran}>
                  <CardHeader>Penawaran {rowPenawaran.penawaran_ke}</CardHeader>
                  {rowPenawaran.detail_penawaran.map((rowDetail, indexDetail) => (
                    <CardBody key={indexDetail}>
                      <CardHeader style={{ backgroundColor: rowDetail.flag == 1 ? "lightgrey" : "inherit" }}>
                        Vendor : {rowDetail.vendor} {rowDetail.flag == 1 ? "(Pemenang)" : ""}
                      </CardHeader>
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
                                    value={rowPrice.price}
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
                  openSubmitModal();
                }}
              >
                <div className="text-end mb-3">
                  <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                    <button type="submit" name="penawaran" className="btn btn-primary w-sm">
                      Request DO
                    </button>
                    <button type="submit" name="submit" className="btn btn-success w-sm">
                      Cek Kesesuaian
                    </button>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
        )}
        <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} />
      </Container>
    </div>
  );
};

export default DetailPo;
