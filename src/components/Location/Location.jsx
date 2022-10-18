import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLocationsData,
  setLocationInfo,
  setToggleShowLocation,
} from "../../features/dataSlice";
import rickPng from "../../images/loading/rick.png";
import LocationInfo from "./LocationInfo/LocationInfo";
import PaginationLoc from "./PaginationLoc/PaginationLoc";

import CharacterInfo from "../Character/CharacterInfo/CharacterInfo";
import styles from "./styles.module.scss";
import EpisodeInfo from "../Episode/EpisodeInfo/EpisodeInfo";
const Location = () => {
  const dispatch = useDispatch();
  const {
    dataLocation,
    statusLocation,
    numberPageLocation,
    toggleShowLocation,
    toggleShowCharacter,
    toggleShowEpisode,
  } = useSelector((state) => state.data);
  React.useEffect(() => {
    dispatch(getLocationsData());
  }, []);

  const handleClickLocationInfo = (location) => {
    dispatch(setLocationInfo(location));
    dispatch(setToggleShowLocation(true));
  };

  return (
    <div className={styles.container}>
      {statusLocation === "loading" && (
        <div className={styles.loading}>
          L<img src={rickPng} className="loadingImg" />
          ADING
        </div>
      )}
      {toggleShowLocation && <LocationInfo />}
      {toggleShowCharacter && <CharacterInfo />}
      {toggleShowEpisode && <EpisodeInfo />}
      {statusLocation === "success" && (
        <>
          <h3 className={styles.countBlock}>
            Count of locations: <span>{dataLocation?.info.count}</span>. Page:{" "}
            {numberPageLocation} / {dataLocation?.info.pages}
          </h3>
          <div className={styles.locationsBlock}>
            {dataLocation?.results.map((item) => (
              <div
                className={styles.locationItem}
                key={item.id}
                onClick={() => handleClickLocationInfo(item)}
              >
                <h3 className={styles.locationName}>{item.name}</h3>
                <div className={styles.locationTypeBlock}>
                  <p>
                    Type: <span>{item.type}</span>
                  </p>
                </div>
                {item.dimension !== "unknown" && item.dimension && (
                  <div className={styles.locationTypeBlock}>
                    <p>
                      Dimension: <span>{item.dimension}</span>
                    </p>
                  </div>
                )}

                <div className={styles.locationTypeBlock}>
                  <p>
                    Count of residents: <span>{item.residents.length}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <PaginationLoc />
        </>
      )}
    </div>
  );
};

export default Location;
