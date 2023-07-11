const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const jwtHelper = require("../middleware/authenticate-user.middleware");

router
  .get("/", jwtHelper, userController.onGetAllUsersExceptCurrentUser);

module.exports = router;
