import { Link } from "react-router-dom";
import { data } from "../../../data";
import { Button } from "react-bootstrap";
import TableMain from "../../components/tableMain/TableMain";
import { useEffect, useState } from "react";
import { axiosJava } from "../../config";

const Main = () => {
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const getSample = async () => {
      const res = await axiosJava.get("/sample");
      console.log(res.data);
      setSamples(res.data);
    };

    getSample();
  }, []);

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
        <TableMain data={samples} />
      </div>
    </div>
  );
};

export default Main;
