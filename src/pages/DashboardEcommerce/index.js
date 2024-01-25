import React from "react";
import { Col, Container, Row } from "reactstrap";
import Section from "./Section";

const DashboardEcommerce = () => {
  document.title = "Welcoming Page | PT Tiran";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Section />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
