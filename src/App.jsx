import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/login/login"
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
