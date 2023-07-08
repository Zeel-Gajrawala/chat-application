require('./config/db');
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:4200"],
  },
});

app.use(bodyParser.json());
app.use(cors());

//routes
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hey I'm Chat Application Backend</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(process.env.PORT, () => {
  console.log(`listening to http on ${process.env.PORT}`);
});
