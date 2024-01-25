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
import RevenueTab from "./DetailComponents/RevenueTab";
import FinalAmountTab from "./DetailComponents/FinalAmountTab";
import DownPaymentTab from "./DetailComponents/DownPaymentTab";
import FinalPaymentTab from "./DetailComponents/FinalPaymentTab";
import SpecificationTab from "./DetailComponents/SpecificationTab";
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
                  <RevenueTab detailTongkang={detailTongkang} />
                </TabPane>

                {/* Tab final amount */}
                <TabPane id="amount" tabId="2">
                  <FinalAmountTab detailTongkang={detailTongkang} />
                </TabPane>

                {/* Tab down payment */}
                <TabPane id="dpPayment" tabId="3">
                  <DownPaymentTab detailTongkang={detailTongkang} />
                </TabPane>

                {/* Tab final payment */}
                <TabPane id="finalPayment" tabId="4">
                  <FinalPaymentTab detailTongkang={detailTongkang} />
                </TabPane>

                {/* Tab specification */}
                <TabPane id="specification" tabId="5">
                  <SpecificationTab detailTongkang={detailTongkang} />
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
