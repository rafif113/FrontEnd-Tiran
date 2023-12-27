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
import { getDetailPenawaran as onGetDetailPenawaran, addPricePenawaran as onAddPricePenawaran } from "../../../slices/thunks";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";
import { clearDetailPenawaran, setLoadingDetail as setLoadingPenawaran } from "../../../slices/penawaran/reducer";
import SubmitModal from "../../../Components/Common/SubmitModal";
import ModalFileUpload from "./ModalFileUpload";

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

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_penawaran_po = url.searchParams.get("id");
    dispatch(setLoadingPenawaran(true));
    dispatch(clearDetailPenawaran());
    dispatch(onGetDetailPenawaran({ id_penawaran_po })).then(() => {
      dispatch(setLoadingPenawaran(false));
    });
  }, []);

  const [inputValues, setInputValues] = useState([]);

  const handleInputChange = (indexPrice, value, idPartRequest, idDetail) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [indexPrice]: {
        id_detail: idDetail,
        price: value,
        id_part_request: idPartRequest,
      },
    }));
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      pricesPenawaran: [],
    },
    onSubmit: (values) => {
      const inputValuesArray = Object.values(inputValues);
      dispatch(onAddPricePenawaran(inputValuesArray));
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
            <Card>
              <CardHeader>Nama Vendor : {detailPenawaran[0].detail_penawaran[0].vendor}</CardHeader>
            </Card>

            <Col lg={12}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  openSubmitModal();
                }}
              >
                {detailPenawaran.map((rowPenawaran, indexPenawaran) => (
                  <Card key={indexPenawaran}>
                    <CardHeader style={{ fontSize: "14px", fontWeight: "600" }}>
                      Penawaran Ke-{rowPenawaran.penawaran_ke}
                    </CardHeader>
                    {rowPenawaran.detail_penawaran.map((rowDetail, indexDetail) => (
                      <CardBody key={indexDetail}>
                        <div className="table-responsive">
                          <Table className="invoice-table table-borderless table-nowrap mb-0">
                            <thead className="align-middle">
                              <tr className="table-active">
                                <th scope="col" style={{ width: "50px" }}>
                                  No.
                                </th>
                                <th scope="col">Part Request Name</th>
                                <th scope="col">Price Admin</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qty</th>
                              </tr>
                            </thead>
                            <tbody id="newlink">
                              {rowDetail.detail_price.map((rowPrice, indexPrice) => (
                                <tr key={indexPrice} className="product">
                                  <th scope="row" className="product-id">
                                    {indexPrice + 1}
                                  </th>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Part Request Name"
                                      name="nama_part_request"
                                      readOnly
                                      value={rowPrice.nama_part_request}
                                    />
                                  </td>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Price Admin"
                                      name="price_admin"
                                      readOnly
                                      value={formatRupiah(rowPrice.price_admin)}
                                    />
                                  </td>
                                  <td className="text-start">
                                    {rowPrice.price ? (
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id={`productName-${indexPrice}`}
                                        placeholder="Input Price..."
                                        readOnly
                                        value={formatRupiah(rowPrice.price)}
                                      />
                                    ) : (
                                      <Input
                                        type="text"
                                        className="form-control bg-light border-0"
                                        id={`productName-${indexPrice}`}
                                        placeholder="Input Price..."
                                        name="price_penawaran"
                                        readOnly={rowPrice.price ? true : false}
                                        onChange={(e) =>
                                          handleInputChange(
                                            indexPrice,
                                            e.target.value,
                                            rowPrice.id_part_request,
                                            rowDetail.id_detail
                                          )
                                        }
                                      />
                                    )}
                                  </td>
                                  <td className="text-start">
                                    <Input
                                      type="text"
                                      className="form-control bg-light border-0"
                                      id="productName-1"
                                      placeholder="Part Request Name"
                                      name="qty"
                                      readOnly
                                      value={rowPrice.qty}
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

                {/* {detailPenawaran.map((rowPenawaran, indexPenawaran) => (
                  <Card key={indexPenawaran}>
                    <CardHeader>Penawaran {rowPenawaran.penawaran_ke}</CardHeader>
                    {rowPenawaran.detail_penawaran.map((rowDetail, indexDetail) => ( */}

                <div className="text-end mb-3">
                  <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                    {detailPenawaran[0].detail_penawaran[0].flag == 1 ? (
                      <button type="button" className="btn btn-primary w-sm" onClick={toggle}>
                        Delivery Order
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-primary w-sm">
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </Form>
            </Col>
            <ModalFileUpload isOpen={modal} toggle={toggle} id={detailPenawaran[0].id_penawaran} />
          </Row>
        )}
        {/*  */}
        <SubmitModal show={showSubmitModal} onSubmitClick={onSubmitClick} onCloseClick={closeSubmitModal} />
        {/*  */}
      </Container>
    </div>
  );
};

export default DetailPenawaran;
