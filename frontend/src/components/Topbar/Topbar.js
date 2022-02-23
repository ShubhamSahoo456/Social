import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./topbar.css";
import { useSelector } from "react-redux";
import Logout from "../logout/logout";

const Topbar = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate()
  const [search, setSearch] = useState(false);
  const [searchFriends, setSearchFriends] = useState([]);
  const [logoutContainer, setLogoutContainer] = useState(false)

  const searchUser = async (val) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUserProfile = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/getAllUser"
      );
      setSearchFriends(data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigateUserProfile = (id)=>{
      setSearch(false)
      navigate(`/profile/${id}`)
  }

  useEffect(() => {
    getAllUserProfile();
  }, []);
  return (
    <>
      <div className="topbar_container">
        <div className="left_container">
          <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
            <h3>Lamasocial</h3>
          </Link>
        </div>
        <div className="center_container">
          <div className="searchcontainer">
            <SearchIcon className="search_icon" />
            <input
              type="text"
              onFocus={() => setSearch(true)}
            //   onBlur={() => setSearch(false)}
              onChange={(e) => searchUser(e.target.value)}
              className="searchInput"
            />
            <div style={{display:'flex',flexDirection:'column'}} className="search_user">
            {search && 
              searchFriends.map((ele, index) => (
                <div className="friend_profile" key={ele._id} onClick={()=>navigateUserProfile(ele._id)}>
                  <p>{ele.fullName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right_container">
          <div className="links">
            <Link style={{ textDecoration: "none", color: "#fff" }} to="/">
              <p>Homepage</p>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              to={`/profile/${userInfo?._id}`}
            >
              <p>Timeline</p>
            </Link>
          </div>
          <div className="right_icons">
            <div className="icons">
              <PersonIcon className="icons_right" />
              <span className="icon_text">1</span>
            </div>
            <Link to="/messenger"><div className="icons">
              <ChatIcon className="icons_right" />
              <span className="icon_text">1</span>
            </div></Link>
            <div className="icons">
              <NotificationsIcon className="icons_right" />
              <span className="icon_text">1</span>
            </div>
            <div className="profile_logout">
            <img onClick={()=>setLogoutContainer(true)} src={userInfo?.profilePicture ?userInfo.profilePicture:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} />
            </div>
            {logoutContainer && <Logout logoutContainer={logoutContainer} setLogoutContainer={(v)=>setLogoutContainer(v)}/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
