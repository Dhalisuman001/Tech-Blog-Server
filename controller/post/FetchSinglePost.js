const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");
const User = require("../../model/user/UserModel");
const fs = require("fs");
const isValid = require("../../utils/validUserId");
const cloudinaryUploadImg = require("../../utils/Cloudinary");
const filter = require("bad-words");

exports.fetchSinglePost = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  isValid(id);
  try {
    const post = await Post.findById(id)
      .populate("author")
      .populate("dislikes")
      .populate("likes")
      .populate('comments');
    ///update number of views
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});
