import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./conversation.css";

const Conversation = ({conversation}) => {
  const {userInfo} = useSelector(state=>state.userLogin);
  const [profile, setProfile] = useState({})

  const getUserById = async (id) => {
    try{
      const {data} = await axios.get(`http://localhost:8000/api/v1/getUser/${id}`)
      setProfile(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    const id = conversation.members.find((ele)=>ele !== userInfo._id)
    getUserById(id)
  },[])

  return (
    <>
      <div className="conversation_wrapper">
        <img
          className="conversation_profile"
          src={profile.profilePicture?profile.profilePicture:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
        />
        <span className="user_friend_name">{profile.fullName}</span>
      </div>
    </>
  );
};

export default Conversation;
