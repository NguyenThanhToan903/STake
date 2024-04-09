import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AddSampleForm from "./components/addSampleForm/AddSampleForm";
import Base from "./Base";
import Main from "./pages/main/Main";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/form" element={<AddSampleForm />}></Route>
        <Route path="/" element={<Base />}></Route>
        <Route path="/table" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
