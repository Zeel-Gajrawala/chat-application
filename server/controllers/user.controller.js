const User = require("../models/user.model");

const onGetAllUsersExceptCurrentUser = async (req, res, next) => {
  if (req.user.user_id) {
    try {
      const users = await User.getUsersExceptCurrent(req.user.user_id);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).send("Invalid User");
  }
};

const addRoomIdToUser = async (req, res, next) => {
  if (req.body) {
    try {
      let senderRoom = {};
      let receiverRoom = {};

      senderRoom[req.body.receiver_Id] = req.body.roomId;
      receiverRoom[req.body.sender_id] = req.body.roomId;

      const users = await User.addRoomIdInSenderAndReceiver(
        req.body.sender_id,
        senderRoom,
        req.body.receiver_Id,
        receiverRoom
      );

      res.status(201).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).send("Invalid User");
  }
};

module.exports = { onGetAllUsersExceptCurrentUser, addRoomIdToUser };
