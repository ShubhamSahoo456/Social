const express = require("express");
const multer = require('multer');
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unFollowUser,
  getAllUser,
  getUserFollowers,
  updateProfilePicture,
  updateCoverPicture
} = require("../controller/userController");

const profile = multer({
  limits:{
    fileSize:2000000
  },
  fileFilter (req,file,cb){
    if(!file.originalname.match(/\.(jpg|png)$/)){
      return cb(new Error('File must be jpg or png'))
    }

    cb(undefined,true)
  }
})

const cover = multer({
  limits:{
    fileSize:2000000
  },
  fileFilter (req,file,cb){
    if(!file.originalname.match(/\.(jpg|png)$/)){
      return cb(new Error('File must be jpg or png'))
    }

    return cb(undefined,true)
  }
})

const router = express.Router();

router.get("/getAllUser", getAllUser);

router.put("/updateUser/:id", updateUser);

router.put("/updateProfilePic/:id",profile.single('profile'), updateProfilePicture)

router.put("/updateCoverPic/:id",cover.single('cover'), updateCoverPicture)

router.delete("/deleteUser/:id", deleteUser);

router.get("/getUser/:id", getUser);

router.put("/:id/follow", followUser);

router.put("/:id/unfollow", unFollowUser);

router.get("/getUserFollowers/:id", getUserFollowers)

module.exports = router;
