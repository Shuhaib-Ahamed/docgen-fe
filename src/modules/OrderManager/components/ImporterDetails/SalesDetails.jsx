import React, { useRef, useState } from "react";
import SalesDetailsForm from "@/modules/OrderManager/components/ImporterDetails/components/ImporterDetails/SalesDetailsForm";
import PreviewModal from "../PreviewModal/PreviewModal";

import styles from "./salesDetails.module.less";

const SalesDetails = ({ setCurrentStep, onClose, isModalOpen }) => {
  const importerFormRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState("");

  const handleOpenModal = (type) => {
    setPreviewType(type);
    setShowPreview(true);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Sales Details</h2>
        <SalesDetailsForm
          setCurrentStep={setCurrentStep}
          onClose={onClose}
          ref={importerFormRef}
          isModalOpen={isModalOpen}
          handleOpenModal={handleOpenModal}
        />
      </div>

      <PreviewModal
        visible={showPreview}
        setVisible={setShowPreview}
        type={previewType}
        title={"Sales Preview"}
        onCancel={() => setShowPreview(false)}
        centered
        okText={"Download PDF"}
      />
    </div>
  );
};

export default SalesDetails;
