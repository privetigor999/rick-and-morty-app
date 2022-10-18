import React from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  getCharacterData,
  getCharacterInfo,
  getEpisodeInfo,
  getLocationInfo,
} from "../../features/dataSlice";
import mortyPng from "../../images/loading/morty.png";
import aliveCirclePng from "./../../images/heroStatus/alive.png";
import deadCirclePng from "./../../images/heroStatus/dead.png";
import unknownCirclePng from "./../../images/heroStatus/unknown.png";
import Pagination from "./Pagination/Pagination";
import CharacterInfo from "./CharacterInfo/CharacterInfo";
import LocationInfo from "../Location/LocationInfo/LocationInfo";
import EpisodeInfo from "../Episode/EpisodeInfo/EpisodeInfo";

const Character = () => {
  const dispatch = useDispatch();
  const dataCharacter = useSelector((state) => state.data.dataCharacter);
  const {
    statusCharacter,
    numberPage,
    toggleShowCharacter,
    toggleShowLocation,
    toggleShowEpisode,
  } = useSelector((state) => state.data);

  const handleClickCharacterName = (pickedHero) => {
    dispatch(getCharacterInfo(pickedHero));
  };

  const handleClickLocationOrOrigin = (idLocation) => {
    dispatch(getLocationInfo(idLocation));
  };
  const handleClickFirstEpisode = (idEpisode) => {
    dispatch(getEpisodeInfo(idEpisode));
  };
  React.useEffect(() => {
    dispatch(getCharacterData());
  }, []);

  return (
    <>
      <div className={styles.container}>
        {statusCharacter === "loading" && (
          <div className={styles.loading}>
            L<img src={mortyPng} className="loadingImg" />
            ADING
          </div>
        )}
        {toggleShowLocation && <LocationInfo />}
        {toggleShowCharacter && <CharacterInfo />}
        {toggleShowEpisode && <EpisodeInfo />}
        {statusCharacter === "success" && (
          <>
            <h3 className={styles.countBlock}>
              Count of characters: <span>{dataCharacter?.info.count}</span>.
              Page: {numberPage} / {dataCharacter?.info.pages}
            </h3>
            <div className={styles.charactersBlock}>
              {dataCharacter?.results.map((hero) => (
                <article className={styles.characterItem} key={hero.id}>
                  <img
                    src={hero.image}
                    alt="img"
                    className={styles.characterImg}
                  />
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
                      <p className={styles.lastLocationParag}>
                        Last known location:
                      </p>
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
            </div>
            <Pagination />
          </>
        )}
      </div>
    </>
  );
};

export default Character;
