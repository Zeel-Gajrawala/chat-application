require("./config/db");
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:4200"],
  },
});

//passing socket instance and calling file
require("./controllers/socketio.controller")(io);

app.use(bodyParser.json());
app.use(cors());

//routes
app.use("/api", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hey I'm Chat Application Backend</h1>");
});

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

http.listen(process.env.PORT, () => {
  console.log(`listening to http on ${process.env.PORT}`);
});
