import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import badMortyPng from "../../images/badMorty.png";
const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.messageBlock}>
        <img src={badMortyPng} alt="morty" className={styles.image} />
        <div>
          {" "}
          <p>Server is error</p>
          <Link to="/">
            {" "}
            <button className={styles.homeButton}>Retry</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
