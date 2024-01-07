import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getPengeluaran as onGetPengeluaran } from "../../../slices/thunks";
import { setLoadingPengeluaran } from "../../../slices/mol/reducer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

const PengeluaranTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleCetakClick = (id) => {
    history(`/mol/pengeluaran/cetak?id=${id}`);
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
        Header: "Mol No",
        accessor: "mol_no",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "HM",
        accessor: "hm",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Unit",
        accessor: "unit_id",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Date",
        accessor: "date",
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

  const selectPengeluaranData = createSelector(
    (state) => state.Mol.pengeluaran,
    (pengeluaran) => pengeluaran
  );
  const pengeluaran = useSelector(selectPengeluaranData);
  const loading = useSelector((state) => state.Mol.loadingPengeluaran);

  useEffect(() => {
    dispatch(setLoadingPengeluaran(true));
    dispatch(onGetPengeluaran()).then(() => {
      dispatch(setLoadingPengeluaran(false));
    });
  }, []);

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={pengeluaran || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Pengeluaran..."
        />
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { PengeluaranTable };
