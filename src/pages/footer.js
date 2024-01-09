import React from "react";
import styles from "./footer.module.scss";
import logo from "../images/MAP_logo.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.flexWrapperOne}>
        <div className={styles.logo}>
          <img alt="" className={styles.mapRemovebgPreview2} src={logo} />
          <p className={styles.mapMju}>MAP MJU</p>
        </div>
        <div className={styles.links}>
          <p className={styles.helpDesk}>Help desk</p>
          <p className={styles.community}>Community</p>
          <p className={styles.resources}>Resources</p>
        </div>
      </div>
      <div className={styles.rectangle} />
      <p className={styles.map2023MjuComputerEnginnering}>
        MAP, 2023. MJU computer enginnering
      </p>
    </div>
  );
};

export default Footer;
