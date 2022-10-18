import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeNumberPageEpisode,
  getEpisodesData,
} from "../../../features/dataSlice";
import styles from "./styles.module.scss";

const PaginationEpi = () => {
  const dispatch = useDispatch();
  const { numberPageEpisode } = useSelector((state) => state.data);
  const countOfPages = useSelector(
    (state) => state.data.dataEpisode.info.pages
  );

  const count = [];
  for (let i = 1; i <= countOfPages; i++) {
    count.push(i);
  }

  const handleClickPage = (num) => {
    dispatch(changeNumberPageEpisode(num));
    dispatch(getEpisodesData());
  };

  const checkActivePage = (num) => {
    if (numberPageEpisode === num) {
      return `${styles.buttomItem} ${styles.buttomItemActive}`;
    } else {
      return `${styles.buttomItem}`;
    }
  };

  return (
    <div className={styles.container}>
      {count.map((btn) => (
        <button
          key={btn}
          className={checkActivePage(btn)}
          onClick={() => handleClickPage(btn)}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default PaginationEpi;
