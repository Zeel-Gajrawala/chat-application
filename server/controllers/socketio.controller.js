exports = module.exports = function (io) {
  io.use(async (socket, next) => {
  // fetch token from handshake auth sent by FE
  const token = socket.handshake.auth.token;
  try {
    // verify jwt token and get user data
    const user = await jwt.verify(token, process.env.TOKEN_KEY);
    console.log('user', user);
    // save the user data into socket object, to be used further
    socket.user = user;
    next();
  } catch (e) {
    // if token is invalid, close connection
    console.log('error', e.message);
    return next(new Error(e.message));
  }
  });
  
  io.on("connection", (socket) => {
    socket.join(user.id);

    socket.on("send message", (message) => {
      console.log("send msg", message);
      io.emit("broadcast", `server: ${message}`);
    });

    socket.on("join", (roomName) => {
      console.log("room: " + roomName);
      socket.join(roomName);
    });

    socket.on("receive message", ({ message, roomName }) => {
      console.log("receive message: " + message + " in " + roomName);

      // generate data to send to receivers
      const outgoingMessage = {
        name: socket.user.name,
        id: socket.user.id,
        message,
      };

      // send socket to all in room except sender
      socket.to(roomName).emit("message", outgoingMessage);
      callback({
        status: "ok",
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
