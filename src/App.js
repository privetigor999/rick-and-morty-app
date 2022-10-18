import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { getMainData } from "../src/features/dataSlice";
import MainPage from "./pages/MainPage";
import CharacterPage from "./pages/CharacterPage";
import LocationPage from "./pages/LocationPage";
import EpisodePage from "./pages/EpisodePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AboutPage from "./pages/AboutPage/AboutPage";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMainData());
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/character" element={<CharacterPage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/episode" element={<EpisodePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
