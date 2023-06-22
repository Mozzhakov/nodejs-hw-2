const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {
  register,
  login,
  getCurrent,
  updSubscription,
  logout,
} = require("../../controllers/auth");
const router = express.Router();

router.post("/register", validateBody(schemas.regSchema), register);
router.post("/login", validateBody(schemas.logSchema), login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.updSubscriptionSchema),
  updSubscription
);

module.exports = router;
