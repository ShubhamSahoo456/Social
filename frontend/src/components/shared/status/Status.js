import React, { useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import "./status.css";
import { useSelector } from "react-redux";
import axios from 'axios'
import { useParams } from "react-router-dom";

const Status = ({ home, userProfile, fetchUserPosts }) => {
  const [imageFile, setimagefile] = useState({});
  const { userInfo } = useSelector((state) => state.userLogin);
  const id = useParams().id

  const uploadPost = (files) => {
    setimagefile(files);
  };


  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("upload", imageFile);
      formData.append("fileName", imageFile.name);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          userid:userInfo._id
        },
      };

      const {data} = await axios.post("http://localhost:8000/api/v1/createPost",formData,config)
      if(data){
        alert('post has been uploaded')
        fetchUserPosts()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="status_bar">
        <div className="status_wrapper">
          <div className="status_top">
            <img
              src={
                userInfo.profilePicture
                  ? userInfo.profilePicture
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
              className="status_img"
            />
            <input
              type="text"
              placeholder={
                !userProfile
                  ? `What's on your mind ${userInfo?.fullName} ?`
                  : `Tell Something about ${userProfile.fullName}...`
              }
              className="status_input"
            />
          </div>
          <hr className="hr_line" />
          <div className="status_bottom">
            <div className="share_options">
              <div className="options">
                <InsertPhotoIcon htmlColor="red" className="icon_share" />
                Photos or Videos
                <input
                  className="file_input"
                  type="file"
                  onChange={(e) => uploadPost(e.target.files[0])}
                />
              </div>
              <div className="options">
                <LocalOfferIcon htmlColor="blue" className="icon_share" />
                Tag
              </div>
              <div className="options">
                <FmdGoodIcon htmlColor="green" className="icon_share" />
                Location
              </div>
              <div className="options">
                <EmojiEmotionsIcon htmlColor="gold" className="icon_share" />
                Feelings
              </div>
            </div>
            <button className="share_btn" onClick={handleSubmit}>
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Status;
