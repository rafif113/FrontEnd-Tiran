import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { getKttPo as onGetKttPo } from "../../../../slices/thunks";
import { setLoading } from "../../../../slices/ktt/reducer";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

const KttPoTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleDetailClick = (id) => {
    history(`/po-ktt/detail?id=${id}`);
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
        Header: "Nomor PO",
        accessor: "po.nomor_po",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Nomor PR ",
        accessor: "po.nomor_pr",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Special Instruction",
        accessor: "po.spesial_intruksi",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Actions",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps) => {
          return (
            <button onClick={() => handleDetailClick(cellProps.po.id)} className="btn btn-sm btn-light">
              Detail
            </button>
          );
        },
      },
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

  console.log(ktt);

  // ----------------------------------------------

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={ktt.po || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={5}
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

export { KttPoTable };
