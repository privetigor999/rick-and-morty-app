import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeParameter,
  getLocationsData,
  getCharacterData,
  getEpisodesData,
} from "../../features/dataSlice";
import styles from "./styles.module.scss";

import { ReactComponent as HomeButton } from "./../../images/home.svg";
const Navbar = () => {
  const dispatch = useDispatch();
  const { parameter } = useSelector((state) => state.data);
  const navItems = [
    { id: 1, parametr: "character", title: "CHARACTERS" },
    { id: 2, parametr: "location", title: "LOCATIONS" },
    { id: 3, parametr: "episode", title: "EPISODES" },
  ];

  const handleChangeParameter = (param) => {
    if (param !== parameter) {
      dispatch(changeParameter(param));
      if (param === "character") {
        dispatch(getCharacterData());
      }
      if (param === "location") {
        dispatch(getLocationsData());
      }
      if (param === "episode") {
        dispatch(getEpisodesData());
      }
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/">
        <HomeButton className={styles.homeLogo} />
      </Link>

      <ul className={styles.navbar}>
        {navItems.map((item) => (
          <Link
            to={item.parametr}
            className={styles.linkRouterDom}
            key={item.id}
          >
            <li
              className={styles.navItem}
              onClick={() => handleChangeParameter(item.parametr)}
            >
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
      <Link className={styles.linkRouterDom} to="/about">
        <p className={styles.navItem}>ABOUT</p>
      </Link>
    </div>
  );
};

export default Navbar;
