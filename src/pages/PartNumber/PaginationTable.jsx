import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getMasterPart as onGetMasterPart } from "../../slices/thunks";
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
        Header: "Part Name",
        accessor: "part_name",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Part Number",
        accessor: "part_number",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Satuan",
        accessor: "satuan",
        disableFilters: true,
        filterable: false,
      },
    ],
    []
  );

  // -------------------------------------------

  const selectUserData = createSelector(
    (state) => state.Master.part,
    (part) => part
  );
  const user = useSelector(selectUserData);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetMasterPart()).then(() => {
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
          SearchPlaceholder="Cari Part Number..."
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
