import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { InvoicePoFinanceTable } from "./ReactTable";

const ReactTable = () => {
  document.title = "Payment Request | PT Tiran";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Payment Request</h5>
                </CardHeader>
                <CardBody>
                  <InvoicePoFinanceTable />
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
