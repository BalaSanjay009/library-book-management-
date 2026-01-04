const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB");

app.use("/books", bookRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});