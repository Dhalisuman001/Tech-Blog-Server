const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const isValid = require("../../utils/validUserId");

//-------------------------------------------------------
//update  users
//-------------------------------------------------------

exports.updateUser = expressAsyncHandler(async (req, res) => {
  let { _id } = req?.user;
  //check if user exists
  isValid(_id);
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        bio: req?.body?.bio,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  } catch (error) {
    throw new Error(`Invalid user`);
  }
});
