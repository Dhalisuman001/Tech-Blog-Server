const expressAsyncHandler = require("express-async-handler");
const sgMail = require("@sendgrid/mail");
const eMessage = require("../../model/email/eMsgModel");
const filter = require("bad-words");

exports.eMsgCtrl = expressAsyncHandler(async (req, res) => {
  const { to, subject, message } = req.body;
  const emailMessage = subject + " " + message;
  //prevent bad words
  const Filter = new filter();
  const isBad = Filter.isProfane(emailMessage);
  if (isBad) throw new Error("Its contain abushiv language");
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
    //save to database
    await eMessage.create({
      sentBy: req?.user?._id,
      fromEmail: req?.user?.email,
      toEmail: req?.user?.email,
      message,
      subject,
    });
    res.json(sgMail);
  } catch (error) {
    res.json(error);
  }
});
