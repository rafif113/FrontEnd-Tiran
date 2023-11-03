const { useState } = require("react");
const { Modal, ModalHeader, Button, ModalBody, Col, Input } = require("reactstrap");

const Modals = ({ data, isModalOpen, setIsModalOpen }) => {
  console.log(data);
  return (
    <Modal
      isOpen={isModalOpen}
      toggle={() => {
        setIsModalOpen(!isModalOpen);
      }}
    >
      <ModalHeader>
        <h5 className="modal-title">Referensi Price</h5>
        {/* <Button
          type="button"
          onClick={() => {
            setIsModalOpen(false);
          }}
          className="btn-close"
          aria-label="Close"
        ></Button> */}
      </ModalHeader>
      <ModalBody>
        <form action="#">
          <div className="row g-3">
            <Col xxl={12}>
              <div>
                <label htmlFor="firstName" className="form-label">
                  Price
                </label>
                <Input type="text" className="form-control" value={data.price} placeholder="Price" />
              </div>
            </Col>
            <div className="col-lg-12">
              <div className="hstack gap-2 justify-content-end">
                <Button color="light" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>{" "}
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default Modals;
