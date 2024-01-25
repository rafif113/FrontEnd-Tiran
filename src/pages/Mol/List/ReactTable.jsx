import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getMol as onGetMol } from "../../../slices/thunks";
import { setLoadingList } from "../../../slices/mol/reducer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
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
  const role = useSelector((state) => state.Login.role);

  console.log(role);

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
        Header: "Description",
        accessor: "keterangan",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Status Analis",
        accessor: "analis",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Actions",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => {
          const hasMekanikRole = role.includes("mekanik");
          const hasMekanikMaintenance = role.includes("maintenance");
          return (
            <>
              {hasMekanikRole || hasMekanikMaintenance ? (
                <button onClick={() => handleDetailsClick(cellProps.id)} className="btn btn-sm btn-light">
                  Details
                </button>
              ) : (
                <>
                  <button onClick={() => handleDetailsClick(cellProps.id)} className="btn btn-sm btn-light">
                    Details
                  </button>
                  <button onClick={() => handleCetakClick(cellProps.id)} className="btn btn-sm btn-light">
                    Cetak
                  </button>
                </>
              )}
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
  const loading = useSelector((state) => state.Mol.loadingList);

  useEffect(() => {
    dispatch(setLoadingList(true));
    dispatch(onGetMol()).then(() => {
      dispatch(setLoadingList(false));
    });
  }, []);

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={mol || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
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
