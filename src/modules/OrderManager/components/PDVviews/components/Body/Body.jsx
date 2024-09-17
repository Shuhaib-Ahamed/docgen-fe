import React from "react";

import styles from "./body.module.less";

const Body = ({ children }) => {
  return <div className={styles.bodyContainer}>{children}</div>;
};

export default Body;
