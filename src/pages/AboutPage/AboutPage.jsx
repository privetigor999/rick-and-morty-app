import React from "react";
import styles from "./styles.module.scss";
import aboutJpeg from "../../images/about.jpeg";
const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.aboutBlock}>
        <img className={styles.image} src={aboutJpeg} />
        <div className={styles.myInfoBlock}>
          <p className={styles.infoItem}>
            Created by:{" "}
            <a
              className={styles.infoItemSpan}
              target="_blank"
              href="https://privetigor999.github.io/portfolio-app/"
            >
              Igor Ershov
            </a>
          </p>
          <p className={styles.infoItem}>
            Tools:
            <a
              className={styles.infoItemSpan}
              target="_blank"
              href="https://learn.javascript.ru/"
            >
              JavaScript
            </a>
            ,
            <a
              className={styles.infoItemSpan}
              target="_blank"
              href="https://reactjs.org/"
            >
              React
            </a>
            ,
            <a
              className={styles.infoItemSpan}
              target="_blank"
              href="https://redux-toolkit.js.org/"
            >
              Redux ToolKit
            </a>
          </p>
          <p className={styles.infoItem}>
            Contact:{" "}
            <a
              className={styles.infoItemSpan}
              target="_blank"
              href="https://t.me/dontrememberme/"
            >
              Telegram
            </a>
          </p>
          <p className={styles.infoItem}>
            Using by:{" "}
            <a
              className={styles.infoItemSpan}
              target="_blank"
              href="https://rickandmortyapi.com/"
            >
              The Rick and Morty API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
