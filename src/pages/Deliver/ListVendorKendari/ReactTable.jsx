import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { getVendorKendari as onGetVendorKendari } from "../../../slices/thunks";
import { setLoadingVendorKendari } from "../../../slices/deliver/reducer";

const VendorKendariTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleDetailClick = (id) => {
    console.log(id);
    history(`/deliver/vendor/detail?id=${id}`);
  };

  const vendorKendariData = createSelector(
    (state) => state.Deliver.vendorKendari,
    (vendorKendari) => vendorKendari
  );
  const vendorKendari = useSelector(vendorKendariData);
  const loading = useSelector((state) => state.Deliver.loadingVendorKendari);

  useEffect(() => {
    dispatch(setLoadingVendorKendari(true));
    dispatch(onGetVendorKendari()).then(() => {
      dispatch(setLoadingVendorKendari(false));
    });
  }, []);

  console.log(vendorKendari);

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
        Header: "NO FPB",
        accessor: "no_fpb",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "PQ Ke",
        accessor: "pq_ke",
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
        Header: "Total",
        accessor: "total",
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
              <button onClick={() => handleDetailClick(cellProps.id_pq)} className="btn btn-sm btn-light">
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
          data={vendorKendari || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={5}
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

export { VendorKendariTable };
