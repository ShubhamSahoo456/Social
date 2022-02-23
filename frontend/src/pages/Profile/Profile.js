import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightBar/Rightbar";
import Feed from "../../components/feed/feed";
import "./profile.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const {userInfo} = useSelector(state=>state.userLogin)
  const [userProfile, setUserProfile] = useState({})
  const [followed, setFollowed] = useState(false)
  const id = useParams().id

  const getUserById = async () => {
    try{
      const {data} = await axios.get(`http://localhost:8000/api/v1/getUser/${id}`)
      setUserProfile(data)
    }catch(err){
      console.log(err)
    }
  }

  const validateFollowers = async () => {
    try{
      const {data} = await axios.get(`http://localhost:8000/api/v1/getUserFollowers/${userInfo._id}`)
      const followed = data.filter((ele)=>ele._id == id);
      if(followed.length > 0){
        setFollowed(true)
      }else{
        setFollowed(false)
      }
      
    }catch(err){
      console.log(err)
    }
  }

  const followUser = async() =>{
    try{
      const {data} = await axios.put(`http://localhost:8000/api/v1/${id}/follow`,{userId:userInfo._id})
      console.log(data)
      setFollowed(true)
    }catch(err){
      console.log(err)
    }
  }

  const unfollowUser = async () => {
    try{
      const {data} = await axios.put(`http://localhost:8000/api/v1/${id}/unfollow`,{userId:userInfo._id})
      console.log(data)
      setFollowed(false)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getUserById()
    validateFollowers()
  },[id])

  return (
    <>
      <Topbar />
      <div className="home_container">
        <Sidebar />
        <div className="profile_wrapper">
          <div className="profile_cover">
            <div className="profile_cover_pic">
              <img
                src={userProfile.coverPicture}
                className="cover_pic"
              />
              <img
                className="profile_pic"
                src={userProfile?.profilePicture ? userProfile.profilePicture:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
              />
            </div>
            <div className="profile_details">
              <h3>{userProfile.fullName}</h3>
              <p>Hello my friends</p>
            </div>
            {userInfo._id !== id && <>{followed  ? <button onClick={()=>unfollowUser()} type="button" className="follow_btn">Unfollow</button>:<button type="button" onClick={()=>followUser()} className="follow_btn">Follow</button>}</>}
          </div>
          <div className="profile_bottom">
            <Feed userProfile={userProfile}/>
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
