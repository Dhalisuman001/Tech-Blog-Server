const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const isValid = require("../../utils/validUserId");

exports.updateUserPassword = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  const { password } = req?.body;
  isValid(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
});
