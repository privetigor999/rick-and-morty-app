import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import {
  getRandomHero,
  getCharacterInfo,
  getLocationInfo,
  getEpisodeInfo,
  setToggleShowCharacter,
  setPickedHero,
} from "../../features/dataSlice";
import aliveCirclePng from "../../images/heroStatus/alive.png";
import deadCirclePng from "../../images/heroStatus/dead.png";
import unknownCirclePng from "../../images/heroStatus/unknown.png";
import mortyPng from "./../../images/loading/morty.png";
import CharacterInfo from "../Character/CharacterInfo/CharacterInfo";
import LocationInfo from "../Location/LocationInfo/LocationInfo";
import EpisodeInfo from "../Episode/EpisodeInfo/EpisodeInfo";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
const MainPageCharacters = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const {
    status,
    randomHeros,
    toggleShowCharacter,
    toggleShowLocation,
    toggleShowEpisode,
  } = useSelector((state) => state.data);
  const handleClickRandomBtn = () => {
    dispatch(getRandomHero());
  };

  const handleClickCharacterName = (idHero) => {
    dispatch(getCharacterInfo(idHero));
  };
  const handleClickLocationOrOrigin = (idLocation) => {
    dispatch(getLocationInfo(idLocation));
  };

  const handleClickFirstEpisode = (idEpisode) => {
    dispatch(getEpisodeInfo(idEpisode));
  };
  return (
    <div className={styles.container}>
      {status === "loading" && (
        <div className={styles.loading}>
          L<img src={mortyPng} className="loadingImg" />
          ADING
        </div>
      )}
      {toggleShowCharacter && <CharacterInfo />}
      {toggleShowLocation && <LocationInfo />}
      {toggleShowEpisode && <EpisodeInfo />}
      {status === "error" && <ErrorPage />}
      {status === "success" &&
        data?.map((hero) => (
          <article className={styles.characterItem} key={hero.id}>
            <img src={hero.image} alt="img" className={styles.characterImg} />
            <div className={styles.characterInfoBlock}>
              <div className={styles.heroNameAndStatusBlock}>
                <h1
                  className={styles.heroName}
                  onClick={() => handleClickCharacterName(hero.id)}
                >
                  {hero.name}
                </h1>
                <div className={styles.heroStatusBlock}>
                  <img
                    className={styles.heroStatusImg}
                    src={
                      hero.status === "Alive" ? aliveCirclePng : deadCirclePng
                    }
                    alt="status"
                  />
                  <p>
                    {hero.status} - {hero.species}
                  </p>
                </div>
              </div>
              <div className={styles.lastLocationBlock}>
                <p className={styles.lastLocationParag}>Last known location:</p>
                {hero.origin.name === "unknown" ? (
                  <p className={styles.unknownInfo}> unknown</p>
                ) : (
                  <p
                    className={styles.lastLocationSpan}
                    onClick={() =>
                      handleClickLocationOrOrigin(hero.originInfo.id)
                    }
                  >
                    {hero.origin.name}
                  </p>
                )}
              </div>
              <div className={styles.lastLocationBlock}>
                <p className={styles.lastLocationParag}>First seen in:</p>
                <p
                  className={styles.lastLocationSpan}
                  onClick={() =>
                    handleClickFirstEpisode(hero.allEpisodes[0].idEpisode)
                  }
                >
                  {hero.allEpisodes[0].name}
                </p>
              </div>
            </div>
          </article>
        ))}
      {randomHeros?.map((hero) => (
        <article className={styles.characterItem} key={hero.id}>
          <img src={hero.image} alt="img" className={styles.characterImg} />
          <div className={styles.characterInfoBlock}>
            <div className={styles.heroNameAndStatusBlock}>
              <h1
                className={styles.heroName}
                onClick={() => handleClickCharacterName(hero.id)}
              >
                {hero.name}
              </h1>
              <div className={styles.heroStatusBlock}>
                <img
                  className={styles.heroStatusImg}
                  src={
                    hero.status === "Alive"
                      ? aliveCirclePng
                      : hero.status === "Dead"
                      ? deadCirclePng
                      : unknownCirclePng
                  }
                  alt="status"
                />
                <p>
                  {hero.status} - {hero.species}
                </p>
              </div>
            </div>
            <div className={styles.lastLocationBlock}>
              <p className={styles.lastLocationParag}>Last known location:</p>
              {hero.origin.name === "unknown" ? (
                <p className={styles.unknownInfo}> unknown</p>
              ) : (
                <p
                  className={styles.lastLocationSpan}
                  onClick={() =>
                    handleClickLocationOrOrigin(hero.originInfo.id)
                  }
                >
                  {hero.origin.name}
                </p>
              )}
            </div>
            <div className={styles.lastLocationBlock}>
              <p className={styles.lastLocationParag}>First seen in:</p>
              <p
                className={styles.lastLocationSpan}
                onClick={() =>
                  handleClickFirstEpisode(hero.allEpisodes[0].idEpisode)
                }
              >
                {hero.allEpisodes[0].name}
              </p>
            </div>
          </div>
        </article>
      ))}
      {status === "success" && (
        <button
          className={`${styles.characterItem} ${styles.getRandomBtn}`}
          onClick={handleClickRandomBtn}
        >
          Get Random Hero
        </button>
      )}
    </div>
  );
};

export default MainPageCharacters;
