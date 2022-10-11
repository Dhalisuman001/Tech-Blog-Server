const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const isValid = require("../../utils/validUserId");

//----------------------------------------------------------------
//Block user controller
//----------------------------------------------------------------

exports.blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  isValid(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json({ sucess: "User is blocked", user: user });
});

//----------------------------------------------------------------
//unblock user controller
//----------------------------------------------------------------

exports.unblockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  isValid(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json({ sucess: "User is unblocked", user: user });
});
