import React from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { TongkangFinanceTable } from "./ReactTable";

const ReactTable = () => {
  document.title = "Tongkang | PT Tiran";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Tongkang</h5>
                  <Button color="primary">Add Tongkang</Button>
                </CardHeader>
                <CardBody>
                  <TongkangFinanceTable />
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
