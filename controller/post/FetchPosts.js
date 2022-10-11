const expressAsyncHandler = require("express-async-handler");
// const cloudinaryUploadImg = require("../../utils/Cloudinary");
// const fs = require("fs");
// const User = require("../../model/user/UserModel");
const Post = require("../../model/post/PostModel");

exports.fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { category } = req.query;
  console.log(category);

  try {
    if (category) {
      const posts = await Post.find({ category: category }).populate("author").populate('comments').sort("-createdAt");
      res.json(posts);
    } else {
      const posts = await Post.find({}).populate("author").populate('comments').sort("-createdAt");
      res.json(posts);
    }
  } catch (error) {
    res.json(error);
  }
});
