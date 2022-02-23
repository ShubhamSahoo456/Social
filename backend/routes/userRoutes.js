const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unFollowUser,
  getAllUser,
  getUserFollowers
} = require("../controller/userController");

const router = express.Router();

router.get("/getAllUser", getAllUser);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/getUser/:id", getUser);

router.put("/:id/follow", followUser);

router.put("/:id/unfollow", unFollowUser);

router.get("/getUserFollowers/:id", getUserFollowers)

module.exports = router;
