import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from 'timeago.js';
import axios from 'axios';
import "./post.css";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';


const Post = ({data}) => {
  const [likes, setLikes] = useState(data?.likes?.length)
  const {userInfo} = useSelector(state=>state.userLogin)

  const likePost = async(id)=>{
    try{
      const {data} = await axios.put(`http://localhost:8000/api/v1/${id}/like`,{userId:userInfo._id})
      if(data.status){
        setLikes((prev)=>prev+1)
      }else{
        setLikes((prev)=>prev-1)
      }
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <>
      <div className="post">
        <div className="post_wrapper">
          <div className="post_top">
            <div className="post_profile">
              <img
                src={data?.users[0].profilePicture ?data?.users[0].profilePicture :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                className="post_img"
              />
              <Link to={`/profile/${data?.users[0]._id}`} style={{textDecoration:'none',color:'black'}}><p className="userName">{data?.users[0].fullName}</p></Link>
              <p className="time">{format(data?.createdAt)}</p>
            </div>
            <MoreVertIcon />
          </div>
          <div className="post_center">
            <p className="desc_post">{data?.desc}</p>
            <img
              src={`data:image/jpg;base64,${data.img}`}
              className="post_center"
            />
          </div>
          <div className="post_bottom">
            <div className="post_comments">
              <ThumbUpIcon className="like" htmlColor="#24a0ed" onClick={()=>likePost(data?._id)}/>
              <FavoriteIcon className="heartlike" htmlColor="tomato" />
              <p className="floowing_likes">{likes} people liked it</p>
            </div>
            <p className="comment">9 comments</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
