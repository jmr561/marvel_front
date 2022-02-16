import { useState, useEffect } from "react";
import ComicBlock from "../components/ComicBlock";

const axios = require("axios");

const Comics = () => {
  const [comicsData, setComicsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchComicsData = async () => {
      try {
        const res = await axios.get("http://localhost:3100/comics");
        setComicsData(res.data);
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
          `http://localhost:3100/comics?currentpage=${currentPage}`
        );
        setComicsData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchComicsPageData();
  }, [currentPage]);

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
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
              return <ComicBlock key={index} info={element} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Comics;
