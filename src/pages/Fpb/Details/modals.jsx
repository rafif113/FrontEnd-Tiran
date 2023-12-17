import { formatRupiah } from "../../../utils/utils";

const { useState } = require("react");
const { Modal, ModalHeader, Button, ModalBody, Col, Input } = require("reactstrap");

// import withRouter from './utils';

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
        <h5 className="modal-title">Price Reference</h5>
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
                <Input type="text" className="form-control" value={formatRupiah(data.price)} placeholder="Price" />
              </div>
            </Col>
            <Col xxl={12}>
              <div>
                <label htmlFor="firstName" className="form-label">
                  Vendor
                </label>
                <Input type="text" className="form-control" value={data.vendor} placeholder="Price" />
              </div>
            </Col>
            <Col xxl={12}>
              <div>
                <label htmlFor="firstName" className="form-label">
                  Transaction Date
                </label>
                <Input type="text" className="form-control" value={data.tanggal_pembelian} placeholder="Price" />
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
