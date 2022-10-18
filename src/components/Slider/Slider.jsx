import React from "react";
import slider1 from "./../../images/slider/slider1.png";
import styles from "./styles.module.scss";
const Slider = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sliderBlock}>
        <img src={slider1} alt="slider" className={styles.sliderImg} />
      </div>
    </div>
  );
};

export default Slider;
