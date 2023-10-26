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
        Header: "Id PO",
        accessor: "id_penawaran_po",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Penawaran",
        accessor: "penawaran_ke",
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
              <button
                // onClick={() => handleDetailsClick(cellProps.id)}
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

  console.log(penawaran);

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
          iscustomPageSize={true}
          isBordered={true}
          customPageSize={5}
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
