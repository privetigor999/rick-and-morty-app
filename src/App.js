import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMainData } from "../src/features/dataSlice";
import MainPage from "./pages/MainPage";
import CharacterPage from "./pages/CharacterPage";
import LocationPage from "./pages/LocationPage";
import EpisodePage from "./pages/EpisodePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import Loading from "./components/Loading/Loading";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.data.loadingBlock);
  React.useEffect(() => {
    dispatch(getMainData());
  }, []);

  return (
    <div className="App">
      <Navbar />
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/character" element={<CharacterPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/episode" element={<EpisodePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/rick-and-morty-app" element={<Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
