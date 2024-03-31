import "./mouse.scss";
const Mouse = ({ mousePosition, name }) => {
  return (
    <div>
      <div
        className="mouse"
        style={{
          position: "absolute",
          left: mousePosition.x,
          top: mousePosition.y,
          // width: "20px",
          // height: "20px",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
      >
        <div style={{ color: "white", backgroundColor: "red" }}>{name}</div>
      </div>
    </div>
  );
};

export default Mouse;
