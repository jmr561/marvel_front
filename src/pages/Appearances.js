import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ComicListItem from "../components/ComicListItem";

const axios = require("axios");

const Appearances = () => {
  const [appearancesData, setAppearancesData] = useState({});
  const [comicsList, setComicsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { character } = useParams();

  useEffect(() => {
    const fetchAppearancesData = async () => {
      try {
        const res = await axios.get(
          `https://jmr-marvel-backend.herokuapp.com/character/appearances/${character}`
        );
        setAppearancesData(res.data);

        try {
          const res2 = await axios.get(
            `https://jmr-marvel-backend.herokuapp.com/character/appearances/comics/${character}`
          );
          setComicsList(res2.data);
        } catch (error) {
          console.log(error.message);
        }

        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAppearancesData();
  }, []);

  return (
    <>
      {" "}
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="appearances-overall-container">
          <h1>{appearancesData.name}</h1>
          <div className="appearances-sub-container">
            <img
              src={`${appearancesData.thumbnail.path}.${appearancesData.thumbnail.extension}`}
              alt="character-pic"
            />
            <div className="right-side">
              <h2>Appearances</h2>
              <div>
                {comicsList.map((e, i) => {
                  return <ComicListItem element={e} key={i} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Appearances;
