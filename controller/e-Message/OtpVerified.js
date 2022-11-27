const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const eMessage = require("../../model/email/eMsgModel");

exports.sendOtp = expressAsyncHandler(async (req, res) => {
  const { to, message } = req.body;
  const subject = "Forget Password";

  try {
    // massage build
    const msg = {
      to,
      subject,
      text: message,
      from: "dhalisuman001@gmail.com",
    };

    //send message
    await sgMail.send(msg);

    res.json(sgMail);
  } catch (error) {
    res.json(error);
  }
});
