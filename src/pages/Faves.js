import FaveBlock from "../components/FaveBlock";

const Faves = ({ faveList, setFaveList }) => {
  return (
    <div className="all-faves-container">
      {faveList.map((e, i) => {
        return (
          <FaveBlock
            key={i}
            faveList={faveList}
            setFaveList={setFaveList}
            id={e.id}
            type={e.type}
            nameTitle={e.nameTitle}
            img={e.img}
            desc={e.desc}
          />
        );
      })}
    </div>
  );
};

export default Faves;
