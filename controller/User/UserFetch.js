const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const isValid = require("../../utils/validUserId");

//----------------------------------------------------------------
//Fetch all users from
//----------------------------------------------------------------
exports.fetchUsers = expressAsyncHandler(async (req, res) => {
  // console.log(req.headers);
  try {
    const users = await User.find({}).populate('posts');
    res.json(users);
  } catch (error) {
    res.json({ error: error });
  }
});

//----------------------------------------------------------------
//Fetch single user from
//----------------------------------------------------------------
exports.fetchSingleUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user exists
  isValid(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});
