import { Col, Divider, Form, Input, InputNumber, Modal, Row, Select } from "antd";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { isEmpty } from "lodash";
import styles from "./financialDetails.module.less";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { addFinanceDetails } from "@/redux/order/actions";
import { getOrder } from "@/redux/order/selectors";

const FinancialDetails = forwardRef((props, ref) => {
  const { isLoading, finance } = useSelector(getOrder);
  const [openAddItemModal, setOpenAddItemModal] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    () => {
      return {
        submitForm() {
          form?.submit();
        },
      };
    },
    []
  );

  const onFinish = (values) => {
    try {
      if (!isEmpty(values)) dispatch(addFinanceDetails(values));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTotalCount = () => {
    const qty = form.getFieldValue("quantity");
    const usdValue = form.getFieldValue("usdMT");

    if (qty && usdValue) {
      const total = (qty * usdValue).toFixed(2);
      form.setFieldValue("total", total);
    } else {
      form.setFieldValue("total", undefined);
    }
  };

  useEffect(() => {
    if (!isEmpty(finance)) {
      form.setFieldsValue({
        name: finance?.name,
        specification: finance?.specification,
        quantity: finance?.quantity,
        usdMT: finance?.usdMT,
        total: finance?.total,
        description: finance?.description,
        edn: finance?.edn,
        rfp: finance?.rfp,
        invoiceNo: finance?.invoiceNo,
        piNo: finance?.piNo,
        refNo: finance?.refNo,
        frieghtCost: finance?.frieghtCost,
        insuaranceCost: finance?.insuaranceCost,
        totalCost: finance?.totalCost,
      });
    }
  }, []);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={isLoading}
      >
        <h1 className={styles.subHeading}>Order Details</h1>
        <Divider className={styles.divider} />
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="Select Export Item"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Name of the Good"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: "100%" }}
                options={filteredOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Specification / Grade"
              name="specification"
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
          <Col span={8}>
            <Form.Item
              label="Quantity (MT)"
              name="quantity"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                type="number"
                onChange={handleTotalCount}
                autoComplete="off"
              />
            </Form.Item>
          </Col>{" "}
          <Col span={8}>
            <Form.Item
              label="USD Per MT"
              name="usdMT"
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
                onChange={handleTotalCount}
              />
            </Form.Item>
          </Col>{" "}
          <Col span={8}>
            <Form.Item
              label="Total Amount"
              name="total"
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
          </Col>{" "}
        </Row>
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item
              label="Description of the goods"
              name="description"
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
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item
              label="EDN Number"
              name="edn"
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
              label="RFP Number"
              name="rfp"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="number" autoComplete="off" />
            </Form.Item>
          </Col>{" "}
        </Row>{" "}
        <Row gutter={32}>
          <Col span={8}>
            <Form.Item
              label="Invoice Number"
              name="invoiceNo"
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
              label="PI Number"
              name="piNo"
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
              label="Reference Number"
              name="refNo"
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
          <Col span={8}>
            <Form.Item
              label="Frieght Cost"
              name="frieghtCost"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                className={styles.dateLable}
                autoComplete="off"
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Insuarance Cost"
              name="insuaranceCost"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                className={styles.dateLable}
                autoComplete="off"
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>{" "}
          <Col span={8}>
            <Form.Item
              label="Total Cost"
              name="totalCost"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                autoComplete="off"
                className={styles.dateLable}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>{" "}
        </Row>{" "}
      </Form>
      <Modal
        title="Add New Export Item"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          disabled={isLoading}
        >
          <h1 className={styles.subHeading}>Order Details</h1>
          <Divider className={styles.divider} />
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="Name of the Good"
                name="name"
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
        </Form>
      </Modal>
    </>
  );
});

export default FinancialDetails;
