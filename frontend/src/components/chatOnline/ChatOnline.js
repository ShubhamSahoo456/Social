import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import "./chatonline.css";


const ChatOnline = ({Online}) => {

  return (
    <>
      <div className="online_friends">
        <div className="online_friends_style">
          <div className="friend_online_status">
            <img
              className="friend_online_img"
              src={Online?.profilePicture? Online.profilePicture:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
            />
            <CircleIcon htmlColor="green" className="active_icon" />
          </div>
          <p>{Online?.fullName}</p>
        </div>
      </div>
    </>
  );
};

export default ChatOnline;
