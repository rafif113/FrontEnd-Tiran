import React, { useEffect, useMemo } from "react";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { getMasterAlat as onGetMasterAlat } from "../../slices/thunks";
import { setLoadingALat } from "../../slices/master/reducer";

const UnitTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const unitData = createSelector(
    (state) => state.Master.alat,
    (alat) => alat
  );
  const alat = useSelector(unitData);
  const loading = useSelector((state) => state.Master.loadingALat);

  useEffect(() => {
    dispatch(setLoadingALat(true));
    dispatch(onGetMasterAlat()).then(() => {
      dispatch(setLoadingALat(false));
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
        Header: "Brand",
        accessor: "brand",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Category",
        accessor: "cat",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Sub Cat",
        accessor: "sub_cat",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Type",
        accessor: "type",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Model",
        accessor: "model",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Number Plat",
        accessor: "new_plat_number",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Number Pol",
        accessor: "nopol",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Serial Number",
        accessor: "serial_number",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Location",
        accessor: "location",
        disableFilters: true,
        filterable: false,
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
          data={alat || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Unit..."
        />
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { UnitTable };
