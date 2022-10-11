const sgMail = require("@sendgrid/mail");
const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const crypto = require("crypto");
const getUrl = require("../../utils/Front-end");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//----------------------------------------------------------------
//to generate forgot password token
//----------------------------------------------------------------

exports.getForgotPasswordToken = expressAsyncHandler(async (req, res) => {
  //find user by email
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("Couldn't find user");
  try {
    const token = await user.getPasswordResetToken();

    await user.save();

    const verifyUrl = `Reset your password within 10 minutes,
          otherwise this token will expire <a href="${getUrl}/reset-password/${token}">click</a>`;

    const msg = {
      to: email,
      from: "dhalisuman001@gmail.com",
      subject: "Reset password",
      html: verifyUrl,
    };
    const sgMsg = await sgMail.send(msg);
    
    res.json({
      verifyUrl,
      sgMsg,
    });
  } catch (error) {
    res.json(error);
  }
});

//----------------------------------------------------------------
//to verify forget  Password token
///----------------------------------------------------------------

exports.verifyForgotPasswordToken = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const foundUser = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordTokenExpire: { $gt: new Date() },
  });

  if (!foundUser) throw new Error("Token has expireds");
  foundUser.password = password;
  foundUser.forgotPasswordToken = undefined;
  foundUser.forgotPasswordTokenExpire = undefined;
  await foundUser.save();
  res.json( foundUser );
});
