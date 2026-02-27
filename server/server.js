require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");

const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");

const corsOptions = {
  origin: ["http://localhost:5173"], // vite
};

// cors is middleware
app.use(cors(corsOptions));

// use this to serve CSS (and others) if sending HTML with res.sendFile
// app.use(express.static(__dirname))

app.use(express.json());

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.get("/", indexRouter);

app.post("/sign-up", signUpRouter);

// global error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = 8080;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My Express app - listening on port ${PORT}!`);
});
