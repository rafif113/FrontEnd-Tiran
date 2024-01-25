import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { getReportBarangIn as onGetReportBarangIn } from "../../../slices/thunks";
import { setLoadingBarangIn } from "../../../slices/report/reducer";

const BarangMasukTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleDetailClick = (id) => {
    console.log(id);
    history(`/finance/monitoring/tongkang/detail?id=${id}`);
  };

  const BarangInData = createSelector(
    (state) => state.Report.barangIn,
    (barangIn) => barangIn
  );
  const barangIn = useSelector(BarangInData);
  const loading = useSelector((state) => state.Report.loadingBarangIn);

  useEffect(() => {
    dispatch(setLoadingBarangIn(true));
    dispatch(onGetReportBarangIn()).then(() => {
      dispatch(setLoadingBarangIn(false));
    });
  }, []);

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
        Header: "No. FPB",
        accessor: "fpb",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "For",
        accessor: "for",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Part Number",
        accessor: "part_number",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Part Name",
        accessor: "part_name",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Date",
        accessor: "date",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Vendor Pengirim",
        accessor: "vendor_or_pengirim",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Tanggal Pengiriman",
        accessor: "tanggal_pengiriman",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Qty",
        accessor: "qty",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Remarks",
        accessor: "remaks",
        disableFilters: true,
        filterable: false,
        Cell: ({ value }) => (value ? value : "-"),
      },

      // {
      //   Header: "Actions",
      //   disableFilters: true,
      //   filterable: true,
      //   accessor: (cellProps) => {
      //     return (
      //       <>
      //         <button onClick={() => handleDetailClick(cellProps.id)} className="btn btn-sm btn-light">
      //           Detail
      //         </button>
      //       </>
      //     );
      //   },
      // },
    ],
    []
  );

  // ----------------------------------------------

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={barangIn || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Barang Masuk..."
        />
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { BarangMasukTable };
