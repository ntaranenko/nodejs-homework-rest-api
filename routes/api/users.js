const express = require("express");
const {
  controllerShell,
  checkJwt,
  validation,
  upload,
} = require("../../middlewares");
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
router.patch(
  "/avatars",
  checkJwt,
  upload.single("avatar"),
  controllerShell(controller.updateAvatar)
);

module.exports = router;
