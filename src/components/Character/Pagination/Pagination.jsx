import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeNumberPage,
  getCharacterData,
} from "../../../features/dataSlice";

import styles from "./styles.module.scss";
const Pagination = () => {
  const dispatch = useDispatch();
  const lastPage = useSelector((state) => state.data.dataCharacter.info.pages);

  const { numberPage } = useSelector((state) => state.data);

  const handleClickLastPage = (num) => {
    if (numberPage !== num) {
      dispatch(changeNumberPage(num));
      dispatch(getCharacterData());
    }
  };

  const checkActivePage = (num) => {
    if (numberPage === num) {
      return `${styles.buttomItem} ${styles.buttomItemActive}`;
    } else {
      return `${styles.buttomItem}`;
    }
  };

  const getBtns = () => {
    if (
      numberPage === 1 ||
      numberPage === 2 ||
      numberPage === 3 ||
      numberPage === 4
    ) {
      return (
        <>
          <button
            onClick={() => handleClickLastPage(2)}
            className={checkActivePage(2)}
          >
            2
          </button>
          <button
            onClick={() => handleClickLastPage(3)}
            className={checkActivePage(3)}
          >
            3
          </button>
          <button
            onClick={() => handleClickLastPage(4)}
            className={checkActivePage(4)}
          >
            4
          </button>
          <button
            onClick={() => handleClickLastPage(5)}
            className={checkActivePage(5)}
          >
            5
          </button>
          <button className={`${styles.buttomItem} ${styles.buttonPointers}`}>
            ...
          </button>
        </>
      );
    }

    if (
      numberPage === lastPage - 3 ||
      numberPage === lastPage - 2 ||
      numberPage === lastPage - 1 ||
      numberPage === lastPage
    ) {
      return (
        <>
          <button className={`${styles.buttomItem} ${styles.buttonPointers}`}>
            ...
          </button>
          <button
            onClick={() => handleClickLastPage(lastPage - 4)}
            className={checkActivePage(lastPage - 4)}
          >
            {lastPage - 4}
          </button>
          <button
            onClick={() => handleClickLastPage(lastPage - 3)}
            className={checkActivePage(lastPage - 3)}
          >
            {lastPage - 3}
          </button>
          <button
            onClick={() => handleClickLastPage(lastPage - 2)}
            className={checkActivePage(lastPage - 2)}
          >
            {lastPage - 2}
          </button>
          <button
            onClick={() => handleClickLastPage(lastPage - 1)}
            className={checkActivePage(lastPage - 1)}
          >
            {lastPage - 1}
          </button>
        </>
      );
    }
    if (numberPage) {
      return (
        <>
          <button className={`${styles.buttomItem} ${styles.buttonPointers}`}>
            ...
          </button>
          <button
            onClick={() => handleClickLastPage(numberPage - 1)}
            className={styles.buttomItem}
          >
            {numberPage - 1}
          </button>
          <button
            onClick={() => handleClickLastPage(numberPage)}
            className={checkActivePage(numberPage)}
          >
            {numberPage}
          </button>
          <button
            onClick={() => handleClickLastPage(numberPage + 1)}
            className={styles.buttomItem}
          >
            {numberPage + 1}
          </button>
          <button className={`${styles.buttomItem} ${styles.buttonPointers}`}>
            ...
          </button>
        </>
      );
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => handleClickLastPage(1)}
        className={checkActivePage(1)}
      >
        1
      </button>
      {getBtns()}
      <button
        onClick={() => handleClickLastPage(lastPage)}
        className={checkActivePage(lastPage)}
      >
        {lastPage}
      </button>
    </div>
  );
};

export default Pagination;
