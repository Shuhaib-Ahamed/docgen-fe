import { Col, DatePicker, Divider, Form, Input, Row } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { getOrder } from "@/redux/order/selectors";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { addContainerDetails } from "@/redux/order/actions";
import styles from "./containerDetails.module.less";

const ContainerDetails = forwardRef((props, ref) => {
  const { isLoading, container } = useSelector(getOrder);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [releaseDate, setReleaseDate] = useState();

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

  const onChange = (date) => {
    setReleaseDate(date);
  };

  const onFinish = (values) => {
    const appendedValues = {
      releaseDate: releaseDate,
      ...values,
    };

    try {
      if (!isEmpty(appendedValues))
        dispatch(addContainerDetails(appendedValues));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isEmpty(container)) {
      form.setFieldsValue({
        releaseNumber: container?.releaseNumber,
        releaseTo: container?.releaseTo,
        fclSize: container?.fclSize,
        fclNo: container?.fclNo,
        releaseFrom: container?.releaseFrom,
      });

      isEmpty(container?.releaseDate)
        ? setReleaseDate(undefined)
        : setReleaseDate(container?.releaseDate);
    }
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      disabled={isLoading}
    >
      <h1 className={styles.subHeading}>Container Details</h1>
      <Divider className={styles.divider} />{" "}
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label="Container Release Number"
            name="releaseNumber"
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
          <Form.Item label="Container Release Date" name="releaseDate">
            <DatePicker className={styles.dateLable} onChange={onChange} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label="Releasing From"
            name="releaseFrom"
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
            label="Releasing To"
            name="releaseTo"
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
        <Col span={12}>
          <Form.Item
            label="FCL Size"
            name="fclSize"
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
            name="fclNo"
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
    </Form>
  );
});

export default ContainerDetails;
