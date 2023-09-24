import React from "react";

import { Route, Routes } from "react-router-dom";

import HomePage from "./componenets/HomePage";
import ChatPage from "./componenets/ChatPage";

import "./App.css";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
