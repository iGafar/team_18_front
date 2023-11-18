import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Login from "./pages/Login/Login";
import Admin from './pages/Admin/Admin'
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
