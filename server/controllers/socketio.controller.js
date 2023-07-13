const jwt = require("jsonwebtoken");
require("dotenv").config();

exports = module.exports = function (io) {
  io.use(async (socket, next) => {
    // fetch token from handshake auth sent by FE
    const token = socket.handshake.auth.token;

    if (!token) {
      return res.status(403).send("Token Required");
    }

    try {
      // verify jwt token and get user data
      const user = await jwt.verify(token, process.env.TOKEN_KEY);

      // save the user data into socket object, to be used further
      socket.user = user;
      next();
    } catch (e) {
      // if token is invalid, close connection
      console.log("error ==>", e.message);
      return next(new Error(e.message));
    }
  });

  io.on("connection", (socket) => {
    socket.on("join", (roomId) => {
      socket.join(roomId);
      // socket.broadcast.to(user.room).emit("user joined");
    });

    socket.on("message", (data) => {
      socket.broadcast.emit("new message", {
        user: data.user,
        room: data.room,
        message: data.message,
      });
    });

    socket.on("disconnect", () => {
      socket.disconnect();
      console.log("user disconnected");
    });
  });
};
