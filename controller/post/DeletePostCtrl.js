const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");
const User = require("../../model/user/UserModel");
const fs = require("fs");
const isValid = require("../../utils/validUserId");
const cloudinaryUploadImg = require("../../utils/Cloudinary");
const filter = require("bad-words");

exports.DeletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  isValid(id);
  try {
    const post = await Post.findByIdAndDelete(id);

    res.json(post);
  } catch (error) {
    res.json(error);
  }
});
