import React, { useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getMasterBarang as onGetMasterBarang,
  getKategoriBarang as onGetKategoriBarang,
  addBarang as onAddbarang,
} from "../../../slices/thunks";

import classnames from "classnames";
import { useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import Select from "react-select";
import { useEffect } from "react";
import { createSelector } from "reselect";

const CreateBarang = () => {
  document.title = "Create Product | PT Tiran";

  const history = useNavigate();
  const dispatch = useDispatch();

  const selectMasterBarangData = createSelector(
    (state) => state.Barang.masterBarang,
    (masterBarang) => masterBarang
  );
  const masterBarang = useSelector(selectMasterBarangData);

  useEffect(() => {
    if (masterBarang && !masterBarang.length) {
      dispatch(onGetMasterBarang());
    }
  }, [dispatch, masterBarang]);

  const selectKategoriBarangData = createSelector(
    (state) => state.Barang.kategoriBarang,
    (kategoriBarang) => kategoriBarang
  );
  const kategoriBarang = useSelector(selectKategoriBarangData);

  useEffect(() => {
    if (kategoriBarang && !kategoriBarang.length) {
      dispatch(onGetKategoriBarang());
    }
  }, [dispatch, kategoriBarang]);

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const [selectedStatus, setselectedStatus] = useState({ value: false });
  function handleSelectStatus(selectedStatus) {
    setselectedStatus(selectedStatus);
  }

  const barangStatus = [
    {
      options: [
        { label: "Punya", value: true },
        { label: "Tidak", value: false },
      ],
    },
  ];

  // const [initialValues, setInitialValues] = useState({
  //   id: "",
  //   part_number: "",
  //   keterangan: "",
  //   qty: "",
  //   price: "",
  //   merktype: "",
  //   desc_barang: "",
  //   id_kategori: "",
  // });

  const validation = useFormik({
    enableReinitialize: true,
    // initialValues,
    initialValues: {
      id: "",
      part_number: "",
      keterangan: "",
      qty: "",
      price: "",
      merktype: "",
      desc_barang: "",
      id_kategori: "",
    },
    validationSchema: Yup.object({
      keterangan: Yup.string().required("Please Enter a Keterangan"),
      qty: Yup.string().required("Please Enter a Barang stock"),
      price: Yup.string().required("Please Enter a Barang price"),
      merktype: Yup.string().required("Please Enter a Barang Type"),
      ...(selectedStatus.value
        ? { id: Yup.string().required("Please Enter an ID") }
        : {
            desc_barang: Yup.string().required("Please Enter a Desc Barang"),
            id_kategori: Yup.string().required("Please Enter an ID Kategori"),
          }),
    }),
    onSubmit: (values) => {
      const newBarang = {
        id: values.id,
        part_number: values.part_number,
        keterangan: values.keterangan,
        qty: values.qty,
        price: values.price,
        merktype: values.merktype,
        desc_barang: values.desc_barang,
        id_kategori: values.id_kategori,
      };
      // console.log(newBarang);
      dispatch(onAddbarang(newBarang));
      history("/create-barang");
      validation.resetForm();
    },
  });

  // useEffect(() => {
  //   setInitialValues({
  //     id: "",
  //     desc_barang: "",
  //     id_kategori: "",
  //   });
  // }, [selectedStatus.value]);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Barang" pageTitle="Master Barang" />

        <Row>
          <Col lg={8}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "1",
                        })}
                        onClick={() => {
                          toggleCustom("1");
                        }}
                      >
                        Master Barang
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "2",
                        })}
                        onClick={() => {
                          toggleCustom("2");
                        }}
                      >
                        Detail Barang
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>

                <CardBody>
                  <TabContent activeTab={customActiveTab}>
                    <TabPane id="addproduct-general-info" tabId="1">
                      {selectedStatus.value ? (
                        <div className="mb-3">
                          <Label htmlFor="choices-publish-status-input" className="form-label">
                            Master Barang
                          </Label>
                          <Input
                            name="id"
                            type="select"
                            className="form-select"
                            id="choices-publish-status-input"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.id || ""}
                          >
                            {masterBarang.map((item, key) => (
                              <React.Fragment key={key}>
                                {
                                  <option value={item.id} key={key}>
                                    {item.desc_barang}
                                  </option>
                                }
                              </React.Fragment>
                            ))}
                          </Input>
                          {validation.touched.id && validation.errors.id ? (
                            <FormFeedback type="invalid">{validation.errors.id}</FormFeedback>
                          ) : null}
                        </div>
                      ) : (
                        <div>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="product-title-input">
                              Description Barang
                            </Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="product-title-input"
                              placeholder="Enter part number"
                              name="desc_barang"
                              value={validation.values.desc_barang || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={validation.errors.desc_barang && validation.touched.desc_barang ? true : false}
                            />
                            {validation.errors.desc_barang && validation.touched.desc_barang ? (
                              <FormFeedback type="invalid">{validation.errors.desc_barang}</FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label htmlFor="choices-publish-status-input" className="form-label">
                              Kategori Barang
                            </Label>
                            <Input
                              name="id_kategori"
                              type="select"
                              className="form-select"
                              id="choices-publish-status-input"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.id_kategori || ""}
                            >
                              {kategoriBarang.map((item, key) => (
                                <React.Fragment key={key}>
                                  {
                                    <option value={item.id} key={key}>
                                      {item.nama_kategori}
                                    </option>
                                  }
                                </React.Fragment>
                              ))}
                            </Input>
                            {validation.touched.id_kategori && validation.errors.id_kategori ? (
                              <FormFeedback type="invalid">{validation.errors.id_kategori}</FormFeedback>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </TabPane>

                    <TabPane id="addproduct-metadata" tabId="2">
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="product-title-input">
                          Part Number
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter part number"
                          name="part_number"
                          value={validation.values.part_number || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.part_number && validation.touched.part_number ? true : false}
                        />
                        {validation.errors.part_number && validation.touched.part_number ? (
                          <FormFeedback type="invalid">{validation.errors.part_number}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="product-title-input">
                          Keterangan
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter keterangan"
                          name="keterangan"
                          value={validation.values.keterangan || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.keterangan && validation.touched.keterangan ? true : false}
                        />
                        {validation.errors.keterangan && validation.touched.keterangan ? (
                          <FormFeedback type="invalid">{validation.errors.keterangan}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="product-title-input">
                          Quantity
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter qty"
                          name="qty"
                          value={validation.values.qty || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.qty && validation.touched.qty ? true : false}
                        />
                        {validation.errors.qty && validation.touched.qty ? (
                          <FormFeedback type="invalid">{validation.errors.qty}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="product-title-input">
                          Price
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter price"
                          name="price"
                          value={validation.values.price || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.price && validation.touched.price ? true : false}
                        />
                        {validation.errors.price && validation.touched.price ? (
                          <FormFeedback type="invalid">{validation.errors.price}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="product-title-input">
                          Merk Type
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter merk type"
                          name="merktype"
                          value={validation.values.merktype || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={validation.errors.merktype && validation.touched.merktype ? true : false}
                        />
                        {validation.errors.merktype && validation.touched.merktype ? (
                          <FormFeedback type="invalid">{validation.errors.merktype}</FormFeedback>
                        ) : null}
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>

              <div className="text-end mb-3">
                <button type="submit" className="btn btn-success w-sm">
                  Submit
                </button>
              </div>
            </Form>
          </Col>

          <Col lg={4}>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Status Barang</h5>
              </CardHeader>
              <CardBody>
                <div>
                  <Label htmlFor="choices-publish-visibility-input" className="form-label">
                    Status Master
                  </Label>
                  <Select
                    value={selectedStatus}
                    onChange={handleSelectStatus}
                    options={barangStatus}
                    name="choices-publish-visibility-input"
                    classNamePrefix="select2-selection form-select"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateBarang;
