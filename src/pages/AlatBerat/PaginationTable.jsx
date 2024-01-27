import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getMasterAlat as onGetMasterAlat } from "../../slices/thunks";
import { clearDetailUser } from "../../slices/user/reducer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

const PaginationTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

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
        Header: "Type",
        accessor: "type",
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
        Header: "Model",
        accessor: "model",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "NoPol",
        accessor: "nopol",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "New Plat Number",
        accessor: "new_plat_number",
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
        Header: "Engine Number",
        accessor: "engine_number",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "SN Radio",
        accessor: "sn_radio_momunikasi",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Keterangan",
        accessor: "keterangan",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Location",
        accessor: "location",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Masuk",
        accessor: "masuk",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Cat",
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
    ],
    []
  );

  // -------------------------------------------

  const selectUserData = createSelector(
    (state) => state.Master.alat,
    (alat) => alat
  );
  const user = useSelector(selectUserData);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetMasterAlat()).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={user || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Alat Berat..."
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
