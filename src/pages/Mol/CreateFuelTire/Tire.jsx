import React from "react";
import { Col, Input, Row } from "reactstrap";

const TireTab = () => {
  return (
    <Row>
      <Col lg={6}>
        <div className="mb-3">
          <label className="form-label text-capitalize" htmlFor="price-usd">
            price (USD)
          </label>
          <Input
            type="text"
            className="form-control"
            id="price-usd"
            name="price-usd"
            placeholder="Enter price-usd"
            autoComplete="off"
          />
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <label className="form-label text-capitalize" htmlFor="cif">
            CIF
          </label>
          <Input type="text" className="form-control" id="cif" name="cif" placeholder="Enter cif" autoComplete="off" />
        </div>
      </Col>

      <Col lg={6}>
        <div className="mb-3">
          <label className="form-label text-capitalize" htmlFor="amount">
            amount (USD)
          </label>
          <Input type="text" className="form-control" id="amount" name="amount" placeholder="Enter amount" autoComplete="off" />
        </div>
      </Col>

      <Col lg={6}>
        <div className="mb-3">
          <label className="form-label text-capitalize" htmlFor="kurs">
            kurs
          </label>
          <Input
            type="text"
            className="form-control"
            id="kurs"
            name="kurs"
            placeholder="Enter kurs"
            autoComplete="off"
            // value={}
          />
        </div>
      </Col>
    </Row>
  );
};

export default TireTab;
