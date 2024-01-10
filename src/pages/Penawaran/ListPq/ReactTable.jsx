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

const PaginationTable = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

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
        Header: "Nomor",
        accessor: "datafpb.nomor",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Diajukan ",
        accessor: "datafpb.diajukan_oleh",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Pengajuan",
        accessor: "datafpb.pengajuan",
        disableFilters: true,
        filterable: false,
      },
      {
        Header: "Site",
        accessor: "datafpb.site",
        disableFilters: true,
        filterable: false,
      },
      {
        id: "expander", // Make sure to have a unique ID
        Header: "Actions",
        accessor: "expander", // Accessor is required and is the accessor for the custom filter function
        disableFilters: true,
        filterable: false,
        Cell: ({ row }) => <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? "[ - ]" : "[ + ]"}</span>,
      },
    ],
    []
  );

  // -------------------------------------------

  const SelectPenawaranData = createSelector(
    (state) => state.Penawaran.penawaranPq,
    (penawaranPq) => penawaranPq
  );
  const penawaranPq = useSelector(SelectPenawaranData);
  const loading = useSelector((state) => state.Penawaran.loadingPenawaranPq);

  useEffect(() => {
    dispatch(setLoadingPenawaranPq(true));
    dispatch(onGetPenawaranPq()).then(() => {
      dispatch(setLoadingPenawaranPq(false));
    });
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { expanded },
  } = useTable(
    {
      columns,
      data: penawaranPq || [],
    },
    useExpanded
  );

  // const [checkedRows, setCheckedRows] = useState([]);

  // const handleCheckboxChange = (e, row, fpb) => {
  //   const isChecked = e.target.checked;

  //   setCheckedRows((prevCheckedRows) => {
  //     if (isChecked) {
  //       // Checkbox dicentang, tambahkan objek ke array
  //       return [
  //         ...prevCheckedRows,
  //         {
  //           desc: row.desc,
  //           id: row.id,
  //           id_fpb: row.id_fpb,
  //           page_desc: row.page_desc,
  //           page_image: row.page_image,
  //           part_number: row.part_number,
  //           qty: row.qty,
  //           remarks: row.remarks,
  //           stock: row.stock,
  //           unit: row.unit,

  //           nomor: fpb.nomor,
  //           note: fpb.note,
  //           pengajuan: fpb.pengajuan,
  //           sifat: fpb.sifat,
  //           site: fpb.site,
  //           tujuan: fpb.tujuan,
  //         },
  //       ];
  //     } else {
  //       // Checkbox tidak dicentang, hapus objek dari array berdasarkan id
  //       return prevCheckedRows.filter((item) => item.id !== row.id);
  //     }
  //   });
  // };

  const [checkedRows, setCheckedRows] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState([]);

  useEffect(() => {
    setIsCheckAll(
      penawaranPq.map((value) => ({
        id: value.datafpb.id,
        isChecked: false,
      }))
    );
  }, [penawaranPq]);

  const handleCheckAllChange = (e, row) => {
    const isChecked = e.target.checked;
    setIsCheckAll((prevCheckAll) =>
      prevCheckAll.map((item) => (item.id === row.original.datafpb.id ? { ...item, isChecked } : item))
    );

    if (isChecked) {
      const newCheckedRows = row.original.datafpb.partrequest
        .filter((value) => !value.id_pq)
        .map((value) => ({
          desc: value.desc,
          id: value.id,
          id_fpb: value.id_fpb,
          page_desc: value.page_desc,
          page_image: value.page_image,
          part_number: value.part_number,
          qty: value.qty,
          remarks: value.remarks,
          stock: value.stock,
          unit: value.unit,
          nomor: row.original.datafpb.nomor,
          note: row.original.datafpb.note,
          pengajuan: row.original.datafpb.pengajuan,
          sifat: row.original.datafpb.sifat,
          site: row.original.datafpb.site,
          tujuan: row.original.datafpb.tujuan,
        }));
      setCheckedRows((prevCheckedRows) => [...prevCheckedRows, ...newCheckedRows]);
    } else {
      setCheckedRows((prevCheckedRows) =>
        prevCheckedRows.filter((item) => !row.original.datafpb.partrequest.some((value) => value.id === item.id))
      );
    }
  };

  const handleCheckboxChange = (e, value, fpb) => {
    const isChecked = e.target.checked;

    setCheckedRows((prevCheckedRows) => {
      if (isChecked) {
        return [
          ...prevCheckedRows,
          {
            desc: value.desc,
            id: value.id,
            id_fpb: value.id_fpb,
            page_desc: value.page_desc,
            page_image: value.page_image,
            part_number: value.part_number,
            qty: value.qty,
            remarks: value.remarks,
            stock: value.stock,
            unit: value.unit,
            nomor: fpb.nomor,
            note: fpb.note,
            pengajuan: fpb.pengajuan,
            sifat: fpb.sifat,
            site: fpb.site,
            tujuan: fpb.tujuan,
          },
        ];
      } else {
        return prevCheckedRows.filter((item) => item.id !== value.id);
      }
    });
  };

  const renderExpandedRowContent = (row) => {
    return (
      <Table className="table-borderless table-nowrap mb-0" style={{ backgroundColor: "rgba(33, 37, 41, 0.04)" }}>
        <thead>
          <tr>
            <th style={{ fontWeight: 450, width: "50px" }}>No.</th>
            <th style={{ fontWeight: 450 }}>Part Number</th>
            <th style={{ fontWeight: 450 }}>Deskripsi / Nama Barang</th>
            <th style={{ fontWeight: 450 }}>Merk / Type</th>
            <th style={{ fontWeight: 450 }}>Qty</th>
            <th style={{ fontWeight: 450 }}>Keterangan</th>
            <th style={{ fontWeight: 450 }}>Stock</th>
            <th style={{ fontWeight: 450 }}>
              <input
                id="check-all"
                className="form-check-input"
                type="checkbox"
                checked={isCheckAll[row.id].isChecked}
                onChange={(e) => handleCheckAllChange(e, row)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {row.original.datafpb.partrequest.map((value, index) => (
            <tr key={value.id} className="product">
              <td scope="row" className="product-id">
                {index + 1}
              </td>
              <td className="text-start" style={{ fontSize: "12px" }}>
                <span>{value.part_number}</span>
              </td>
              <td className="text-start" style={{ fontSize: "12px" }}>
                <span>{value.desc}</span>
              </td>
              <td className="text-start" style={{ fontSize: "12px" }}>
                <span>{value.unit}</span>
              </td>
              <td className="text-start" style={{ fontSize: "12px" }}>
                <span>{value.qty}</span>
              </td>
              <td className="text-start" style={{ fontSize: "12px" }}>
                <span>{value.page_desc}</span>
              </td>
              <td className="text-start" style={{ fontSize: "12px" }}>
                <span>{value.stock}</span>
              </td>
              <td className="text-start">
                {!value.id_pq && (
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={value.id}
                    // checked={checkedRows.some((item) => item.id === value.id)}
                    // onChange={(e) => handleCheckboxChange(e, value, row.original.datafpb)}

                    checked={checkedRows.some((item) => item.id === value.id)}
                    onChange={(e) => handleCheckboxChange(e, value, row.original.datafpb)}
                  />
                )}
                {value.id_pq ? <Input className="form-check-input" type="checkbox" value checked disabled /> : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  // ----------------------------------------------

  const handleClickCreate = () => {
    if (checkedRows.length == 0) {
      return alert("Tidak terdapat data yang di check");
    }

    const groupedData = checkedRows.reduce((result, item) => {
      const { id_fpb, ...rest } = item;
      if (!result[id_fpb]) {
        result[id_fpb] = { id_fpb, detail: [] };
      }
      result[id_fpb].detail.push(rest);
      return result;
    }, {});
    const groupedArray = Object.values(groupedData);

    dispatch(clearDetailPenawaranPq());
    dispatch(setLoadingDetailPenawaranPq(true));
    dispatch(detailPenawaranPq(groupedArray));
    dispatch(setLoadingDetailPenawaranPq(false));
    history("/penawaran-pq/detail");

    // dispatch(detailPenawaranPq(groupedArray)).then(() => {
    //   dispatch(setLoadingDetailPenawaranPq(false));
    //   history("/penawaran-pq/detail");
    // });
  };

  return (
    <React.Fragment>
      {!loading ? (
        <>
          <TableContainer
            columns={columns || []}
            data={penawaranPq || []}
            isPagination={true}
            isGlobalFilter={true}
            isGlobalSearch={true}
            isCustomPageSize={true}
            isBordered={true}
            customPageSize={10}
            className="custom-header-css table align-middle table-nowrap"
            tableClassName="table-centered align-middle table-nowrap mb-0"
            theadClassName="text-muted table-light"
            SearchPlaceholder="Cari FPB..."
            renderExpandedRowContent={renderExpandedRowContent}
          />
          <Button color="primary" onClick={handleClickCreate}>
            Create +{" "}
          </Button>
        </>
      ) : (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
    </React.Fragment>
  );
};

export { PaginationTable };
