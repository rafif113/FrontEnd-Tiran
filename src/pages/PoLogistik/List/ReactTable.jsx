import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getPoLogistik as onGetPoLogistik } from "../../../slices/thunks";
import { setLoading } from "../../../slices/po/reducer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

const PaginationTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleCetakClick = (id) => {
    history(`/po/cetak?id=${id}`);
  };

  const handlePenawaranClick = (id, keterangan) => {
    if (keterangan == "selesai") {
      history(`/penawaran/pemenang?id=${id}`);
    } else if (keterangan == "detail") {
      history(`/po/detail?id=${id}`);
    } else {
      history(`/penawaran/create?id=${id}`);
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
      // {
      //   Header: "Actions",
      //   disableFilters: true,
      //   filterable: true,
      //   accessor: (cellProps) => {
      //     return (
      //       <>
      //         <button
      //           onClick={() => handlePenawaranClick(cellProps.po.id, cellProps.keterangan)}
      //           className="btn btn-sm btn-light"
      //         >
      //           {cellProps.keterangan == "selesai" ? "Invoice" : "Penawaran"}
      //         </button>
      //         <button onClick={() => handleCetakClick(cellProps.po.id)} className="btn btn-sm btn-light">
      //           Cetak
      //         </button>
      //         {cellProps.keterangan == "selesai" ? (
      //           <button onClick={() => handlePenawaranClick(cellProps.po.id, "detail")} className="btn btn-sm btn-light">
      //             Detail
      //           </button>
      //         ) : null}
      //       </>
      //     );
      //   },
      // },
    ],
    []
  );

  // -------------------------------------------

  const SelectPoLogistik = createSelector(
    (state) => state.Po.poLogistik,
    (poLogistik) => poLogistik
  );
  const poLogistik = useSelector(SelectPoLogistik);
  const loading = useSelector((state) => state.Po.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(onGetPoLogistik()).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  // ----------------------------------------------

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={poLogistik || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={5}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari PO..."
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
