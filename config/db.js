const mongoose = require("mongoose");
const db = process.env.MONGO_URI


const connectDB = () => {
  mongoose
    .connect(db)
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => {
      console.log("Connection to MongoDB Failed...",err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
