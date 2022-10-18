import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleShowCharacter,
  getLocationInfo,
  getEpisodeInfo,
} from "../../../features/dataSlice";
import styles from "./styles.module.scss";
import aliveCirclePng from "../../../images/heroStatus/alive.png";
import deadCirclePng from "../../../images/heroStatus/dead.png";
import unknownCirclePng from "../../../images/heroStatus/unknown.png";
import { ReactComponent as CloseBtnSvg } from "./../../../images/closeBtn.svg";
import LocationInfo from "../../Location/LocationInfo/LocationInfo";
const CharacterInfo = () => {
  const dispatch = useDispatch();
  const pickedHero = useSelector((state) => state.data.characterInfo);
  const handleCloseInfo = () => {
    dispatch(setToggleShowCharacter(false));
  };
  const handleClickLocationOrOrigin = (idLocation) => {
    dispatch(getLocationInfo(idLocation));
  };

  const handleCLickEpisode = (idEpisode) => {
    dispatch(getEpisodeInfo(idEpisode));
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
          <img
            src={pickedHero.image}
            alt="img"
            className={styles.headerInfoBlockImg}
          />
          <div className={styles.headerInfoBlockRight}>
            <h1 className={styles.name}>{pickedHero.name}</h1>
            <p className={styles.gender}>
              Gender: <span>{pickedHero.gender}</span>
            </p>
            <div className={styles.aliveStatusBlock}>
              <p>
                Status:
                <span>
                  <img
                    src={
                      pickedHero.status === "Alive"
                        ? aliveCirclePng
                        : pickedHero.status === "Dead"
                        ? deadCirclePng
                        : unknownCirclePng
                    }
                    className={styles.statusAliveImg}
                    alt="status"
                  />
                  {pickedHero.status}
                </span>
              </p>
            </div>
            <p className={styles.gender}>
              Species: <span>{pickedHero.species}</span>
            </p>
            {pickedHero.type !== "" && (
              <p className={styles.gender}>
                Type: <span>{pickedHero.type}</span>
              </p>
            )}
            {pickedHero.location.name !== "unknown" && (
              <p className={styles.locationAndOrigin}>
                Location:{" "}
                <span
                  className={styles.locationAndOriginValue}
                  onClick={() =>
                    handleClickLocationOrOrigin(pickedHero.locationInfo.id)
                  }
                >
                  {pickedHero.locationInfo.name}
                </span>
              </p>
            )}

            {pickedHero.origin.name !== "unknown" && (
              <p className={styles.locationAndOrigin}>
                Origin:{" "}
                <span
                  className={styles.locationAndOriginValue}
                  onClick={() =>
                    handleClickLocationOrOrigin(pickedHero.originInfo.id)
                  }
                >
                  {pickedHero.originInfo.name}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className={styles.episodesBlock}>
          <p className={styles.episodeParag}>
            Episodes:
            {pickedHero.allEpisodes.map((episode) => (
              <span
                className={styles.episodeItem}
                key={episode.name}
                onClick={() => handleCLickEpisode(episode.idEpisode)}
              >
                {episode.name}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
