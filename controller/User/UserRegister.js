const User = require("../../model/user/UserModel");
const expressAsyncHandler = require("express-async-handler");
//----------------------------------------------------------------
//registered methods
///----------------------------------------------------------------
exports.register = expressAsyncHandler(async (req, res) => {
  // check user exist or not
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) throw new Error("User already exists");
  try {
    // register user
    const user = await User.create({
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      password: req?.body?.password,
      email: req?.body?.email,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
});
