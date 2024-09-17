import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";

const RFP = () => {
  const [ocrText, setOcrText] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState(null);
  const worker = createWorker({
    logger: (m) => {
      // console.log(m);
      setProgress((m.progress * 100).toFixed(2));
    },
  });
  const convertImageToText = async () => {
    if (!imageData) return;
    await worker?.load();
    await worker?.loadLanguage("eng");
    await worker?.initialize("eng");
    const {
      data: { text },
    } = await worker?.recognize(imageData);
    setOcrText(text);
  };

  useEffect(() => {
    convertImageToText();
  }, [imageData]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }
  return (
    <div>
      <div>Unavailable</div>
    </div>
  );
};

export default RFP;
