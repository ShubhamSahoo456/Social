const express = require("express");
const multer = require("multer")
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostById,
  getTimeLinePosts,
  getPostsByUserId,
} = require("../controller/postController");

const upload = multer({
  limits:{
    fileSize:2000000
  },
  fileFilter (req, file, cb) {
    if(!file.originalname.match(/\.(jpg|png)$/)){
      console.log('reached')
      return cb(new Error('file type must be jpg or png'))
    }

    cb(undefined ,true)
  }
})



const router = express.Router();

router.post("/createPost",upload.single('upload'), createPost,(errors,req,res,next)=>{
  if(errors){
    res.json({error:errors.message})
  }
});

router.put("/updatePost/:id", updatePost);

router.delete("/deletePost/:id", deletePost);

router.put("/:id/like", likePost);

router.get("/getPost/:id", getPostById);

router.get("/getPostByUserId/:id",getPostsByUserId)

router.get("/timeLinePosts/:id", getTimeLinePosts);



module.exports = router;
