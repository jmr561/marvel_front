import { useState, useEffect } from "react";

import CharacterBlock from "../components/CharacterBlock";

const axios = require("axios");

const Characters = () => {
  const [charactersData, setCharactersData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharactersData = async () => {
      try {
        const res = await axios.get("http://localhost:3100/characters");
        setCharactersData(res.data);
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

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
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
              return <CharacterBlock key={index} info={element} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Characters;
