import React from "react";
import { Col, Input, Row } from "reactstrap";

const RevenueTab = ({ detailTongkang }) => {
  return (
    <Row>
      <Col lg={6}>
        <div className="mb-3">
          <label className="form-label" htmlFor="buyer">
            Buyer
          </label>
          <Input
            type="text"
            className="form-control"
            id="buyer"
            name="buyer"
            placeholder="Enter Buyer"
            autoComplete="off"
            value={detailTongkang.data_tongkang ? detailTongkang.data_tongkang.buyer : ""}
            readOnly={detailTongkang.data_tongkang.buyer === null ? false : true}
          />
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <label className="form-label text-capitalize" htmlFor="category">
            category
          </label>
          <Input
            type="text"
            className="form-control"
            id="category"
            name="category"
            placeholder="Enter category"
            autoComplete="off"
            value={detailTongkang.data_tongkang ? detailTongkang.data_tongkang.category : ""}
            readOnly={detailTongkang.data_tongkang.category === null ? false : true}
          />
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <label className="form-label text-capitalize" htmlFor="quantity">
            quantity (WMT)
          </label>
          <Input
            type="text"
            className="form-control"
            id="quantity"
            name="quantity"
            placeholder="Enter quantity"
            autoComplete="off"
            value={detailTongkang.tongkang_rb_contract ? detailTongkang.tongkang_rb_contract.qty : ""}
            readOnly={detailTongkang.tongkang_rb_contract === null ? false : true}
          />
        </div>
      </Col>
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
            value={detailTongkang.tongkang_rb_contract ? detailTongkang.tongkang_rb_contract.price : ""}
            readOnly={detailTongkang.tongkang_rb_contract === null ? false : true}
          />
        </div>
      </Col>
      <Col lg={6}>
        <div className="mb-3">
          <label className="form-label text-capitalize" htmlFor="cif">
            CIF
          </label>
          <Input
            type="text"
            className="form-control"
            id="cif"
            name="cif"
            placeholder="Enter cif"
            autoComplete="off"
            value={detailTongkang.tongkang_rb_contract ? detailTongkang.tongkang_rb_contract.cif : ""}
            readOnly={detailTongkang.tongkang_rb_contract === null ? false : true}
          />
        </div>
      </Col>

      <Col lg={6}>
        <div className="mb-3">
          <label className="form-label text-capitalize" htmlFor="amount">
            amount (USD)
          </label>
          <Input
            type="text"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            autoComplete="off"
            value={detailTongkang.tongkang_rb_contract ? detailTongkang.tongkang_rb_contract.amount : ""}
            readOnly={detailTongkang.tongkang_rb_contract === null ? false : true}
          />
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
            readOnly={detailTongkang.tongkang_rb_contract === null ? false : true}
          />
        </div>
      </Col>
    </Row>
  );
};

export default RevenueTab;
