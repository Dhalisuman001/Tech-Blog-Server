const userRouter = require("express").Router();
const {
  register,
  login,
  fetchUsers,
  deleteUser,
  updateUser,
  updateUserPassword,
  accountVerification,
  followingUsers,
  unFollowingUsers,
  blockUser,
  unblockUser,
  userProfile,
  fetchSingleUser,
  accVerified,
  resetPassToken,
  verifyPassToken,
  profilephotoUpload,
} = require("../controller/User");
const AuthHandel = require("../middleware/auth/AuthHandler");
const {
  profilePhotoResize,
  PhotoUpload,
} = require("../middleware/upload/PhotoUpload");

//user register route --> doamin/api/v/users/register
userRouter.route("/register").post(register);
// //user login route --> doamin/api/v/users/register
userRouter.route("/login").post(login);
// //fetch all users route --> doamin/api/v/users
userRouter.route("/").get(AuthHandel, fetchUsers);
// //fetch single user route --> doamin/api/v/users/userId
userRouter.route("/:id").get(fetchSingleUser);
// //get profile route --> doamin/api/v/users/profile/userId
userRouter.route("/profile/:id").get(AuthHandel, userProfile);
// //delete user  route --> doamin/api/v/users/register
userRouter.route("/:id").delete(deleteUser);
// //update profile route --> doamin/api/v/users/profile
userRouter.route("/profile").put(AuthHandel, updateUser);
// //update password route --> doamin/api/v/users/password
userRouter.route("/password").put(AuthHandel, updateUserPassword);
// //folllowing user route --> doamin/api/v/users/password
userRouter.route("/follow").put(AuthHandel, followingUsers);
// //unfolllowing user route --> doamin/api/v/users/password
userRouter.route("/unfollow").put(AuthHandel, unFollowingUsers);
userRouter.route("/block-user/:id").put(AuthHandel, blockUser);
userRouter.route("/unblock-user/:id").put(AuthHandel, unblockUser);
// userRouter.route("/verify-email").post(AuthHandel, accountVerification);
userRouter.route("/get-verify-email").post(AuthHandel, accountVerification);
userRouter.route("/verify-account").put(AuthHandel, accVerified);
userRouter.route("/reset-password-token").put( resetPassToken);
userRouter.route("/verify-password-token").put( verifyPassToken);
userRouter
  .route("/profile-photo-upload")
  .put(
    AuthHandel,
    PhotoUpload.single("image"),
    profilePhotoResize,
    profilephotoUpload
  );

module.exports = userRouter;
