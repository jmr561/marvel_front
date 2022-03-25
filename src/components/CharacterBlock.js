import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import image_not_available from "../assets/image_not_available.jpeg";

const CharacterBlock = ({ info, faveList, setFaveList }) => {
  const [fave, setFave] = useState(false);

  const navigate = useNavigate();

  const path = info.thumbnail.path;
  const ext = info.thumbnail.extension;
  let url = path + "." + ext;

  const id = info._id;

  if (url.indexOf("image_not_available") > -1) {
    url = image_not_available;
  }

  useEffect(() => {
    faveList.map((e) => {
      if (id === e.id) {
        setFave(true);
      }
      return null;
    });
  }, [faveList, id]);

  return (
    <div className="comic-block-container char-block-container">
      {fave ? (
        <div
          className="heart-red"
          onClick={() => {
            setFave(false);
            let arr = [...faveList];

            let index = arr
              .map((e, i) => {
                if (e.id === id) {
                  return id;
                }
                return null;
              })
              .indexOf(id);

            console.log(index);
            arr.splice(index, 1);
            console.log(arr);
            setFaveList(arr);
          }}
        >
          ♥
        </div>
      ) : (
        <div
          className="heart-black"
          onClick={() => {
            setFave(true);
            let arr = [...faveList];

            let result = arr.find((e) => e.id === id);

            if (!result) {
              arr.push({
                type: "character",
                nameTitle: info.name,
                img: url,
                desc: info.description,
                id: id,
                index: arr.length,
              });
            }

            console.log(arr);
            setFaveList(arr);
          }}
        >
          ♥
        </div>
      )}
      <img
        src={url}
        alt="comic-img"
        onClick={() => {
          navigate(`/appearances/${id}`);
        }}
      />
      <div className="info">
        {info.name && (
          <div
            className="name-row"
            onClick={() => {
              navigate(`/appearances/${id}`);
            }}
          >
            <div
              className="name"
              onClick={() => {
                navigate(`/appearances/${id}`);
              }}
            >
              Name
            </div>
            <div
              onClick={() => {
                navigate(`/appearances/${id}`);
              }}
            >
              {info.name}
            </div>
          </div>
        )}
        {info.description && (
          <div
            className="desc-row"
            onClick={() => {
              navigate(`/appearances/${id}`);
            }}
          >
            <div
              className="name"
              onClick={() => {
                navigate(`/appearances/${id}`);
              }}
            >
              Description
            </div>
            <div
              onClick={() => {
                navigate(`/appearances/${id}`);
              }}
            >
              {info.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterBlock;
