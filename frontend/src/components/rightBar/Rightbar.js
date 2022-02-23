import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { useSelector } from "react-redux";
import "./rightbar.css";

const Rightbar = ({ profile }) => {
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { userInfo } = useSelector((state) => state.userLogin);

  const fetchUserfriends = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/getUserFollowers/${userInfo._id}`
      );
      setOnlineFriends(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserfriends();
  }, []);
  return (
    <>
      <div className="rightbar_container">
        <div className="rightbar_wrapper">
          <div className="righbar_birthdaytitle">
            <img
              className="birthday"
              src="https://media.istockphoto.com/vectors/isometric-gift-flat-icon-pixel-perfect-for-mobile-and-web-vector-id1152848595?k=20&m=1152848595&s=612x612&w=0&h=T9QQc2EYpvnB_sBzvcNrraL77VE9aXQlA86xum364uU="
            />
            <p>
              <strong>Pola Foster</strong>and{" "}
              <strong>and 3 other friends</strong>have a birthday today
            </p>
          </div>
          <div className="celebration">
            <img
              src="https://images.thrillophilia.com/image/upload/s--FW9wxDfn--/c_fill,h_775,q_auto,w_1600/f_auto,fl_strip_profile/v1/images/photos/000/139/607/original/1576244865_party44_(1).jpg.jpg?1576244865"
              className="celebration_img"
            />
          </div>
          <div className="online_friends">
            <div className="online_title">
              <p>Online Friends</p>
            </div>
            <div className="online_show">
              {onlineFriends.map((ele) => (
                <div className="friends_style" key={ele._id}>
                  <div className="friend_status">
                    <img
                      className="friend_img"
                      src={ele.profilePicture?ele.profilePicture:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                    />
                    <CircleIcon htmlColor="green" className="active" />
                  </div>
                  <p className="friend_name">{ele.fullName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rightbar;
