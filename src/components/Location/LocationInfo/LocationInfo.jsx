import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setToggleShowLocation,
  getCharacterInfo,
} from "../../../features/dataSlice";
import styles from "./styles.module.scss";
import { ReactComponent as CloseBtnSvg } from "../../../images/closeBtn.svg";

const LocationInfo = () => {
  const dispatch = useDispatch();
  const { locationInfo } = useSelector((state) => state.data);

  const handleCloseInfo = () => {
    dispatch(setToggleShowLocation(false));
  };

  const handleClickHero = (id) => {
    dispatch(getCharacterInfo(id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainBlock}>
        <CloseBtnSvg
          className={styles.closeBtn}
          fill="#ffffff"
          onClick={handleCloseInfo}
        />

        <div className={styles.headerInfoBlock}>
          <h1 className={styles.name}>{locationInfo.name}</h1>
          <div className={styles.typeAndDimensionBlock}>
            <p className={styles.typeAndDimension}>
              Type:<span>{locationInfo.type}</span>
            </p>
            {locationInfo.dimension !== "unknown" && locationInfo.dimension && (
              <p className={styles.typeAndDimension}>
                Dimension:<span>{locationInfo.dimension}</span>
              </p>
            )}

            <p className={styles.typeAndDimension}>
              Count of residents:<span>{locationInfo.allResidents.length}</span>
            </p>
          </div>
        </div>
        <div className={styles.residentsBlock}>
          {locationInfo.allResidents.length > 0 && (
            <div className={styles.residentsItems}>
              {locationInfo.allResidents.length === 1
                ? "Resident:"
                : "Residents:"}
              {locationInfo.allResidents.map((resident) => (
                <div
                  key={resident.id}
                  className={styles.residentItem}
                  onClick={() => handleClickHero(resident.id)}
                >
                  <img
                    src={resident.image}
                    alt="img"
                    className={styles.residentImg}
                  />
                  <p>{resident.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
