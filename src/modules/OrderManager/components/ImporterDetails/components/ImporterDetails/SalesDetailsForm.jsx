import React, { Fragment, useEffect } from "react";
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
  createOrder,
  updateOrder,
  updateOrderImporter,
} from "@/redux/order/actions";
const { Option } = Select;

import CustomSelect from "@/components/CustomSelect/CustomSelect";
import {
  MODAL_TYPE,
  SELECT_TYPE,
} from "@/modules/OrderManager/constants/common";
import { selectAuth } from "@/redux/auth/selectors";
import styles from "./salesDetailsForm.module.less";

const SalesDetailsForm = ({
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

  const setImporter = (id) => {
    const foundImporter = currentUser?.importers?.find(
      (item) => item?.id === id
    );

    if (foundImporter) {
      dispatch(updateOrderImporter({ ...foundImporter }));
      form.setFieldsValue({
        importer: { ...foundImporter },
      });
    }
  };

  const onClear = () => {
    dispatch(updateOrderImporter({}));
    form.setFieldsValue({
      importer: undefined,
    });
  };

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

  const onHandlePreview = () => {
    form
      .validateFields()
      .then(() => {
        // If validation is successful, submit the form and move to the next step
        form.submit();
        handleOpenModal(MODAL_TYPE.SALES);
      })
      .catch((errorInfo) => {
        // Handle validation failure (if needed)
        console.error("Validation failed:", errorInfo);
      });
  };

  const onHandleSubmit = () => {
    form
      .validateFields() // Validate all form fields
      .then(() => {
        // If validation is successful
        form.submit(); // Submit the form
        setCurrentStep(2); // Move to the next step
        // Scroll to the top of the drawer
        document?.getElementsByClassName("ant-drawer-body")[0]?.scrollTo(0, 0);
      })
      .catch((errorInfo) => {
        // Handle validation errors if needed (optional)
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleBack = () => {
    form.submit();
    setCurrentStep(0);
    document?.getElementsByClassName("ant-drawer-body")[0]?.scrollTo(0, 0);
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
  };

  useEffect(() => {
    if (isModalOpen) {
      form.resetFields();
      form.setFieldsValue({
        exporter: { ...expDetails, ...exporter },
        importer: { ...importer },
        finance: { ...finance },
        shipping: { ...shipping },
      });
    }
  }, [isModalOpen, exporter, importer?.id, finance, shipping]);

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
        }}
      >
        {/* Seller Details Section */}
        <section className={styles.section}>
          <h3 className={styles.subHeading}>Seller Details</h3>
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

        {/* Buyer Details Section */}
        <section className={styles.section}>
          <h3 className={styles.subHeading}>Buyer Details</h3>
          <Row>
            <Col span={24}>
              <Form.Item label="Select Buyer" name="selectedImporter">
                <Select
                  defaultValue={importer?.companyName ?? ""}
                  placeholder="Select Buyer"
                  allowClear
                  showSearch
                  onClear={onClear}
                  loading={userLoading}
                  onChange={(value) => setImporter(value)}
                >
                  {currentUser?.importers?.map((item) => (
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
                name={["importer", "companyName"]}
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
                name={["importer", "addressNo"]}
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
                name={["importer", "address"]}
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
                name={["importer", "country"]}
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
                  defaultValue={finance.name}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
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
                  defaultValue={finance.specification}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Quantity (MT)"
                name={["finance", "quantity"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="number" autoComplete="off" />
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
                  label="USD Per MT"
                  name={["finance", "usdMT"]}
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
        </section>
        <div className={styles.buttonWarpper}>
          <Button
            className={styles.singleProgressButton}
            onClick={onHandlePreview}
          >
            <p className={styles.heading}>Sales Contract</p>
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
                onClick={onHandleSubmit}
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

export default SalesDetailsForm;
