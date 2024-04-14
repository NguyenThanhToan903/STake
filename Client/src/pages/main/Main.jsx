import { Link, useNavigate } from "react-router-dom";
import { data } from "../../../data";
import { Button } from "react-bootstrap";
import TableMain from "../../components/tableMain/TableMain";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { axiosJava } from "../../config";
import "./main.css";
import { logout } from "../../redux/userRedux";
import socketIOClient from "socket.io-client";

const host = "http://localhost:8000/";

const Main = () => {
  const [samples, setSamples] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = socketIOClient.connect(host);
  }, []);

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
    <div className="home ">
      <div className="header">
        <div className="nav">
          <h1 className="header-logo">STake</h1>
          <Button className="btn-logout" onClick={handleLogout}>
            LOG OUT
          </Button>
        </div>
      </div>
      <div className="container shadow">
        <Link to={"/form?mode=add"} className="add-sample">
          <Button className="btn btn-success">Add Sample</Button>
        </Link>

        <TableMain data={samples} />
      </div>
    </div>
  );
};

export default Main;
