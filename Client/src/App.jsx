import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AddSampleForm from "./components/addSampleForm/AddSampleForm";

import Main from "./pages/main/Main";
import Loading from "./components/loading/Loading";
import "./global.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/form"
          element={!user ? <Navigate to="/login" /> : <AddSampleForm />}
        ></Route>
        <Route
          path="/"
          element={!user ? <Navigate to="/login" /> : <Main />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
