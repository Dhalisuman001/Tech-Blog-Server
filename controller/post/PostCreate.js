const expressAsyncHandler = require("express-async-handler");
const Post = require("../../model/post/PostModel");
const User = require("../../model/user/UserModel");
const fs = require("fs");
const isValid = require("../../utils/validUserId");
const cloudinaryUploadImg = require("../../utils/Cloudinary");
const filter = require("bad-words");
const isBlocked = require('../../utils/isBlocked')
// ----------------------------------------------------------------
//Create post
// ----------------------------------------------------------------

exports.createPostCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  //   console.log(req.user._id);
  //block user
  isBlocked(req.user);
  console.log(req.file);
  isValid(req.user._id);
  const Filter = new filter();
  const isBad = Filter.isProfane(req.body.title, req.body.description);
  if (isBad) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error("You are blocked !");
  }
  ////get the path to img
  const localpath = `public/images/post/${req?.file?.filename}`;
  // upload to cloudinary
  const uploadImg = await cloudinaryUploadImg(localpath);

  try {
    const post = await Post.create({
      ...req.body,
      image: uploadImg?.url,
      author: _id,
    });
    res.json(post);
//update post count
await User.findByIdAndUpdate(_id,{
  $inc:{ postCount : 1}
},{
  new:true
});

// console.log(req.user);
    // remove uploaded images
    fs.unlinkSync(localpath);
  } catch (error) {
    res.json(error);
  }
});
