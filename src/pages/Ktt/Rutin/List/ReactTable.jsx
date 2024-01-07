import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getKttPo as onGetKttPo } from "../../../../slices/thunks";
import { setLoading } from "../../../../slices/ktt/reducer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

const KttPoRutinTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleDetailClick = (id) => {
    history(`/po-ktt-rutin/detail?id=${id}`);
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
        Header: "Product Name",
        accessor: "request.nama_barang",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Quantity",
        accessor: "request.qty",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Volume",
        accessor: "request.volume",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Description",
        accessor: "request.keterangan",
        disableFilters: true,
        filterable: false,
      },
      // {
      //   Header: "Actions",
      //   disableFilters: true,
      //   filterable: true,
      //   accessor: (cellProps) => {
      //     return (
      //       <button onClick={() => handleDetailClick(cellProps.request.id)} className="btn btn-sm btn-light">
      //         Detail
      //       </button>
      //     );
      //   },
      // },
    ],
    []
  );

  // -------------------------------------------
  const SelectKttData = createSelector(
    (state) => state.Ktt.kttPo,
    (ktt) => ktt
  );
  const ktt = useSelector(SelectKttData);
  const loading = useSelector((state) => state.Ktt.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(onGetKttPo()).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  // ----------------------------------------------

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={ktt.rutin || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={10}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari PO KTT..."
        />
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { KttPoRutinTable };
