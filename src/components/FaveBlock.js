import { useState } from "react";

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
  console.log(fave);

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
              return null;
            })
            .indexOf(id);
          arr.splice(index, 1);
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
