import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setToggleShowEpisode,
  getCharacterInfo,
} from "../../../features/dataSlice";
import { ReactComponent as CloseBtnSvg } from "../../../images/closeBtn.svg";
import styles from "./styles.module.scss";

const EpisodeInfo = () => {
  const dispatch = useDispatch();
  const { episodeInfo } = useSelector((state) => state.data);

  const handleCloseInfo = () => {
    dispatch(setToggleShowEpisode(false));
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
          <h1 className={styles.name}>{episodeInfo.name}</h1>
          <div className={styles.headerInfoEpisodeAndDate}>
            <p className={styles.infoItem}>
              Episode:<span>{episodeInfo.episode}</span>
            </p>
            <p className={styles.infoItem}>
              Air date:<span>{episodeInfo.air_date}</span>
            </p>
            <p className={styles.infoItem}>
              Count of characters:
              <span>{episodeInfo.allCharacters.length}</span>
            </p>
          </div>
        </div>
        <div className={styles.charactersBlock}>
          <div className={styles.characterItems}>
            Characters:
            {episodeInfo.allCharacters.map((character) => (
              <div
                key={character.id}
                className={styles.characterItem}
                onClick={() => handleClickHero(character.id)}
              >
                <img
                  src={character.image}
                  alt="img"
                  className={styles.characterImg}
                />
                <p>{character.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeInfo;
