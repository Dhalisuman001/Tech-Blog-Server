const sgMail = require("@sendgrid/mail");
const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const crypto = require("crypto");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.accountVerification = expressAsyncHandler(async (req, res) => {
  const loginUserId = req.user.id;

  const user = await User.findById(loginUserId);

  try {
    //generate token
    const verificationToken = await user.verifyEmail();
    await user.save();
     console.log(user?.email);
    ///build your message
    const verifyUrl = `if you were reqested to verify your account within 10 mins,
          otherwise ignore this <a href="http://localhost:3000/verify-account/${verificationToken}" >click here</a>`;

    const msg = {
      to: user?.email,
      from: "dhalisuman001@gmail.com",
      subject: "my first node email sending",
      html: verifyUrl,
    };
    await sgMail.send(msg);
    res.json({
      success: true,
      verifyUrl,
    });
  } catch (error) {
    res.json(error);
  }
});

exports.accVerified = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const hasedToken = crypto.createHash("sha256").update(token).digest("hex");

  const foundUser = await User.findOne({
    verificationToken: hasedToken,
    verificationTokenExpire: { $gt: new Date() },
  });

  if (!foundUser) throw new Error("Token has expireds");
  foundUser.isVerified = true;
  foundUser.verificationToken = undefined;
  foundUser.verificationTokenExpire = undefined;
  await foundUser.save();
  res.json({
    success: true,
    foundUser,
  });
});
