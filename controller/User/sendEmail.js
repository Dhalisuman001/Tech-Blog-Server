const sgMail = require("@sendgrid/mail");
const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/user/UserModel");
const crypto = require("crypto");
const getUrl = require("../../utils/Front-end");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


//send account verification token
exports.accountVerification = expressAsyncHandler(async (req, res) => {
  const loginUserId = req.user.id;

  const user = await User.findById(loginUserId);

  try {
    //generate token
    const verificationToken = await user.verifyEmail();

    await user.save();    
    //build your message
    const verifyUrl = `You are reqested to verify your account within 10 mins,
          otherwise ignore this  <a href="https://${getUrl}/verify-account/${verificationToken}" > click here</a>`;

    // mail structure
    const msg = {
      to: user?.email,
      from: "dhalisuman001@gmail.com",
      subject: "Email Verification",
      html: verifyUrl,
    };
    await sgMail.send(msg);
    res.json(verifyUrl);
  } catch (error) {
    res.json(error);
  }
});


// verifying email 
exports.accVerified = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const hasedToken = crypto.createHash("sha256").update(token).digest("hex");

  const foundUser = await User.findOne({
    verificationToken: hasedToken,
    verificationTokenExpire: { $gt: new Date() },
  });

  if (!foundUser) throw new Error("Token has expires");

   foundUser.isVerified = true;
   foundUser.verificationToken = undefined;
   foundUser.verificationTokenExpire = undefined;
   await foundUser.save();
  res.json(foundUser);
});
