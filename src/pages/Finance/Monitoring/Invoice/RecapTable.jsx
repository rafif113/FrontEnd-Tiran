import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../../../Components/Common/TableContainerReactTable";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";

import { getFinanceRecap as onGetFinanceRecap } from "../../../../slices/thunks";
import { setLoadingRecap as setLoading } from "../../../../slices/finance/reducer";
import FileModal from "../../../ProcurementList/List/FileModal";
import { formatRupiah } from "../../../../utils/utils";
import ModalAddPayment from "./ModalAddPayment"; // Adjust the path based on your project structure

const RecapTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const recap = useSelector((state) => state.Finance.recap);
  const loading = useSelector((state) => state.Finance.loadingRecap);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(onGetFinanceRecap()).then(() => {
      dispatch(setLoading(false));
    });
  }, []);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPo, setSelectedPo] = useState(null);

  console.log(recap);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handlePaymentClick = (id, po) => {
    setSelectedId(id);
    setSelectedPo(po);
    toggleModal();
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
        Header: "Nomor Pembayaran",
        accessor: "no_pembayaran",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "PIC",
        accessor: "pic",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "status",
        disableFilters: true,
        filterable: false,
      },

      {
        Header: "Description",
        accessor: "keterangan",
        disableFilters: true,
        filterable: false,
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
      //         <button onClick={() => handlePaymentClick(cellProps.id_pl, cellProps.no_po)} className="btn btn-sm btn-info">
      //           +
      //         </button>
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
        <>
          <TableContainer
            columns={columns || []}
            data={recap || []}
            isPagination={true}
            isGlobalFilter={true}
            isGlobalSearch={true}
            isCustomPageSize={true}
            isBordered={true}
            customPageSize={10}
            className="custom-header-css table align-middle table-nowrap"
            tableClassName="table-centered align-middle table-nowrap mb-0"
            theadClassName="text-muted table-light"
            SearchPlaceholder="Cari PO..."
          />
        </>
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <ModalAddPayment isOpen={modalIsOpen} toggle={toggleModal} selectedId={selectedId} selectedPo={selectedPo} />
    </React.Fragment>
  );
};

export { RecapTable };
