const ComicBlock = ({ info }) => {
  console.log(info.thumbnail);

  const path = info.thumbnail.path;
  const ext = info.thumbnail.extension;
  const url = path + "." + ext;

  return (
    <div className="comic-block-container">
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
            <div>{info.description}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicBlock;
