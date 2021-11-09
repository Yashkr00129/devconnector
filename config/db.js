const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MONGO_URI");

const connectDB = () => {
  mongoose
    .connect(db)
    .then(() => console.log("Connected to MongoDB..."))
    .catch(() => {
      console.log("Connection to MongoDB Failed...");
      process.exit(1);
    });
};

module.exports = connectDB;
