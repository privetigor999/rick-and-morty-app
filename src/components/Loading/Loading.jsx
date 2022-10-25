import React from "react";
import { SyncLoader } from "react-spinners";
import styles from "./styles.module.scss";
const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingBlock}>
        <p>Loading</p>
        <SyncLoader color="#ffffff" speedMultiplier={0.8} />
      </div>
    </div>
  );
};

export default Loading;
