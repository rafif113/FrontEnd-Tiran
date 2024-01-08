import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useRowSelect,
} from "react-table";

import { Table, Row, Col, Button, Input, CardBody } from "reactstrap";
import { DefaultColumnFilter } from "./filters";
import { Link } from "react-router-dom";

// Define a default UI for filtering
function GlobalFilter({ globalFilter, setGlobalFilter, SearchPlaceholder }) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <React.Fragment>
      {/* <CardBody> */}
      <form>
        <Row className="g-3">
          <Col>
            <div className="search-box me-2 mb-2 d-inline-block col-12">
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                id="search-bar-0"
                type="text"
                className="form-control search /"
                placeholder={SearchPlaceholder}
                value={value || ""}
              />
              <i className="bx bx-search-alt search-icon"></i>
            </div>
          </Col>
        </Row>
      </form>
      {/* </CardBody> */}
    </React.Fragment>
  );
}

const TableContainer = ({
  columns,
  data,
  isPagination,
  isGlobalSearch,
  isGlobalFilter,
  customPageSize,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
  toggleRowExpanded,
  renderExpandedRowContent, // Tambahkan prop untuk konten ekspansi baris
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, expanded },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        selectedRowIds: 0,
        sortBy: [
          {
            id: "no",
            asc: false,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? column.isSortedDesc ? <span>&#8593;</span> : <span>&#8595;</span> : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const maxDisplayedPages = 5; // Set the maximum number of pages to display in pagination

  return (
    <Fragment>
      {(isGlobalSearch || isGlobalFilter) && (
        <Row className="mb-3 justify-content-between">
          {isGlobalSearch && (
            <Col md={2}>
              <select className="form-select" value={pageSize} onChange={onChangeInSelect}>
                {[10, 20, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </Col>
          )}
          {isGlobalFilter && (
            <Col md={4}>
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
                SearchPlaceholder={SearchPlaceholder}
              />
            </Col>
          )}
        </Row>
      )}

      <div className={`table-responsive ${tableClass}`}>
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr className={trClass} key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} className={thClass} {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                    {/* <Filter column={column} /> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={columns.length}>{renderExpandedRowContent && renderExpandedRowContent(row)}</td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      {isPagination && (
        <Row className="align-items-center g-3 text-center text-sm-start mb-3">
          <div className="col-sm">
            <div className="text-muted">
              Showing<span className="fw-semibold ms-1">{page.length}</span> of <span className="fw-semibold">{data.length}</span>{" "}
              Results
            </div>
          </div>
          <div className="col-sm-auto">
            <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
              <li className={!canPreviousPage ? "page-item disabled" : "page-item"}>
                <Link to="#" className="page-link" onClick={previousPage}>
                  Previous
                </Link>
              </li>
              {pageOptions.slice(pageIndex, pageIndex + maxDisplayedPages).map((item, key) => (
                <React.Fragment key={key}>
                  <li className="page-item">
                    <Link to="#" className={pageIndex === item ? "page-link active" : "page-link"} onClick={() => gotoPage(item)}>
                      {item + 1}
                    </Link>
                  </li>
                </React.Fragment>
              ))}
              <li className={!canNextPage ? "page-item disabled" : "page-item"}>
                <Link to="#" className="page-link" onClick={nextPage}>
                  Next
                </Link>
              </li>
            </ul>
          </div>
        </Row>
      )}
    </Fragment>
  );
};

TableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TableContainer;
