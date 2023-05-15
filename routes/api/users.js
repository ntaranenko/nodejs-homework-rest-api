const express = require("express");
const { controllerShell, checkJwt, validation } = require("../../middlewares");
const { joiUserSchemas } = require("../../models");
const { users: controller } = require("../../controller");

const router = express.Router();

router.patch(
  "/",
  checkJwt,
  validation(joiUserSchemas.joiSubscriptionSchema),
  controllerShell(controller.updateSubscription)
);
router.get("/current", checkJwt, controllerShell(controller.getCurrent));

module.exports = router;
