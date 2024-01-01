import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

import { getPo as onGetPo, getFinancePo as onGetInvoicePo } from "../../../../slices/thunks";
import { clearDetailPo, setLoading } from "../../../../slices/finance/reducer";

const InvoicePoFinanceTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleDetailClick = (id, kelengkapan) => {
    // if (kelengkapan.flag == "tidak komplit") {
    // const keteranganText = kelengkapan.keterangan.join("\n");
    // alert(keteranganText);
    // } else {
    history(`/finance/monitoring/payment-request/detail?id=${id}`);
    // }
  };

  const InvoicePoData = createSelector(
    (state) => state.Finance.invoicePo,
    (invoicePo) => invoicePo
  );
  const invoicePo = useSelector(InvoicePoData);
  const loading = useSelector((state) => state.Finance.loading);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(onGetInvoicePo()).then(() => {
      dispatch(setLoading(false));
    });
  }, []);

  console.log(invoicePo);

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
        Header: "Penawaran",
        accessor: "keterangan",
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
              <button
                onClick={() => handleDetailClick(cellProps.penawaran_vendor.id, cellProps.kelengkapan_dok)}
                className="btn btn-sm btn-light"
              >
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
          data={invoicePo || []}
          isPagination={true}
          isGlobalFilter={true}
          isGlobalSearch={true}
          isCustomPageSize={true}
          isBordered={true}
          customPageSize={5}
          className="custom-header-css table align-middle table-nowrap"
          tableClassName="table-centered align-middle table-nowrap mb-0"
          theadClassName="text-muted table-light"
          SearchPlaceholder="Cari PO..."
        />
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { InvoicePoFinanceTable };
