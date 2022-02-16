const ComicListItem = ({ element }) => {
  console.log(element.thumbnail);
  console.log("hi");
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
          <div>
            <div className="description">DESCRIPTION</div>
            <div>{element.description}</div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ComicListItem;
