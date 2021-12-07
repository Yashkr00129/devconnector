const express = require("express");
const app = express();
const connectDB = require("./config/db");

app.use(express.json());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/github", require("./routes/api/github"));
connectDB();
app.get("/", (req, res) => {
  res.send("Server Running");
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
