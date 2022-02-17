import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Appearances from "./pages/Appearances";
import Comics from "./pages/Comics";
import Faves from "./pages/Faves";
import Header from "./components/Header";
import "./App.css";
import Cookies from "js-cookie";

const axios = require("axios");

function App() {
  const [faveList, setFaveList] = useState([]);

  useEffect(() => {
    let json_str_parse = Cookies.get("faveList-cookie");
    let cookie_arr = JSON.parse(json_str_parse);
    setFaveList(cookie_arr);
    if (cookie_arr !== undefined && cookie_arr.length > 0) {
      let arr = [...faveList];
      let json_str = JSON.stringify(arr);
      Cookies.set("faveList-cookie", json_str);
    }
  }, []);

  useEffect(() => {
    let arr = [...faveList];
    let json_str = JSON.stringify(arr);
    Cookies.set("faveList-cookie", json_str);
    let cookieTest = Cookies.get("faveList-cookie");
    console.log(cookieTest);
  }, [faveList]);

  return (
    <div className="main-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/characters"
            element={
              <Characters faveList={faveList} setFaveList={setFaveList} />
            }
          ></Route>
          <Route
            path="/appearances/:character"
            element={<Appearances />}
          ></Route>
          <Route
            path="/comics"
            element={<Comics faveList={faveList} setFaveList={setFaveList} />}
          ></Route>
          <Route
            path="/faves"
            element={<Faves faveList={faveList} setFaveList={setFaveList} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
