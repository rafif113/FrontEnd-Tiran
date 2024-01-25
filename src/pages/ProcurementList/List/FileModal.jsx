import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const FileModal = ({ fileInvoice, filePO, fileSPB }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button className="btn btn-sm btn-light" onClick={openModal}>
        Preview Files
      </button>
      {modalOpen && (
        <Modal isOpen={modalOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>File Preview</ModalHeader>
          <ModalBody>
            <div className="mb-3">
              <p style={{ margin: 0 }}>File Invoice:</p>
              <a href={fileInvoice} target="_blank" rel="noopener noreferrer">
                Preview Invoice
              </a>
            </div>
            <div className="mb-3">
              <p style={{ margin: 0 }}>File PO:</p>
              <a href={filePO} target="_blank" rel="noopener noreferrer">
                Preview PO
              </a>
            </div>
            <div className="mb-3">
              <p style={{ margin: 0 }}>File SPB:</p>
              <a href={fileSPB} target="_blank" rel="noopener noreferrer">
                Preview SPB
              </a>
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

export default FileModal;
