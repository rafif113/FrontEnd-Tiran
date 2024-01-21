import React from "react";
import { Col, Row } from "reactstrap";
import { useProfile } from "../../Components/Hooks/UserHooks";

const Section = () => {
  const { userProfile } = useProfile();

  console.log(userProfile);
  return (
    <React.Fragment>
      <Row className="mb-3 pb-1">
        <Col xs={12}>
          <div className="d-flex align-items-lg-center flex-lg-row flex-column">
            <div className="flex-grow-1">
              <h4 className="fs-16 mb-1">Welcome, {userProfile.data.user.name}!</h4>
              <p className="text-muted mb-0">Here's PT. Tiran Website.</p>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Section;
