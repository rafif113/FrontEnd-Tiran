import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getProcurementList as onGetProcurementList } from "../../../slices/thunks";
import { setLoadingProcurementList } from "../../../slices/po/reducer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../../utils/utils";

const PaginationTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  // const handlePenawaranClick = (id, keterangan) => {
  //   if (keterangan == "selesai") {
  //     history(`/penawaran/pemenang?id=${id}`);
  //   } else if (keterangan == "detail") {
  //     history(`/po/detail?id=${id}`);
  //   } else {
  //     history(`/penawaran/create?id=${id}`);
  //   }
  // };

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
        accessor: "no_po",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Nomor PR",
        accessor: "no_pr",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Nama Vendor",
        accessor: "nama_vendor",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Nominal",
        accessor: (cellProps) => {
          return formatRupiah(cellProps.nominal);
        },
      },
      {
        Header: "Description",
        accessor: "desc",
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

  const SelectProcurementList = createSelector(
    (state) => state.Po.procurementList,
    (procurementList) => procurementList
  );
  const procurementList = useSelector(SelectProcurementList);
  const loading = useSelector((state) => state.Po.loadingProcurementList);

  useEffect(() => {
    dispatch(setLoadingProcurementList(true));
    dispatch(onGetProcurementList()).then(() => {
      dispatch(setLoadingProcurementList(false));
    });
  }, []);

  // ----------------------------------------------

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={procurementList || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={5}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Procurement List..."
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
