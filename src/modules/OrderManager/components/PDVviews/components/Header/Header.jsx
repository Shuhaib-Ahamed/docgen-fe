import React from "react";
import styles from "./header.module.less";


import LogoImage from "@/assets/images/logo.png";
import BG from "@/assets/images/green-bg.png";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerWrapper}>
        <img src={BG} className={styles.bgImage} />
        <img className={styles.logoImage} src={LogoImage} alt="employer logo" />
      </div>
    </div>
  );
};

export default Header;
