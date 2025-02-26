const express = require("express");
const { validation, controllerShell, checkJwt } = require("../../middlewares");
const { joiUserSchemas } = require("../../models");
const { auth: controller } = require("../../controller");

const router = express.Router();

router.post(
  "/register",
  validation(joiUserSchemas.joiSingUpSchema),
  controllerShell(controller.signUp)
);
router.post(
  "/login",
  validation(joiUserSchemas.joiSingInSchema),
  controllerShell(controller.signIn)
);
router.get("/logout", checkJwt, controllerShell(controller.logOut));

module.exports = router;
