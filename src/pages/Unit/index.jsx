import React from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { PaginationTable, PiutangFinanceTable } from "./ReactTable";

const ReactTable = () => {
  document.title = "List Unit | PT Tiran";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">List Unit</h5>
                </CardHeader>
                <CardBody>{/* <PiutangFinanceTable /> */}</CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReactTable;
