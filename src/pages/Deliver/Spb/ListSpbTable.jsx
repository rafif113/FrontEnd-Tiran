import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Button, Input, Spinner, Table } from "reactstrap";
import { getPenawaranPq as onGetPenawaranPq } from "../../../slices/thunks";
import {
  setLoadingPenawaranPq,
  setLoadingDetailPenawaranPq,
  clearDetailPenawaranPq,
  detailPenawaranPq,
} from "../../../slices/penawaran/reducer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import { useTable, useExpanded } from "react-table"; // Import useTable dan useExpanded

const ListSpbTable = (props) => {
  const { dataListSpb } = props;
  const history = useNavigate();

  const handleDetailClick = (id) => {
    history(`/deliver/spb/detail?id=${id}`);
  };
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
        Header: "Nomor SPB",
        accessor: "no_spb",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Pengirim",
        accessor: "pengirim",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Driver",
        accessor: "driver",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Date",
        accessor: "date",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Send At",
        accessor: "dikirim_jam",
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
  return (
    <React.Fragment>
      <TableContainer
        columns={columns || []}
        data={dataListSpb || []}
        isPagination={true}
        isGlobalFilter={true}
        isGlobalSearch={true}
        isCustomPageSize={true}
        isBordered={true}
        customPageSize={10}
        className="custom-header-css table align-middle table-nowrap"
        tableClassName="table-centered align-middle table-nowrap mb-0"
        theadClassName="text-muted table-light"
        SearchPlaceholder="Cari SPB..."
        hover={true}
      />
    </React.Fragment>
  );
};

export { ListSpbTable };
