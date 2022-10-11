const expressAsyncHandler = require("express-async-handler");
const cloudinaryUploadImg = require("../../utils/Cloudinary");
const fs = require("fs");
const User = require("../../model/user/UserModel");
//profile photo upload
exports.profilephotoUpload = expressAsyncHandler(async (req, res) => {
  //get the user
  // console.log(req.user);
  const { _id } = req.user;

  ////get the path to img
  const localpath = `public/images/profile/${req.file.filename}`;
  // upload to cloudinary
  const uploadImg = await cloudinaryUploadImg(localpath);
  const foundUser = await User.findByIdAndUpdate(
    _id,
    {
      profilePhoto: uploadImg.url,
    },
    {
      new: true,
    }
  );
  console.log(uploadImg);
  //remove the save images
  fs.unlinkSync(localpath);
  res.json({
   
    localpath,
    foundUser,
  });
});
