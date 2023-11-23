import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Input,
  Form,
  Table,
  CardHeader,
  Alert,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";

import { Link } from "react-router-dom";
//formik
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSelector } from "reselect";

import { getDetailFinanceTongkang as onGetDetailTongkang } from "../../../../slices/thunks";
import { clearDetailTongkang, setLoadingDetail } from "../../../../slices/finance/reducer";
const DetailTongkang = () => {
  document.title = "Detail Tongkang | PT Tiran";
  const dispatch = useDispatch();
  const history = useNavigate();

  const selectDetailTongkang = createSelector(
    (state) => state.Finance.detailTongkang,
    (detailTongkang) => detailTongkang
  );
  const detailTongkang = useSelector(selectDetailTongkang);
  const loadingDetail = useSelector((state) => state.Finance.loadingDetail);

  useEffect(() => {
    const url = new URL(window.location.href);
    const id_tongkang = url.searchParams.get("id");
    dispatch(setLoadingDetail(true));
    dispatch(clearDetailTongkang());
    dispatch(onGetDetailTongkang({ id_tongkang })).then(() => {
      dispatch(setLoadingDetail(false));
    });
  }, []);

  const [customActiveTab, setCustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Detail Tongkang" pageTitle="Tongkang" />

        {loadingDetail ? (
          ""
        ) : (
          <Card>
            <CardHeader>
              <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "1",
                    })}
                    onClick={() => {
                      toggleCustom("1");
                    }}
                  >
                    Revenue Based on Contract
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2");
                    }}
                  >
                    Final Amount
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "3",
                    })}
                    onClick={() => {
                      toggleCustom("3");
                    }}
                  >
                    Down Payment
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "4",
                    })}
                    onClick={() => {
                      toggleCustom("4");
                    }}
                  >
                    Final Payment
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "5",
                    })}
                    onClick={() => {
                      toggleCustom("5");
                    }}
                  >
                    Specification Discharging Port
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>

            <CardBody>
              <TabContent activeTab={customActiveTab}>
                {/* Tab revenue */}
                <TabPane id="revenue" tabId="1">
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
                          value={detailTongkang.data_tongkang.buyer}
                          readOnly
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
                          value={detailTongkang.data_tongkang.category}
                          readOnly
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
                          value={detailTongkang.tongkang_rb_contract.qty}
                          readOnly
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
                          value={detailTongkang.tongkang_rb_contract.price}
                          readOnly
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
                          value={detailTongkang.tongkang_rb_contract.cif}
                          readOnly
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
                          value={detailTongkang.tongkang_rb_contract.amount}
                          readOnly
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
                          // value={}
                          readOnly
                        />
                      </div>
                    </Col>
                  </Row>
                </TabPane>

                {/* Tab final amount */}
                <TabPane id="amount" tabId="2">
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
                          value={detailTongkang.tongkang_final_amount.amount}
                          readOnly
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
                          value={detailTongkang.tongkang_final_amount.based_price}
                          readOnly
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
                          readOnly
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
                          value={detailTongkang.tongkang_final_amount.final_price}
                          readOnly
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
                          value={detailTongkang.tongkang_final_amount.kurs}
                          readOnly
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
                          value={detailTongkang.tongkang_final_amount.final_qty}
                          readOnly
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
                          value={detailTongkang.tongkang_final_amount.final_amount}
                          readOnly
                        />
                      </div>
                    </Col>
                  </Row>
                </TabPane>

                {/* Tab down payment */}
                <TabPane id="dpPayment" tabId="3">
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="DP">
                          DP
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="DP"
                          name="DP"
                          placeholder="Enter DP"
                          value={detailTongkang.tongkang_down_payment.dp}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="PPN">
                          PPN Excemption
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="PPN"
                          name="PPN"
                          placeholder="Enter PPN"
                          value={detailTongkang.tongkang_down_payment.ppn_ex}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="dpn/ppn">
                          DPN/PPN
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="dpn/ppn"
                          name="dpn/ppn"
                          placeholder="Enter dpn/ppn"
                          value={detailTongkang.tongkang_down_payment.dpp_ppn}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="pph22">
                          PPH 22
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="pph22"
                          name="pph22"
                          placeholder="Enter pph22"
                          value={detailTongkang.tongkang_down_payment.pph22}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="Total Dp">
                          Total Dp
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Total Dp"
                          name="Total Dp"
                          placeholder="Enter Total Dp"
                          value={detailTongkang.tongkang_down_payment.total_dp}
                          readOnly
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="Date">
                          Date
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Date"
                          name="Date"
                          placeholder="Enter Date"
                          value={detailTongkang.tongkang_down_payment.date}
                          readOnly
                        />
                      </div>
                    </Col>
                  </Row>
                </TabPane>

                {/* Tab final payment */}
                <TabPane id="finalPayment" tabId="4">
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="First">
                          First (INV)
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="First"
                          name="First"
                          placeholder="Enter First"
                          value={detailTongkang.tongkang_final_payment}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="Final">
                          Final Inv
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Final"
                          name="Final"
                          placeholder="Enter Final"
                          value={detailTongkang.tongkang_final_payment}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="ppn2">
                          PPN2
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="ppn2"
                          name="ppn2"
                          placeholder="Enter ppn2"
                          value={detailTongkang.tongkang_final_payment}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="beforePph22">
                          Amount Before PPH 22
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="beforePph22"
                          name="beforePph22"
                          placeholder="Enter beforePph22"
                          value={detailTongkang.tongkang_final_payment}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="PPH22">
                          PPH22
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="PPH22"
                          name="PPH22"
                          placeholder="Enter PPH22"
                          value={detailTongkang.tongkang_final_payment}
                          readOnly
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="Total Final Inv">
                          Total Final Inv
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Total Final Inv"
                          name="Total Final Inv"
                          placeholder="Enter Total Final Inv"
                          value={detailTongkang.tongkang_final_payment}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="Date2">
                          Date2
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Date2"
                          name="Date2"
                          placeholder="Enter Date2"
                          value={detailTongkang.tongkang_final_payment}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="Payment Received">
                          Payment Received
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Payment Received"
                          name="Payment Received"
                          placeholder="Enter Payment Received"
                          value={detailTongkang.tongkang_final_payment}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="Sisa Pembayaran">
                          Sisa Pembayaran
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Sisa Pembayaran"
                          name="Sisa Pembayaran"
                          placeholder="Enter Sisa Pembayaran"
                          value={detailTongkang.tongkang_final_payment}
                          readOnly
                        />
                      </div>
                    </Col>
                  </Row>
                </TabPane>

                {/* Tab specification */}
                <TabPane id="specification" tabId="5">
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="Ni">
                          Ni
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Ni"
                          name="Ni"
                          placeholder="Enter Ni"
                          value={detailTongkang.tongkang_sd_port.ni}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="FE">
                          FE
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="FE"
                          name="FE"
                          placeholder="Enter FE"
                          value={detailTongkang.tongkang_sd_port.fe}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="MC">
                          MC
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="MC"
                          name="MC"
                          placeholder="Enter MC"
                          value={detailTongkang.tongkang_sd_port.mc}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="sio">
                          SiO2/MGO
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="sio"
                          name="sio"
                          placeholder="Enter sio"
                          value={detailTongkang.tongkang_sd_port.s_mg}
                          readOnly
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="Co">
                          Co
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Co"
                          name="Co"
                          placeholder="Enter Co"
                          value={detailTongkang.tongkang_sd_port.co}
                          readOnly
                        />
                      </div>
                    </Col>

                    <Col lg={6}>
                      <div className="mb-3">
                        <label className="form-label text-capitalize" htmlFor="Surveyor">
                          Surveyor
                        </label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Surveyor"
                          name="Surveyor"
                          placeholder="Enter Surveyor"
                          value={detailTongkang.tongkang_sd_port.surveyor}
                          readOnly
                        />
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default DetailTongkang;
