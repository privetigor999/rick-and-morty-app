import React from "react";
import styles from "./styles.module.scss";
import badMortyPng from "../../images/badMorty.png";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.messageBlock}>
        <img src={badMortyPng} alt="morty" className={styles.image} />
        <div>
          {" "}
          <p>Page not found</p>
          <Link to="/">
            {" "}
            <button className={styles.homeButton}>Go home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
