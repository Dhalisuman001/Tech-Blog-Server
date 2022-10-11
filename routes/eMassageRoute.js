const eMassageRouter = require("express").Router();
const { eMsgCtrl } = require("../controller/e-Message/eMsgCtrl");

const AuthHandel = require("../middleware/auth/AuthHandler");

eMassageRouter.route("/").post(AuthHandel, eMsgCtrl);

module.exports = eMassageRouter;
