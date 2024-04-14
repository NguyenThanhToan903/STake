import { Link, useNavigate } from "react-router-dom";
import { data } from "../../../data";
import { Button } from "react-bootstrap";
import TableMain from "../../components/tableMain/TableMain";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { axiosJava } from "../../config";
import "./main.css";
import { logout } from "../../redux/userRedux";

const Main = () => {
  const [samples, setSamples] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getSample = async () => {
      try {
        const res = await axiosJava.get("/sample");
        setSamples(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSample();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div className="header">
        <div>Logo</div>
        <ul>
          <li>
            
          </li>
        </ul>
      </div>
      <div className="container">
        <div
          style={{ maxWidth: "97%", marginLeft: "auto", marginRight: "auto" }}
        >
          <div className="main__top">
            <Link to={"/form?mode=add"}>
              <Button
                className="btn btn-success"
                style={{ marginBottom: "10px", fontWeight: "700" }}
              >
                Add Sample
              </Button>
            </Link>
            <Button
              className="btn btn-danger"
              style={{ marginBottom: "10px", fontWeight: "700" }}
              onClick={handleLogout}
            >
              LOG OUT
            </Button>
          </div>
          <TableMain data={samples} />
        </div>
      </div>
    </div>
  );
};

export default Main;
