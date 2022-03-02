import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Messenger from "./pages/Messenger/Messenger";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";


const useAuth = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("social"));
  const {userInfo} = useSelector(state=>state.userLogin)
    
    if (userInfo || user) {
      console.log(userInfo, user)
      return userInfo;
    }
  
};

const Protected = () => {
  const isAuth =  useAuth();
  
  return <>{isAuth ? <Outlet /> : <Navigate to="/login"/>}</>;
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Protected />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/messenger" element={<Messenger />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
