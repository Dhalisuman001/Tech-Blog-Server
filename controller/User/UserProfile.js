const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const isValid = require("../../utils/validUserId");

//---------------------------------
//user profile api  methods
//--------------------------------
exports.userProfile = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  console.log(user);
  isValid(id);
  try {
    const profile = await User.findById(id);
    const viewed = await profile?.viewedBy?.find(
      (u) => u?._id?.toString() === user?._id?.toString())
      if (viewed) {
        const myProfile = await User.findById(id).populate("posts").populate("viewedBy");
        res.json(myProfile);
      }else
       { 
        const myProfile = await User.findByIdAndUpdate(id,{
        $push: { viewedBy: user },
        },
        { new: true }).populate("posts").populate("viewedBy");
        res.json(myProfile);}
  } catch (error) {
    res.json(error);
  }
});
