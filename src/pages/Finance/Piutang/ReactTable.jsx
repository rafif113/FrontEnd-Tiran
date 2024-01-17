import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import { formatRupiah } from "../../../utils/utils";

import { getFinancePiutang as onGetFinancePiutang } from "../../../slices/thunks";
import { setLoadingPiutang } from "../../../slices/finance/reducer";

const PiutangFinanceTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleDetailClick = (id) => {
    console.log(id);
    history(`/finance/piutang/detail?id=${id}`);
  };

  const loading = useSelector((state) => state.Finance.loadingPiutang);
  const piutang = useSelector((state) => state.Finance.piutang);

  useEffect(() => {
    dispatch(setLoadingPiutang(true));
    dispatch(onGetFinancePiutang()).then(() => {
      dispatch(setLoadingPiutang(false));
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
        Header: "Nama Vendor",
        accessor: "nama_vendor",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Total PO",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => {
          return (
            <>
              <div>{cellProps.po.length}</div>
            </>
          );
        },
      },
      {
        Header: "Total Price",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => {
          const totalHarga = cellProps.po.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.total_harga;
          }, 0);
          return (
            <>
              <div>{formatRupiah(totalHarga)}</div>
            </>
          );
        },
      },
      {
        Header: "Actions",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => {
          return (
            <>
              <button onClick={() => handleDetailClick(cellProps.id)} className="btn btn-sm btn-light">
                Detail
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  // ----------------------------------------------

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={piutang || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Tongkang..."
        />
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { PiutangFinanceTable };
