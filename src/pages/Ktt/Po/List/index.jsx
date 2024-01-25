import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { KttPoTable } from "./ReactTable";

const ReactTable = () => {
  document.title = "List PO KTT | PT Tiran";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">List PO KTT</h5>
                </CardHeader>
                <CardBody>
                  <KttPoTable />
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
