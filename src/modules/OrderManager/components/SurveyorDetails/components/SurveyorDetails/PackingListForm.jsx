import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  InputNumber,
} from "antd";
import { expDetails } from "@/modules/OrderManager/components/ExporterDetails/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "@/redux/order/selectors";
import { countries } from "@/utils/countries";
import DatePicker from "react-date-picker";
import {
  addExporterDetails,
  addFinanceDetails,
  addShippmentDetails,
  addSurveyDetails,
  createOrder,
  updateOrder,
  updateOrderImporter,
  addContainerDetails,
} from "@/redux/order/actions";
const { Option } = Select;

import CustomSelect from "@/components/CustomSelect/CustomSelect";
import {
  MODAL_TYPE,
  SELECT_TYPE,
} from "@/modules/OrderManager/constants/common";
import { selectAuth } from "@/redux/auth/selectors";
import styles from "./surveyorForm.module.less";
import TextArea from "antd/lib/input/TextArea";

const PackingListForm = ({
  setCurrentStep,
  onClose,
  isModalOpen,
  handleOpenModal,
}) => {
  const {
    _id,
    importer,
    exporter,
    container,
    shipping,
    finance,
    surveys,
    isLoading,
  } = useSelector(getOrder);
  const { current: currentUser, userLoading } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOnClose = () => {
    if (isLoading) return;
    const orderObject = {
      _id: _id ?? null,
      status: "DRAFT",
      importer: importer,
      exporter: exporter,
      container: container,
      shipping: shipping,
      finance: finance,
      surveys: surveys,
    };

    if (orderObject._id) {
      dispatch(updateOrder(orderObject));
    } else {
      dispatch(createOrder(orderObject));
    }
    onClose();
  };

  const onFinish = (values) => {
    dispatchOnChange(values);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        // If validation is successful, submit the form and move to the next step
        form.submit();
        setCurrentStep(4);

        // Scroll to the top of the drawer
        document?.getElementsByClassName("ant-drawer-body")[0]?.scrollTo(0, 0);
      })
      .catch((errorInfo) => {
        // Handle validation failure (if needed)
        console.error("Validation failed:", errorInfo);
      });
  };

  const onHandlePreview = () => {
    form
      .validateFields()
      .then(() => {
        // If validation is successful, submit the form and move to the next step
        form.submit();
        handleOpenModal(MODAL_TYPE.PACKING);
      })
      .catch((errorInfo) => {
        // Handle validation failure (if needed)
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleBack = () => {
    setCurrentStep(1);
    document?.getElementsByClassName("ant-drawer-body")[0]?.scrollTo(0, 0);
    form.submit();
  };

  const setSurveyor = (id) => {
    const foundSurveyor = currentUser?.surveyors?.find(
      (item) => item?.id === id
    );
    if (foundSurveyor) {
      dispatch(addSurveyDetails({ ...foundSurveyor }));
      form.setFieldsValue({
        surveys: { ...foundSurveyor },
      });
    }
  };

  const onClear = () => {
    dispatch(addSurveyDetails(undefined));
    form.setFieldsValue({
      surveys: undefined,
    });
  };

  const setShipper = (id) => {
    const foundShipper = currentUser?.shippers?.find((item) => item?.id === id);

    if (foundShipper) {
      dispatch(addShippmentDetails({ ...shipping, ...foundShipper }));
      form.setFieldsValue({
        shipping: { ...foundShipper },
      });
    }
  };

  const onClearShipping = () => {
    const emptyValues = {
      shippingCompany: "",
      shippingContactName: "",
      shippingContactNo: "",
    };
    dispatch(addShippmentDetails({ ...shipping, ...emptyValues }));
    form.setFieldsValue({
      shipping: emptyValues,
    });
  };

  const dispatchOnChange = (changedValues) => {
    if (changedValues.exporter) {
      dispatch(addExporterDetails({ ...exporter, ...changedValues.exporter }));
    }
    if (changedValues.importer) {
      dispatch(updateOrderImporter({ ...importer, ...changedValues.importer }));
    }
    if (changedValues.finance) {
      dispatch(addFinanceDetails({ ...finance, ...changedValues.finance }));
    }
    if (changedValues.shipping) {
      dispatch(addShippmentDetails({ ...shipping, ...changedValues.shipping }));
    }
    if (changedValues.surveys) {
      dispatch(addSurveyDetails({ ...surveys, ...changedValues.surveys }));
    }
    if (changedValues.container) {
      dispatch(
        addContainerDetails({ ...container, ...changedValues.container })
      );
    }
  };

  const validateEmail = (rule, value, callback) => {
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
    if (!emailRegex.test(value)) {
      callback("Invalid email address");
    } else {
      callback();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
      form.setFieldsValue({
        exporter: { ...expDetails, ...exporter },
        importer: { ...importer },
        finance: { ...finance },
        shipping: { ...shipping },
        surveys: { ...surveys },
        container: { ...container },
      });
    }
  }, [
    isModalOpen,
    exporter,
    importer?.id,
    finance,
    shipping,
    surveys?.id,
    container,
  ]);

  return (
    <Fragment>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={isLoading}
        initialValues={{
          exporter: { ...expDetails, ...exporter },
          importer: { ...importer },
          finance: { ...finance },
          shipping: { ...shipping },
          surveys: { ...surveys },
          container: { ...container },
        }}
      >
        {/* Exporter Details Section */}
        <section className={styles.section}>
          <h3 className={styles.subHeading}>Exporter Details</h3>
          <Row gutter={32}>
            <Col span={18}>
              <Form.Item
                label="Company Name"
                name={["exporter", "companyName"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Sales Contract ID"
                name={["exporter", "salesContractId"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Name"
                name={["exporter", "attendee"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item
                label="Address No"
                name={["exporter", "addressNo"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Street Address"
                name={["exporter", "address"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Country"
                name={["exporter", "country"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Country"
                  className={styles.dateLable}
                >
                  {countries.map((item, index) => (
                    <Option
                      key={index}
                      label={item.name.common}
                      value={item.name.common}
                    >
                      <div className={styles.option}>
                        <img
                          className={styles.optionFlag}
                          src={item.flags.svg}
                        />
                        {item.name.common}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name={["exporter", "email"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="email" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name={["exporter", "phoneNo"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
        </section>

        {/* Packer Details Section */}
        <section className={styles.section}>
          <h3 className={styles.subHeading}>Packer Details</h3>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="Select Packer"
                name={["finance", "packer"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <CustomSelect
                  defaultValue={finance?.packer}
                  placeholder="Packer Name"
                  items={currentUser.packers ?? []}
                  renderType={SELECT_TYPE.PACKER}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Packer Sample"
                name={["finance", "sample"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <CustomSelect
                  defaultValue={finance?.sample}
                  placeholder="Sample Description for the Surveyor"
                  items={currentUser.samples ?? []}
                  renderType={SELECT_TYPE.SAMPLE}
                />
              </Form.Item>
            </Col>
          </Row>
        </section>

        <section className={styles.section}>
          <h3 className={styles.subHeading}>Shipping Company Information</h3>
          <Row gutter={32}>
            <Col span={18}>
              <Form.Item
                label="Select Shipping Company"
                name={["shipping", "shippingCompany"]}
              >
                <Select
                  defaultValue={shipping?.shippingCompany ?? ""}
                  placeholder="Select Shipping Company"
                  allowClear
                  showSearch
                  onClear={() => onClearShipping()}
                  onChange={(value) => setShipper(value)}
                  loading={userLoading}
                >
                  {currentUser?.shippers?.map((item) => (
                    <Option key={item?.shippingCompany} value={item?.id}>
                      <Row justify="space-between">
                        <Col>{item?.shippingCompany}</Col>
                      </Row>
                    </Option>
                  ))}
                </Select>{" "}
              </Form.Item>
            </Col>{" "}
            <Col span={6}>
              <Form.Item
                name={["shipping", "bookingRef"]}
                label="Booking Reference"
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={8}>
              <Form.Item
                label="Shipping Company"
                name={["shipping", "shippingCompany"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>{" "}
            <Col span={8}>
              <Form.Item
                label="Contact Name"
                name={["shipping", "shippingContactName"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Contact To"
                name={["shipping", "shippingContactNo"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={18}>
              <Form.Item label="Vessel Name" name={["shipping", "vesselName"]}>
                <Input autoComplete="off" />
              </Form.Item>
            </Col>{" "}
            <Col span={6}>
              <Form.Item
                label="Departure Date"
                name={["shipping", "departureDate"]}
              >
                <DatePicker
                  className={styles.dateLable}
                  defaultValue={shipping?.departureDate}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={6}>
              <Form.Item label="Voyage Number" name={["shipping", "voyageNo"]}>
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                label="Transshipment"
                name={["shipping", "transshipment"]}
              >
                <Select
                  defaultValue={shipping?.transCountry}
                  showSearch
                  allowClear
                  placeholder="Transshipment Port Country"
                  className={styles.dateLable}
                >
                  {countries?.map((item, index) => (
                    <Option
                      key={index}
                      label={item.name.common}
                      value={item.name.common}
                    >
                      <div className={styles.option}>
                        <img
                          className={styles.optionFlag}
                          src={item.flags.svg}
                        />
                        {item?.name?.common}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.highlightContainer}>
            <Row gutter={32}>
              <Col span={18}>
                <Form.Item
                  label="Loading Port"
                  name={["shipping", "portLoadName"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Loading Country"
                  name={["shipping", "portLoadCountry"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    defaultValue={shipping?.portLoadCountry}
                    showSearch
                    allowClear
                    placeholder="Loading Port Country"
                    className={styles.dateLable}
                  >
                    {countries?.map((item, index) => (
                      <Option
                        key={index}
                        label={item.name.common}
                        value={item.name.common}
                      >
                        <div className={styles.option}>
                          <img
                            className={styles.optionFlag}
                            src={item.flags.svg}
                          />
                          {item?.name?.common}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className={styles.highlightContainer}>
            <Row gutter={32}>
              <Col span={18}>
                <Form.Item
                  label="Discharging Port"
                  name={["shipping", "portDischarge"]}
                  allowClear
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Discharging Country"
                  name={["shiping", "portDischargeCountry"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    defaultValue={shipping?.portDischargeCountry}
                    showSearch
                    placeholder="Discharge Port Country"
                    className={styles.dateLable}
                  >
                    {countries.map((item, index) => (
                      <Option
                        key={index}
                        label={item.name.common}
                        value={item.name.common}
                      >
                        <div className={styles.option}>
                          <img
                            className={styles.optionFlag}
                            src={item.flags.svg}
                          />
                          {item?.name.common}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>{" "}
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="FCL Size"
                name={["finance", "fclSize"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>{" "}
            <Col span={12}>
              <Form.Item
                label="Number of FCL"
                name={["finance", "fclNo"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>{" "}
          </Row>
          <h3 className={styles.subHeading}>Containers</h3>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="Container Release Number"
                name={["container", "releaseNumber"]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>{" "}
            <Col span={12}>
              <Form.Item
                label="Container Release Date"
                name={["container", "releaseDate"]}
              >
                <DatePicker
                  defaultValue={container?.releaseDate}
                  className={styles.dateLable}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="Releasing From"
                name={["container", "releaseFrom"]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>{" "}
            <Col span={12}>
              <Form.Item label="Releasing To" name={["container", "releaseTo"]}>
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
        </section>

        {/* Product Details Section */}
        <section className={styles.section}>
          <h3 className={styles.subHeading}>Product Details</h3>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="Commodity"
                name={["finance", "name"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <CustomSelect
                  placeholder="Name of the Good"
                  items={currentUser.goods ?? []}
                  renderType={SELECT_TYPE.GOOD}
                  defaultValue={finance?.name}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Specification / Grade"
                name={["finance", "specification"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <CustomSelect
                  placeholder="Specification Name"
                  items={currentUser.specifications ?? []}
                  renderType={SELECT_TYPE.SPEC}
                  defaultValue={finance?.specification}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.highlightContainer}>
            <Row gutter={32}>
              <Col span={18}>
                <Form.Item
                  label="Loading Port"
                  name={["shipping", "portLoadName"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Loading Country"
                  name={["shipping", "portLoadCountry"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Loading Port Country"
                    className={styles.dateLable}
                  >
                    {countries?.map((item, index) => (
                      <Option
                        key={index}
                        label={item.name.common}
                        value={item.name.common}
                      >
                        <div className={styles.option}>
                          <img
                            className={styles.optionFlag}
                            src={item.flags.svg}
                          />
                          {item?.name?.common}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className={styles.highlightContainer}>
            <Row gutter={32}>
              <Col span={18}>
                <Form.Item
                  label="Discharging Port"
                  name={["shipping", "portDischarge"]}
                  allowClear
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Discharging Country"
                  name={["shipping", "portDischargeCountry"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Discharge Port Country"
                    className={styles.dateLable}
                  >
                    {countries.map((item, index) => (
                      <Option
                        key={index}
                        label={item.name.common}
                        value={item.name.common}
                      >
                        <div className={styles.option}>
                          <img
                            className={styles.optionFlag}
                            src={item.flags.svg}
                          />
                          {item?.name.common}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col span={12}>
                <Form.Item
                  label="Departure Date"
                  name={["shipping", "departureDate"]}
                >
                  <DatePicker className={styles.dateLable} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Total"
                  name={["finance", "total"]}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    className={styles.dateLable}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <Row gutter={32}>
            <Col span={24}>
              <Form.Item
                label="Description of the goods"
                name={["finance", "description"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <TextArea autoComplete="off" />
              </Form.Item>
            </Col>{" "}
          </Row>{" "}
        </section>

        {/* Surveyor Details Section */}
        <section className={styles.section}>
          <h3 className={styles.subHeading}>Surveyor Details</h3>
          <Row>
            <Col span={24}>
              <Form.Item label="Select Surveyor" name={["finance", "packer"]}>
                <Select
                  defaultValue={surveys?.companyName ?? ""}
                  placeholder="Select Surveyor"
                  allowClear
                  showSearch
                  onClear={onClear}
                  loading={userLoading}
                  onChange={(value) => setSurveyor(value)}
                >
                  {currentUser?.surveyors?.map((item) => (
                    <Option key={item?.companyName} value={item?.id}>
                      <Row justify="space-between">
                        <Col>{item?.companyName}</Col>
                      </Row>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={24}>
              <Form.Item
                label="Company Name"
                name={["surveys", "companyName"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>{" "}
          </Row>{" "}
          <Row gutter={32}>
            <Col span={4}>
              <Form.Item
                label="Address No"
                name={["surveys", "addressNo"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label="Street Address"
                name={["surveys", "address"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Country"
                name={["surveys", "country"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Country"
                  className={styles.dateLable}
                >
                  {countries.map((item, index) => (
                    <Option
                      key={index}
                      label={item.name.common}
                      value={item.name.common}
                    >
                      <div className={styles.option}>
                        <img
                          className={styles.optionFlag}
                          src={item.flags.svg}
                        />
                        {item.name.common}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>{" "}
            </Col>
          </Row>{" "}
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="Contact Name"
                name={["surveys", "contactName"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>{" "}
            <Col span={12}>
              <Form.Item
                label="Email"
                name={["surveys", "contactEmail"]}
                rules={[
                  { required: true, message: "Email is required" },
                  { validator: validateEmail },
                ]}
              >
                <Input type="email" autoComplete="off" />
              </Form.Item>
            </Col>{" "}
          </Row>{" "}
        </section>

        <div className={styles.buttonWarpper}>
          <Button
            className={styles.singleProgressButton}
            onClick={onHandlePreview}
          >
            <p className={styles.heading}>Packing List</p>
            <p className={styles.subText}>View PDF</p>
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <Divider />
          <Row gutter={24}>
            <Col span={4}>
              <Button
                className={styles.nextButton}
                onClick={() => handleBack()}
              >
                Back
              </Button>
            </Col>
            <Col span={20}>
              <Button
                loading={isLoading}
                disabled={isLoading}
                type="primary"
                onClick={handleSubmit}
                className={styles.nextButton}
              >
                Next
              </Button>
            </Col>
          </Row>
          <Button disabled={isLoading} onClick={() => handleOnClose()}>
            Save as draft & close
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default PackingListForm;
