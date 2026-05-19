const express = require("express");
const cors = require("cors");
const postRoute = require("./routes/postRoute");
const authRoute = require("./routes/authRoute");
const commentRoute = require("./routes/commentRoute");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

app.use("/api/posts", postRoute);

app.use("/api/posts", commentRoute);

app.use("/api/ai", aiRoutes);

//Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Blog API is running" });
});
module.exports = app;
