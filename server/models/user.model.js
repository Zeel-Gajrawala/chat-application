const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: "Please Enter FullName",
    min: 1,
    max: 255,
  },
  last_name: {
    type: String,
    required: "Please Enter FullName",
    min: 1,
    max: 255,
  },
  email: {
    type: String,
    required: "Please Enter Email",
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "Password must be atleast 6 characters long"],
  },
  roomId: {
    type: Object,
    default: {},
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

/*
 * @return {Array} List of all users
 */
userSchema.statics.getUsersExceptCurrent = async function (user_id) {
  try {
    const users = await this.find({ _id: { $nin: [user_id] } });
    return users;
  } catch (error) {
    throw error;
  }
};

/*
 * @param {String} id - id of user
 * @return {Object} updates user room
 */
userSchema.statics.addRoomIdInSenderAndReceiver = async function (
  senderId,
  senderRoom,
  receiverId,
  receiverRoom
) {
  try {
    let users = [];
    const senderUsers = await this.findByIdAndUpdate(
      senderId,
      { $set: { roomId: senderRoom } },
      { new: true }
    );
    const receiverUsers = await this.findByIdAndUpdate(
      receiverId,
      { $set: { roomId: receiverRoom } },
      { new: true }
    );
    users.push(senderUsers, receiverUsers);
    return users;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
