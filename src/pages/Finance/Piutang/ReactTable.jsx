import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { getFinanceTongkang as onGetTongkang } from "../../../slices/thunks";
import { setLoading } from "../../../slices/finance/reducer";

const PiutangFinanceTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleDetailClick = (id) => {
    console.log(id);
    history(`/finance/monitoring/tongkang/detail?id=${id}`);
  };

  const TongkangData = createSelector(
    (state) => state.Finance.tongkang,
    (tongkang) => tongkang
  );
  const tongkang = useSelector(TongkangData);
  const loading = useSelector((state) => state.Finance.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(onGetTongkang()).then(() => {
      dispatch(setLoading(false));
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
        Header: "BL No",
        accessor: "bl_no",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "BL Date",
        accessor: "bl_date",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "SI No",
        accessor: "si_no",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Category",
        accessor: "category",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Buyer",
        accessor: "buyer",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Carrier",
        accessor: "carrier",
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
          data={tongkang || []}
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
