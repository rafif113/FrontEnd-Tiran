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
import { addPq as onAddPq } from "../../../slices/thunks";
import { Link, useNavigate } from "react-router-dom";

const DetailPq = () => {
  document.title = "Detail Create Penawaran | PT Tiran";

  const dispatch = useDispatch();
  const history = useNavigate();
  const detailPq = useSelector((state) => state.Penawaran.detailPenawaranPq);
  const loading = useSelector((state) => state.Penawaran.loadingDetailPenawaranPq);

  //   const onSubmitHandler = () => {
  //     detailPq.map((value) => {
  //       const idsOnly = value.detail.map((item) => item.id);

  //       const newPq = {
  //         id_fpb: value.id_fpb,
  //         id_part_request: JSON.stringify(idsOnly),
  //       };

  //       dispatch(onAddPq(newPq));
  //     });
  //     history("/penawaran");
  //   };

  const onSubmitHandler = async () => {
    try {
      await Promise.all(
        detailPq.map(async (value) => {
          const idsOnly = value.detail.map((item) => item.id);
          const newPq = {
            id_fpb: value.id_fpb,
            id_part_request: JSON.stringify(idsOnly),
          };
          await dispatch(onAddPq(newPq));
        })
      );

      history("/penawaran");
    } catch (error) {
      console.error("Error during dispatch:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Detail Create Penawaran" pageTitle="Detail" />
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Row>
              <Col lg={12}>
                {detailPq.map((row, index) => (
                  <Card key={index}>
                    <CardHeader className="d-flex justify-content-between align-items-center">
                      <h5>No FPB : {row.detail[0].nomor}</h5>
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
                            {row.detail.map((rowPart, indexPart) => (
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
                                    value={rowPart.part_number}
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
                                    value={rowPart.desc}
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
                                    value={rowPart.unit}
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
                                    value={rowPart.qty}
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
                                    value={rowPart.page_desc}
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
                <div className="text-end mb-3">
                  <button type="submit" onClick={onSubmitHandler} className="btn btn-primary w-sm">
                    Create PQ
                  </button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
      {/* {isModalOpen && partPrice && <Modals data={partPrice} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} */}
    </React.Fragment>
  );
};

export default DetailPq;
