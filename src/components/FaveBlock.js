import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const FaveBlock = ({
  faveList,
  setFaveList,
  desc,
  id,
  img,
  nameTitle,
  type,
}) => {
  const [fave, setFave] = useState(true);

  return (
    <div className="fave-block-container">
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
      <img src={img} alt="fave-img" />
      <div className="info">
        <div className="name-row">
          <div className="name">Name/Title</div>
          <div>{nameTitle}</div>
        </div>
        {desc && (
          <div className="desc-row">
            <div className="name">Description</div>
            <div>{desc}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaveBlock;
