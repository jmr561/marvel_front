import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Appearances from "./pages/Appearances";
import Comics from "./pages/Comics";
import Faves from "./pages/Faves";
import Header from "./components/Header";
import "./App.css";

const axios = require("axios");

function App() {
  return (
    <div className="main-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/characters" element={<Characters />}></Route>
          <Route
            path="/appearances/:character"
            element={<Appearances />}
          ></Route>
          <Route path="/comics" element={<Comics />}></Route>
          <Route path="/faves" element={<Faves />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
