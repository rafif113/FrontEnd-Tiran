import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getBarang as onGetBarang, getFpb as onGetFpb, getPo as onGetPo } from "../../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

const PaginationTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleCetakClick = (id) => {
    history(`/po/cetak?id=${id}`);
  };

  const handlePenawaranClick = (id) => {
    history(`/penawaran/create?id=${id}`);
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
        Header: "Nomor PO",
        accessor: "po.nomor_po",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Nomor PR ",
        accessor: "po.nomor_pr",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Special Instruction",
        accessor: "po.spesial_intruksi",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Penawaran",
        accessor: "keterangan",
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
              <button onClick={() => handlePenawaranClick(cellProps.po.id)} className="btn btn-sm btn-light">
                Penawaran
              </button>
              <button onClick={() => handleCetakClick(cellProps.po.id)} className="btn btn-sm btn-light">
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

  const SelectPoData = createSelector(
    (state) => state.Po.po,
    (po) => po
  );
  const po = useSelector(SelectPoData);

  useEffect(() => {
    if (po && !po.length) {
      dispatch(onGetPo());
    }
  }, [dispatch, po]);

  useEffect(() => {
    if (po && !isEmpty(po)) {
      setDisplay(true);
    }
  }, [po]);

  // ----------------------------------------------

  return (
    <React.Fragment>
      {display ? (
        <TableContainer
          columns={columns || []}
          data={po || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={5}
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
