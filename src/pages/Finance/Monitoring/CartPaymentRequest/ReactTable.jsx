import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../../Components/Common/TableContainerReactTable";
import { Input, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { getCartProcurementList as onGetCartProcurementList } from "../../../../slices/thunks";
import { setLoadingCartPaymentRequest as setLoading } from "../../../../slices/finance/reducer";
import { formatRupiah } from "../../../../utils/utils";

const CartPaymentRequestTable = ({ handleCheckboxChange }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
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
          const renderCheckboxes = () => {
            const checkboxes = [];
            row.original.datapadetail.map((key, index) => {
              if (key.flag == 1) {
                checkboxes.push(
                  <Input
                    key={index}
                    className="form-check-input"
                    style={{ marginRight: "5px" }}
                    type="checkbox"
                    disabled={key.flag == 1}
                    checked
                  />
                );
              } else {
                checkboxes.push(
                  <Input
                    key={index}
                    className="form-check-input"
                    style={{ marginRight: "5px" }}
                    type="checkbox"
                    onChange={() => handleCheckboxChange(key)}
                  />
                );
              }
            });
            return checkboxes;
          };

          return <div className="form-check">{renderCheckboxes()}</div>;
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
          data={cartPaymentRequest || []}
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
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { CartPaymentRequestTable };
