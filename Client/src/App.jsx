import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Signup.jsx";
import Login from "./Login.jsx";
import Base from "./Base.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/" element={<Base />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
