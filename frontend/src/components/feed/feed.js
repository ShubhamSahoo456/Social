import React, { useEffect, useState } from "react";
import Post from "../shared/posts/Post";
import Status from "../shared/status/Status";
import axios from 'axios';
import "./feed.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Feed = ({home, userProfile}) => {

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin
  const [posts, setPosts] = useState([])
  const id = useParams().id

  const fetchUserPosts = async () =>{
    const {data} = home ? await axios.get(`http://localhost:8000/api/v1/timeLinePosts/${userInfo._id}`) : 
                          await axios.get(`http://localhost:8000/api/v1/getPostByUserId/${id}`);
    console.log(data)
    console.log(userInfo._id)
    setPosts(data)
  }

  useEffect(()=>{
    fetchUserPosts()
  },[id])

  return (
    <>
      <div className="feed_container">
        <div className="feed_wrapper">
          <Status home userProfile={userProfile} fetchUserPosts={fetchUserPosts}/>
          {posts.map((ele,index)=>(
              <Post key={ele._id} data={ele} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
