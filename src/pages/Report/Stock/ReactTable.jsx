import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { getReportStock as onGetReportStock } from "../../../slices/thunks";

const UnitTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const UnitData = createSelector(
    (state) => state.Report.stock,
    (stock) => stock
  );
  const unit = useSelector(UnitData);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(onGetReportStock()).then(() => {
      setLoading(false);
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
        Header: "Part Number",
        accessor: "part_number",
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
        Header: "Stock",
        accessor: "stock",
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
          data={unit || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Part Stock..."
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
