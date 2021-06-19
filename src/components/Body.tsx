import plusIcon from "./images/plusIcon.svg";

const Body = ({ add }: { add: Function }) => {
  return (
    <div className="body">
      <div className="addBtn">
        <div onClick={() => add()}>
          <img src={plusIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Body;
