import { useNavigate } from "react-router-dom";

const CharacterBlock = ({ info }) => {
  const navigate = useNavigate();

  const path = info.thumbnail.path;
  const ext = info.thumbnail.extension;
  const url = path + "." + ext;

  const id = info._id;

  return (
    <div
      className="comic-block-container char-block-container"
      onClick={() => {
        navigate(`/appearances/${id}`);
      }}
    >
      <img src={url} alt="comic-img" />
      <div className="info">
        {info.name && (
          <div className="name-row">
            <div className="name">Name</div>
            <div>{info.name}</div>
          </div>
        )}
        {info.description && (
          <div className="desc-row">
            <div className="name">Description</div>
            <div>{info.description}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterBlock;
