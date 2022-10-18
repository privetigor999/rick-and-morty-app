import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEpisodesData, getEpisodeInfo } from "../../features/dataSlice";
import PaginationEpi from "./PaginationEpi/PaginationEpi";
import styles from "./styles.module.scss";
import mortyPng from "../../images/loading/morty.png";
import EpisodeInfo from "./EpisodeInfo/EpisodeInfo";
import CharacterInfo from "../Character/CharacterInfo/CharacterInfo";
import LocationInfo from "../Location/LocationInfo/LocationInfo";

const EpisodeList = () => {
  const dispatch = useDispatch();
  const dataEpisode = useSelector((state) => state.data.dataEpisode);
  const {
    statusEpisode,
    numberPageEpisode,
    toggleShowEpisode,
    toggleShowLocation,
    toggleShowCharacter,
  } = useSelector((state) => state.data);

  const handleClickEpisodeInfo = (idEpisode) => {
    dispatch(getEpisodeInfo(idEpisode));
  };

  React.useEffect(() => {
    dispatch(getEpisodesData());
  }, []);
  return (
    <div className={styles.container}>
      {statusEpisode === "loading" && (
        <div className={styles.loading}>
          L<img src={mortyPng} className="loadingImg" />
          ADING
        </div>
      )}
      {toggleShowEpisode && <EpisodeInfo />}
      {toggleShowLocation && <LocationInfo />}
      {toggleShowCharacter && <CharacterInfo />}
      {statusEpisode === "success" && (
        <>
          <h3 className={styles.countBlock}>
            Count of locations: <span>{dataEpisode?.info.count}</span>. Page:{" "}
            {numberPageEpisode} / {dataEpisode?.info.pages}
          </h3>
          <div className={styles.episodesBlock}>
            {dataEpisode?.results.map((episode) => (
              <div
                className={styles.episodeItem}
                key={episode.id}
                onClick={() => handleClickEpisodeInfo(episode.id)}
              >
                <h3 className={styles.episodeName}>{episode.name}</h3>
                <div className={styles.episodeInfoBlock}>
                  <p>
                    Episode: <span>{episode.episode}</span>
                  </p>
                </div>
                <div className={styles.episodeInfoBlock}>
                  <p>
                    Count of characters:{" "}
                    <span>{episode.allCharacters.length}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <PaginationEpi />
        </>
      )}
    </div>
  );
};

export default EpisodeList;
