require("dotenv").config();
const path = require("node:path");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// for passport
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./db/pool");

const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");

const corsOptions = {
  origin: ["http://localhost:5173"], // vite
  credentials: true,
};

// cors is middleware
app.use(cors(corsOptions));

// use this to serve CSS (and others) if sending HTML with res.sendFile
// app.use(express.static(__dirname))

// for sending direct from form element
// app.use(express.urlencoded({ extended: true }));

// for using React states
app.use(express.json());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      // for bcrypt password
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      // for plaintext password
      // if (user.password !== password) {
      //   return done(null, false, { message: "Incorrect password" });
      // }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

// should grab user after authenticated and place in the locals object
// for ease of use throughout express
// not hitting for log-in frontend page - should unify, its all over the place
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  console.log(res.locals.currentUser);
  next();
});

app.use("/sign-up", signUpRouter);

app.post("/log-in", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // sends a JSON 401 response, and error handler is not needed for this case
      return res.status(401).json({ success: false, message: info?.message || "Authentication failed" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log(req.user);
      return res.json({ success: true, user });
    });
  })(req, res, next); // invoking the arrow function/custom callback
});

// passport add req.logout that logs out of session
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use("/", indexRouter);

// global error
app.use((err, req, res, next) => {
  // if (err && err.name === "AuthenticationError") {
  //   return res.status(401).json({ success: false, message: "Authentication failed" });
  // }
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
