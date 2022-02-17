const ComicListItem = ({ element }) => {
  return (
    <div className="comics-list-item">
      <img
        src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
        alt="pic"
      />
      <div className="comics-info">
        <div>
          <div className="title">TITLE</div>
          <div>{element.title}</div>
        </div>
        {element.description ? (
          <div className="desc-block">
            <div className="description">DESCRIPTION</div>
            <div className="desc-text">
              {element.description.replaceAll("<br>", "")}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ComicListItem;
