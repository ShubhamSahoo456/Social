const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const sharp = require('sharp')

const updateUser = async (req, res) => {
  if (req.params.id == req.body.userId || req.user.isAdmin) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const userupdate = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      if (userupdate) {
        res.status(200).json({ message: "updated successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "You cannot update the user" });
  }
};

const deleteUser = async (req, res) => {
  if (req.params.id == req.body.userId || req.user.isAdmin) {
    try {
      const delUser = await User.findByIdAndDelete(req.params.id);
      if (delUser) {
        res.status(200).json({ message: "User has been deleted" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json({ message: "You cannot delete the user" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.profilePicture = user.profilePicture.toString()
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

const followUser = async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        const updateUser = await user.updateOne({
          $push: { followers: req.body.userId },
        });
        const updateCurrentUser = await currentUser.updateOne({
          $push: { followins: req.params.id },
        });
        if (updateUser && updateCurrentUser) {
          res.status(200).json({ message: "you followed this user" });
        }
      } else {
        res
          .status(403)
          .json({ message: "You have already followed this user" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(400).json({ message: "You cannot follow yourself" });
  }
};

const unFollowUser = async (req, res) => {
  if (req.params.id !== req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        const updateUser = await user.updateOne({
          $pull: { followers: req.body.userId },
        });
        const updateCurrentUser = await currentUser.updateOne({
          $pull: { followins: req.params.id },
        });
        if (updateUser && updateCurrentUser) {
          res.status(200).json({ message: "you Unfollowed this user" });
        }
      } else {
        res.status(403).json({ message: "You have not Followed this user" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(400).json({ message: "You cannot follow yourself" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getUserFollowers = async (req, res) => {
  try {
    const userFollowers = await User.findById(req.params.id);
    const followed = [];
    Promise.all(
      userFollowers.followins.map(async (friendId) => {
        const friend = await User.findById(friendId);
        followed.push(friend);
      })
    ).then(() => {
      res.status(200).json(followed);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


const updateProfilePicture =async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        if(user){
          const buffer = await sharp(req.file.buffer).png().resize({width:500,height:500}).toBuffer()
            user.profilePicture = buffer;
            await user.save()
            res.status(200).json({message:'profile pic updated'})
        }else{
            res.status(404).json({message:'user not found'})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const updateCoverPicture = async (req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if(user){
            const buffer = await sharp(req.file.buffer).png().toBuffer();
            user.coverPicture = buffer;
            await user.save();
            res.status(200).json({message:'cover pic uploaded successfully'})
        }else{
            res.status(404).json({message:'user not found'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports = {
  updateUser,
  deleteUser,
  getUser,
  followUser,
  unFollowUser,
  getAllUser,
  getUserFollowers,
  updateProfilePicture,
  updateCoverPicture
};
