import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import { Col, Label, Modal, ModalBody, ModalHeader, Row, Spinner } from "reactstrap";
import { getRole, getUser, postUserRole } from "../../slices/thunks";
import { clearDetailUser } from "../../slices/user/reducer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

const PaginationTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleDetailsClick = (id) => {
    history(`/mol/detail?id=${id}`);
  };

  const [modalRole, setModalRole] = useState(false);
  const [row, setRow] = useState(null);
  const [idUser, setIdUser] = useState(null);

  const toggleRole = (id) => {
    if (modalRole) {
      setModalRole(false);
      setRow(null);
      // console.log(id);
      setIdUser(null);
    } else {
      setModalRole(true);
      console.log(id);
      setRow(null);
      setIdUser(id);
    }
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
        Header: "Name",
        accessor: "name",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Email",
        accessor: "email",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Roles",
        disableFilters: true,
        filterable: false,
        accessor: (cellProps) => {
          const roles = cellProps.roles.map((value, index) => {
            return index === cellProps.roles.length - 1 ? (
              <span key={index}>{value.nama_role}</span>
            ) : (
              <span key={index}>{value.nama_role}, </span>
            );
          });
          return roles;
        },
      },

      {
        Header: "Actions",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => {
          return (
            <>
              <button onClick={() => toggleRole(cellProps.id)} className="btn btn-sm btn-light">
                Role
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  // -------------------------------------------

  const selectUserData = createSelector(
    (state) => state.User.user,
    (user) => user
  );
  const user = useSelector(selectUserData);

  const selectRole = createSelector(
    (state) => state.User.role,
    (user) => user
  );
  const role = useSelector(selectRole);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getRole());
    dispatch(getUser()).then(() => {
      setLoading(false);
    });
  }, []);

  const handleSubmit = () => {
    dispatch(postUserRole({ id_user: idUser, id_role: row.value })).then(() => {
      window.location.reload();
    });
  };

  return (
    <React.Fragment>
      {!loading ? (
        <>
          <TableContainer
            columns={columns || []}
            data={user || []}
            isPagination={true}
            isGlobalFilter={true}
            isGlobalSearch={true}
            isCustomPageSize={true}
            isBordered={true}
            customPageSize={10}
            className="custom-header-css table align-middle table-nowrap"
            tableClassName="table-centered align-middle table-nowrap mb-0"
            theadClassName="text-muted table-light"
            SearchPlaceholder="Cari User..."
          />
          <Modal isOpen={modalRole} id="event-modal" centered>
            <ModalHeader toggle={toggleRole} tag="h5" className="p-3 bg-info-subtle modal-title">
              Add Role
            </ModalHeader>
            <ModalBody>
              <Row className="event-form">
                <Col xs={12}>
                  <div className="mb-3">
                    <Label className="form-label">Role</Label>
                    <ReactSelect
                      placeholder="Roles"
                      name="role"
                      // value={role.find((part) => part.id === row)}
                      options={role.map((detail) => ({
                        label: detail.nama_role,
                        value: detail.id,
                      }))}
                      isSearchable={true}
                      menuPlacement="auto"
                      onChange={(selectedOption) => {
                        setRow(selectedOption);
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <div className="hstack gap-2 justify-content-end">
                <button type="button" onClick={handleSubmit} className="btn btn-success" id="btn-save-event">
                  Submit
                </button>
              </div>
            </ModalBody>
          </Modal>
        </>
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { PaginationTable };
