import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { CartPaymentRequestTable } from "./ReactTable";

const ReactTable = () => {
  document.title = "Cart Payment Request | PT Tiran";
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
                  <CartPaymentRequestTable />
                  <h6 className="mb-3">Total Nominal : </h6>
                  <div className="mt-auto flex justify-end">
                    <button className="btn btn-sm btn-primary" id="btn-new-event">
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
