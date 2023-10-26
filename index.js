const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");
// process.env.PORT
// process.env.NODE_ENV => production us to access the req.body

// Middleware
app.use(cors());
app.use(express.json()); // allows us to access req.body

// app.use(express.static(path.join(__dirname, "client/dist")));
app.use(express.static("client/dist"));

if (process.env.NODE_ENV === "production") {
  // server static content
  // yarn build
  app.use(express.static(path.join(__dirname, "client/dist")));
}

console.log(__dirname);

//* Routes
// register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

// catch all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
