import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getMol as onGetMol, getPenawaran as onGetPenawaran } from "../../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const PaginationTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const handleDetailsClick = (id) => {
    history(`/penawaran/detail?id=${id}`);
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
        Header: "No FPB",
        accessor: "no_fpb",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "PQ",
        accessor: "pq_ke",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Total Part PQ",
        // accessor: "jumlah_part_pq",
        accessor: (cellProps) => {
          return (
            <div>
              <b>{cellProps.jumlah_part_pq}</b> (dari {cellProps.total} part request FPB)
            </div>
          );
        },
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "status",
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
              <button onClick={() => handleDetailsClick(cellProps.id_pq)} className="btn btn-sm btn-light">
                Details
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  // -------------------------------------------
  const selectPenawaranData = createSelector(
    (state) => state.Penawaran.penawaran,
    (penawaran) => penawaran
  );
  const penawaran = useSelector(selectPenawaranData);

  useEffect(() => {
    if (penawaran && !penawaran.length) {
      dispatch(onGetPenawaran());
    }
  }, [dispatch, penawaran]);

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (penawaran && !isEmpty(penawaran)) {
      setDisplay(true);
    }
  }, [penawaran]);

  return (
    <React.Fragment>
      {display ? (
        <TableContainer
          columns={columns || []}
          data={penawaran || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Penawaran..."
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
