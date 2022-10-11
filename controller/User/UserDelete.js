const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const isValid = require("../../utils/validUserId");
//----------------------------------------------------------------
// Delete a user
//----------------------------------------------------------------

exports.deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user exists
  isValid(id);

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});
