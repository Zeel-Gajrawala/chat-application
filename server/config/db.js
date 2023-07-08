const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) {
      console.log("Database connection successful");
    } else {
      console.log("Error in database connection: " + err);
    }
  });
};

module.exports = connectToMongoDB();
