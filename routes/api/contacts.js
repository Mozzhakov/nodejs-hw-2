const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.schema), ctrl.add);

router.delete("/:contactId", isValidId, ctrl.removeById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.schema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updStatusSchema),
  ctrl.updateStatusById
);

module.exports = router;
