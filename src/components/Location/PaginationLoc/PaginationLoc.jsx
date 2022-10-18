import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeNumberPageLocation,
  getLocationsData,
} from "../../../features/dataSlice";
import styles from "./styles.module.scss";

const PaginationLoc = () => {
  const dispatch = useDispatch();
  const { numberPageLocation } = useSelector((state) => state.data);
  const countOfPages = useSelector(
    (state) => state.data.dataLocation.info.pages
  );

  const count = [];
  for (let i = 1; i <= countOfPages; i++) {
    count.push(i);
  }

  const handleClickPage = (num) => {
    dispatch(changeNumberPageLocation(num));
    dispatch(getLocationsData());
  };

  const checkActivePage = (num) => {
    if (numberPageLocation === num) {
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

export default PaginationLoc;
