import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../../Components/Common/TableContainerReactTable";
import { Input, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

import { getCartProcurementList as onGetCartProcurementList } from "../../../../slices/thunks";
import { setLoadingCartPaymentRequest as setLoading } from "../../../../slices/finance/reducer";
import FileModal from "../../../ProcurementList/List/FileModal";
import { formatRupiah } from "../../../../utils/utils";

const CartPaymentRequestTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleDetailClick = (id, kelengkapan) => {
    history(`/finance/monitoring/payment-request/detail?id=${id}`);
  };

  const cartPaymentRequestData = createSelector(
    (state) => state.Finance.cartPaymentRequest,
    (cartPaymentRequest) => cartPaymentRequest
  );
  const cartPaymentRequest = useSelector(cartPaymentRequestData);
  const loading = useSelector((state) => state.Finance.loadingCartPaymentRequest);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(onGetCartProcurementList()).then(() => {
      dispatch(setLoading(false));
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
        Header: "Nomor PO",
        accessor: "datapr[0].no_po",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Nomor PR",
        accessor: "datapr[0].no_pr",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Nama Vendor",
        accessor: "datapr[0].nama_vendor",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Nominal",
        accessor: (cellProps) => {
          return formatRupiah(cellProps.datapr[0].nominal);
        },
      },
      {
        Header: "Description",
        accessor: "datapr[0].desc",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "datapr[0].status",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: false,
        Cell: ({ row }) => {
          console.log(row);
          const numberOfCheckboxes = row.original.datapr[0].termin_pembayaran || 0;
          const numberOfPayed = row.original.datapadetail.length || 0;

          console.log(numberOfPayed);
          const renderCheckboxes = () => {
            const checkboxes = [];
            for (let i = 0; i < numberOfCheckboxes; i++) {
              const isCheckedAndDisabled = i < numberOfPayed;
              checkboxes.push(
                <Input
                  key={i}
                  className="form-check-input"
                  style={{ marginRight: "5px" }}
                  type="checkbox"
                  checked={isCheckedAndDisabled}
                  disabled={isCheckedAndDisabled}
                />
              );
            }
            return checkboxes;
          };

          return <div className="form-check">{renderCheckboxes()}</div>;
        },
      },

      // {
      //   Header: "File",
      //   accessor: (cellProps) => (
      //     <FileModal fileInvoice={cellProps.file_invoice} filePO={cellProps.file_po} fileSPB={cellProps.file_spb} />
      //   ),
      //   disableFilters: true,
      //   filterable: false,
      // },
      // {
      //   Header: "Actions",
      //   disableFilters: true,
      //   filterable: true,
      //   accessor: (cellProps) => {
      //     return (
      //       <>
      //         <button
      //           onClick={() => handlePenawaranClick(cellProps.po.id, cellProps.keterangan)}
      //           className="btn btn-sm btn-light"
      //         >
      //           {cellProps.keterangan == "selesai" ? "Invoice" : "Penawaran"}
      //         </button>
      //         <button onClick={() => handleCetakClick(cellProps.po.id)} className="btn btn-sm btn-light">
      //           Cetak
      //         </button>
      //         {cellProps.keterangan == "selesai" ? (
      //           <button onClick={() => handlePenawaranClick(cellProps.po.id, "detail")} className="btn btn-sm btn-light">
      //             Detail
      //           </button>
      //         ) : null}
      //       </>
      //     );
      //   },
      // },
    ],
    []
  );

  // ----------------------------------------------

  return (
    <React.Fragment>
      {!loading ? (
        <TableContainer
          columns={columns || []}
          data={cartPaymentRequest || []}
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

export { CartPaymentRequestTable };
