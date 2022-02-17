import { useState, useEffect } from "react";
import ComicBlock from "../components/ComicBlock";
import searchicon from "../assets/searchicon.png";

const axios = require("axios");

const Comics = ({ faveList, setFaveList }) => {
  const [comicsData, setComicsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchComicsData = async () => {
      try {
        const res = await axios.get(
          "https://jmr-marvel-backend.herokuapp.com/comics"
        );
        setComicsData(res.data);
        setCurrentPage(1);
        setTotalPages(Math.ceil(res.data.count / 100));
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchComicsData();
  }, []);

  useEffect(() => {
    const fetchComicsPageData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://jmr-marvel-backend.herokuapp.com/comics?currentpage=${currentPage}`
        );
        setComicsData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchComicsPageData();
  }, [currentPage]);

  const handleSearchTextChange = async (e) => {
    setSearchText(e.target.value);
    const res = await axios.get(
      `https://jmr-marvel-backend.herokuapp.com/comics/${e.target.value}`
    );
    console.log(res.data);
    setCurrentPage(1);
    setTotalPages(Math.ceil(res.data.count / 100));
    setComicsData(res.data);
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
          <div className="comics-page-nav">
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
          <div className="all-comics-container">
            {comicsData.results.map((element, index) => {
              return (
                <ComicBlock
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

export default Comics;
