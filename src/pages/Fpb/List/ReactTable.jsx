import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getBarang as onGetBarang, getFpb as onGetFpb } from "../../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const PaginationTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleCetakClick = (id) => {
    history(`/fpb/cetak?id=${id}`);
  };

  const handleDetailClick = (id) => {
    history(`/fpb/detail?id=${id}`);
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
        Header: "Nomor",
        accessor: "nomor",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Diajukan ",
        accessor: "diajukan_oleh",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Pengajuan",
        accessor: "pengajuan",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Site",
        accessor: "site",
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
              <button onClick={() => handleDetailClick(cellProps.id)} className="btn btn-sm btn-light">
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
  const [display, setDisplay] = useState(false);

  const SelectFpbData = createSelector(
    (state) => state.Fpb.fpb,
    (fpb) => fpb
  );
  const fpb = useSelector(SelectFpbData);

  useEffect(() => {
    if (fpb && !fpb.length) {
      dispatch(onGetFpb());
    }
  }, [dispatch, fpb]);

  console.log(fpb);

  useEffect(() => {
    if (fpb && !isEmpty(fpb)) {
      setDisplay(true);
    }
  }, [fpb]);

  // ----------------------------------------------

  return (
    <React.Fragment>
      {display ? (
        <TableContainer
          columns={columns || []}
          data={fpb || []}
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
