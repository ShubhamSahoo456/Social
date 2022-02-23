import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./chatonline.css";
import axios from "axios";

const ChatOnline = ({Online}) => {
  const [profile, setProfile] = useState({})

  const getUserProfile = async () => {
    console.log(Online)
    try{
      const {data} = await axios.get(`http://localhost:8000/api/v1/getUser/${Online.userId}`)
      console.log(data)
      setProfile(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getUserProfile()
  },[Online])
  return (
    <>
      <div className="online_friends">
        <div className="online_friends_style">
          <div className="friend_online_status">
            <img
              className="friend_online_img"
              src={profile?.profilePicture? profile.profilePicture:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
            />
            <CircleIcon htmlColor="green" className="active_icon" />
          </div>
          <p>{profile?.fullName}</p>
        </div>
      </div>
    </>
  );
};

export default ChatOnline;
