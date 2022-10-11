const { register } = require("./UserRegister");
const { login } = require("./UserLogin");
const { fetchUsers, fetchSingleUser } = require("./UserFetch");
const { deleteUser } = require("./UserDelete");
const { updateUser } = require("./UserUpdate");
const { updateUserPassword } = require("./UpdatePassword");
const { accountVerification, accVerified } = require("./sendEmail");
const {
  getForgotPasswordToken,
  verifyForgotPasswordToken,
} = require("./forgetPassword");
const { followingUsers, unFollowingUsers } = require("./UserFollowing");
const { blockUser, unblockUser } = require("./UserBlock");
const { userProfile } = require("./UserProfile");
const { profilephotoUpload } = require("./ProfilePhotoUpload");

module.exports = {
  blockUser,
  unblockUser,
  userProfile,
  register,
  login,
  fetchUsers,
  fetchSingleUser,
  deleteUser,
  updateUser,
  updateUserPassword,
  accountVerification,
  followingUsers,
  unFollowingUsers,
  accVerified,
  resetPassToken: getForgotPasswordToken,
  verifyPassToken: verifyForgotPasswordToken,
  profilephotoUpload,
};
