import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Board } from "../Structure/Board";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Board />} />
    </Routes>
  );
};
