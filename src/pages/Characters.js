import { useState, useEffect } from "react";

import CharacterBlock from "../components/CharacterBlock";
import searchicon from "../assets/searchicon.png";

const axios = require("axios");

const Characters = ({ faveList, setFaveList }) => {
  const [charactersData, setCharactersData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchCharactersData = async () => {
      try {
        const res = await axios.get("http://localhost:3100/characters");
        setCharactersData(res.data);
        setCurrentPage(1);
        setTotalPages(Math.ceil(res.data.count / 100));
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCharactersData();
  }, []);

  useEffect(() => {
    const fetchCharactersPageData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3100/characters?currentpage=${currentPage}`
        );
        setCharactersData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCharactersPageData();
  }, [currentPage]);

  const handleSearchTextChange = async (e) => {
    setSearchText(e.target.value);
    const res = await axios.get(
      `http://localhost:3100/characters/${e.target.value}`
    );
    setCharactersData(res.data);
    setCurrentPage(1);
    setTotalPages(Math.ceil(res.data.count / 100));
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="search-bar-container">
            <img src={searchicon} alt="searchicon" />
            <input
              type="text"
              className="search-bar"
              value={searchText}
              onChange={handleSearchTextChange}
            />
          </div>
          <div className="characters-page-nav">
            {currentPage === 1 ? (
              <span style={{ display: "none" }}></span>
            ) : (
              <div
                className="nav-button"
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                }}
              >
                ←
              </div>
            )}

            <div>
              p. {currentPage} / {totalPages}
            </div>
            {currentPage === totalPages ? (
              <span></span>
            ) : (
              <div
                className="nav-button"
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              >
                →
              </div>
            )}
          </div>
          <div className="all-characters-container">
            {charactersData.results.map((element, index) => {
              return (
                <CharacterBlock
                  key={index}
                  info={element}
                  faveList={faveList}
                  setFaveList={setFaveList}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Characters;
