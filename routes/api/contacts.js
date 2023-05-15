const express = require("express");
const {
  validation,
  controllerShell,
  isValidId,
  checkJwt,
  checkUniqData,
} = require("../../middlewares");
const { joiContactsSchemas } = require("../../models");
const { contacts: controller } = require("../../controller");

const router = express.Router();

router.get("/", checkJwt, controllerShell(controller.getAll));

router.get(
  "/:contactId",
  checkJwt,
  isValidId,
  controllerShell(controller.getById)
);

router.post(
  "/",
  checkJwt,
  validation(joiContactsSchemas.contactsSchema),
  checkUniqData,
  controllerShell(controller.add)
);

router.delete(
  "/:contactId",
  checkJwt,
  isValidId,
  controllerShell(controller.remove)
);

router.put(
  "/:contactId",
  checkJwt,
  isValidId,
  validation(joiContactsSchemas.contactsSchema),
  checkUniqData,
  controllerShell(controller.update)
);

router.patch(
  "/:contactId/favorite",
  checkJwt,
  isValidId,
  validation(joiContactsSchemas.favoriteSchema),
  controllerShell(controller.patch)
);

module.exports = router;
