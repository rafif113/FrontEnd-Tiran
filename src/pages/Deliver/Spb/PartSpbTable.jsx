import React, { useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Button, Col, Input, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { postSpb as onPostSpb } from "../../../slices/thunks";

import { useDispatch } from "react-redux";

const PartSpbTable = (props) => {
  const dispatch = useDispatch();
  const { dataPartSpb, dataUserLogin } = props;

  const [expandedRowsTabTwo, setExpandedRowsTabTwo] = useState({});
  const toggleRowExpandTabTwo = (rowId) => {
    setExpandedRowsTabTwo((prevExpandedRows) => {
      const isExpanded = prevExpandedRows[rowId] || false;
      return { ...prevExpandedRows, [rowId]: !isExpanded };
    });
  };

  const [checkedRows, setCheckedRows] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleRow = (rowId, checked, id_part_request) => {
    setCheckedRows((prevCheckedRows) => ({
      ...prevCheckedRows,
      [rowId]: checked,
    }));

    if (checked) {
      setSelectedItems((prevItems) => [
        ...prevItems,
        {
          id: rowId,
          id_part_request,
        },
      ]);
    } else {
      setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== rowId));
    }
  };

  const handleCheckboxChange = (e, rowId, id_part_request) => {
    const { checked } = e.target;
    toggleRow(rowId, checked, id_part_request);
  };

  const renderExpandedRowContent = (row) => {
    return (
      <Table className="table-nowrap mb-0" style={{ backgroundColor: "rgba(33, 37, 41, 0.04)" }}>
        <thead>
          <tr key={row.original.id_pq}>
            <th style={{ fontWeight: 450, width: "50px" }}>No.</th>
            <th style={{ fontWeight: 450 }}>Part Number</th>
            <th style={{ fontWeight: 450 }}>Deskripsi / Nama Barang</th>
            <th style={{ fontWeight: 450 }}>Merk / Type</th>
            <th style={{ fontWeight: 450 }}>Page Desc.</th>
            <th style={{ fontWeight: 450 }}>Qty</th>
            <th style={{ fontWeight: 450 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {row.original.partrequests.map((value, index) => (
            <React.Fragment>
              <tr key={value.id} className="product">
                <td scope="row" className="product-id">
                  {index + 1}
                </td>
                <td className="text-start" style={{ fontSize: "12px" }}>
                  <span>{value.part_number}</span>
                </td>
                <td className="text-start" style={{ fontSize: "12px" }}>
                  <span>{value.desc}</span>
                </td>
                <td className="text-start" style={{ fontSize: "12px" }}>
                  <span>{value.unit}</span>
                </td>
                <td className="text-start" style={{ fontSize: "12px" }}>
                  <span>{value.page_desc}</span>
                </td>
                <td className="text-start" style={{ fontSize: "12px" }}>
                  <span>{value.qty}</span>
                </td>
                <td
                  className="text-start cursor-pointer"
                  style={{ fontSize: "12px" }}
                  onClick={() => toggleRowExpandTabTwo(value.id)}
                >
                  <span>{"[ + ]"}</span>
                </td>
              </tr>
              {expandedRowsTabTwo[value.id] && (
                <React.Fragment>
                  <tr>
                    <td className="text-end" style={{ fontSize: "0.7rem" }}>
                      No.
                    </td>
                    <td colSpan="1" style={{ fontSize: "0.7rem" }}>
                      Qty
                    </td>
                    <td colSpan="2" style={{ fontSize: "0.7rem" }}>
                      Keterangan
                    </td>
                    <td style={{ fontSize: "0.7rem" }}>Action</td>
                  </tr>
                  {value.partdevendorkendari.map((rowIn, indexIn) => (
                    <tr key={indexIn}>
                      <td className="text-end">{indexIn + 1}.</td>
                      <td colSpan="1">
                        <div className="d-flex">
                          <Input
                            type="text"
                            className="form-control form-control-sm"
                            name="qty"
                            placeholder="Enter qty"
                            autoComplete="off"
                            disabled
                            value={rowIn.qty}
                          />
                        </div>
                      </td>
                      <td colSpan="2">
                        <div className="d-flex">
                          <Input
                            type="text"
                            className="form-control form-control-sm"
                            name="qty"
                            placeholder="Enter Description..."
                            autoComplete="off"
                            disabled
                            value={rowIn.keterangan}
                          />
                        </div>
                      </td>
                      <td colSpan="2">
                        <div className="d-flex">
                          {rowIn.flag != 1 ? (
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              checked={checkedRows[rowIn.id] || false}
                              onChange={(e) => handleCheckboxChange(e, rowIn.id, rowIn.id_part_request)}
                            />
                          ) : (
                            <Input className="form-check-input" type="checkbox" checked={true} disabled />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    );
  };

  const [formData, setFormData] = useState({
    driver: "",
    keterangan: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleButtonClick = () => {
    if (selectedItems.length === 0) {
      alert("Data tidak ada yang dipilih");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSubmit = async () => {
    const id_part_request = selectedItems.map((item) => item.id);
    const data = {
      id_part: JSON.stringify(id_part_request),
      id_user: dataUserLogin.id,
      driver: formData.driver,
      keterangan: formData.keterangan,
    };

    await dispatch(onPostSpb(data));
    window.location.reload();
    setIsModalOpen(false);
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
        Header: "Nomor FPB",
        accessor: "no_fpb",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Nomor PO",
        accessor: "no_po",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Jumlah Part Pq",
        accessor: "jumlah_part_pq",
        disableFilters: true,
        filterable: false,
      },
      {
        id: "expander", // Make sure to have a unique ID
        Header: "Actions",
        accessor: "expander", // Accessor is required and is the accessor for the custom filter function
        disableFilters: true,
        filterable: false,
        Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? "[ - ]" : "[ + ]"}</span>,
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <TableContainer
        columns={columns || []}
        data={dataPartSpb || []}
        isPagination={true}
        isGlobalFilter={true}
        isGlobalSearch={true}
        isCustomPageSize={true}
        isBordered={true}
        customPageSize={10}
        className="custom-header-css table align-middle table-nowrap"
        tableClassName="table-centered align-middle table-nowrap mb-0"
        theadClassName="text-muted table-light"
        SearchPlaceholder="Cari FPB..."
        renderExpandedRowContent={renderExpandedRowContent}
        hover={false}
      />
      <Button color="primary" onClick={handleButtonClick}>
        Create +
      </Button>

      <Modal
        isOpen={isModalOpen}
        toggle={() => {
          setIsModalOpen(!isModalOpen);
        }}
        centered
      >
        <ModalHeader>
          <h5 className="modal-title">Create SPB</h5>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="row g-3">
              <Col xxl={12}>
                <div>
                  <label htmlFor="pengirim" className="form-label">
                    Pengirim
                  </label>
                  <Input type="text" className="form-control" placeholder="Pengirim" value={dataUserLogin.name} disabled />
                </div>
              </Col>
              <Col xxl={12}>
                <div>
                  <label htmlFor="driver" className="form-label">
                    Driver
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Driver..."
                    value={formData.driver}
                    onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                    required
                  />
                </div>
              </Col>
              <Col xxl={12}>
                <div>
                  <label htmlFor="keterangan" className="form-label">
                    Keterangan
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Keterangan..."
                    value={formData.keterangan}
                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                    required
                  />
                </div>
              </Col>
              <div className="col-lg-12">
                <div className="hstack gap-2 justify-content-end">
                  <Button color="light" onClick={() => setIsModalOpen(false)}>
                    Close
                  </Button>
                  <Button color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export { PartSpbTable };
