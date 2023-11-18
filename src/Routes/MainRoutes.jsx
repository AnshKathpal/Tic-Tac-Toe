import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Board } from "../Structure/Board";
import { useState } from "react";




export const MainRoutes = () => {


  const [room, setRoom] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Home room={room} setRoom={setRoom} />} />
      <Route path="/game" element={<Board room={room} />} />
    </Routes>
  );
};
