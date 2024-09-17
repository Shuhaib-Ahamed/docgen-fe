import { Modal } from "antd";
import { MODAL_TYPE } from "../../constants/common";
import SalesContract from "../PDVviews/SalesContract/SalesContract";
import PackingInstrictions from "../PDVviews/PackingInstructions/PackingInstrictions";
import Invoice from "../PDVviews/Invoice/Invoice";
import { useRef } from "react";
import { getOrder } from "@/redux/order/selectors";
import { useSelector } from "react-redux";
import generatePDF, { Margin, Resolution } from "react-to-pdf";

import styles from "./preview.module.less";
import RFP from "../PDVviews/RFPcomponent/RFP";

const options = (filename) => ({
  filename: filename,
  method: "save",
  resolution: Resolution.MEDIUM,
  page: {
    format: "A4",
    margin: Margin.SMALL,
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true,
    },
  },
});

const optionsA3 = (filename) => ({
  filename: filename,
  method: "save",
  resolution: Resolution.MEDIUM,
  page: {
    format: "A3",
    margin: Margin.SMALL,
  },
  canvas: {
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true,
    },
  },
});

const PreviewModal = (props) => {
  const { title, visible, onCancel, type, setVisible, ...rest } = props;
  const invoiceRef = useRef(null);
  const packingRef = useRef(null);
  const salesRef = useRef(null);
  const { importer, exporter, container, shipping, finance, surveys } =
    useSelector(getOrder);

  const onSubmit = () => {
    switch (type) {
      case MODAL_TYPE.SALES:
        generatePDF(salesRef, options("pre-sales.pdf"));
        break;
      case MODAL_TYPE.COMERCIAL:
        generatePDF(invoiceRef, options("pre-invoice.pdf"));
        break;
      case MODAL_TYPE.PACKING:
        generatePDF(packingRef, optionsA3("pre-packing.pdf"));
        break;
      default:
        break;
    }
    onCancel();
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={() => onSubmit()}
      onCancel={onCancel}
      destroyOnClose
      width={
        type === MODAL_TYPE.PACKING
          ? 1200
          : type === MODAL_TYPE.OCR
          ? 500
          : 1000
      }
      {...rest}
    >
      <div className={styles.wrapper}>
        <div className={styles.pdf}>
          {(() => {
            switch (type) {
              case MODAL_TYPE.SALES:
                return (
                  <div className={styles.wrapper}>
                    <div className={styles.pdf} ref={salesRef}>
                      <div className={styles.a4Pdf}>
                        <SalesContract
                          importer={importer}
                          exporter={exporter}
                          container={container}
                          shipping={shipping}
                          finance={finance}
                          surveys={surveys}
                        />
                      </div>
                    </div>
                  </div>
                );

              case MODAL_TYPE.PACKING:
                return (
                  <div className={styles.wrapper}>
                    <div className={styles.pdf} ref={packingRef}>
                      <div className={styles.a3Pdf}>
                        <PackingInstrictions
                          importer={importer}
                          exporter={exporter}
                          container={container}
                          shipping={shipping}
                          finance={finance}
                          surveys={surveys}
                        />
                      </div>
                    </div>
                  </div>
                );

              case MODAL_TYPE.COMERCIAL:
                return (
                  <div className={styles.wrapper}>
                    <div className={styles.pdf} ref={invoiceRef}>
                      <div className={styles.a4Pdf}>
                        <Invoice
                          importer={importer}
                          exporter={exporter}
                          container={container}
                          shipping={shipping}
                          finance={finance}
                          surveys={surveys}
                        />
                      </div>
                    </div>
                  </div>
                );
              case MODAL_TYPE.OCR:
                return (
                  <div className={styles.wrapper}>
                    <RFP
                      importer={importer}
                      exporter={exporter}
                      container={container}
                      shipping={shipping}
                      finance={finance}
                      surveys={surveys}
                    />
                  </div>
                );

              default:
                return <></>;
            }
          })()}
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
