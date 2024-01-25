import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row, Spinner, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import { getPartSpb as onGetPartSpb, getListSpb as onGetListSpb } from "../../../slices/thunks";
import { setLoadingSpb } from "../../../slices/deliver/reducer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { PartSpbTable } from "./PartSpbTable";
import { ListSpbTable } from "./ListSpbTable";

const ReactTable = () => {
  document.title = "List SPB | PT Tiran";
  const dispatch = useDispatch();

  const partSpb = useSelector((state) => state.Deliver.partSpb);
  const listSpb = useSelector((state) => state.Deliver.listSpb);
  const userLogin = useSelector((state) => state.Login.userData);
  const loading = useSelector((state) => state.Deliver.loadingSpb);

  const [customActiveTab, setCustomActiveTab] = useState("1");

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setCustomActiveTab(tab);
    }
  };

  useEffect(() => {
    dispatch(setLoadingSpb(true));
    Promise.all([dispatch(onGetPartSpb()), dispatch(onGetListSpb())])
      .then(() => {
        dispatch(setLoadingSpb(false));
      })
      .catch((error) => {
        console.error("Error:", error);
        dispatch(setLoadingSpb(false));
      });
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
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
                        Create SPB
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
                        List SPB
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    <div className="text-center">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <TabContent activeTab={customActiveTab}>
                      <TabPane id="part-spb" tabId="1">
                        <PartSpbTable dataPartSpb={partSpb} dataUserLogin={userLogin} />
                      </TabPane>
                      <TabPane id="list-spb" tabId="2">
                        <ListSpbTable dataListSpb={listSpb} />
                      </TabPane>
                    </TabContent>
                  )}
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
