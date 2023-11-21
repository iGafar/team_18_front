import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import User from './pages/User/User'
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
