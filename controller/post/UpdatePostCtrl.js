const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");
const User = require("../../model/user/UserModel");
const fs = require("fs");
const isValid = require("../../utils/validUserId");
const cloudinaryUploadImg = require("../../utils/Cloudinary");
const filter = require("bad-words");

exports.updatePostCtrl = expressAsyncHandler(async (req, res) => {
  //   console.log(req.user);
  const { id } = req.params;
  isValid(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        author: req.user?._id,
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});
