import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Board } from "../Structure/Board";
import { useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");



export const MainRoutes = () => {


  const [room, setRoom] = useState("");

  return (
    <Routes>
      <Route path="/" element={<Home room={room} setRoom={setRoom} socket={socket} />} />
      <Route path="/game" element={<Board room={room} socket={socket} />} />
    </Routes>
  );
};
