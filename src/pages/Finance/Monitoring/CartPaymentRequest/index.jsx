import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { CartPaymentRequestTable } from "./ReactTable";
import { formatRupiah } from "../../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postRecapCart as onPostRecapCart } from "../../../../slices/thunks";
import { clearRecapCart } from "../../../../slices/finance/reducer";

const ReactTable = () => {
  document.title = "Cart Payment Request | PT Tiran";
  const history = useNavigate();
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);
  const [price, setPrice] = useState(0);
  const handleCheckboxChange = (row) => {
    setSelectedRows((prevRows) => {
      const isSelected = prevRows.some((selectedRow) => selectedRow.id_payment_detail === row.id_payment_detail);
      if (isSelected) {
        setPrice((prevPrice) => prevPrice - parseInt(row.nominal, 10));

        return prevRows.filter((selectedRow) => selectedRow.id_payment_detail !== row.id_payment_detail);
      } else {
        setPrice((prevPrice) => prevPrice + parseInt(row.nominal, 10));

        return [...prevRows, row];
      }
    });
  };

  const handleSubmitPayment = async () => {
    try {
      const ids = selectedRows.map((row) => row.id_payment_detail);
      dispatch(clearRecapCart());
      await dispatch(onPostRecapCart({ id_payment_detail: ids }));
      history("/finance/monitoring/cart-payment-request/cetak");
    } catch (error) {
      console.error("Error dispatching postRecapCart:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Cart Payment Request</h5>
                </CardHeader>
                <CardBody>
                  <CartPaymentRequestTable handleCheckboxChange={handleCheckboxChange} />
                  <h6 className="mb-3">Total Nominal : {formatRupiah(price)}</h6>
                  <div className="mt-auto flex justify-end">
                    <button className="btn btn-sm btn-primary" id="btn-new-event" onClick={() => handleSubmitPayment()}>
                      <i className="mdi mdi-plus"></i> Payment
                    </button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReactTable;
