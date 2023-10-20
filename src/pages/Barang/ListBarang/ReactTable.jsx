import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getBarang as onGetBarang } from "../../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { isEmpty } from "lodash";

const PaginationTable = () => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        id: "no",
        accessor: (cellProps, rowIndex) => rowIndex + 1,
        disableFilters: true,
        filterable: false,
      },

      {
        Header: "Kategori",
        accessor: "kategori",
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
        Header: "Desc Barang",
        accessor: "desc_barang",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Quantity",
        accessor: "qty",
        disableFilters: true,
        filterable: false,
      },
      // {
      //   Header: "Price",
      //   accessor: "price",
      //   disableFilters: true,
      //   filterable: false,
      // },
      // {
      //   Header: "Actions",
      //   disableFilters: true,
      //   filterable: true,
      //   accessor: (cellProps) => {
      //     return <React.Fragment>Details</React.Fragment>;
      //   },
      // },
    ],
    []
  );

  // ----------------------------------------------

  const selectBarangData = createSelector(
    (state) => state.Barang.barang,
    (barang) => barang
  );
  const barang = useSelector(selectBarangData);

  useEffect(() => {
    if (barang && !barang.length) {
      dispatch(onGetBarang());
    }
  }, [dispatch, barang]);

  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (barang && !isEmpty(barang)) {
      setDisplay(true);
    }
  }, [barang]);

  return (
    <React.Fragment>
      {display ? (
        <TableContainer
          columns={columns || []}
          data={barang || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          iscustomPageSize={true}
          isBordered={true}
          customPageSize={5}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari Barang..."
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
