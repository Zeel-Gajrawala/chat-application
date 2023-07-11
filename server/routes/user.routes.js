const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const jwtHelper = require("../middleware/authenticate-user.middleware");

router
  .get("/", jwtHelper, userController.onGetAllUsersExceptCurrentUser)
  .post("/room", jwtHelper, userController.addRoomIdToUser)
  .get("/:roomId", jwtHelper, () => {})
  .post("/:roomId/message", jwtHelper, () => {});

module.exports = router;
