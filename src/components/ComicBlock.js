import image_not_available from "../assets/image_not_available.jpeg";
import { useState, useEffect } from "react";

const ComicBlock = ({ info, faveList, setFaveList }) => {
  const [fave, setFave] = useState(false);

  const path = info.thumbnail.path;
  const ext = info.thumbnail.extension;
  let url = path + "." + ext;
  let id = info._id;

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
    <div className="comic-block-container">
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
                nameTitle: info.title,
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
      <img src={url} alt="comic-img" />
      <div className="info">
        {info.title && (
          <div className="title-row">
            <div className="name">Title</div>
            <div>{info.title}</div>
          </div>
        )}
        {info.description && (
          <div className="desc-row">
            <div className="name">Description</div>
            <div>{info.description.replaceAll("&#39;", "'")}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicBlock;
