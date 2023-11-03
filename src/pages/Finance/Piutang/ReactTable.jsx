import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getMol as onGetMol } from "../../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const PaginationTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleDetailsClick = (id) => {
    history(`/mol/detail?id=${id}`);
  };
  const handleCetakClick = (id) => {
    history(`/mol/cetak?id=${id}`);
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
        Header: "No Document",
        accessor: "no_documen",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "No Mol",
        accessor: "mol_no",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Order For",
        accessor: "order_for",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => {
          const orderForArray = value ? JSON.parse(value) : null;
          return (
            <React.Fragment>
              {orderForArray
                ? orderForArray.map((val, index) => {
                    return <div key={index}>{val}</div>;
                  })
                : "-"}
            </React.Fragment>
          );
        },
      },
      {
        Header: "Status",
        accessor: () => {
          return <>Approved</>;
        },
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Actions",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => {
          return (
            <>
              <button onClick={() => handleDetailsClick(cellProps.id)} className="btn btn-sm btn-light">
                Details
              </button>
              <button onClick={() => handleCetakClick(cellProps.id)} className="btn btn-sm btn-light">
                Cetak
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  // -------------------------------------------

  const selectMolData = createSelector(
    (state) => state.Mol.mol,
    (mol) => mol
  );
  const mol = useSelector(selectMolData);

  useEffect(() => {
    if (mol && !mol.length) {
      dispatch(onGetMol());
    }
  }, [dispatch, mol]);

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (mol && !isEmpty(mol)) {
      setDisplay(true);
    }
  }, [mol]);

  return (
    <React.Fragment>
      {display ? (
        <TableContainer
          columns={columns || []}
          data={mol || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          iscustomPageSize={true}
          isBordered={true}
          customPageSize={5}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Mol..."
        />
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { PaginationTable };
