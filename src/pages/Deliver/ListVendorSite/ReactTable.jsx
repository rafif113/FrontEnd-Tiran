import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { getVendorSite as onGetVendorSite } from "../../../slices/thunks";
import { setLoadingVendorSite } from "../../../slices/deliver/reducer";

const VendorSiteTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleDetailClick = (id) => {
    history(`/deliver/site/detail?id=${id}`);
  };

  const vendorSiteData = createSelector(
    (state) => state.Deliver.vendorSite,
    (vendorSite) => vendorSite
  );
  const vendorSite = useSelector(vendorSiteData);
  const loading = useSelector((state) => state.Deliver.loadingVendorSite);

  useEffect(() => {
    dispatch(setLoadingVendorSite(true));
    dispatch(onGetVendorSite()).then(() => {
      dispatch(setLoadingVendorSite(false));
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
        Header: "NO FPB",
        accessor: "no_fpb",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Part Questions",
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
        Header: "Total Part PQ",
        // accessor: "total",
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
          data={vendorSite || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari List Kendari..."
        />
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { VendorSiteTable };
