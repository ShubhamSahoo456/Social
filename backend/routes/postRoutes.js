const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostById,
  getTimeLinePosts,
  getPostsByUserId,
} = require("../controller/postController");



const router = express.Router();

router.post("/createPost", createPost);

router.put("/updatePost/:id", updatePost);

router.delete("/deletePost/:id", deletePost);

router.put("/:id/like", likePost);

router.get("/getPost/:id", getPostById);

router.get("/getPostByUserId/:id",getPostsByUserId)

router.get("/timeLinePosts/:id", getTimeLinePosts);



module.exports = router;
