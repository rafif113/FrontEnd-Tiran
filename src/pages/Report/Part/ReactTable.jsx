import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row, Spinner, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { getReportPart as onGetReportPart } from "../../../slices/thunks";

const PartTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [loading, setLoading] = useState(true);

  const PartData = createSelector(
    (state) => state.Report.part,
    (part) => part
  );
  const part = useSelector(PartData);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetReportPart()).then(() => {
      setLoading(false);
    });
  }, []);

  const [modal, setModal] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  const toggle = () => {
    setModal(!modal);
    // setDataDetail(null);
  };

  const handleDetailsClick = async (dataDetailVal) => {
    setDataDetail(null);
    setDataDetail(dataDetailVal);
    toggle();
    console.log(dataDetailVal);
  };

  const columns = useMemo(
    () => [
      {
        id: "no",
        Header: "No.",
        accessor: (cellProps, rowIndex) => rowIndex + 1,
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "NO FPB",
        accessor: "fpb",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "No PO",
        accessor: "po",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Part Number",
        accessor: "part_number",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Unit",
        accessor: "unit",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Tgl Request",
        accessor: "tanggl_direquest",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Vendor",
        accessor: "vendor",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Deliver",
        accessor: "set_deliver",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Qty",
        accessor: "qty",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Action",
        accessor: "qty",
        disableFilters: true,
        filterable: false,
        accessor: (cellProps) => {
          return (
            <>
              <button
                onClick={() => handleDetailsClick(cellProps.tracking.data.length == 0 ? null : cellProps)}
                className="btn btn-sm btn-light"
              >
                Details
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  // ----------------------------------------------

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={part || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Part..."
        />
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      <Modal isOpen={modal} id="event-modal" size="lg" centered>
        <ModalHeader toggle={toggle} tag="h5" className="p-3 bg-info-subtle modal-title">
          Detail Report List Part
        </ModalHeader>
        <ModalBody>
          {/* ... your form content ... */}
          <Row className="event-form">
            {dataDetail != null && (
              <Col xs={12}>
                {dataDetail.set_deliver == "kendari" && (
                  <div>
                    <h6 className="mb-3">Data Kendari</h6>
                    <div className="table-responsive">
                      <Table className="invoice-table table-borderless table-nowrap mb-0">
                        <thead className="align-middle">
                          <tr className="table-active">
                            <th scope="col" style={{ width: "50px" }}>
                              No.
                            </th>
                            <th scope="col">User Cek</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Status</th>
                            <th scope="col">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody id="newlink">
                          {dataDetail.tracking.data[0].datakendari.map((row, index) => (
                            <tr key={row.user_cek} className="product">
                              <th scope="row" className="product-id">
                                {index + 1}
                              </th>
                              <td className="text-start">
                                <Input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  name="product_name"
                                  readOnly
                                  value={row.user_cek}
                                />
                              </td>
                              <td className="text-start">
                                <Input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  name="product_name"
                                  readOnly
                                  value={row.qty}
                                />
                              </td>
                              <td className="text-start">
                                <Input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  name="product_name"
                                  readOnly
                                  value={row.status}
                                />
                              </td>
                              <td className="text-start">
                                <Input
                                  type="text"
                                  className="form-control bg-light border-0"
                                  name="product_name"
                                  readOnly
                                  value={row.keterangan}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <hr className="my-4" /> {/* Garis pemisah antara tabel */}
                  </div>
                )}

                <div>
                  <h6 className="mb-3">Data Site</h6>
                  <div className="table-responsive">
                    <Table className="invoice-table table-borderless table-nowrap mb-0">
                      <thead className="align-middle">
                        <tr className="table-active">
                          <th scope="col" style={{ width: "50px" }}>
                            No.
                          </th>
                          <th scope="col">NO SPB</th>
                          <th scope="col">Driver</th>
                          <th scope="col">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody id="newlink">
                        {dataDetail.tracking.data[0].datasite.map((row, index) => (
                          <tr key={row.no_spb} className="product">
                            <th scope="row" className="product-id">
                              {index + 1}
                            </th>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                name="product_name"
                                readOnly
                                value={row.no_spb}
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                name="product_name"
                                readOnly
                                value={row.driver}
                              />
                            </td>
                            <td className="text-start">
                              <Input
                                type="text"
                                className="form-control bg-light border-0"
                                name="product_name"
                                readOnly
                                value={row.keterangan}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export { PartTable };
