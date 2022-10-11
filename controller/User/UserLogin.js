const User = require("../../model/user/UserModel");
const expressAsyncHandler = require("express-async-handler");
const getToken = require("../../config/token/getToken");
const isBlocked = require("../../utils/isBlocked");

//---------------------------------
//Login methods
//--------------------------------

exports.login = expressAsyncHandler(async (req, res) => {
  // if user is found
  const user = await User.findOne({ email: req?.body?.email });
  ///check if user is blocked or not
  isBlocked(user);
  // check if password is valid
  if (user && (await user.isPassword(req.body.password))) {
    getToken;
    res.json({
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      isAdmin: user?.isAdmin,
      profilePhoto: user?.profilePhoto,
      token: getToken(user?._id),
      _id: user?._id,
      isVerified:user?.isVerified
    });
  } else {
    res.status(401);
    throw new Error(`Invalid password`);
  }
});
