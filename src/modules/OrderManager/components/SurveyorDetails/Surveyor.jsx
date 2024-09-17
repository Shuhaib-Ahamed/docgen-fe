import React, { useRef, useState } from "react";
import PackingListForm from "@/modules/OrderManager/components/SurveyorDetails/components/SurveyorDetails/PackingListForm";
import PreviewModal from "../PreviewModal/PreviewModal";
import styles from "./surveyor.module.less";

const Surveyor = ({ setCurrentStep, onClose, isModalOpen }) => {
  const surveyorFormRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState("");

  const handleOpenModal = (type) => {
    setPreviewType(type);
    setShowPreview(true);
  };
  return (
    <div className={styles.formContainer}>
      <div className={styles.subContainer}>
        <h2 className={styles.heading}>Surveyor Details</h2>
        <PackingListForm
          setCurrentStep={setCurrentStep}
          onClose={onClose}
          ref={surveyorFormRef}
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

export default Surveyor;
