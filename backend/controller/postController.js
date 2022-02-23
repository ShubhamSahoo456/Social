const User = require("../model/userSchema");
const Post = require("../model/postSchema");
const { findOne } = require("../model/userSchema");

const createPost = async (req, res) => {
  try {
    const newPOst = new Post(req.body);
    const savePost = await newPOst.save();
    if (savePost) {
      res.status(200).json(savePost);
    } else {
      res.status(403).json({ message: "Unable to sav epost" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const updatePost = await post.updateOne({ $set: req.body });
      if (updatePost) {
        res.status(200).json(updatePost);
      } else {
        res.status(400).json({ message: "Unable to update post" });
      }
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const delPost = await post.deleteOne();
      if (deletePost) {
        res.status(200).json({ message: "Post has been deleted" });
      } else {
        res.status(400).json({ message: "Unable to delete post" });
      }
    } else {
      res.status(404).json({ message: "Post does not exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json({ message: "post has been liked", status: true });
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res
          .status(200)
          .json({ message: "post has been unliked", status: false });
      }
    } else {
      res.status(404).json({ message: "Unable to find post" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getPostById = async (req, res) => {
  try {
    const getUser = await Post.findById(req.params.id);
    if (getUser) {
      res.status(200).json(getUser);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getTimeLinePosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userPosts = await Post.aggregate([
      { $match: { userId: currentUser._id } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
    ]);
    console.log(currentUser.followins.length);

    Promise.all(
      currentUser.followins.map(async (friendId) => {
        const friend = await User.findById(friendId);
        const friendPost = await Post.aggregate([
          { $match: { userId: friend._id } },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "users",
            },
          },
        ]);
        friendPost.forEach((ele)=>{
          userPosts.push(ele);
        })
      })
    ).then(()=>{
      res.status(200).json(userPosts);
    })

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};



const getPostsByUserId = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userPost = await Post.aggregate([
      { $match: { userId: currentUser._id } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
    ]);
    res.status(200).json(userPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};



module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostById,
  getTimeLinePosts,
  getPostsByUserId
};
