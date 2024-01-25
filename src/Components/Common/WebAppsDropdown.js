import React, { useState } from "react";
import { Col, Dropdown, DropdownMenu, DropdownToggle, Row } from "reactstrap";

//import images
import github from "../../assets/images/brands/github.png";
import bitbucket from "../../assets/images/brands/bitbucket.png";
import dribbble from "../../assets/images/brands/dribbble.png";
import dropbox from "../../assets/images/brands/dropbox.png";
import mail_chimp from "../../assets/images/brands/mail_chimp.png";
import slack from "../../assets/images/brands/slack.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeRole as onChangeRole } from "../../slices/auth/login/reducer";

const WebAppsDropdown = () => {
  const dispatch = useDispatch();

  const [isWebAppDropdown, setIsWebAppDropdown] = useState(false);
  const toggleWebAppDropdown = () => {
    setIsWebAppDropdown(!isWebAppDropdown);
  };

  const changeRole = (role) => {
    dispatch(onChangeRole(role));
  };

  return (
    <React.Fragment>
      <Dropdown isOpen={isWebAppDropdown} toggle={toggleWebAppDropdown} className="topbar-head-dropdown ms-1 header-item">
        <DropdownToggle tag="button" type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle">
          <i className="bx bx-category-alt fs-22"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0 fw-semibold fs-15"> Hak Akses </h6>
              </Col>
              {/* <div className="col-auto">
                                <Link to="#" className="btn btn-sm btn-soft-info"> View All Apps
                                    <i className="ri-arrow-right-s-line align-middle"></i></Link>
                            </div> */}
            </Row>
          </div>

          <div className="p-2">
            <div className="row g-0">
              <Col>
                <Link className="dropdown-icon-item" to="#" onClick={() => changeRole("pengadaan")}>
                  {/* <img src={github} alt="Github" /> */}
                  <span>Pengadaan</span>
                </Link>
              </Col>
              <Col>
                <Link className="dropdown-icon-item" to="#" onClick={() => changeRole("finance")}>
                  {/* <img src={bitbucket} alt="bitbucket" /> */}
                  <span>Finance</span>
                </Link>
              </Col>
            </div>

            {/* <div className="row g-0">
                            <Col>
                                <Link className="dropdown-icon-item" to="#">
                                    <img src={dropbox} alt="dropbox" />
                                    <span>Dropbox</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" to="#">
                                    <img src={mail_chimp} alt="mail_chimp" />
                                    <span>Mail Chimp</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link className="dropdown-icon-item" to="#">
                                    <img src={slack} alt="slack" />
                                    <span>Slack</span>
                                </Link>
                            </Col>
                        </div> */}
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default WebAppsDropdown;
