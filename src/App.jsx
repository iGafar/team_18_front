import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login"
import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
            <>
              <Header/>
              <Main/>
            </>
           }/>
        <Route path='/login' element={ <Login/> }/>
      </Routes>
    </>
  );
}

export default App;
