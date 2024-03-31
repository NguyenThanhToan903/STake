import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar">
      <h2>CÔNG VIỆC</h2>
      <div
        className={navActive ? "navbarAdmin adminActive" : "navbarAdmin"}
        onClick={() => setNavActive(!navActive)}
      >
        ADMIN ĐẸP TRAI
        <i className="fa-solid fa-caret-down"></i>
      </div>
      <div
        className={navActive ? "navbarLogout" : "hidden"}
        onClick={handleLogout}
      >
        Đăng xuất
      </div>

      <ul>
        <NavLink
          to="/movies?page=1"
          className={({ isActive }) =>
            isActive ? "link navbarActive" : "link"
          }
        >
          <li>
            <i className="fa-solid fa-film"></i>
            Phim
          </li>
        </NavLink>
        <NavLink
          to="/categories?page=1"
          className={({ isActive }) =>
            isActive ? "link navbarActive" : "link"
          }
        >
          <li>
            <i className="fa-solid fa-list"></i>
            Danh mục
          </li>
        </NavLink>
        <NavLink
          to="/countries?page=1"
          className={({ isActive }) =>
            isActive ? "link navbarActive" : "link"
          }
        >
          <li>
            <i className="fa-solid fa-earth-americas"></i>
            Quốc gia
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
