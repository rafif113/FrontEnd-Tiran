import React from "react";
import { Col, Form, FormFeedback, Input, Row } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFinanceTongkangDown as onAddFinanceTongkangDown } from "../../../../../slices/thunks";
import { formatRupiah } from "../../../../../utils/utils";

const FinalAmountTab = ({ detailTongkang }) => {
  return (
    <Form>
      <Row>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label" htmlFor="Amount">
              Amount
            </label>
            <Input
              type="text"
              className="form-control"
              id="Amount"
              name="Amount"
              placeholder="Enter Amount"
              autoComplete="off"
              value={detailTongkang.tongkang_final_amount ? detailTongkang.tongkang_final_amount.amount : ""}
              readOnly={detailTongkang.tongkang_final_amount === null ? false : true}
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="Based Price">
              Based Price (USD)
            </label>
            <Input
              type="text"
              className="form-control"
              id="Based Price"
              name="Based Price"
              placeholder="Enter Based Price"
              value={detailTongkang.tongkang_final_amount ? detailTongkang.tongkang_final_amount.based_price : ""}
              readOnly={detailTongkang.tongkang_final_amount === null ? false : true}
              autoComplete="off"
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="Penalty/Bonus">
              Penalty/Bonus
            </label>
            <Input
              type="text"
              className="form-control"
              id="Penalty/Bonus"
              name="Penalty/Bonus"
              placeholder="Enter Penalty/Bonus"
              // value={detailTongkang.tongkang_final_amount.penalty/bonus}
              readOnly={detailTongkang.tongkang_final_amount === null ? false : true}
              autoComplete="off"
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="Final Price">
              Final Price
            </label>
            <Input
              type="text"
              className="form-control"
              id="Final Price"
              name="Final Price"
              placeholder="Enter Final Price"
              value={detailTongkang.tongkang_final_amount ? formatRupiah(detailTongkang.tongkang_final_amount.final_price) : ""}
              readOnly={detailTongkang.tongkang_final_amount === null ? false : true}
              autoComplete="off"
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="Kurs 2">
              Kurs 2
            </label>
            <Input
              type="text"
              className="form-control"
              id="Kurs 2"
              name="Kurs 2"
              placeholder="Enter Kurs 2"
              value={detailTongkang.tongkang_final_amount ? detailTongkang.tongkang_final_amount.kurs : ""}
              readOnly={detailTongkang.tongkang_final_amount === null ? false : true}
              autoComplete="off"
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="Final Qty">
              Final Qty
            </label>
            <Input
              type="text"
              className="form-control"
              id="Final Qty"
              name="Final Qty"
              placeholder="Enter Final Qty"
              value={detailTongkang.tongkang_final_amount ? detailTongkang.tongkang_final_amount.final_qty : ""}
              readOnly={detailTongkang.tongkang_final_amount === null ? false : true}
              autoComplete="off"
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="mb-3">
            <label className="form-label text-capitalize" htmlFor="Final Amount">
              Final Amount
            </label>
            <Input
              type="text"
              className="form-control"
              id="Final Amount"
              name="Final Amount"
              placeholder="Enter Final Amount"
              value={detailTongkang.tongkang_final_amount ? detailTongkang.tongkang_final_amount.final_amount : ""}
              readOnly={detailTongkang.tongkang_final_amount === null ? false : true}
              autoComplete="off"
            />
          </div>
        </Col>
      </Row>
      <div className="text-end mb-3">
        <button type="submit" className="btn btn-primary w-sm">
          Submit
        </button>
      </div>
    </Form>
  );
};

export default FinalAmountTab;
