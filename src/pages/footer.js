import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.flexWrapperOne}>
        <div className={styles.logo}>
          <img
            alt=""
            className={styles.mapRemovebgPreview2}
            src="https://static.overlay-tech.com/assets/7a1a2f5b-6dd1-4b0f-8314-6b05af3f7880.png"
          />
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
