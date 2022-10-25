import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMainData = createAsyncThunk("data/getMainData", async () => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/1,2,3,4,5`
  );
  const data = response.data;

  for (let i = 0; i < data.length; i++) {
    let episodes = data[i].episode;
    data[i].allEpisodes = [];
    for (let elem of episodes) {
      const { id, name } = await axios.get(elem).then((res) => res.data);
      data[i].allEpisodes.push({ idEpisode: id, name });
    }
    const locationUrl = data[i].location.url;
    const originUrl = data[i].origin.url;
    if (locationUrl) {
      const { id, name } = await axios.get(locationUrl).then((res) => res.data);
      data[i].locationInfo = { id, name };
    }

    if (originUrl) {
      const { id, name } = await axios.get(originUrl).then((res) => res.data);

      data[i].originInfo = { id, name };
    }
  }
  return data;
});

export const getRandomHero = createAsyncThunk(
  "data/getRandomHero",
  async (_, { dispatch }) => {
    const randomNum = Math.floor(Math.random() * 826 + 1);
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${randomNum}`
    );
    const data = response.data;

    const episodes = data.episode;
    for (let i = 0; i < episodes.length; i++) {
      data.allEpisodes = [];
      for (let elem of episodes) {
        const { id, name } = await axios.get(elem).then((res) => res.data);

        data.allEpisodes.push({ idEpisode: id, name });
      }
    }
    const locationUrl = data.location.url;
    const originUrl = data.origin.url;
    if (locationUrl) {
      const { id, name } = await axios.get(locationUrl).then((res) => res.data);
      data.locationInfo = { id, name };
    }

    if (originUrl) {
      const { id, name } = await axios.get(originUrl).then((res) => res.data);

      data.originInfo = { id, name };
    }
    dispatch(setRandomHero(data));
    window.scrollBy(0, 216);
  }
);

export const getCharacterData = createAsyncThunk(
  "data/getCharacterData",
  async (_, { getState }) => {
    const { numberPage } = getState().data;
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${numberPage}`
    );
    const data = response.data;
    const arr = response.data.results;

    for (let i = 0; i < data.results.length; i++) {
      let episodes = arr[i].episode;

      arr[i].allEpisodes = [];
      for (let elem of episodes) {
        const { id, name } = await axios.get(elem).then((res) => res.data);

        arr[i].allEpisodes.push({ idEpisode: id, name });
      }
      const locationUrl = arr[i].location.url;
      const originUrl = arr[i].origin.url;
      if (locationUrl) {
        const { id, name } = await axios
          .get(locationUrl)
          .then((res) => res.data);
        arr[i].locationInfo = { id, name };
      }

      if (originUrl) {
        const { id, name } = await axios.get(originUrl).then((res) => res.data);

        arr[i].originInfo = { id, name };
      }
    }

    return data;
  }
);

export const getLocationsData = createAsyncThunk(
  "data/getLocationsData",
  async (_, { getState }) => {
    const { numberPageLocation } = getState().data;
    const response = await axios.get(
      `https://rickandmortyapi.com/api/location/?page=${numberPageLocation}`
    );
    const data = response.data;
    const results = data.results;
    for (let i = 0; i < results.length; i++) {
      let residents = results[i].residents;

      results[i].allResidents = [];
      for (let elem of residents) {
        const { id, name, image } = await axios
          .get(elem)
          .then((resp) => resp.data);
        results[i].allResidents.push({ id, name, image });
      }
    }
    return response.data;
  }
);

export const getEpisodesData = createAsyncThunk(
  "data/getEpisodesData",
  async (_, { getState }) => {
    const { numberPageEpisode } = getState().data;
    const data = await axios
      .get(`https://rickandmortyapi.com/api/episode/?page=${numberPageEpisode}`)
      .then((resp) => resp.data);
    const results = data.results;

    for (let i = 0; i < results.length; i++) {
      results[i].allCharacters = [];
      let characters = results[i].characters;

      for (let character of characters) {
        const { id, name, image } = await axios
          .get(character)
          .then((resp) => resp.data);
        results[i].allCharacters.push({ id, name, image });
      }
    }
    return data;
  }
);

export const getCharacterInfo = createAsyncThunk(
  "data/getCharacterInfo",
  async (params, { dispatch }) => {
    const id = params;
    dispatch(showLoadingBlock(true));
    const data = await axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((resp) => resp.data);

    const episodes = data.episode;
    for (let i = 0; i < episodes.length; i++) {
      data.allEpisodes = [];
      for (let elem of episodes) {
        const { id, name } = await axios.get(elem).then((res) => res.data);

        data.allEpisodes.push({ idEpisode: id, name });
      }
    }
    const locationUrl = data.location.url;
    const originUrl = data.origin.url;
    if (locationUrl) {
      const { id, name } = await axios.get(locationUrl).then((res) => res.data);
      data.locationInfo = { id, name };
    }

    if (originUrl) {
      const { id, name } = await axios.get(originUrl).then((res) => res.data);

      data.originInfo = { id, name };
    }
    dispatch(showLoadingBlock(false));
    dispatch(setPickedHero(data));
    dispatch(setToggleShowLocation(false));
    dispatch(setToggleShowCharacter(true));
    dispatch(setToggleShowEpisode(false));
  }
);

export const getLocationInfo = createAsyncThunk(
  "data/getLocationInfo",
  async (params, { dispatch }) => {
    dispatch(showLoadingBlock(true));
    const id = params;
    const data = await axios
      .get(`https://rickandmortyapi.com/api/location/${id}`)
      .then((resp) => resp.data);

    data.allResidents = [];
    for (let elem of data.residents) {
      const { id, name, image } = await axios
        .get(elem)
        .then((resp) => resp.data);
      data.allResidents.push({ id, name, image });
    }
    dispatch(showLoadingBlock(false));
    dispatch(setLocationInfo(data));
    dispatch(setToggleShowEpisode(false));
    dispatch(setToggleShowCharacter(false));
    dispatch(setToggleShowLocation(true));
  }
);

export const getEpisodeInfo = createAsyncThunk(
  "data/getEpisodeInfo",
  async (param, { dispatch }) => {
    dispatch(showLoadingBlock(true));
    const id = param;
    const data = await axios
      .get(`https://rickandmortyapi.com/api/episode/${id}`)
      .then((resp) => resp.data);

    data.allCharacters = [];
    for (let elem of data.characters) {
      const { id, name, image } = await axios
        .get(elem)
        .then((resp) => resp.data);
      data.allCharacters.push({ id, name, image });
    }
    dispatch(showLoadingBlock(false));
    dispatch(setEpisodeInfo(data));
    dispatch(setToggleShowEpisode(true));
    dispatch(setToggleShowCharacter(false));
    dispatch(setToggleShowLocation(false));
  }
);

const initialState = {
  parameter: "character",
  data: [],
  dataCharacter: [],
  dataLocation: [],
  dataEpisode: [],
  characterInfo: {},
  locationInfo: {},
  episodeInfo: {},
  numberPage: 1,
  numberPageLocation: 1,
  numberPageEpisode: 1,
  randomHeros: [],
  status: "",
  statusCharacter: "",
  statusLocation: "",
  statusEpisode: "",
  loadingBlock: false,
  toggleShowCharacter: false,
  toggleShowLocation: false,
  toggleShowEpisode: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setRandomHero: (state, action) => {
      state.randomHeros.push(action.payload);
    },
    setLocationData: (state, action) => {
      state.dataLocation = action.payload;
    },
    setLocationInfo: (state, action) => {
      state.locationInfo = action.payload;
    },
    setEpisodeInfo: (state, action) => {
      state.episodeInfo = action.payload;
    },
    setPickedHero: (state, action) => {
      state.characterInfo = action.payload;
    },
    setToggleShowCharacter: (state, action) => {
      state.toggleShowCharacter = action.payload;
    },
    setToggleShowLocation: (state, action) => {
      state.toggleShowLocation = action.payload;
    },
    setToggleShowEpisode: (state, action) => {
      state.toggleShowEpisode = action.payload;
    },
    addRandomHero: (state, action) => {
      state.data.push(action.payload);
    },
    changeParameter: (state, action) => {
      state.parameter = action.payload;
    },
    changeNumberPage: (state, action) => {
      state.numberPage = action.payload;
    },
    changeNumberPageLocation: (state, action) => {
      state.numberPageLocation = action.payload;
    },
    changeNumberPageEpisode: (state, action) => {
      state.numberPageEpisode = action.payload;
    },
    showLoadingBlock: (state, action) => {
      state.loadingBlock = action.payload;
    },
  },
  extraReducers: {
    [getMainData.pending]: (state) => {
      state.status = "loading";
      state.data = [];
    },
    [getMainData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [getMainData.rejected]: (state) => {
      state.status = "error";
      state.data = [];
    },
    [getCharacterData.pending]: (state) => {
      state.statusCharacter = "loading";
      state.dataCharacter = [];
    },
    [getCharacterData.fulfilled]: (state, action) => {
      state.dataCharacter = action.payload;
      state.statusCharacter = "success";
    },
    [getCharacterData.rejected]: (state) => {
      state.statusCharacter = "error";
      state.dataCharacter = [];
    },
    [getLocationsData.pending]: (state) => {
      state.statusLocation = "loading";
      state.dataLocation = [];
    },
    [getLocationsData.fulfilled]: (state, action) => {
      state.dataLocation = action.payload;
      state.statusLocation = "success";
    },
    [getLocationsData.rejected]: (state) => {
      state.statusLocation = "error";
      state.dataLocation = [];
    },
    [getEpisodesData.pending]: (state) => {
      state.statusEpisode = "loading";
      state.dataEpisode = [];
    },
    [getEpisodesData.fulfilled]: (state, action) => {
      state.dataEpisode = action.payload;
      state.statusEpisode = "success";
    },
    [getEpisodesData.rejected]: (state) => {
      state.statusEpisode = "error";
      state.dataEpisode = [];
    },
  },
});

export const {
  setData,
  setRandomHero,
  addRandomHero,
  changeParameter,
  changeNumberPage,
  changeNumberPageLocation,
  changeNumberPageEpisode,
  setPickedHero,
  setEpisodeInfo,
  setToggleShowCharacter,
  setToggleShowLocation,
  setToggleShowEpisode,
  setLocationInfo,
  showLoadingBlock,
} = dataSlice.actions;
export default dataSlice.reducer;
