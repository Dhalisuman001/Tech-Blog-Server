const eMassageRouter = require("express").Router();
const { eMsgCtrl } = require("../controller/e-Message/eMsgCtrl");
const { sendOtp } = require("../controller/e-Message/OtpVerified");

const AuthHandel = require("../middleware/auth/AuthHandler");

eMassageRouter.route("/").post(AuthHandel, eMsgCtrl);
eMassageRouter.route("/send-otp").post(sendOtp);

module.exports = eMassageRouter;
