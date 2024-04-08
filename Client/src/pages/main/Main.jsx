import { Link } from "react-router-dom";
import { data } from "../../../data";
import { Button } from "react-bootstrap";
import TableMain from "../../components/tableMain/TableMain";

const Main = () => {
  return (
    <div className="wrapper">
      <div style={{ maxWidth: "97%", marginLeft: "auto", marginRight: "auto" }}>
        <Link to={"/add"}>
          <Button
            className="btn btn-success"
            style={{ marginBottom: "10px", fontWeight: "700" }}
          >
            Add Sample
          </Button>
        </Link>
        <TableMain data={data} />
      </div>
    </div>
  );
};

export default Main;
